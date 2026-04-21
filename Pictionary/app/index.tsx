import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../utils/theme';
import { PrimaryButton, SecondaryButton } from '../utils/components';
import { HowToPlayModal } from '../utils/HowToPlayModal';

export default function HomeScreen() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        <Text style={styles.paletteIcon}>🎨</Text>

        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Pictionary
        </Text>

        <View style={styles.underline} />

        <Text style={styles.tagline}>Draw, Guess, Celebrate!</Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Start Game"
            icon="▶"
            onPress={() => router.push('/setup')}
          />

          <View style={styles.buttonSpacer} />

          <SecondaryButton
            label="How to Play"
            icon="📖"
            onPress={() => setShowHowToPlay(true)}
          />
        </View>
      </View>

      <HowToPlayModal
        visible={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  paletteIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    textShadowColor: 'rgba(135, 206, 235, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  underline: {
    width: 120,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: colors.mutedGray,
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacer: {
    height: 16,
  },
});
