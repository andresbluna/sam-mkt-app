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
import { useAuth } from '@/contexts/AuthContext';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/CustomButton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { validateEmail, validatePassword, validateName } from '@/utils/validation';
import { useRouter } from 'expo-router';

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

export default function RegisterScreen() {
  const { register, isLoading, error, setError } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!name) {
      newErrors.name = 'El nombre es requerido';
    } else if (!validateName(name)) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else {
      const validation = validatePassword(password);
      if (!validation.isValid) {
        newErrors.password = validation.error;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Atrás</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Crear Cuenta</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error && (
            <ErrorMessage 
              message={error} 
              onClose={() => setError(null)}
              containerStyle={styles.errorContainer}
            />
          )}

          <CustomInput
            label="Nombre Completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: undefined });
              if (error) setError(null);
            }}
            icon="person"
            error={errors.name}
            containerStyle={styles.inputContainer}
          />

          <CustomInput
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
            containerStyle={styles.inputContainer}
          />

          <CustomInput
            label="Contraseña"
            placeholder="••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
              if (error) setError(null);
            }}
            isPassword
            icon="lock-closed"
            error={errors.password}
            containerStyle={styles.inputContainer}
            helper="Mín. 6 caracteres, 1 mayúscula, 1 número"
          />

          <CustomInput
            label="Confirmar Contraseña"
            placeholder="••••••"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
              if (error) setError(null);
            }}
            isPassword
            icon="lock-closed"
            error={errors.confirmPassword}
            containerStyle={styles.inputContainer}
          />

          <CustomButton
            title="Registrarse"
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            style={styles.registerButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  form: {
    marginBottom: 40,
  },
  errorContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

