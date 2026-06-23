import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/ui/CustomButton';
import CustomInput from '@/components/ui/CustomInput';
import ErrorMessage from '@/components/ui/ErrorMessage';
import SuccessMessage from '@/components/ui/SuccessMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { geminiService } from '@/services/gemini.service';
import { validatePrompt } from '@/utils/validation';

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

export default function CreatePostScreen() {
  const { createPost, isLoading: isCreatingPost } = usePosts();
  const router = useRouter();

  const [step, setStep] = useState<'prompt' | 'content'>('prompt');
  const [prompt, setPrompt] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = async () => {
    if (!validatePrompt(prompt)) {
      setError('El prompt debe tener al menos 10 caracteres');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const result = await geminiService.generateContent(prompt);
      // Ajustar según la respuesta real del backend (asumimos content o caption)
      setCaption(result.content || result.caption || "");
      if (result.hashtags) {
        setHashtags(result.hashtags);
      }
      setStep('content');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'Error al generar contenido. Intenta de nuevo.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const addHashtag = () => {
    if (hashtagInput.trim()) {
      const newHashtag = hashtagInput.trim().replace('#', '');
      if (!hashtags.includes(newHashtag)) {
        setHashtags([...hashtags, newHashtag]);
      }
      setHashtagInput('');
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!caption.trim()) {
      setError('El contenido no puede estar vacío');
      return;
    }

    try {
      setError(null);
      await createPost({
        content: caption,
        title: prompt.substring(0, 50),
      });

      setSuccess('Publicación creada exitosamente');
      setTimeout(() => {
        router.push('/(tabs)');
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'Error al crear la publicación'
      );
    }
  };

  if (step === 'prompt') {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.title}>Generar Contenido</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Info */}
            <View style={styles.infoCard}>
              <Ionicons name="lightbulb" size={24} color={COLORS.secondary} />
              <Text style={styles.infoText}>
                Describe qué deseas promocionar y nuestra IA generará contenido
              </Text>
            </View>

            {error && (
              <ErrorMessage 
                message={error} 
                onClose={() => setError(null)}
              />
            )}

            {/* Prompt Input */}
            <Text style={styles.label}>¿Qué deseas promocionar?</Text>
            <TextInput
              style={styles.promptInput}
              placeholder="Ej: Hamburguesa gourmet con queso artesanal"
              placeholderTextColor={COLORS.textLight}
              value={prompt}
              onChangeText={(text) => {
                setPrompt(text);
                if (error) setError(null);
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.helperText}>
              Cuántos más detalles proporciones, mejor será el contenido
            </Text>

            {/* Examples */}
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesTitle}>Ejemplos:</Text>
              {[
                'Promocionar un descuento especial de verano',
                'Lanzar un nuevo producto de belleza',
                'Aumentar asistencia al restaurante en fin de semana',
              ].map((example, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.exampleItem}
                  onPress={() => setPrompt(example)}>
                  <Text style={styles.exampleText}>{example}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Generate Button */}
          <View style={styles.footer}>
            <CustomButton
              title={isGenerating ? 'Generando...' : 'Generar Contenido'}
              onPress={handleGenerateContent}
              loading={isGenerating}
              disabled={isGenerating || !prompt.trim()}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  // Content editing step
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setStep('prompt')}
              style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Contenido</Text>
            <View style={{ width: 24 }} />
          </View>

          {error && (
            <ErrorMessage 
              message={error} 
              onClose={() => setError(null)}
            />
          )}

          {success && (
            <SuccessMessage message={success} />
          )}

          {/* Caption */}
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="Edita el contenido generado"
            placeholderTextColor={COLORS.textLight}
            value={caption}
            onChangeText={(text) => {
              setCaption(text);
              if (error) setError(null);
            }}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Hashtags */}
          <Text style={styles.label}>Hashtags</Text>
          <View style={styles.hashtagInput}>
            <TextInput
              style={styles.hashtagInputField}
              placeholder="Agregar hashtag"
              placeholderTextColor={COLORS.textLight}
              value={hashtagInput}
              onChangeText={setHashtagInput}
              onSubmitEditing={addHashtag}
            />
            <TouchableOpacity
              onPress={addHashtag}
              style={styles.addHashtagButton}>
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Hashtags List */}
          {hashtags.length > 0 && (
            <View style={styles.hashtagsList}>
              {hashtags.map((tag, index) => (
                <View key={index} style={styles.hashtagBadge}>
                  <Text style={styles.hashtagBadgeText}>#{tag}</Text>
                  <TouchableOpacity
                    onPress={() => removeHashtag(index)}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <Ionicons name="close" size={14} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Buttons */}
        <View style={styles.footer}>
          <CustomButton
            title="Volver"
            onPress={() => setStep('prompt')}
            variant="secondary"
            style={{ flex: 1, marginRight: 8 }}
          />
          <CustomButton
            title="Crear Publicación"
            onPress={handleCreatePost}
            loading={isCreatingPost}
            disabled={isCreatingPost}
            style={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  promptInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 120,
    marginBottom: 8,
  },
  captionInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 150,
    marginBottom: 16,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  examplesContainer: {
    marginTop: 24,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  exampleItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exampleText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  hashtagInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  hashtagInputField: {
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
  addHashtagButton: {
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
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hashtagBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    gap: 12,
  },
});

