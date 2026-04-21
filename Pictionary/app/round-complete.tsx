import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  BackHandler,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import { colors } from '../utils/theme';
import { BackArrow } from '../utils/components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TeamColor = 'red' | 'orange' | 'purple' | 'green';

const TEAM_COLORS: TeamColor[] = ['red', 'orange', 'purple', 'green'];
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
  teams: Team[];
  categoryMode: CategoryMode;
  selectedCategories: string[];
  difficulty: Difficulty;
  winningScore: number;
  hintsEnabled: boolean;
  timerEnabled: boolean;
  timerSeconds: number;
}

function getTeamColor(teamIndex: number): TeamColor {
  return TEAM_COLORS[teamIndex % TEAM_COLORS.length];
}

interface RankedTeam extends Team {
  rank: number;
  teamColor: TeamColor;
}

function computeRankings(teams: Team[]): RankedTeam[] {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const ranked: RankedTeam[] = [];
  let currentRank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].score === sorted[i - 1].score) {
      ranked.push({ ...sorted[i], rank: ranked[i - 1].rank, teamColor: getTeamColor(i) });
    } else {
      ranked.push({ ...sorted[i], rank: currentRank, teamColor: getTeamColor(i) });
    }
    currentRank++;
  }
  return ranked;
}

export default function RoundCompleteScreen() {
  const params = useLocalSearchParams();
  const configStr = params.config as string;
  const incomingRound = params.round ? parseInt(params.round as string, 10) : 1;

  const config: GameConfig = configStr ? JSON.parse(configStr) : null;
  const [currentRound, setCurrentRound] = useState(incomingRound);
  const [showPauseOverlay, setShowPauseOverlay] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [tempWinningScore, setTempWinningScore] = useState(config?.winningScore ?? 10);
  const [tempDifficulty, setTempDifficulty] = useState<Difficulty>(config?.difficulty ?? 'Mix');
  const [tempTimerEnabled, setTempTimerEnabled] = useState(config?.timerEnabled ?? true);
  const [tempTimerSeconds, setTempTimerSeconds] = useState(config?.timerSeconds ?? 60);
  const [tempHintsEnabled, setTempHintsEnabled] = useState(config?.hintsEnabled ?? true);
  const [winningScoreOverride, setWinningScoreOverride] = useState<number | null>(null);

  const effectiveWinningScore = winningScoreOverride ?? config?.winningScore ?? 10;

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
    if (!config) return;
    const winnerCount = config.teams.filter(t => t.score >= effectiveWinningScore).length;
    if (winnerCount === 1) {
      router.replace({
        pathname: '/winner',
        params: {
          config: JSON.stringify(config),
          rounds: currentRound.toString(),
          quit: 'false',
        },
      });
    }
  }, [config, effectiveWinningScore]);

  if (!config) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackArrow onPress={() => router.replace('/')} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>No game data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rankedTeams = computeRankings(config.teams);
  const topScore = rankedTeams.length > 0 ? rankedTeams[0].score : 0;
  const tiedForFirst = rankedTeams.filter(t => t.score === topScore);
  const winningScoreThreshold = effectiveWinningScore;

  let showTieBreaker = false;
  if (tiedForFirst.length >= 2) {
    const tiedAtOrAboveWinning = tiedForFirst.filter(t => t.score >= winningScoreThreshold);
    if (tiedAtOrAboveWinning.length >= 2) {
      showTieBreaker = true;
    }
  }

  const handleBack = () => {
    setShowPauseOverlay(true);
  };

  const handleContinue = () => {
    setShowPauseOverlay(false);
  };

  const handleNextRound = () => {
    if (showTieBreaker) {
      setWinningScoreOverride(prev => (prev ?? effectiveWinningScore) + 1);
    }
    router.replace({
      pathname: '/gameplay',
      params: {
        config: JSON.stringify(config),
        round: (currentRound + 1).toString(),
      },
    });
  };

  const handleChangeRulesOpen = () => {
    setTempWinningScore(effectiveWinningScore);
    setTempDifficulty(config.difficulty);
    setTempTimerEnabled(config.timerEnabled);
    setTempTimerSeconds(config.timerSeconds);
    setTempHintsEnabled(config.hintsEnabled);
    setShowRulesModal(true);
  };

  const handleChangeRulesConfirm = () => {
    const newWinningScore = Math.max(
      effectiveWinningScore,
      Math.max(...config.teams.map(t => t.score)) + 1
    );
    const updatedConfig: GameConfig = {
      ...config,
      winningScore: tempWinningScore < newWinningScore ? newWinningScore : tempWinningScore,
      difficulty: tempDifficulty,
      timerEnabled: tempTimerEnabled,
      timerSeconds: tempTimerSeconds,
      hintsEnabled: tempHintsEnabled,
    };
    Object.assign(config, updatedConfig);
    setWinningScoreOverride(updatedConfig.winningScore > effectiveWinningScore ? updatedConfig.winningScore : null);
    setShowRulesModal(false);
  };

  const MEDAL_EMOJI: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <BackArrow onPress={handleBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scoreboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.roundLabelContainer}>
          <Text style={styles.roundLabel}>Round {currentRound} Complete</Text>
        </View>

        <View style={styles.leaderboardCard}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          {rankedTeams.map((team, idx) => {
            const isLeader = team.rank === 1;
            return (
              <View
                key={team.id}
                style={[
                  styles.leaderRow,
                  { backgroundColor: PASTEL_TINTS[team.teamColor] + '60' },
                  isLeader && styles.leaderRowGold,
                ]}
              >
                <View style={styles.rankMedal}>
                  {MEDAL_EMOJI[team.rank] ? (
                    <Text style={styles.medalEmoji}>{MEDAL_EMOJI[team.rank]}</Text>
                  ) : (
                    <Text style={styles.rankText}>#{team.rank}</Text>
                  )}
                </View>
                <View
                  style={[
                    styles.teamColorDot,
                    { backgroundColor: TEAM_COLORS_CSS[team.teamColor] },
                  ]}
                />
                <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
                <Text style={styles.teamScore}>{team.score}</Text>
              </View>
            );
          })}
        </View>

        {showTieBreaker && (
          <View style={styles.tieBreakerCard}>
            <Text style={styles.tieBreakerIcon}>⚠️</Text>
            <Text style={styles.tieBreakerText}>
              {tiedForFirst.length} teams tied at the winning score! Winning score increased to {effectiveWinningScore + 1}.
            </Text>
          </View>
        )}

        <View style={styles.rulesCard}>
          <Text style={styles.sectionTitle}>Rules</Text>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleLabel}>Score Target</Text>
            <Text style={styles.ruleValue}>{effectiveWinningScore}</Text>
          </View>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleLabel}>Difficulty</Text>
            <Text style={styles.ruleValue}>{config.difficulty}</Text>
          </View>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleLabel}>Timer</Text>
            <Text style={styles.ruleValue}>
              {config.timerEnabled ? `${config.timerSeconds}s` : 'Off'}
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleLabel}>Hints</Text>
            <Text style={styles.ruleValue}>{config.hintsEnabled ? 'On' : 'Off'}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextRoundButton} onPress={handleNextRound}>
          <Text style={styles.nextRoundButtonText}>Next Round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changeRulesButton} onPress={handleChangeRulesOpen}>
          <Text style={styles.changeRulesButtonText}>Change Rules</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showPauseOverlay} animationType="fade" transparent>
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseCard}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.exitButtonText}>Exit to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showRulesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRulesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Game Rules</Text>
              <TouchableOpacity onPress={() => setShowRulesModal(false)}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ruleEditorSection}>
              <Text style={styles.ruleEditorLabel}>Winning Score: {tempWinningScore}</Text>
              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setTempWinningScore(prev => Math.max(1, prev - 1))}
                >
                  <Text style={styles.stepperButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{tempWinningScore}</Text>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setTempWinningScore(prev => prev + 1)}
                >
                  <Text style={styles.stepperButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ruleEditorSection}>
              <Text style={styles.ruleEditorLabel}>Difficulty</Text>
              <View style={styles.pillsRow}>
                {(['Easy', 'Medium', 'Hard', 'Mix'] as Difficulty[]).map(diff => {
                  const isSelected = tempDifficulty === diff;
                  let bgColor = '#E0E0E0';
                  let textColor = colors.text;
                  if (isSelected) {
                    if (diff === 'Easy') bgColor = colors.difficulty.easy + '40';
                    else if (diff === 'Medium') bgColor = colors.difficulty.medium + '40';
                    else if (diff === 'Hard') bgColor = colors.difficulty.hard + '40';
                    else bgColor = colors.primary;
                  }
                  return (
                    <TouchableOpacity
                      key={diff}
                      style={[styles.pill, { backgroundColor: bgColor }]}
                      onPress={() => setTempDifficulty(diff)}
                    >
                      <Text style={[styles.pillText, isSelected && { fontWeight: '600' }]}>{diff}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.ruleEditorSection}>
              <View style={styles.ruleEditorRow}>
                <Text style={styles.ruleEditorLabel}>Timer</Text>
                <TouchableOpacity
                  style={[styles.switch, tempTimerEnabled && styles.switchOn]}
                  onPress={() => setTempTimerEnabled(!tempTimerEnabled)}
                >
                  <View style={[styles.switchThumb, tempTimerEnabled && styles.switchThumbOn]} />
                </TouchableOpacity>
              </View>
              {tempTimerEnabled && (
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>15s</Text>
                    <Text style={styles.sliderLabel}>300s</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={15}
                    maximumValue={300}
                    step={5}
                    value={tempTimerSeconds}
                    onValueChange={setTempTimerSeconds}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor={colors.primary}
                  />
                  <Text style={styles.sliderValue}>{tempTimerSeconds}s</Text>
                </View>
              )}
            </View>

            <View style={styles.ruleEditorSection}>
              <View style={styles.ruleEditorRow}>
                <Text style={styles.ruleEditorLabel}>Hints</Text>
                <TouchableOpacity
                  style={[styles.switch, tempHintsEnabled && styles.switchOn]}
                  onPress={() => setTempHintsEnabled(!tempHintsEnabled)}
                >
                  <View style={[styles.switchThumb, tempHintsEnabled && styles.switchThumbOn]} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.doneButton} onPress={handleChangeRulesConfirm}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.mutedGray,
  },
  roundLabelContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  roundLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  leaderRowGold: {
    backgroundColor: '#FFF9C4',
    borderLeftColor: '#FFD700',
  },
  rankMedal: {
    width: 32,
    alignItems: 'center',
    marginRight: 8,
  },
  medalEmoji: {
    fontSize: 20,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedGray,
  },
  teamColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  teamScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    minWidth: 40,
    textAlign: 'right',
  },
  tieBreakerCard: {
    backgroundColor: '#FFB74D',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tieBreakerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tieBreakerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  rulesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ruleLabel: {
    fontSize: 15,
    color: colors.mutedGray,
  },
  ruleValue: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 10,
  },
  nextRoundButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextRoundButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  changeRulesButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  changeRulesButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
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
  exitButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.mutedGray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  modalClose: {
    fontSize: 32,
    color: colors.mutedGray,
  },
  ruleEditorSection: {
    marginBottom: 24,
  },
  ruleEditorLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  ruleEditorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  stepperButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  stepperValue: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    minWidth: 60,
    textAlign: 'center',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 14,
    color: colors.text,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    padding: 2,
  },
  switchOn: {
    backgroundColor: colors.primary,
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  sliderContainer: {
    marginTop: 16,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.mutedGray,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});