import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  pressable?: boolean;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, pressable, onPress }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          ...theme.shadows.md,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Section: React.FC<SectionProps> = ({ title, children, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.section, style]}>
      {title && (
        <Text
          style={[
            theme.typography.h4,
            { color: theme.colors.text, marginBottom: theme.spacing.md },
          ]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

interface ListItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  icon,
  rightElement,
  onPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.listItem,
        {
          paddingVertical: theme.spacing.md,
          borderBottomColor: theme.colors.divider,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.content}>
        <Text
          style={[
            theme.typography.body,
            { color: theme.colors.text, fontWeight: '500' },
          ]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  rightElement: {
    marginLeft: 12,
  },
});

