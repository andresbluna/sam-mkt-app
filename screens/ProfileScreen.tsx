import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/ui/CustomButton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import SuccessMessage from '@/components/ui/SuccessMessage';
import Header from '@/components/ui/Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

export default function ProfileScreen() {
  const { user: authUser, logout } = useAuth();
  const { userProfile, isLoading, updateUserProfile, error, setError } = useUser();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userProfile?.name || '');
  const [editError, setEditError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      setEditError('El nombre no puede estar vacío');
      return;
    }

    try {
      setEditError(null);
      if (userProfile) {
        await updateUserProfile(userProfile.id, { name: editedName });
        setSuccessMessage('Perfil actualizado exitosamente');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      setEditError(err?.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Mi Perfil"
        showBackButton={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Header */}
        <View style={styles.userHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.userName}>{userProfile?.name}</Text>
          <Text style={styles.userEmail}>{userProfile?.email}</Text>
          {userProfile?.plan && (
            <View style={styles.planBadge}>
              <Text style={styles.planText}>{userProfile.plan}</Text>
            </View>
          )}
        </View>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onClose={() => setError(null)}
            containerStyle={styles.messageContainer}
          />
        )}
        {editError && (
          <ErrorMessage 
            message={editError} 
            onClose={() => setEditError(null)}
            containerStyle={styles.messageContainer}
          />
        )}
        {successMessage && (
          <SuccessMessage 
            message={successMessage}
            containerStyle={styles.messageContainer}
          />
        )}

        {/* Edit Mode */}
        {isEditing ? (
          <View style={styles.editSection}>
            <Text style={styles.sectionTitle}>Editar Información</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                value={editedName}
                onChangeText={setEditedName}
              />
            </View>

            <View style={styles.editButtons}>
              <CustomButton
                title="Cancelar"
                onPress={() => {
                  setIsEditing(false);
                  setEditedName(userProfile?.name || '');
                }}
                variant="secondary"
                style={{ flex: 1, marginRight: 8 }}
              />
              <CustomButton
                title="Guardar"
                onPress={handleSaveProfile}
                loading={isLoading}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ) : (
          <>
            {/* Profile Info */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Información</Text>

              <View style={styles.infoCard}>
                <Ionicons name="mail" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Correo Electrónico</Text>
                  <Text style={styles.infoValue}>{userProfile?.email}</Text>
                </View>
              </View>

              {userProfile?.createdAt && (
                <View style={styles.infoCard}>
                  <Ionicons name="calendar" size={20} color={COLORS.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Miembro desde</Text>
                    <Text style={styles.infoValue}>
                      {new Date(userProfile.createdAt).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Actions */}
            <View style={styles.actionsSection}>
              <Text style={styles.sectionTitle}>Acciones</Text>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => setIsEditing(true)}>
                <View style={styles.actionIcon}>
                  <Ionicons name="pencil" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Editar Perfil</Text>
                  <Text style={styles.actionDesc}>Actualizar tu información</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Ionicons name="lock-closed" size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Cambiar Contraseña</Text>
                  <Text style={styles.actionDesc}>Actualizar tu contraseña</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={handleLogout}>
                <View style={[styles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
                  <Ionicons name="log-out" size={20} color="#EF4444" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={[styles.actionTitle, { color: '#EF4444' }]}>
                    Cerrar Sesión
                  </Text>
                  <Text style={styles.actionDesc}>Terminar tu sesión actual</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  userHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  planBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  planText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  messageContainer: {
    marginBottom: 16,
  },
  editSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  actionDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
});

