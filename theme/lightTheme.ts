export const lightTheme = {
  colors: {
    // Primario (Azul)
    primary: '#6366F1',
    primaryLight: '#EEF2FF',
    primaryVariant: '#4F46E5',
    
    // Secundario (Violeta/Rosa)
    secondary: '#EC4899',
    secondaryLight: '#FDF2F8',
    secondaryVariant: '#DB2777',
    
    // Gradiente
    gradientStart: '#6366F1',
    gradientEnd: '#EC4899',
    
    // Texto
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    
    // Fondos
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceVariant: '#F3F4F6',
    
    // Bordes
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    // Estados
    success: '#10B981',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Especiales
    divider: '#E5E7EB',
    disabled: '#D1D5DB',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8,
    },
    lg: {
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.2,
      shadowRadius: 25,
      elevation: 12,
    },
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    bodyLg: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    bodySm: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 18,
    },
    caption: {
      fontSize: 11,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
} as const;

export type LightThemeType = typeof lightTheme;

