import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { Card, Section, ListItem } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export default function SettingsScreenNew() {
  const { theme, setThemeMode, themeMode, isDark } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Configuración" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Tema */}
        <Section title="Apariencia">
          <Card style={{ backgroundColor: theme.colors.surface }}>
            <View style={{ gap: theme.spacing.md }}>
              <View style={styles.themeOptionRow}>
                <View style={styles.themeOption}>
                  <View
                    style={[
                      styles.themeCircle,
                      {
                        backgroundColor: '#FFFFFF',
                        borderColor: theme.colors.primary,
                        borderWidth: themeMode === 'light' ? 2 : 1,
                      },
                    ]}>
                    <Ionicons name="sunny" size={20} color="#FDB022" />
                  </View>
                  <Text style={[theme.typography.bodySm, { color: theme.colors.text }]}>
                    Claro
                  </Text>
                </View>

                <View style={styles.themeOption}>
                  <View
                    style={[
                      styles.themeCircle,
                      {
                        backgroundColor: '#1F2937',
                        borderColor: theme.colors.primary,
                        borderWidth: themeMode === 'dark' ? 2 : 1,
                      },
                    ]}>
                    <Ionicons name="moon" size={20} color="#9CA3AF" />
                  </View>
                  <Text style={[theme.typography.bodySm, { color: theme.colors.text }]}>
                    Oscuro
                  </Text>
                </View>

                <View style={styles.themeOption}>
                  <View
                    style={[
                      styles.themeCircle,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.primary,
                        borderWidth: themeMode === 'system' ? 2 : 1,
                      },
                    ]}>
                    <Ionicons name="phone-portrait" size={20} color={theme.colors.primary} />
                  </View>
                  <Text style={[theme.typography.bodySm, { color: theme.colors.text }]}>
                    Sistema
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </Section>

        {/* Cuenta */}
        <Section title="Cuenta">
          <Card style={{ backgroundColor: theme.colors.surface, padding: 0 }}>
            <ListItem
              title="Editar Perfil"
              icon={<Ionicons name="person" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
              onPress={() => router.push('/(tabs)/profile')}
            />
            <ListItem
              title="Cambiar Contraseña"
              icon={<Ionicons name="lock-closed" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
            />
            <ListItem
              title="Notificaciones"
              icon={<Ionicons name="notifications" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
            />
          </Card>
        </Section>

        {/* Acerca De */}
        <Section title="Acerca de">
          <Card style={{ backgroundColor: theme.colors.surface, padding: 0 }}>
            <ListItem
              title="Versión"
              subtitle="1.0.0"
              icon={<Ionicons name="information-circle" size={20} color={theme.colors.primary} />}
            />
            <ListItem
              title="Términos de Servicio"
              icon={<Ionicons name="document-text" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
            />
            <ListItem
              title="Política de Privacidad"
              icon={<Ionicons name="shield-checkmark" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
            />
          </Card>
        </Section>

        {/* Cerrar Sesión */}
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  themeOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  themeOption: {
    alignItems: 'center',
    gap: 8,
  },
  themeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

