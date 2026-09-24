import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme';

export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}  →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
