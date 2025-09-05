import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Filter, Music, Film, Gamepad2, Palette, Plane } from 'lucide-react-native';
import JoinsyHeader from '@/components/JoinsyHeader';
import EventCard from '@/components/EventCard';

const categories = [
  { id: 'all', name: 'All', icon: null, color: '#6366F1' },
  { id: 'music', name: 'Music', icon: Music, color: '#A78BFA' },
  { id: 'film', name: 'Film', icon: Film, color: '#F97316' },
  { id: 'sports', name: 'Sports', icon: Gamepad2, color: '#10B981' },
  { id: 'art', name: 'Art', icon: Palette, color: '#F59E0B' },
  { id: 'travel', name: 'Travel', icon: Plane, color: '#67E8F9' },
];

const events = [
  {
    id: 1,
    title: 'Summer Music Festival',
    artist: 'Various Artists',
    date: 'Jul 15, 2025',
    time: '18:00',
    venue: 'Central Park',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    price: 45,
    match: 95,
    attendees: 1250,
    category: 'music',
    isFree: false,
  },
  {
    id: 2,
    title: 'Outdoor Cinema Night',
    artist: 'Classic Films',
    date: 'Jul 16, 2025',
    time: '20:30',
    venue: 'Riverside Park',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    price: 0,
    match: 88,
    attendees: 320,
    category: 'film',
    isFree: true,
  },
  {
    id: 3,
    title: 'Art Gallery Opening',
    artist: 'Modern Artists Collective',
    date: 'Jul 18, 2025',
    time: '19:00',
    venue: 'Downtown Gallery',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    price: 25,
    match: 92,
    attendees: 150,
    category: 'art',
    isFree: false,
  },
];

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const filterButton = (
    <TouchableOpacity 
      style={styles.filterButton}
      onPress={() => setShowFilters(!showFilters)}>
      <Filter size={20} color="#6366F1" />
      <Text style={styles.filterText}>Filters</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <JoinsyHeader rightElement={filterButton} />

      {/* Sticky Categories */}
      <View style={styles.stickySection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && { 
                    backgroundColor: category.color,
                    shadowColor: category.color,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                  }
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                {IconComponent && (
                  <IconComponent 
                    size={16} 
                    color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
                  />
                )}
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && { color: '#FFFFFF' }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredEvents.length} events match your interests
          </Text>
        </View>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsContainer} showsVerticalScrollIndicator={false}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F0FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  filterText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  stickySection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  resultsHeader: {
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomPadding: {
    height: 100,
  },
});