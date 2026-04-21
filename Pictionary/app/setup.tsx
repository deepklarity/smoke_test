import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Keyboard,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import { colors } from '../utils/theme';
import { BackArrow } from '../utils/components';
import { CATEGORIES, CATEGORY_EMOJI, Category } from '../utils/words';

type TeamColor = 'red' | 'orange' | 'purple' | 'green';

const TEAM_COLORS: TeamColor[] = ['red', 'orange', 'purple', 'green'];

const PASTEL_TINTS: Record<TeamColor, string> = {
  red: '#FFB3BA',
  orange: '#FFD19A',
  purple: '#D4B3FF',
  green: '#B3FFBA',
};

type CategoryMode = 'Random' | 'All' | 'Custom';
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mix';

interface GameConfig {
  teams: { id: number; name: string }[];
  categoryMode: CategoryMode;
  selectedCategories: Category[];
  difficulty: Difficulty;
  winningScore: number;
  hintsEnabled: boolean;
  timerEnabled: boolean;
  timerSeconds: number;
}

const DEFAULT_CONFIG: GameConfig = {
  teams: [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
  ],
  categoryMode: 'Random',
  selectedCategories: [],
  difficulty: 'Mix',
  winningScore: 10,
  hintsEnabled: true,
  timerEnabled: true,
  timerSeconds: 60,
};

export default function SetupScreen() {
  const params = useLocalSearchParams();
  const initialConfig = params.config ? JSON.parse(params.config as string) : null;

  const [config, setConfig] = useState<GameConfig>(initialConfig || DEFAULT_CONFIG);
  const [focusedTeamId, setFocusedTeamId] = useState<number | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [tempCategories, setTempCategories] = useState<Category[]>([]);
  const [tempScore, setTempScore] = useState(config.winningScore);
  const [tempHints, setTempHints] = useState(config.hintsEnabled);
  const [tempTimer, setTempTimer] = useState(config.timerEnabled);
  const [tempTimerSeconds, setTempTimerSeconds] = useState(config.timerSeconds);

  const teamInputRefs = useRef<{ [key: number]: TextInput | null }>({});

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setFocusedTeamId(null);
    });
    return () => keyboardHideListener.remove();
  }, []);

  const getNextTeamNumber = () => {
    const usedNumbers = config.teams.map(t => {
      const match = t.name.match(/^Team (\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
    let num = 1;
    while (usedNumbers.includes(num)) num++;
    return num;
  };

  const addTeam = () => {
    if (config.teams.length >= 4) return;
    const nextNum = getNextTeamNumber();
    setConfig(prev => ({
      ...prev,
      teams: [...prev.teams, { id: Date.now(), name: `Team ${nextNum}` }],
    }));
  };

  const removeTeam = (id: number) => {
    if (config.teams.length <= 2) return;
    setConfig(prev => ({
      ...prev,
      teams: prev.teams.filter(t => t.id !== id),
    }));
  };

  const updateTeamName = (id: number, name: string) => {
    setConfig(prev => ({
      ...prev,
      teams: prev.teams.map(t => (t.id === id ? { ...t, name } : t)),
    }));
  };

  const hasInvalidTeamNames = () => {
    const names = config.teams.map(t => t.name.trim());
    return names.some(n => n === '') || new Set(names).size !== names.length;
  };

  const openCustomPicker = () => {
    setTempCategories([...config.selectedCategories]);
    setShowCategoryModal(true);
  };

  const toggleCategory = (category: Category) => {
    setTempCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const confirmCategories = () => {
    setConfig(prev => ({
      ...prev,
      selectedCategories: tempCategories,
      categoryMode: 'Custom',
    }));
    setShowCategoryModal(false);
  };

  const discardCategories = () => {
    setConfig(prev => ({
      ...prev,
      selectedCategories: [],
      categoryMode: 'Random',
    }));
    setShowCategoryModal(false);
    setTempCategories([]);
  };

  const openRulesModal = () => {
    setTempScore(config.winningScore);
    setTempHints(config.hintsEnabled);
    setTempTimer(config.timerEnabled);
    setTempTimerSeconds(config.timerSeconds);
    setShowRulesModal(true);
  };

  const confirmRules = () => {
    setConfig(prev => ({
      ...prev,
      winningScore: tempScore,
      hintsEnabled: tempHints,
      timerEnabled: tempTimer,
      timerSeconds: tempTimerSeconds,
    }));
    setShowRulesModal(false);
  };

  const startGame = () => {
    const fullConfig = { ...config };
    router.push({
      pathname: '/gameplay',
      params: { config: JSON.stringify(fullConfig) },
    });
  };

  const teamColorMap: Record<number, TeamColor> = {};
  config.teams.forEach((team, index) => {
    teamColorMap[team.id] = TEAM_COLORS[index % TEAM_COLORS.length];
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackArrow onPress={() => router.back()} />
        <Text style={styles.title}>Game Setup</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teams</Text>
          <View style={styles.card}>
            {config.teams.map((team, index) => {
              const teamColor = teamColorMap[team.id];
              const tint = PASTEL_TINTS[teamColor];
              return (
                <View
                  key={team.id}
                  style={[styles.teamRow, { backgroundColor: tint + '40' }]}
                >
                  <TouchableOpacity
                    onPress={() => teamInputRefs.current[team.id]?.focus()}
                    style={styles.teamPencil}
                  >
                    <Text style={styles.pencilIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TextInput
                    ref={ref => { teamInputRefs.current[team.id] = ref; }}
                    style={styles.teamInput}
                    value={team.name}
                    onChangeText={text => updateTeamName(team.id, text)}
                    onFocus={() => setFocusedTeamId(team.id)}
                    onBlur={() => setFocusedTeamId(null)}
                  />
                  {config.teams.length > 2 && (
                    <TouchableOpacity
                      onPress={() => removeTeam(team.id)}
                      style={styles.trashButton}
                    >
                      <Text style={styles.trashIcon}>🗑️</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
            {config.teams.length < 4 && (
              <TouchableOpacity style={styles.addTeamButton} onPress={addTeam}>
                <Text style={styles.addTeamText}>+ Add Team</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Mode</Text>
          <View style={styles.categoryTilesRow}>
            {(['Random', 'All', 'Custom'] as CategoryMode[]).map(mode => {
              const isSelected = config.categoryMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.categoryTile,
                    isSelected && styles.categoryTileSelected,
                  ]}
                  onPress={() => {
                    if (mode === 'Custom') {
                      openCustomPicker();
                    } else {
                      setConfig(prev => ({
                        ...prev,
                        categoryMode: mode,
                        selectedCategories: [],
                      }));
                    }
                  }}
                >
                  <Text style={styles.categoryTileEmoji}>
                    {mode === 'Random' ? '🎲' : mode === 'All' ? '📋' : '🎯'}
                  </Text>
                  <Text style={styles.categoryTileLabel}>{mode}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {config.categoryMode === 'Custom' && (
            <View style={styles.chipsContainer}>
              {config.selectedCategories.map(cat => (
                <View key={cat} style={styles.chip}>
                  <Text style={styles.chipText}>
                    {CATEGORY_EMOJI[cat]} {cat}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Word Difficulty</Text>
          <View style={styles.pillsRow}>
            {(['Easy', 'Medium', 'Hard', 'Mix'] as Difficulty[]).map(diff => {
              const isSelected = config.difficulty === diff;
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
                  style={[
                    styles.pill,
                    { backgroundColor: bgColor },
                    isSelected && diff !== 'Mix' && { borderColor: diff === 'Easy' ? colors.difficulty.easy : diff === 'Medium' ? colors.difficulty.medium : colors.difficulty.hard, borderWidth: 2 },
                  ]}
                  onPress={() => setConfig(prev => ({ ...prev, difficulty: diff }))}
                >
                  <Text style={[styles.pillText, isSelected && { fontWeight: '600' }]}>{diff}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Rules</Text>
          <TouchableOpacity style={styles.rulesCard} onPress={openRulesModal}>
            <View style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>Winning Score</Text>
              <Text style={styles.ruleValue}>{config.winningScore}</Text>
            </View>
            <View style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>Hints</Text>
              <Text style={styles.ruleValue}>{config.hintsEnabled ? 'On' : 'Off'}</Text>
            </View>
            <View style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>Timer</Text>
              <Text style={styles.ruleValue}>
                {config.timerEnabled ? `${config.timerSeconds}s` : 'Off'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.startButton, hasInvalidTeamNames() && styles.startButtonDisabled]}
          onPress={startGame}
          disabled={hasInvalidTeamNames()}
        >
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Categories</Text>
              <TouchableOpacity onPress={discardCategories}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat, index) => {
                const isSelected = tempCategories.includes(cat);
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryGridItem,
                      isSelected && styles.categoryGridItemSelected,
                    ]}
                    onPress={() => toggleCategory(cat)}
                  >
                    <Text style={styles.categoryGridEmoji}>{CATEGORY_EMOJI[cat]}</Text>
                    <Text style={styles.categoryGridLabel}>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={[
                styles.doneButton,
                tempCategories.length === 0 && styles.doneButtonDisabled,
              ]}
              onPress={confirmCategories}
              disabled={tempCategories.length === 0}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
              <Text style={styles.ruleEditorLabel}>Winning Score: {tempScore}</Text>
              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setTempScore(prev => Math.max(1, prev - 1))}
                >
                  <Text style={styles.stepperButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{tempScore}</Text>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setTempScore(prev => Math.min(100, prev + 1))}
                >
                  <Text style={styles.stepperButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ruleEditorSection}>
              <View style={styles.ruleEditorRow}>
                <Text style={styles.ruleEditorLabel}>Hints</Text>
                <Switch
                  value={tempHints}
                  onValueChange={setTempHints}
                />
              </View>
            </View>

            <View style={styles.ruleEditorSection}>
              <View style={styles.ruleEditorRow}>
                <Text style={styles.ruleEditorLabel}>Timer</Text>
                <Switch
                  value={tempTimer}
                  onValueChange={setTempTimer}
                />
              </View>
              {tempTimer && (
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

            <TouchableOpacity style={styles.doneButton} onPress={confirmRules}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Switch({ value, onValueChange }: { value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <TouchableOpacity
      style={[styles.switch, value && styles.switchOn]}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.switchThumb, value && styles.switchThumbOn]} />
    </TouchableOpacity>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  teamPencil: {
    padding: 4,
  },
  pencilIcon: {
    fontSize: 16,
  },
  teamInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
  },
  trashButton: {
    padding: 4,
  },
  trashIcon: {
    fontSize: 16,
  },
  addTeamButton: {
    padding: 12,
    alignItems: 'center',
  },
  addTeamText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  categoryTilesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryTile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTileSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  categoryTileEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  categoryTileLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    backgroundColor: colors.primary + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
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
  rulesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
    fontSize: 16,
    color: colors.text,
  },
  ruleValue: {
    fontSize: 16,
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
  },
  startButton: {
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
  startButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 20,
  },
  categoryGridItem: {
    width: (SCREEN_WIDTH - 72) / 3,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  categoryGridItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  categoryGridEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryGridLabel: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
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
});