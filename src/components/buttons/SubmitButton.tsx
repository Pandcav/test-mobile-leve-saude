import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface SubmitButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle
}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { opacity: (loading || disabled) ? 0.7 : 1 },
                style
            ]} 
            onPress={onPress} 
            disabled={disabled || loading}
        >
            <Text style={[styles.buttonText, textStyle]}>
                {loading ? 'Enviando...' : title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#862bfdff',
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
