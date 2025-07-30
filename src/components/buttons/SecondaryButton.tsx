import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface SecondaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    backgroundColor?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
    backgroundColor = '#28a745'
}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { backgroundColor },
                style
            ]} 
            onPress={onPress} 
            disabled={disabled}
        >
            <Text style={[styles.buttonText, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});
