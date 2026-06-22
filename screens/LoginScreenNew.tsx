import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import SamLogo from '@/components/common/SamLogo';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { validateEmail } from '@/utils/validation';

export default function LoginScreenNew() {
  const { theme } = useTheme();
  const { login, isLoading, error, setError } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Correo inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <SamLogo size="xl" showText={false} />
        </View>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={[theme.typography.h1, { color: theme.colors.text, textAlign: 'center', fontSize: 32 }]}>
            Hola de nuevo
          </Text>
          <Text
            style={[
              theme.typography.bodyLg,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.xs, textAlign: 'center' },
            ]}>
            Inicia sesión para comenzar a crear
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View
            style={[
              styles.errorBanner,
              { backgroundColor: theme.colors.errorLight, borderColor: theme.colors.error },
            ]}>
            <Text style={[theme.typography.bodySm, { color: theme.colors.error }]}>
              {error}
            </Text>
          </View>
        )}

        {/* Formulario */}
        <View style={styles.form}>
          <Input
            label="Correo Electrónico"
            placeholder="tu@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
              if (error) setError(null);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
            error={errors.email}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
              if (error) setError(null);
            }}
            isPassword
            icon="lock-closed"
            error={errors.password}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[theme.typography.bodySm, { color: theme.colors.primary }]}>
              ¿Olvidó su contraseña?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading || !email || !password}
            fullWidth
            style={{ marginTop: theme.spacing.xl }}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
            ¿No tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.primary, fontWeight: '600' },
              ]}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 60,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  errorBanner: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

