import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  containerStyle?: ViewStyle;
}

const COLORS = {
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  dangerBorder: '#FECACA',
  text: '#991B1B',
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <Ionicons name="alert-circle" size={20} color={COLORS.danger} style={styles.icon} />
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dangerBg,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    padding: 12,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    marginLeft: 8,
  },
});

export default ErrorMessage;

