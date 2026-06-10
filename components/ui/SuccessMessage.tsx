import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SuccessMessageProps {
  message: string;
  containerStyle?: ViewStyle;
}

const COLORS = {
  success: '#10B981',
  successBg: '#ECFDF5',
  successBorder: '#D1FAE5',
  text: '#065F46',
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={20} color={COLORS.success} style={styles.icon} />
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.successBg,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
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
});

export default SuccessMessage;

