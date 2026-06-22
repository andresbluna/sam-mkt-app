import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SamLogo from '@/components/common/SamLogo';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    color?: string;
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'large',
    color,
    fullScreen = false,
}) => {
    const { theme } = useTheme();
    const indicatorColor = color || theme.colors.primary;
    const backgroundColor = fullScreen ? theme.colors.background : 'transparent';

    return (
        <View style={[
            fullScreen ? styles.fullScreenContainer : styles.container,
            { backgroundColor }
        ]}>
            {fullScreen && (
                <SamLogo 
                    size="xl" 
                    showText={false} 
                    containerStyle={styles.logo} 
                />
            )}
            <ActivityIndicator size={size} color={indicatorColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 32, // Espacio entre logo e indicador
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    }
});

export default LoadingSpinner;