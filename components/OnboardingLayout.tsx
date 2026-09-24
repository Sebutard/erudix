import { type ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme';

export function OnboardingLayout({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 28,
    backgroundColor: colors.background,
  },
  step: {
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
    marginTop: 12,
    marginBottom: 28,
  },
});
