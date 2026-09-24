import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '@/theme';

export function InterestChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Text
      onPress={onPress}
      style={[styles.chip, selected && styles.selectedChip]}
    >
      {selected ? '✓  ' : ''}
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 10,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 18,
  },
  selectedChip: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
    color: '#ffffff',
  },
});
