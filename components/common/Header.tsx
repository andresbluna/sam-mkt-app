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

import SamLogo from './SamLogo';

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
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}>
      <SafeAreaView>
        <View
          style={[
            styles.container,
            { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm },
          ]}>
          {/* Left: Logo o nada */}
          <View style={styles.left}>
            {/* Logo movido al centro con el título */}
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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {showLogo && <SamLogo size="small" showText={false} containerStyle={{ marginRight: 8 }} />}
                <Text
                  style={[
                    theme.typography.h4,
                    { color: theme.colors.text, fontWeight: '700', textAlign: 'center' },
                  ]}>
                  {title}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Right: Actions */}
          <View style={styles.right}>
            {showSearch && !searchActive && (
              <TouchableOpacity onPress={() => setSearchActive(true)}>
                <Ionicons name="search-outline" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}

            {rightIcon && rightAction ? (
              <TouchableOpacity onPress={rightAction} style={{ marginLeft: 12 }}>
                <Ionicons name={rightIcon as any} size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 24 }} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  left: {
    width: 60,
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

