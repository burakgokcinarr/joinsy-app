import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DNACategory {
  category: string;
  score: number;
  color: string;
}

interface Props {
  data: DNACategory[];
  compact?: boolean;
}

export default function SocialDNAVisualization({ data, compact = false }: Props) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {data.map((item, index) => (
        <View key={index} style={[styles.dnaItem, compact && styles.compactDnaItem]}>
          <View style={styles.dnaHeader}>
            <Text style={[styles.dnaCategory, compact && styles.compactText]}>
              {item.category}
            </Text>
            <Text style={[styles.dnaScore, compact && styles.compactText]}>
              {item.score}%
            </Text>
          </View>
          <View style={styles.dnaBarContainer}>
            <LinearGradient
              colors={[item.color, `${item.color}80`]}
              style={[
                styles.dnaBar, 
                { width: `${item.score}%` }
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  compactContainer: {
    padding: 12,
  },
  dnaItem: {
    marginBottom: 16,
  },
  compactDnaItem: {
    marginBottom: 12,
  },
  dnaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dnaCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  dnaScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A78BFA',
  },
  compactText: {
    fontSize: 14,
  },
  dnaBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  dnaBar: {
    height: '100%',
    borderRadius: 4,
  },
});