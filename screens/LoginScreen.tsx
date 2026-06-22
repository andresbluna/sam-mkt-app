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
import { validateEmail } from '@/utils/validation';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import SamLogo from '@/components/common/SamLogo';

interface LoginErrors {
    email?: string;
    password?: string;
}

export default function LoginScreen() {
    const { theme } = useTheme();
    const { login, isLoading, error, setError } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});

    const validateForm = (): boolean => {
        const newErrors: LoginErrors = {};

        if (!email) {
            newErrors.email = 'El correo es requerido';
        } else if (!validateEmail(email)) {
            newErrors.email = 'El correo no es válido';
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
                {/* Header con Logo Personalizado */}
                <View style={styles.header}>
                    <SamLogo size="large" showText={false} />
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Sam.
                    </Text>
                    <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
                        Sistema de Asistencia de Marketing
                    </Text>
                </View>

                {/* Formulario */}
                <View style={styles.form}>
                    {error && (
                        <ErrorMessage
                            message={error}
                            onClose={() => setError(null)}
                            containerStyle={styles.errorContainer}
                        />
                    )}

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
                        icon="mail-outline"
                        error={errors.email}
                    />

                    <CustomInput
                        label="Contraseña"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (errors.password)
                                setErrors({ ...errors, password: undefined });
                            if (error) setError(null);
                        }}
                        isPassword
                        icon="lock-closed-outline"
                        error={errors.password}
                    />

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        activeOpacity={0.7}>
                        <Text
                            style={[
                                styles.forgotPasswordText,
                                { color: theme.colors.primary },
                            ]}>
                            ¿Olvidó su contraseña?
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Iniciar Sesión"
                        onPress={handleLogin}
                        loading={isLoading}
                        disabled={isLoading}
                        size="large"
                        style={styles.loginButton}
                    />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                        ¿No tienes cuenta?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/register')}
                        activeOpacity={0.7}>
                        <Text
                            style={[styles.signUpLink, { color: theme.colors.primary }]}>
                            Regístrate aquí
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
        paddingHorizontal: 24,
        paddingVertical: 60,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32, // reducido de 48 a 32
    },
    title: {
        fontSize: 32,
        fontWeight: '100',
        marginTop: 25, // antes 16 → ahora 25px
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 25, // antes 8 → ahora 25px
        textAlign: 'center',
        opacity: 0.8,
    },
    form: {
        width: '100%',
    },
    errorContainer: {
        marginBottom: 20,
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 32,
        marginTop: -8,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '700',
    },
    loginButton: {
        borderRadius: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        fontSize: 15,
    },
    signUpLink: {
        fontSize: 15,
        fontWeight: '700',
    },
});