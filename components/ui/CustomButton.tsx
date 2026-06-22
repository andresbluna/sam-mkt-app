import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getVariantStyles = () => {
    if (disabled) {
      return {
        container: { backgroundColor: theme.colors.disabled, borderWidth: 0 },
        text: { color: theme.colors.textTertiary },
      };
    }

    switch (variant) {
      case 'secondary':
        return {
          container: { backgroundColor: theme.colors.secondary, borderWidth: 0 },
          text: { color: '#FFFFFF' },
        };
      case 'danger':
        return {
          container: { backgroundColor: theme.colors.error, borderWidth: 0 },
          text: { color: '#FFFFFF' },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: theme.colors.primary,
          },
          text: { color: theme.colors.primary },
        };
      case 'ghost':
        return {
          container: { backgroundColor: 'transparent', borderWidth: 0 },
          text: { color: theme.colors.primary },
        };
      default:
        return {
          container: { backgroundColor: theme.colors.primary, borderWidth: 0 },
          text: { color: '#FFFFFF' },
        };
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32, minHeight: 56 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24, minHeight: 48 };
    }
  };

  const variantStyles = getVariantStyles();
  const paddingStyles = getPadding();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        variantStyles.container,
        paddingStyles,
        variant === 'primary' && !disabled && theme.shadows.sm,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} size="small" />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variantStyles.text,
            size === 'large' && { fontSize: 18 },
            size === 'small' && { fontSize: 14 },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default CustomButton;

