import { View, Text, StyleSheet } from 'react-native';
import { InterestChip } from '@/components/InterestChip';

export function DurationSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <View>
      <Text style={styles.label}>J’ai :</Text>
      <View style={styles.row}>
        {[5, 10, 15, 20, 30].map((n) => (
          <InterestChip key={n} label={`${n} min`} selected={value === n} onPress={() => onChange(n)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1E2421',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
