import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ShadowStyleIOS, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  icon?: string;
};

export function PrimaryButton({ title, onPress, icon }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonRow}>
        {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
        <Text style={styles.primaryButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

type SecondaryButtonProps = {
  label: string;
  icon?: string;
  onPress: () => void;
};

export function SecondaryButton({ label, icon, onPress }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonRow}>
        {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
        <Text style={styles.secondaryButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

type BackArrowProps = {
  onPress: () => void;
};

export function BackArrow({ onPress }: BackArrowProps) {
  return (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="arrow-back" size={26} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle & ShadowStyleIOS,
  primaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  } as TextStyle,
  secondaryButton: {
    backgroundColor: colors.background,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  } as ViewStyle & ShadowStyleIOS,
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  } as TextStyle,
  buttonIcon: {
    fontSize: 16,
    marginRight: 8,
  } as TextStyle,
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  backArrow: {
    padding: 8,
  } as ViewStyle,
});
