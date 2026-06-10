import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
  subtitle?: string;
}

const COLORS = {
  primary: '#2563EB',
  white: '#FFFFFF',
  text: '#1F2937',
  background: '#F8FAFC',
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  rightIcon,
  onRightPress,
  containerStyle,
  subtitle,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.rightContainer}>
          {rightIcon && onRightPress && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.rightButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name={rightIcon as any} size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftContainer: {
    flex: 0.2,
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  backButton: {
    paddingHorizontal: 8,
  },
  rightButton: {
    paddingHorizontal: 8,
  },
});

export default Header;

