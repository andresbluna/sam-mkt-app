import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface SamLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  showText?: boolean;
  containerStyle?: ViewStyle;
}

const SamLogo: React.FC<SamLogoProps> = ({
  size = 'medium',
  showText = true,
  containerStyle,
}) => {
  const { theme } = useTheme();

  const getSizes = () => {
    const logoAspectRatio = 955 / 390;
    switch (size) {
      case 'small':
        return { imgWidth: 40, imgHeight: 40 / logoAspectRatio, fontSize: 18 };
      case 'xl':
        return { imgWidth: 300, imgHeight: 300 / logoAspectRatio, fontSize: 48 };
      case 'large':
        return { imgWidth: 200, imgHeight: 200 / logoAspectRatio, fontSize: 36 };
      default:
        return { imgWidth: 80, imgHeight: 80 / logoAspectRatio, fontSize: 24 };
    }
  };

  const { imgWidth, imgHeight, fontSize } = getSizes();

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('@/assets/images/logo_sam.png')}
        style={{
          width: imgWidth,
          height: imgHeight,
          shadowOpacity: 0,
          elevation: 0,
        }}
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
export default SamLogo

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

