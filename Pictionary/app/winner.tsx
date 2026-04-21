import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../utils/theme';
import { BackArrow } from '../utils/components';

export default function WinnerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackArrow onPress={() => router.back()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Winner Screen</Text>
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
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
});
