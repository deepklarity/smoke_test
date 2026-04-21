import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '../utils/theme';
import { resetMatchState } from '../utils/hints';

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

interface Team {
  id: number;
  name: string;
  score: number;
}

interface GameConfig {
  teams: Team[];
  categoryMode: string;
  selectedCategories: string[];
  difficulty: string;
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
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].score === sorted[i - 1].score) {
      ranked.push({ ...sorted[i], rank: ranked[i - 1].rank, teamColor: getTeamColor(i) });
    } else {
      ranked.push({ ...sorted[i], rank: i + 1, teamColor: getTeamColor(i) });
    }
  }
  return ranked;
}

export default function WinnerScreen() {
  const params = useLocalSearchParams();
  const configStr = params.config as string;
  const roundsPlayed = params.rounds ? parseInt(params.rounds as string, 10) : 1;
  const quitEarly = params.quit === 'true';

  const config: GameConfig = configStr ? JSON.parse(configStr) : null;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => backHandler.remove();
  }, []);

  if (!config) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>No game data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rankedTeams = computeRankings(config.teams);
  const topScore = rankedTeams.length > 0 ? rankedTeams[0].score : 0;
  const winners = rankedTeams.filter(t => t.score === topScore);
  const isDraw = winners.length > 1;

  const winnerColor = isDraw ? 'cream' : winners[0].teamColor;
  const backgroundColor = winnerColor === 'cream'
    ? colors.background
    : PASTEL_TINTS[winnerColor] + '40';

  const trophyEmoji = isDraw ? '🤝' : '🏆';
  const titleText = isDraw ? 'Match Draw' : 'Congratulations!';
  const winnerName = isDraw ? winners.map(w => w.name).join(' & ') : winners[0].name;
  const winnerTextColor = isDraw ? colors.text : TEAM_COLORS_CSS[winners[0].teamColor];

  const MEDAL_EMOJI: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

  const handleRematch = () => {
    resetMatchState();
    const rematchConfig: GameConfig = {
      ...config,
      teams: config.teams.map(t => ({ ...t, score: 0 })),
    };
    router.replace({
      pathname: '/setup',
      params: { config: JSON.stringify(rematchConfig) },
    });
  };

  const handleHome = () => {
    resetMatchState();
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Game Over</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.trophyEmoji}>{trophyEmoji}</Text>

        <Text style={styles.title}>{titleText}</Text>

        {!isDraw && (
          <Text style={[styles.winnerName, { color: winnerTextColor }]}>
            {winnerName}
          </Text>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Rounds Played: {roundsPlayed}</Text>
          </View>
          {quitEarly && (
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.quitText]}>Game ended early</Text>
            </View>
          )}
        </View>

        <View style={styles.leaderboardCard}>
          <Text style={styles.sectionTitle}>Final Standings</Text>
          {rankedTeams.map((team) => {
            const isWinner = winners.some(w => w.id === team.id);
            return (
              <View
                key={team.id}
                style={[
                  styles.leaderRow,
                  { backgroundColor: PASTEL_TINTS[team.teamColor] + '60' },
                  isWinner && styles.leaderRowWinner,
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
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.rematchButton} onPress={handleRematch}>
          <Text style={styles.rematchButtonText}>Rematch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
          <Text style={styles.homeButtonText}>Return Home</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.mutedGray,
  },
  trophyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  statsRow: {
    marginBottom: 24,
    alignItems: 'center',
  },
  statItem: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: colors.mutedGray,
    fontWeight: '500',
  },
  quitText: {
    color: '#FFB74D',
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
    width: '100%',
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
  leaderRowWinner: {
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
  footer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 10,
  },
  rematchButton: {
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
  rematchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  homeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
});