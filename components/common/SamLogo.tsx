import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
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
  const { theme } = useTheme();

  const getSizes = () => {
    switch (size) {
      case 'small':
        return { imgSize: 24, fontSize: 14 };
      case 'large':
        return { imgSize: 96, fontSize: 32 };
      default:
        return { imgSize: 48, fontSize: 22 };
    }
  };

  const { imgSize, fontSize } = getSizes();

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('@/assets/images/logo_sam.png')}
        style={{ width: imgSize, height: imgSize }}
        resizeMode="contain"
      />

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
});

