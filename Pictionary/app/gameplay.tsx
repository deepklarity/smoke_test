import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  AppState,
  BackHandler,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import { getRandomWords, CATEGORIES, CATEGORY_EMOJI, Category, DifficultyWithMix } from '../utils/words';
import { clearHintCache, resetMatchState, prefetchHintImages, abortAllFetches, fetchHintImage, getEmojiFallback, getCachedHint, isHintCached } from '../utils/hints';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_MARGIN = 20;
const WORD_CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 2 - 24) / 2;
const WORD_CARD_HEIGHT = 80;

type TeamColor = 'red' | 'orange' | 'purple' | 'green';

const TEAM_COLORS_LIST: TeamColor[] = ['red', 'orange', 'purple', 'green'];
const PASTEL_TINTS: Record<TeamColor, string> = {
  red: '#FFB3BA',
  orange: '#FFD19A',
  purple: '#D4B3FF',
  green: '#B3FFBA',
};
const TEAM_COLORS_CSS: Record<TeamColor, string> = {
  red: '#FF8A8A',
  orange: '#FFB36A',
  purple: '#B88AFF',
  green: '#8AFF8A',
};

type CategoryMode = 'Random' | 'All' | 'Custom';
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mix';

interface Team {
  id: number;
  name: string;
  score: number;
}

interface GameConfig {
  teams: { id: number; name: string }[];
  categoryMode: CategoryMode;
  selectedCategories: Category[];
  difficulty: DifficultyWithMix;
  winningScore: number;
  hintsEnabled: boolean;
  timerEnabled: boolean;
  timerSeconds: number;
}

type Phase = 'pick' | 'pass' | 'draw' | 'turn';

interface MatchState {
  currentTeamIndex: number;
  currentRound: number;
  currentPhase: Phase;
  selectedWord: string | null;
  usedWords: Set<string>;
  scores: Record<number, number>;
  words: string[];
}

function getInitialMatchState(teams: { id: number; name: string }[]): MatchState {
  const scores: Record<number, number> = {};
  teams.forEach(t => { scores[t.id] = 0; });
  return {
    currentTeamIndex: 0,
    currentRound: 1,
    currentPhase: 'pick',
    selectedWord: null,
    usedWords: new Set(),
    scores,
    words: [],
  };
}

function getTeamColor(teamIndex: number): TeamColor {
  return TEAM_COLORS_LIST[teamIndex % TEAM_COLORS_LIST.length];
}

export default function GameplayScreen() {
  const params = useLocalSearchParams();
  const configParam = params.config as string | undefined;
  const config: GameConfig | null = useMemo(
    () => (configParam ? JSON.parse(configParam) : null),
    [configParam]
  );

  const [teams, setTeams] = useState<Team[]>([]);
  const [category, setCategory] = useState<CategoryInput>('Random');
  const [words, setWords] = useState<string[]>([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [coverVisible, setCoverVisible] = useState(true);
  const [revealedWord, setRevealedWord] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gotItFeedback, setGotItFeedback] = useState(false);
  const [timesUpFeedback, setTimesUpFeedback] = useState(false);
  const [showPauseOverlay, setShowPauseOverlay] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [phase, setPhase] = useState<Phase>('pick');
  const [lockFireProtection, setLockFireProtection] = useState(false);
  const [categoryLocked, setCategoryLocked] = useState(false);
  const [teamRotationIndex, setTeamRotationIndex] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintUrl, setHintUrl] = useState<string | null>(null);
  const [hintError, setHintError] = useState(false);
  const hintAbortControllerRef = useRef<AbortController | null>(null);
  const hintPollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const gotItScaleAnim = useRef(new Animated.Value(0)).current;
  const gotItOpacityAnim = useRef(new Animated.Value(0)).current;
  const timesUpScaleAnim = useRef(new Animated.Value(0)).current;
  const timesUpOpacityAnim = useRef(new Animated.Value(0)).current;
  const appStateRef = useRef(AppState.currentState);

  type CategoryInput = Category | 'Random';

  useEffect(() => {
    if (!config) return;
    const initialTeams: Team[] = config.teams.map(t => ({ ...t, score: 0 }));
    setTeams(initialTeams);
    setTimerSeconds(config.timerSeconds);
    setMatchState(getInitialMatchState(config.teams));
  }, [config]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        if (timerRunning) {
          pauseTimer();
        }
        setShowPauseOverlay(true);
      }
      appStateRef.current = nextAppState;
    });
    return () => subscription.remove();
  }, [timerRunning]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        setShowPauseOverlay(true);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    return () => {
      if (hintAbortControllerRef.current) {
        hintAbortControllerRef.current.abort();
      }
      if (hintPollingRef.current) {
        clearInterval(hintPollingRef.current);
      }
      abortAllFetches();
    };
  }, []);

  useEffect(() => {
    if (showPauseOverlay && timerRunning) {
      pauseTimer();
    }
  }, [showPauseOverlay]);

  const pauseTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setTimerRunning(false);
  };

  const startTimer = useCallback((seconds: number) => {
    setTimerSeconds(seconds);
    setTimerRunning(true);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setTimerRunning(false);
          handleTimerExpiry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleTimerExpiry = () => {
    setTimesUpFeedback(true);
    Animated.sequence([
      Animated.spring(timesUpScaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.delay(1500),
      Animated.timing(timesUpOpacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setTimesUpFeedback(false);
      timesUpScaleAnim.setValue(0);
      advanceToNextTeam();
    });
  };

  const advanceToNextTeam = () => {
    if (!matchState || !config) return;
    const nextTeamIndex = (matchState.currentTeamIndex + 1) % config.teams.length;
    const nextRotationIndex = teamRotationIndex + 1;
    const totalTeams = config.teams.length;

    if (nextRotationIndex >= totalTeams) {
      router.replace({
        pathname: '/round-complete',
        params: {
          config: JSON.stringify({
            ...config,
            teams: teams.map(t => ({ id: t.id, name: t.name, score: matchState.scores[t.id] })),
          }),
        },
      });
      return;
    }

    setMatchState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentTeamIndex: nextTeamIndex,
      };
    });
    setTeamRotationIndex(nextRotationIndex);
    setPhase('pick');
    setSelectedWordIndex(null);
    setRevealedWord(null);
    setCoverVisible(true);
    setWords([]);
    setCategoryLocked(false);
    setGotItFeedback(false);
    setTimesUpFeedback(false);
    setLockFireProtection(false);
    setHintUsed(false);
    setHintUrl(null);
    setHintError(false);
    setHintLoading(false);
    fadeAnim.setValue(1);
    gotItOpacityAnim.setValue(0);
    timesUpOpacityAnim.setValue(0);
  };

  const handleCoverTap = () => {
    if (words.length > 0) return;
    const effectiveCategory: CategoryInput =
      category === 'Random' && config?.categoryMode === 'Custom' && config.selectedCategories.length > 0
        ? config.selectedCategories[Math.floor(Math.random() * config.selectedCategories.length)]
        : category;
    const effectiveDifficulty = config?.difficulty ?? 'Mix';
    const newWords = getRandomWords(effectiveCategory, effectiveDifficulty, 8);
    setWords(newWords);
    setCategoryLocked(true);

    if (config?.hintsEnabled) {
      abortAllFetches();
      prefetchHintImages(newWords);
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setCoverVisible(false));
  };

  const handleWordSelect = (index: number) => {
    setSelectedWordIndex(index);
  };

  const handleLockWord = () => {
    if (selectedWordIndex === null || lockFireProtection) return;
    setLockFireProtection(true);
    const word = words[selectedWordIndex];
    setRevealedWord(word);
    setPhase('pass');
  };

  const handleRevealTap = () => {
    if (!revealedWord || phase !== 'pass') return;
    startTimer(timerSeconds);
    setPhase('draw');
  };

  const handleHintTap = () => {
    if (!revealedWord || hintUsed) return;

    setHintUsed(true);
    setHintLoading(true);
    setHintError(false);

    const cached = getCachedHint(revealedWord);
    if (cached) {
      setHintUrl(cached);
      setHintLoading(false);
      return;
    }

    if (isHintCached(revealedWord)) {
      setHintError(true);
      setHintLoading(false);
      return;
    }

    const controller = new AbortController();
    hintAbortControllerRef.current = controller;

    let pollCount = 0;
    const maxPolls = 5;

    const pollForHint = () => {
      const cachedNow = getCachedHint(revealedWord);
      if (cachedNow) {
        setHintUrl(cachedNow);
        setHintLoading(false);
        if (hintPollingRef.current) {
          clearInterval(hintPollingRef.current);
          hintPollingRef.current = null;
        }
        return;
      }

      if (pollCount >= maxPolls) {
        setHintError(true);
        setHintLoading(false);
        if (hintPollingRef.current) {
          clearInterval(hintPollingRef.current);
          hintPollingRef.current = null;
        }
        return;
      }

      pollCount++;
    };

    hintPollingRef.current = setInterval(pollForHint, 500);

    setTimeout(() => {
      if (hintLoading && !hintUrl && !hintError) {
        setHintError(true);
        setHintLoading(false);
        if (hintPollingRef.current) {
          clearInterval(hintPollingRef.current);
          hintPollingRef.current = null;
        }
      }
    }, 2500);
  };

  const handleGotIt = () => {
    if (!matchState || !config) return;
    const teamId = config.teams[matchState.currentTeamIndex].id;
    const teamName = config.teams[matchState.currentTeamIndex].name;
    const newScores = { ...matchState.scores };
    newScores[teamId] = (newScores[teamId] || 0) + 1;
    setTeams(prev =>
      prev.map(t => (t.id === teamId ? { ...t, score: newScores[teamId] } : t))
    );
    setMatchState(prev => prev ? { ...prev, scores: newScores } : prev);
    setGotItFeedback(true);
    Animated.sequence([
      Animated.parallel([
        Animated.spring(gotItScaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
        Animated.timing(gotItOpacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]),
      Animated.delay(1200),
      Animated.timing(gotItOpacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setGotItFeedback(false);
      gotItScaleAnim.setValue(0);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setTimerRunning(false);
      advanceToNextTeam();
    });
  };

  const handleContinue = () => {
    setShowPauseOverlay(false);
    if (phase === 'draw' && timerSeconds > 0) {
      startTimer(timerSeconds);
    }
  };

  const handleQuitGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (!matchState || !config) {
      router.replace('/');
      return;
    }
    const scores = matchState.scores;
    let leaderId = config.teams[0].id;
    let leaderScore = scores[leaderId] || 0;
    config.teams.forEach(t => {
      if ((scores[t.id] || 0) > leaderScore) {
        leaderScore = scores[t.id] || 0;
        leaderId = t.id;
      }
    });
    const leader = teams.find(t => t.id === leaderId) || teams[0];
    router.replace({
      pathname: '/winner',
      params: {
        config: JSON.stringify({
          ...config,
          teams: teams.map(t => ({ id: t.id, name: t.name, score: scores[t.id] || 0 })),
        }),
      },
    });
  };

  const handleQuitConfirm = () => {
    if (!matchState || !config) {
      router.replace('/');
      return;
    }
    const scores = matchState.scores;
    router.replace({
      pathname: '/winner',
      params: {
        config: JSON.stringify({
          ...config,
          teams: teams.map(t => ({ id: t.id, name: t.name, score: scores[t.id] || 0 })),
        }),
      },
    });
  };

  const handleQuitCancel = () => {
  };

  if (!config || teams.length === 0 || !matchState) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentTeam = config.teams[matchState.currentTeamIndex];
  const currentTeamColor = getTeamColor(matchState.currentTeamIndex);
  const drawingTeamIndex = matchState.currentTeamIndex;
  const drawingTeam = config.teams[drawingTeamIndex];
  const drawingTeamColor = getTeamColor(drawingTeamIndex);

  const timerProgress = timerSeconds / config.timerSeconds;
  const isRedZone = timerProgress <= 1 / 3 && timerRunning;

  const getCategoryDropdownDisabled = () => {
    return categoryLocked || config?.categoryMode === 'Random';
  };

  const getRandomCategoryForAll = () => {
    if (config?.categoryMode === 'All' || config?.categoryMode === 'Custom') {
      const cats = config?.categoryMode === 'All' ? CATEGORIES : config.selectedCategories;
      if (cats.length === 0) return 'Animals' as Category;
      return cats[Math.floor(Math.random() * cats.length)];
    }
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowPauseOverlay(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pictionary</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.scoreboard}>
        {config.teams.length <= 2 ? (
          <View style={styles.scoreboardRow}>
            {config.teams.map((team, idx) => {
              const tc = getTeamColor(idx);
              const isDrawing = idx === drawingTeamIndex;
              return (
                <View
                  key={team.id}
                  style={[
                    styles.teamCard,
                    {
                      backgroundColor: PASTEL_TINTS[tc],
                      borderLeftWidth: isDrawing ? 4 : 0,
                      borderLeftColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={[styles.teamName, { color: colors.text }]} numberOfLines={1}>
                    {team.name}
                  </Text>
                  <Text style={[styles.teamScore, { color: colors.text }]}>
                    {matchState.scores[team.id] || 0}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.scoreboardGrid}>
            {config.teams.map((team, idx) => {
              const tc = getTeamColor(idx);
              const isDrawing = idx === drawingTeamIndex;
              return (
                <View
                  key={team.id}
                  style={[
                    styles.teamCard,
                    {
                      backgroundColor: PASTEL_TINTS[tc],
                      borderLeftWidth: isDrawing ? 4 : 0,
                      borderLeftColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={[styles.teamName, { color: colors.text }]} numberOfLines={1}>
                    {team.name}
                  </Text>
                  <Text style={[styles.teamScore, { color: colors.text }]}>
                    {matchState.scores[team.id] || 0}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {phase === 'pick' && (
        <View style={styles.pickPhase}>
          <View style={styles.instructionRow}>
            <Text style={styles.pickingTeamLabel}>
              <Text style={styles.teamNameHighlight}>{currentTeam.name}</Text> is picking
            </Text>
          </View>

          {config.categoryMode !== 'Random' && (
            <View style={styles.categoryDropdownContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryDropdown,
                  getCategoryDropdownDisabled() && styles.categoryDropdownDisabled,
                ]}
                disabled={getCategoryDropdownDisabled()}
                onPress={() => {
                  if (!categoryLocked && config.categoryMode !== 'Random') {
                    const cats = config.categoryMode === 'All' ? CATEGORIES : config.selectedCategories;
                    const randomCat = cats[Math.floor(Math.random() * cats.length)];
                    setCategory(randomCat);
                  }
                }}
              >
                <Text style={styles.categoryDropdownText}>
                  {category === 'Random'
                    ? '🎲 Random'
                    : `${CATEGORY_EMOJI[category as Category]} ${category}`}
                </Text>
                {!getCategoryDropdownDisabled() && (
                  <Text style={styles.categoryDropdownHint}>Tap to change</Text>
                )}
                {getCategoryDropdownDisabled() && (
                  <Text style={styles.categoryDropdownHint}>Locked</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.wordGridLabel}>Choose a word:</Text>

          <View style={styles.wordGridContainer}>
            {words.length === 0 ? (
              <Animated.View style={[styles.coverCard, { opacity: fadeAnim }]}>
                <TouchableOpacity style={styles.coverCardTouchable} onPress={handleCoverTap}>
                  <Text style={styles.coverCardText}>Tap to reveal words</Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <View style={styles.wordGrid}>
                {words.map((word, idx) => {
                  const isSelected = selectedWordIndex === idx;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.wordCard,
                        isSelected && styles.wordCardSelected,
                      ]}
                      onPress={() => handleWordSelect(idx)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.wordCardText,
                          isSelected && styles.wordCardTextSelected,
                        ]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        {word}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {selectedWordIndex !== null && words.length > 0 && (
            <TouchableOpacity
              style={[styles.lockButton, lockFireProtection && styles.lockButtonDisabled]}
              onPress={handleLockWord}
              disabled={lockFireProtection}
            >
              <Text style={styles.lockButtonText}>Lock Word</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {phase === 'pass' && (
        <View style={styles.passPhase}>
          <View style={styles.timerPlaceholder} />
          <TouchableOpacity
            style={styles.revealCard}
            onPress={handleRevealTap}
            activeOpacity={0.8}
          >
            <Text style={styles.revealCardText}>Tap to reveal word</Text>
          </TouchableOpacity>
        </View>
      )}

      {phase === 'draw' && (
        <View style={styles.drawPhase}>
          <View style={styles.timerSection}>
            <Text
              style={[
                styles.timerSeconds,
                isRedZone && styles.timerSecondsRed,
              ]}
            >
              {timerSeconds}s
            </Text>
            <View style={styles.timerBarContainer}>
              <View
                style={[
                  styles.timerBar,
                  { width: `${timerProgress * 100}%` },
                  isRedZone && styles.timerBarRed,
                  isRedZone && styles.timerBarThick,
                ]}
              />
            </View>
            {isRedZone && (
              <Text style={styles.hurryLabel}>HURRY!</Text>
            )}
          </View>

          <View style={styles.wordRevealContainer}>
            <View style={styles.wordRevealCard}>
              <Text style={styles.wordRevealText} numberOfLines={1} adjustsFontSizeToFit>
                {revealedWord}
              </Text>
            </View>
          </View>

          {(hintUrl || hintLoading) && !hintError && (
            <View style={styles.hintImageContainer}>
              {hintLoading ? (
                <View style={styles.hintLoadingContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                <Image
                  source={{ uri: hintUrl ?? undefined }}
                  style={styles.hintImage}
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          {hintError && revealedWord && (
            <View style={styles.hintImageContainer}>
              <Text style={styles.hintEmojiText}>{getEmojiFallback(revealedWord)}</Text>
            </View>
          )}

          {config?.hintsEnabled && revealedWord && !hintUsed && !isRedZone && (
            <TouchableOpacity
              style={styles.hintButton}
              onPress={handleHintTap}
              activeOpacity={0.8}
            >
              <Text style={styles.hintButtonText}>Show Hint</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.gotItButton}
            onPress={handleGotIt}
            activeOpacity={0.8}
          >
            <Text style={styles.gotItButtonText}>Got It</Text>
            <Text style={styles.gotItIcon}>✓</Text>
          </TouchableOpacity>

          {gotItFeedback && (
            <Animated.View
              style={[
                styles.feedbackBadge,
                {
                  opacity: gotItOpacityAnim,
                  transform: [{ scale: gotItScaleAnim }],
                },
              ]}
            >
              <Text style={styles.feedbackText}>+1 {drawingTeam?.name}</Text>
            </Animated.View>
          )}

          {timesUpFeedback && (
            <Animated.View
              style={[
                styles.timesUpBadge,
                {
                  opacity: timesUpOpacityAnim,
                  transform: [{ scale: timesUpScaleAnim }],
                },
              ]}
            >
              <Text style={styles.timesUpText}>Time's Up!</Text>
            </Animated.View>
          )}
        </View>
      )}

      <Modal visible={showPauseOverlay} animationType="fade" transparent>
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseCard}>
            <Text style={styles.pauseTitle}>Paused</Text>
            {timerRunning && phase === 'draw' && (
              <Text style={styles.pauseTimer}>Timer: {timerSeconds}s</Text>
            )}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => setShowQuitConfirm(true)}
            >
              <Text style={styles.quitButtonText}>Quit Game</Text>
            </TouchableOpacity>
            <Modal visible={showQuitConfirm} transparent animationType="fade">
              <View style={styles.confirmOverlay}>
                <View style={styles.confirmCard}>
                  <Text style={styles.confirmTitle}>Quit Game?</Text>
                  <Text style={styles.confirmMessage}>
                    Are you sure you want to quit? Current scores will be lost.
                  </Text>
                  <View style={styles.confirmButtons}>
                    <TouchableOpacity
                      style={styles.confirmCancel}
                      onPress={() => setShowQuitConfirm(false)}
                    >
                      <Text style={styles.confirmCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmQuit}
                      onPress={handleQuitGame}
                    >
                      <Text style={styles.confirmQuitText}>Quit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

import { Modal } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.mutedGray,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  scoreboard: {
    paddingHorizontal: CARD_MARGIN,
    marginBottom: 16,
  },
  scoreboardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  teamCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 140,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
  },
  teamScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  pickPhase: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
  },
  instructionRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  pickingTeamLabel: {
    fontSize: 16,
    color: colors.mutedGray,
  },
  teamNameHighlight: {
    fontWeight: 'bold',
    color: colors.text,
  },
  categoryDropdownContainer: {
    marginBottom: 12,
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  categoryDropdownDisabled: {
    opacity: 0.6,
    borderColor: '#CCCCCC',
  },
  categoryDropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  categoryDropdownHint: {
    fontSize: 12,
    color: colors.mutedGray,
    marginLeft: 8,
  },
  wordGridLabel: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  wordGridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  coverCard: {
    width: WORD_CARD_WIDTH * 2 + 24,
    height: WORD_CARD_HEIGHT * 4 + 36,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  coverCardTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverCardText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  wordCard: {
    width: WORD_CARD_WIDTH,
    height: WORD_CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  wordCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
    transform: [{ scale: 1.05 }],
  },
  wordCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  wordCardTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  lockButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  lockButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  passPhase: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: CARD_MARGIN,
  },
  timerPlaceholder: {
    height: 60,
  },
  revealCard: {
    flex: 1,
    width: SCREEN_WIDTH - CARD_MARGIN * 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 16,
  },
  revealCardText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.mutedGray,
    textAlign: 'center',
  },
  drawPhase: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: CARD_MARGIN,
  },
  timerSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  timerSeconds: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  timerSecondsRed: {
    color: colors.feedback.incorrect,
  },
  timerBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  timerBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  timerBarRed: {
    backgroundColor: colors.feedback.incorrect,
  },
  timerBarThick: {
    height: 18,
    marginTop: -3,
  },
  hurryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.feedback.incorrect,
    marginTop: 4,
  },
  wordRevealContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  wordRevealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  wordRevealText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  gotItButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.feedback.correct,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 32,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gotItButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gotItIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  feedbackBadge: {
    position: 'absolute',
    top: '40%',
    backgroundColor: colors.feedback.correct,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timesUpBadge: {
    position: 'absolute',
    top: '40%',
    backgroundColor: colors.feedback.incorrect,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  timesUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pauseOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseCard: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 32,
    width: SCREEN_WIDTH - 64,
    alignItems: 'center',
  },
  pauseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  pauseTimer: {
    fontSize: 18,
    color: colors.mutedGray,
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  quitButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  quitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.mutedGray,
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    width: 280,
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  confirmMessage: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  confirmCancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  confirmQuit: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.feedback.incorrect,
    alignItems: 'center',
  },
  confirmQuitText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  hintButton: {
    backgroundColor: '#E6E0FA',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#B8A8E8',
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B5DC8',
  },
  hintImageContainer: {
    width: 220,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  hintLoadingContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  hintImage: {
    width: '100%',
    height: '100%',
  },
  hintEmojiText: {
    fontSize: 96,
    textAlign: 'center',
  },
});