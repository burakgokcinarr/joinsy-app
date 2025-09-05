import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Plane, Clock, Users, Tag, Star } from 'lucide-react-native';

interface TravelPackage {
  id: number;
  artist: string;
  city: string;
  hotel: string;
  duration: string;
  price: number;
  discount?: string;
  image: string;
  travelTime: string;
  matches: number;
}

interface Props {
  package: TravelPackage;
  onPress?: () => void;
}

export default function TravelPackageCard({ package: pkg, onPress }: Props) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.95}>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: pkg.image }} style={styles.image} />
        {pkg.discount && (
          <View style={styles.discountBadge}>
            <Tag size={12} color="#FFFFFF" />
            <Text style={styles.discountText}>{pkg.discount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.artist}>{pkg.artist}</Text>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.city}>{pkg.city}</Text>
        </View>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Plane size={12} color="#6B7280" />
            <Text style={styles.detailText}>{pkg.travelTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.detailText}>{pkg.duration}</Text>
          </View>
        </View>
        
        <Text style={styles.hotel}>{pkg.hotel}</Text>
        
        <View style={styles.socialInfo}>
          <View style={styles.matchesInfo}>
            <Users size={12} color="#10B981" />
            <Text style={styles.matchesText}>{pkg.matches} potential matches</Text>
          </View>
          
          <View style={styles.ratingInfo}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>4.8 rating</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${pkg.price}</Text>
            <Text style={styles.priceLabel}>per person</Text>
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.friendsButton}>
              <Users size={14} color="#6366F1" />
              <Text style={styles.friendsButtonText}>With Friends</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Package</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  artist: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  city: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  hotel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  socialInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  matchesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  matchesText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  footer: {
    gap: 12,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  priceLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  friendsButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  friendsButtonText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});