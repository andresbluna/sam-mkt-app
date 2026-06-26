import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  AppState,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { Card, Section } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

import PostCard from '@/components/ui/PostCard';
import { socialService } from '@/services/social.service';
import { instagramService } from '@/services/instagram.service';
import { SocialAccount } from '@/types';

import SamLogo from '@/components/common/SamLogo';

export default function HomeScreenNew() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { posts, fetchPosts, isLoading } = usePosts();
  const router = useRouter();
  const [connectingInstagram, setConnectingInstagram] = useState(false);
  const [instagramAccount, setInstagramAccount] = useState<SocialAccount | null>(null);
  const [loadingInstagram, setLoadingInstagram] = useState(false);

  const handleConnectInstagram = async () => {
    console.log('=== handleConnectInstagram DEBUG ===');
    console.log('user:', user);
    console.log('user?.id:', user?.id);
    console.log('===================================');
    
    if (!user) {
      Alert.alert(
        '⚠️ Sesión Requerida',
        'Debes iniciar sesión en la aplicación SAM-MKT primero antes de conectar Instagram.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    if (!user.id) {
      Alert.alert(
        '⚠️ Error de Usuario',
        'El usuario no tiene ID. Intenta cerrar sesión y volver a iniciar sesión.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setConnectingInstagram(true);
    try {
      // Obtener URL de OAuth desde el backend (requiere token JWT)
      const oauthUrl = await instagramService.getOAuthUrl(user.id);
      
      console.log('Opening Instagram OAuth URL:', oauthUrl);
      
      // Abrir el navegador para autorizar en Facebook/Meta
      await Linking.openURL(oauthUrl);
      
      // Esperar un momento y luego verificar si se conectó
      setTimeout(() => {
        checkInstagramConnection();
      }, 3000);
    } catch (error: any) {
      console.error('Error connecting Instagram:', error);
      
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || 'No se pudo obtener la URL de autorización de Instagram.';
      
      Alert.alert(
        '❌ Error',
        `${errorMessage}\n\nVerifica que:\n• Estés conectado a internet\n• El token de sesión sea válido`,
        [{ text: 'OK' }]
      );
      setConnectingInstagram(false);
    }
  };

  const checkInstagramConnection = async () => {
    if (!user?.id) return;
    try {
      setLoadingInstagram(true);
      
      // Usar el nuevo endpoint de status
      const status = await instagramService.getConnectionStatus(user.id);
      
      console.log('=== Instagram Connection Status ===');
      console.log('connected:', status.connected);
      console.log('igUserId:', status.igUserId);
      console.log('pageId:', status.pageId);
      console.log('===================================');
      
      if (status.connected) {
        // Crear un objeto SocialAccount compatible con el estado existente
        setInstagramAccount({
          id: 0, // No tenemos el ID de la tabla social en este response
          userId: user.id,
          platform: 'instagram',
          accountId: status.igUserId || '',
          accountName: status.igUserId,
          pageId: status.pageId,
          igUserId: status.igUserId,
          status: 'connected',
        });
      } else {
        setInstagramAccount(null);
      }
    } catch (error: any) {
      console.error('Error checking Instagram connection:', error);
      
      // Si el error es 404 o dice "not connected", el usuario no tiene IG conectado
      if (error?.response?.status === 404 || error?.response?.data?.connected === false) {
        setInstagramAccount(null);
      }
    } finally {
      setLoadingInstagram(false);
      setConnectingInstagram(false);
    }
  };

  const handleDisconnectInstagram = async () => {
    if (!instagramAccount) return;
    Alert.alert(
      'Desconectar Instagram',
      '¿Estás seguro de que deseas desconectar tu cuenta de Instagram?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desconectar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoadingInstagram(true);
              await socialService.disconnectSocialAccount(instagramAccount.id);
              setInstagramAccount(null);
              Alert.alert('Éxito', 'Cuenta de Instagram desconectada correctamente');
            } catch (error: any) {
              Alert.alert('Error', 'No se pudo desconectar la cuenta de Instagram');
            } finally {
              setLoadingInstagram(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchPosts();
    checkInstagramConnection();
  }, []);

  // Detectar cuando el usuario vuelve de la autenticación OAuth
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && connectingInstagram) {
        // El usuario volvió a la app, verificar si se conectó Instagram
        setTimeout(() => {
          checkInstagramConnection();
        }, 1000);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [connectingInstagram]);

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  const QuickActionCard: React.FC<{
    icon: string;
    title: string;
    subtitle: string;
    onPress: () => void;
    gradient?: boolean;
  }> = ({ icon, title, subtitle, onPress, gradient }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionCard,
        {
          backgroundColor: gradient ? theme.colors.primary : theme.colors.surface,
          borderColor: gradient ? theme.colors.primary : theme.colors.border,
          ...(gradient ? {} : theme.shadows.md),
        },
      ]}>
      <View
        style={[
          styles.actionIcon,
          {
            backgroundColor: gradient ? 'rgba(255, 255, 255, 0.2)' : theme.colors.primaryLight,
          },
        ]}>
        <Ionicons
          name={icon as any}
          size={24}
          color={gradient ? '#FFFFFF' : theme.colors.primary}
        />
      </View>
      <View style={styles.actionContent}>
        <Text style={[theme.typography.h4, { color: gradient ? '#FFFFFF' : theme.colors.text }]}>{title}</Text>
        <Text style={[theme.typography.bodySm, { color: gradient ? 'rgba(255, 255, 255, 0.8)' : theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard: React.FC<{ label: string; value: string; icon: string; color?: string }> = ({
    label,
    value,
    icon,
    color,
  }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: (color || theme.colors.primary) + '15' },
        ]}>
        <Ionicons name={icon as any} size={22} color={color || theme.colors.primary} />
      </View>
      <View>
        <Text style={[theme.typography.h3, { color: theme.colors.text, lineHeight: 24 }]}>{value}</Text>
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 }]}>
          {label}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Greeting with Logo or Login Prompt */}
        {user ? (
          <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs }}>
              <Text style={[theme.typography.h2, { color: theme.colors.text, fontSize: 32, marginRight: theme.spacing.sm }]}>
                Hola, {user?.name.split(' ')[0]}! 👋
              </Text>
              <SamLogo size="large" showText={false} />
            </View>
            <Text
              style={[
                theme.typography.bodyLg,
                { color: theme.colors.textSecondary, opacity: 0.8 },
              ]}>
              Tu asistente de marketing está listo.
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.xl }}>
            <SamLogo size="large" showText={true} />
            <Text style={[theme.typography.h2, { color: theme.colors.text, marginTop: theme.spacing.lg }]}>
              👋 Bienvenido a SAM-MKT
            </Text>
            <Text
              style={[
                theme.typography.bodyLg,
                { color: theme.colors.textSecondary, opacity: 0.8, marginTop: theme.spacing.sm },
              ]}>
              Inicia sesión para continuar
            </Text>
          </View>
        )}

        {user ? (
          <>
            {/* Stats */}
            <View style={styles.statsGrid}>
              <StatCard
                label="Total"
                value={posts.length.toString()}
                icon="layers-outline"
              />
              <StatCard
                label="Enviados"
                value={publishedCount.toString()}
                icon="paper-plane-outline"
                color={theme.colors.secondary}
              />
            </View>

            {/* Instagram Connection Status */}
            <View style={[styles.instagramCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <View style={styles.instagramHeader}>
                <View style={[styles.instagramIcon, { backgroundColor: instagramAccount ? '#E4405F20' : theme.colors.primaryLight }]}>
                  <Ionicons
                    name="logo-instagram"
                    size={24}
                    color={instagramAccount ? '#E4405F' : theme.colors.primary}
                  />
                </View>
                <View style={styles.instagramInfo}>
                  <Text style={[theme.typography.h4, { color: theme.colors.text }]}>
                    {instagramAccount ? 'Instagram Conectado' : 'Instagram'}
                  </Text>
                  <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
                    {loadingInstagram
                      ? 'Verificando conexión...'
                      : instagramAccount
                      ? `Usuario de app: ${user?.name} • IG: @${instagramAccount.accountName || instagramAccount.igUserId || 'Sin nombre'}`
                      : `Usuario de app: ${user?.name} • Instagram no conectado`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.instagramButton,
                  {
                    backgroundColor: instagramAccount ? '#FEE2E2' : theme.colors.primary,
                  },
                ]}
                onPress={instagramAccount ? handleDisconnectInstagram : handleConnectInstagram}
                disabled={loadingInstagram || connectingInstagram}>
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: instagramAccount ? '#EF4444' : '#FFFFFF',
                    fontSize: 12,
                  },
                ]}>
                {loadingInstagram || connectingInstagram
                  ? '...'
                  : instagramAccount
                  ? 'Desconectar'
                  : 'Conectar'}
              </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // Login Button Section
          <View style={[
            styles.instagramCard,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
              marginTop: theme.spacing.lg,
            }
          ]}>
            <View style={{ marginBottom: theme.spacing.lg }}>
              <View style={[styles.instagramIcon, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                <Ionicons
                  name="key-outline"
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <Text style={[theme.typography.h3, { color: '#FFFFFF', marginTop: theme.spacing.md }]}>
                🔑 Iniciar Sesión
              </Text>
              <Text style={[theme.typography.bodySm, { color: 'rgba(255, 255, 255, 0.9)', marginTop: theme.spacing.xs }]}>
                Debes iniciar sesión primero para conectar Instagram
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.instagramButton,
                {
                  backgroundColor: '#FFFFFF',
                }
              ]}
              onPress={() => router.push('/login')}>
            <Text
              style={[
                theme.typography.bodySm,
                {
                  color: theme.colors.primary,
                  fontSize: 12,
                  fontWeight: '600',
                },
              ]}>
              🔐 Iniciar Sesión en SAM-MKT
            </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions - Only show if logged in */}
        {user && (
          <Section title="Acciones Rápidas">
            <QuickActionCard
              icon="camera"
              title="Generar contenido"
              subtitle="Genera contenido con IA"
              onPress={() => router.push('/(tabs)/create')}
              gradient
            />
            <QuickActionCard
              icon="bar-chart"
              title="Ver Historial"
              subtitle="Revisa tus actividades"
              onPress={() => router.push('/(tabs)/history')}
            />
            <QuickActionCard
              icon="link"
              title={
                loadingInstagram
                  ? 'Verificando...'
                  : connectingInstagram
                  ? 'Conectando...'
                  : instagramAccount
                  ? '✓ Instagram Conectado'
                  : 'Conectar Instagram'
              }
              subtitle={
                instagramAccount
                  ? `@${instagramAccount.accountName || 'Cuenta conectada'}`
                  : 'Sincroniza tu cuenta'
              }
              onPress={instagramAccount ? handleDisconnectInstagram : handleConnectInstagram}
            />
          </Section>
        )}

        {/* Recent Posts Preview - Only show if logged in */}
        {user && posts.length > 0 && (
          <Section title="Publicaciones Recientes">
            {posts.slice(0, 3).map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => router.push(`/post/${post.id}`)}
              />
            ))}
          </Section>
        )}
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
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  instagramCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  instagramIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instagramInfo: {
    flex: 1,
  },
  instagramButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
});

