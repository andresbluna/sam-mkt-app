// Colores permitidos en el tema
export const Colors = {
  // Primario (Azul)
  primary: '#0EA5E9',
  primaryLight: '#0284C7',
  primaryDark: '#0369A1',
  
  // Secundario (Verde)
  secondary: '#10B981',
  secondaryLight: '#6EE7B7',
  secondaryDark: '#059669',
  
  // Gradiente
  gradientStart: '#0EA5E9',
  gradientEnd: '#10B981',
  
  // Neutrales
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Fondos
  background: '#FFFFFF',
  surface: '#F9FAFB',
  border: '#E5E7EB',
  
  // Estados
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Sombra
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

export type ColorsType = typeof Colors;

