import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface SamLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  containerStyle?: ViewStyle;
}

export const SamLogo: React.FC<SamLogoProps> = ({
  size = 'medium',
  showText = true,
  containerStyle,
}) => {
  const { theme, isDark } = useTheme();

  const getSizes = () => {
    switch (size) {
      case 'small':
        return { circleSize: 28, dotSize: 3, fontSize: 14, gap: 6 };
      case 'large':
        return { circleSize: 60, dotSize: 5, fontSize: 24, gap: 12 };
      default:
        return { circleSize: 44, dotSize: 4, fontSize: 18, gap: 8 };
    }
  };

  const { circleSize, dotSize, fontSize, gap } = getSizes();

  // Crear puntos en gradiente
  const dots = Array(9)
    .fill(null)
    .map((_, i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = col * (circleSize / 2.5) - (circleSize / 2.5);
      const y = row * (circleSize / 2.5) - (circleSize / 2.5);

      // Interpolación de color entre primario y secundario
      const progress = i / 9;
      const r1 = parseInt(theme.colors.primary.slice(1, 3), 16);
      const g1 = parseInt(theme.colors.primary.slice(3, 5), 16);
      const b1 = parseInt(theme.colors.primary.slice(5, 7), 16);

      const r2 = parseInt(theme.colors.secondary.slice(1, 3), 16);
      const g2 = parseInt(theme.colors.secondary.slice(3, 5), 16);
      const b2 = parseInt(theme.colors.secondary.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);

      const color = `rgb(${r}, ${g}, ${b})`;

      return (
        <View
          key={i}
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              left: x,
              top: y,
            },
          ]}
        />
      );
    });

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.logoCircle,
          {
            width: circleSize,
            height: circleSize,
            borderColor: theme.colors.primary,
          },
        ]}>
        {dots}
      </View>

      {showText && (
        <Text
          style={[
            styles.text,
            {
              fontSize,
              color: theme.colors.text,
            },
          ]}>
          Sam.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    borderWidth: 1.5,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    borderRadius: 9999,
    position: 'absolute',
  },
  text: {
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

