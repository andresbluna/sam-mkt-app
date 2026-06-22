export const darkTheme = {
  colors: {
    // Primario (Azul - más brillante en tema oscuro)
    primary: '#818CF8',
    primaryLight: '#312E81',
    primaryVariant: '#A5B4FC',
    
    // Secundario (Violeta/Rosa)
    secondary: '#F472B6',
    secondaryLight: '#831843',
    secondaryVariant: '#F9A8D4',
    
    // Gradiente
    gradientStart: '#818CF8',
    gradientEnd: '#F472B6',
    
    // Texto
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    
    // Fondos
    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',
    
    // Bordes
    border: '#475569',
    borderLight: '#1E293B',
    
    // Estados
    success: '#34D399',
    error: '#F87171',
    errorLight: '#7F1D1D',
    warning: '#FBBF24',
    info: '#60A5FA',
    
    // Especiales
    divider: '#475569',
    disabled: '#64748B',
    overlay: 'rgba(0, 0, 0, 0.7)',
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
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
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

export type DarkThemeType = typeof darkTheme;

