import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface Props {
  event: {
    id: number;
    title: string;
    type: string;
    match: number;
    image: string;
    eventCount?: number;
  };
  position: { top: number; left: number };
  onPress?: () => void;
}

export default function MapEventCard({ event, position, onPress }: Props) {
  const getMatchColor = (match: number) => {
    if (match >= 90) return '#10B981';
    if (match >= 80) return '#F59E0B';
    if (match >= 70) return '#F97316';
    return '#6B7280';
  };

  const getCategoryColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Concert: '#A78BFA',
      Musical: '#F97316',
      Art: '#F59E0B',
      Film: '#FB7185',
      Sports: '#10B981',
    };
    return colors[type] || '#6366F1';
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { top: position.top, left: position.left }]}
      onPress={onPress}
      activeOpacity={0.9}>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
      </View>
      
      <View style={styles.content}>
        <View style={[styles.typeTag, { backgroundColor: getCategoryColor(event.type) }]}>
          <Text style={styles.typeText}>{event.type}</Text>
        </View>
        
        <View style={[styles.matchBadge, { backgroundColor: getMatchColor(event.match) }]}>
          <Star size={8} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.matchText}>{event.match}%</Text>
        </View>
        
        {event.eventCount && (
          <Text style={styles.eventCount}>{event.eventCount} events</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //position: 'absolute',
    width: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 8,
    gap: 4,
  },
  typeTag: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-end',
    gap: 2,
  },
  matchText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  eventCount: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
});