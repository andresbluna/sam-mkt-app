import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearch?: (text: string) => void;
  rightAction?: () => void;
  rightIcon?: string;
  showLogo?: boolean;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showSearch = false,
  onSearch,
  rightAction,
  rightIcon,
  showLogo = false,
  style,
}) => {
  const { theme } = useTheme();
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  return (
    <SafeAreaView
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}>
      <View
        style={[
          styles.container,
          { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm },
        ]}>
        {/* Left: Logo o nada */}
        <View style={styles.left}>
          {showLogo && (
            <Text
              style={[
                theme.typography.h4,
                { color: theme.colors.primary, fontWeight: '700' },
              ]}>
              Sam.
            </Text>
          )}
        </View>

        {/* Center: Titulo o Search */}
        <View style={styles.center}>
          {searchActive && showSearch ? (
            <View
              style={[
                styles.searchContainer,
                { backgroundColor: theme.colors.surface },
              ]}>
              <Ionicons
                name="search"
                size={18}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={[
                  styles.searchInput,
                  { color: theme.colors.text },
                ]}
                placeholder="Buscar..."
                placeholderTextColor={theme.colors.textTertiary}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  onSearch?.(text);
                }}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchActive(false)}>
                <Ionicons name="close" size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ) : title ? (
            <Text
              style={[
                theme.typography.h4,
                { color: theme.colors.text, fontWeight: '600' },
              ]}>
              {title}
            </Text>
          ) : null}
        </View>

        {/* Right: Actions */}
        <View style={styles.right}>
          {showSearch && !searchActive && (
            <TouchableOpacity onPress={() => setSearchActive(true)}>
              <Ionicons name="search" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          )}

          {rightIcon && rightAction && (
            <TouchableOpacity onPress={rightAction} style={{ marginLeft: 12 }}>
              <Ionicons name={rightIcon as any} size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  left: {
    width: 40,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    marginHorizontal: 12,
  },
  right: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
});

