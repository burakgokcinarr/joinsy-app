import React from 'react';
import { StyleSheet, useWindowDimensions, View, Text } from 'react-native';

interface Props {
    title?: string;
    style?: any;
    location?: { latitude: number; longitude: number };
}

export default function MapDiscovery({ title, location, style }: Props) {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[styles.container, style]}>
            <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Map View</Text>
                <Text style={styles.placeholderSubtext}>
                    Interactive map not available on web
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        minHeight: 200,
    },
    placeholderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },
});