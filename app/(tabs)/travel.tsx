import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Users, Gift, MapPin, Plane, Clock, Map } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import JoinsyHeader from '@/components/JoinsyHeader';
import TravelPackageCard from '@/components/TravelPackageCard';
//import InteractiveMap from '@/components/InteractiveMap';
import MapView, { Marker, Callout } from 'react-native-maps';
import DUMMY_DATA from '../../dummy/dummy_map_events.json';
import useLocationStore from '../../zustand/store';

const travelPackages = [
  {
    id: 1,
    artist: 'THE WEEKND',
    city: 'Austin',
    hotel: 'Embassy Suites • 2 nights',
    duration: '3 days',
    price: 100,
    discount: '$100 OFF',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    travelTime: 'Flight • 3h',
    matches: 3,
  },
  {
    id: 2,
    artist: 'WARRIORS vs LAKERS',
    city: 'San Francisco',
    hotel: 'Park Hotel • 1 night',
    duration: '2 days',
    price: 430,
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    travelTime: 'Bus • 5h',
    matches: 5,
  },
];

const nearbyEvents = [
  { city: 'San Diego', distance: 120, events: 8, position: { top: 80, left: 60 } },
  { city: 'Los Angeles', distance: 180, events: 15, position: { top: 60, left: 140 } },
  { city: 'Las Vegas', distance: 200, events: 12, position: { top: 40, left: 220 } },
  { city: 'San Francisco', distance: 250, events: 20, position: { top: 100, left: 180 } },
];

export default function TravelScreen() {

  const { location, setLocation, clearLocation } = useLocationStore()
  
  const [radius, setRadius] = useState(200);
  const filteredEvents = DUMMY_DATA.filter(event => event.distance <= radius);
  const totalEvents = filteredEvents.reduce((sum, event) => sum + event.events, 0);

  return (
    <View style={styles.container}>
      <JoinsyHeader />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Travel & Explore</Text>
            <Text style={styles.headerSubtitle}>Discover events beyond your city</Text>
          </View>

          {/* Interactive Map with Radius */}
          <View style={styles.mapSection}>
            <Text style={styles.mapTitle}>Events Within {radius}km</Text>
            <Text style={styles.eventsCount}>{totalEvents} events available</Text>
            
            
            <View style={styles.mapContainer}>
              <MapView
                style={[styles.mapContainer]}
                initialRegion={{
                    latitude: location?.latitude ?? 51.709082,
                    longitude: location?.longitude ?? 7.480058,
                    latitudeDelta: 0.095,
                    longitudeDelta: 0.095
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapType='satellite'
              >
                {filteredEvents.map((event, index) => (
                  <Marker
                      key={event.id}
                      coordinate={{
                          latitude: event.lat,
                          longitude: event.lng,
                      }}
                      onPress={() => alert(`Pressed marker for event id: ${event.id}`)}
                      //title={event.title}
                  >
                      <TouchableOpacity 
                        key={index}
                        style={[styles.cityPin, event.position]}>
                        <View style={styles.cityMarker}>
                          <Text style={styles.cityName}>{event.city}</Text>
                          <Text style={styles.cityEvents}>{event.events} events</Text>
                        </View>
                      </TouchableOpacity>
                  </Marker>
                ))}
              </MapView>
            </View>
            
            {/* Radius Slider */}
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Search Radius</Text>
              <Slider
                style={styles.slider}
                minimumValue={50}
                maximumValue={500}
                value={radius}
                onValueChange={setRadius}
                step={25}
                minimumTrackTintColor="#6366F1"
                maximumTrackTintColor="#E5E7EB"
                thumbStyle={styles.sliderThumb}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>50km</Text>
                <Text style={styles.sliderLabelText}>500km</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.fullMapButton}>
              <Map size={16} color="#FFFFFF" />
              <Text style={styles.fullMapText}>Open Full Map View</Text>
            </TouchableOpacity>
          </View>

          {/* Travel Packages */}
          <View style={styles.packagesSection}>
            <Text style={styles.sectionTitle}>Event + Travel Packages</Text>
            <Text style={styles.sectionSubtitle}>Complete experiences with accommodation</Text>
            {travelPackages.map((pkg) => (
              <TravelPackageCard key={pkg.id} package={pkg} />
            ))}
          </View>

          {/* Social Features */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Group Benefits</Text>
            
            <View style={styles.socialCard}>
              <Users size={20} color="#10B981" />
              <View style={styles.socialContent}>
                <Text style={styles.socialTitle}>Travel with Friends</Text>
                <Text style={styles.socialSubtitle}>Up to 4 people per package with group discounts</Text>
              </View>
            </View>
            
            <View style={styles.socialCard}>
              <Gift size={20} color="#F59E0B" />
              <View style={styles.socialContent}>
                <Text style={styles.socialTitle}>Group Savings</Text>
                <Text style={styles.socialSubtitle}>Save 15-25% when booking with 2+ friends</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  content: {
    paddingBottom: 100,
  },
  headerSection: {
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
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
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventsCount: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 16,
  },
  mapContainer: {
    height: 180,
    width: '100%'
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
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  userLocationText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  cityPin: {
    position: 'absolute',
  },
  cityMarker: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 60,
  },
  cityName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  cityEvents: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#6366F1',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#6B7280',
  },
  fullMapButton: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fullMapText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  packagesSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  socialSection: {
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
  socialCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialContent: {
    marginLeft: 12,
    flex: 1,
  },
  socialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  socialSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});