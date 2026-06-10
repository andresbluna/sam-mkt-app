import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/ui/CustomButton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import SuccessMessage from '@/components/ui/SuccessMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/ui/Header';
import PostCard from '@/components/ui/PostCard';
import { Post } from '@/types';
import { postService } from '@/services/posts.service';

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { publishPost, updatePost, deletePost, isLoading } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [editedHashtags, setEditedHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setIsLoadingPost(true);
      setError(null);

      if (typeof id === 'string') {
        const fetchedPost = await postService.getPost(id);
        setPost(fetchedPost);
        setEditedCaption(fetchedPost.caption);
        setEditedHashtags(fetchedPost.hashtags);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al cargar la publicación');
    } finally {
      setIsLoadingPost(false);
    }
  };

  const handleSave = async () => {
    if (!post) return;

    try {
      setError(null);
      await updatePost(post.id, {
        caption: editedCaption,
        hashtags: editedHashtags,
      });
      setSuccess('Publicación actualizada');
      setIsEditing(false);
      setTimeout(() => {
        setSuccess(null);
        fetchPost();
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar');
    }
  };

  const handlePublish = async () => {
    if (!post) return;

    Alert.alert(
      'Publicar',
      '¿Deseas publicar esta publicación en Instagram?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Publicar',
          onPress: async () => {
            try {
              setError(null);
              await publishPost(post.id, 'instagram');
              setSuccess('¡Publicación publicada exitosamente!');
              setTimeout(() => {
                setSuccess(null);
                fetchPost();
              }, 1500);
            } catch (err: any) {
              setError(err?.response?.data?.message || 'Error al publicar');
            }
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Publicación',
      '¿Estás seguro de que deseas eliminar esta publicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deletePost(post!.id);
              setSuccess('Publicación eliminada');
              setTimeout(() => router.back(), 1000);
            } catch (err: any) {
              setError(err?.response?.data?.message || 'Error al eliminar');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const addHashtag = () => {
    if (hashtagInput.trim()) {
      const newHashtag = hashtagInput.trim().replace('#', '');
      if (!editedHashtags.includes(newHashtag)) {
        setEditedHashtags([...editedHashtags, newHashtag]);
      }
      setHashtagInput('');
    }
  };

  const removeHashtag = (index: number) => {
    setEditedHashtags(editedHashtags.filter((_, i) => i !== index));
  };

  if (isLoadingPost) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Publicación" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se pudo cargar la publicación</Text>
          <CustomButton title="Volver" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalles de Publicación" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {error && (
            <ErrorMessage 
              message={error} 
              onClose={() => setError(null)}
              containerStyle={styles.messageContainer}
            />
          )}
          {success && (
            <SuccessMessage 
              message={success}
              containerStyle={styles.messageContainer}
            />
          )}

          {isEditing ? (
            <>
              <Text style={styles.label}>Contenido</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Contenido"
                value={editedCaption}
                onChangeText={setEditedCaption}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />

              <Text style={styles.label}>Hashtags</Text>
              <View style={styles.hashtagInputContainer}>
                <TextInput
                  style={styles.hashtagInput}
                  placeholder="Agregar hashtag"
                  value={hashtagInput}
                  onChangeText={setHashtagInput}
                  onSubmitEditing={addHashtag}
                />
                <TouchableOpacity
                  onPress={addHashtag}
                  style={styles.addButton}>
                  <Ionicons name="add" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              {editedHashtags.length > 0 && (
                <View style={styles.hashtagsList}>
                  {editedHashtags.map((tag, index) => (
                    <View key={index} style={styles.hashtagBadge}>
                      <Text style={styles.hashtagText}>#{tag}</Text>
                      <TouchableOpacity onPress={() => removeHashtag(index)}>
                        <Ionicons name="close" size={14} color={COLORS.white} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Cancelar"
                  onPress={() => {
                    setIsEditing(false);
                    setEditedCaption(post.caption);
                    setEditedHashtags(post.hashtags);
                  }}
                  variant="secondary"
                  style={{ flex: 1, marginRight: 8 }}
                />
                <CustomButton
                  title="Guardar"
                  onPress={handleSave}
                  loading={isLoading}
                  style={{ flex: 1 }}
                />
              </View>
            </>
          ) : (
            <>
              <PostCard post={post} />

              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Información</Text>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Estado</Text>
                  <Text style={styles.infoValue}>{post.status}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Creado</Text>
                  <Text style={styles.infoValue}>
                    {new Date(post.createdAt).toLocaleDateString('es-ES')}
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                {post.status === 'draft' && (
                  <CustomButton
                    title="Publicar en Instagram"
                    onPress={handlePublish}
                    loading={isLoading}
                    style={{ marginBottom: 8 }}
                  />
                )}

                <CustomButton
                  title="Editar"
                  onPress={() => setIsEditing(true)}
                  variant="secondary"
                  style={{ marginBottom: 8 }}
                />

                <CustomButton
                  title="Eliminar"
                  onPress={handleDelete}
                  variant="danger"
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 120,
    marginBottom: 16,
  },
  hashtagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  hashtagInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  hashtagBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hashtagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButtons: {
    marginTop: 24,
  },
});

