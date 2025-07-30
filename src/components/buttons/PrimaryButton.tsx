import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    backgroundColor?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle,
    backgroundColor = '#007AFF'
}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { backgroundColor, opacity: (disabled || loading) ? 0.7 : 1 },
                style
            ]} 
            onPress={onPress} 
            disabled={disabled || loading}
        >
            <Text style={[styles.buttonText, textStyle]}>
                {loading ? 'Carregando...' : title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
