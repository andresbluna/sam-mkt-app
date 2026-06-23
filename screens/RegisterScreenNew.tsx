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
import { validateEmail, validatePassword, validateName } from '@/utils/validation';

export default function RegisterScreenNew() {
  const { theme } = useTheme();
  const { register, isLoading, error, setError } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name) {
      newErrors.name = 'El nombre es requerido';
    } else if (!validateName(name)) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Correo inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register({ name, email, password });
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Register error:', err);
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
            Crear cuenta
          </Text>
          <Text
            style={[
              theme.typography.bodyLg,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.xs, textAlign: 'center' },
            ]}>
            Únete y comienza a potenciar tu marca
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
            label="Nombre Completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) {
                const newErrors = { ...errors };
                delete newErrors.name;
                setErrors(newErrors);
              }
              if (error) setError(null);
            }}
            autoCapitalize="words"
            icon="person"
            error={errors.name}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <Input
            label="Correo Electrónico"
            placeholder="tu@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                const newErrors = { ...errors };
                delete newErrors.email;
                setErrors(newErrors);
              }
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
              if (errors.password) {
                const newErrors = { ...errors };
                delete newErrors.password;
                setErrors(newErrors);
              }
              if (error) setError(null);
            }}
            secureTextEntry
            icon="lock"
            error={errors.password}
            containerStyle={{ marginBottom: theme.spacing.xl }}
          />

          {/* Register Button */}
          <Button
            title="Crear Cuenta"
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading || !name || !email || !password}
            fullWidth
          />
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
            ¿Ya tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.primary, fontWeight: '600' },
              ]}>
              Inicia sesión
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
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

