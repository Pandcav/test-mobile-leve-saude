import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TabButtonProps {
    title: string;
    onPress: () => void;
    active?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const TabButton: React.FC<TabButtonProps> = ({
    title,
    onPress,
    active = false,
    style,
    textStyle
}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                active && styles.buttonActive,
                style
            ]} 
            onPress={onPress}
        >
            <Text style={[
                styles.buttonText, 
                active && styles.buttonTextActive,
                textStyle
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonActive: {
        backgroundColor: '#862bfdff',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    buttonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
