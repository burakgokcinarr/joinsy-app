import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import JoinsyHeader from '@/components/JoinsyHeader';
import EventCard from '@/components/EventCard';
import MapEventCard from '@/components/MapEventCard';
//import InteractiveMap from '@/components/InteractiveMap';
import MapDiscovery from '@/components/MapDiscovery';
import * as Location from 'expo-location';
import useLocationStore from '../../zustand/store';

const upcomingEvents = [
  {
    id: 1,
    title: 'Djesse Vol. 4 North American Tour',
    artist: 'Jacob Collier',
    date: 'May 2',
    time: '8:00 PM',
    venue: 'Paramount Theatre',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    price: 45,
    match: 95,
    attendees: 1250,
    category: 'music',
    isFree: false,
  },
  {
    id: 2,
    title: 'Comedy Night Special',
    artist: 'John Mulaney',
    date: 'Apr 28',
    time: '7:30 PM',
    venue: 'Seattle Theatre',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    price: 65,
    match: 88,
    attendees: 850,
    category: 'film',
    isFree: false,
  },
];

export default function HomeScreen() {

  const { location, setLocation, clearLocation } = useLocationStore()
  const [selectedEvent, setSelectedEvent]        = useState<number | null>(null);
  const [userLocation, setUserLocation]          = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg]                  = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setLocation(location.coords);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <JoinsyHeader />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Interactive Map Section */}
        <View style={styles.mapSection}>
          <Text style={styles.mapTitle}>Events Near You</Text>
          <Text style={styles.mapSubtitle}>Tap markers to see event details</Text>
          
          <View style={styles.mapContainer}>
            
            { userLocation && <MapDiscovery location={userLocation?.coords}/>}
            
            
            {/* <View style={styles.mapOverlay}>
              <View style={styles.userLocation}>
                <View style={styles.userPin} />
                <Text style={styles.userLocationText}>You</Text>
              </View>
            </View> */}
          </View>
          
          <TouchableOpacity style={styles.expandMapButton}>
            <Text style={styles.expandMapText}>View Interactive Map</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <Text style={styles.sectionSubtitle}>Based on your Social DNA preferences</Text>
          
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No events found in your area</Text>
              <Text style={styles.emptyStateText}>
                Try expanding your search radius or explore travel packages to discover events in nearby cities
              </Text>
              <TouchableOpacity style={styles.emptyStateButton}>
                <Text style={styles.emptyStateButtonText}>Explore Travel Options</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  mapSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  mapSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapView: {
    borderRadius: 16,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  userLocation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  userPin: {
    width: 12,
    height: 12,
    backgroundColor: '#6366F1',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  userLocationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  expandMapButton: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  expandMapText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  eventsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  emptyStateButton: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});