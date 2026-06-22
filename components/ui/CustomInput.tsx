import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  icon?: string;
  helper?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  isPassword = false,
  icon,
  helper,
  ...inputProps
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: 12,
          },
          isFocused && {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.background,
            ...theme.shadows.sm,
          },
          error && { borderColor: theme.colors.error },
        ]}>
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={
              error
                ? theme.colors.error
                : isFocused
                ? theme.colors.primary
                : theme.colors.textTertiary
            }
            style={styles.icon}
          />
        )}

        <TextInput
          {...inputProps}
          secureTextEntry={isPassword && !showPassword}
          style={[
            styles.input,
            { color: theme.colors.text },
            icon && styles.inputWithIcon,
          ]}
          placeholderTextColor={theme.colors.textTertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.colors.textTertiary}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
      {helper && !error && (
        <Text style={[styles.helper, { color: theme.colors.textTertiary }]}>
          {helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    fontWeight: '500',
  },
  inputWithIcon: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 0,
  },
  iconRight: {
    marginLeft: 10,
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
  },
  helper: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});

export default CustomInput;

