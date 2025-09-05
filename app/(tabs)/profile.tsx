import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { RefreshCw, MapPin, Camera, X, CreditCard as Edit3 } from 'lucide-react-native';
import SocialDNAHelix from '@/components/socialdna/SocialDNAHelix';
import JoinsyHeader from '@/components/JoinsyHeader';
import { router } from 'expo-router';

const socialDNATags = [
  { name: 'Music', color: '#A78BFA', percentage: 92 },
  { name: 'Films', color: '#F97316', percentage: 85 },
  { name: 'Sports', color: '#10B981', percentage: 78 },
  { name: 'Art', color: '#F59E0B', percentage: 88 },
  { name: 'Travel', color: '#67E8F9', percentage: 91 },
];

const recentEvents = [
  {
    id: 1,
    name: 'Jazz Festival',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    date: 'Jul 15'
  },
  {
    id: 2,
    name: 'Art Gallery',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    date: 'Jul 12'
  },
  {
    id: 3,
    name: 'Concert',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    date: 'Jul 10'
  },
  {
    id: 4,
    name: 'Film Night',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    date: 'Jul 8'
  },
];

const badges = [
  { name: 'Socializer', color: '#A78BFA', icon: '🎉', description: 'Attended 10+ social events this month' },
  { name: 'Music Expert', color: '#F59E0B', icon: '🎵', description: 'Top 5% music event attendance' },
  { name: 'City Explorer', color: '#67E8F9', icon: '🗺️', description: 'Visited events in 5+ cities' },
  { name: 'Early Adopter', color: '#10B981', icon: '🐦', description: 'First to discover trending events' },
];

const visitedCities = [
  'New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Austin',
  'Boston', 'Denver', 'Portland', 'Nashville', 'San Francisco', 'Atlanta'
];

export default function ProfileScreen() {
  const [showCitiesModal, setShowCitiesModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  const refreshButton = (
    <TouchableOpacity style={styles.refreshButton}>
      <RefreshCw size={18} color="#6366F1" />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <JoinsyHeader rightElement={refreshButton} />
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* User Identity Section */}
          <View style={styles.identitySection}>
            <View style={styles.userCard}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
                  style={styles.profilePhoto}
                />
                <TouchableOpacity style={styles.editButton}>
                  <Edit3 size={12} color="#6366F1" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.vibe}>Gives you a friendly vibe</Text>
                <View style={styles.userDetails}>
                  <View style={styles.locationRow}>
                    <MapPin size={12} color="#6B7280" />
                    <Text style={styles.detailText}>New York, NY</Text>
                  </View>
                  <Text style={styles.detailText}>he/him • born 1990</Text>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity 
                    style={styles.connectPlatformButton}
                    onPress={() => router.replace('/onboarding')}>
                    <Text style={styles.platformText}>Connect Platform</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.visitedCitiesButton}
                    onPress={() => setShowCitiesModal(true)}>
                    <Text style={styles.visitedCitiesText}>Visited Cities</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          {/* Social DNA Section */}
          <View style={styles.dnaSection}>
            <Text style={styles.sectionTitle}>Social DNA</Text>
            <View style={styles.dnaContainer}>
              <View style={styles.dnaVisual}>
                <SocialDNAHelix 
                  size={80}
                  accentColors={['#A78BFA', '#F97316', '#10B981', '#F59E0B', '#67E8F9']}
                />
              </View>
              <View style={styles.dnaTags}>
                {socialDNATags.map((tag, index) => (
                  <View key={index} style={styles.dnaTagRow}>
                    <View style={[styles.dnaTag, { backgroundColor: tag.color }]}>
                      <Text style={styles.dnaTagText}>{tag.name}</Text>
                    </View>
                    <Text style={styles.dnaPercentage}>{tag.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Recent Events Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Events</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsContent}>
              {recentEvents.map((event) => (
                <TouchableOpacity key={event.id} style={styles.eventThumbnail}>
                  <Image source={{ uri: event.image }} style={styles.eventImage} />
                  <View style={styles.eventOverlay}>
                    <Text style={styles.eventName} numberOfLines={1}>{event.name}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Badges Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievement Badges</Text>
            <View style={styles.badgesContainer}>
              {badges.map((badge, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.badge, { borderColor: badge.color }]}
                  onPress={() => setSelectedBadge(badge)}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.bottomPadding} />
        </ScrollView>
        
        {/* Floating Camera Button */}
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Cities Modal */}
      <Modal
        visible={showCitiesModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCitiesModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cities I've Visited</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCitiesModal(false)}>
              <X size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalScroll}>
            <View style={styles.citiesGrid}>
              {visitedCities.map((city, index) => (
                <View key={index} style={styles.cityChip}>
                  <Text style={styles.cityText}>{city}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Modal
          visible={!!selectedBadge}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedBadge(null)}>
          <View style={styles.badgeModalOverlay}>
            <View style={styles.badgeModalContent}>
              <Text style={styles.badgeModalIcon}>{selectedBadge.icon}</Text>
              <Text style={styles.badgeModalName}>{selectedBadge.name}</Text>
              <Text style={styles.badgeModalDescription}>{selectedBadge.description}</Text>
              <TouchableOpacity 
                style={[styles.badgeModalClose, { backgroundColor: selectedBadge.color }]}
                onPress={() => setSelectedBadge(null)}>
                <Text style={styles.badgeModalCloseText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  scrollView: {
    flex: 1,
  },
  identitySection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userCard: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  vibe: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  userDetails: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  visitedCitiesButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  connectPlatformButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  visitedCitiesText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
  },
  platformText: {
    color: '#fdfdfdff',
    fontSize: 12,
    fontWeight: '600',
  },
  dnaSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  dnaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dnaVisual: {
    marginRight: 20,
  },
  dnaTags: {
    flex: 1,
    gap: 8,
  },
  dnaTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dnaTag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    marginRight: 8,
  },
  dnaTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  dnaPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    minWidth: 35,
    textAlign: 'right',
  },
  section: {
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
  eventsContent: {
    gap: 12,
  },
  eventThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 6,
  },
  eventName: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventDate: {
    color: '#FFFFFF',
    fontSize: 8,
    textAlign: 'center',
    opacity: 0.9,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  badgeName: {
    color: '#1F2937',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  refreshButton: {
    width: 36,
    height: 36,
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#6366F1',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomPadding: {
    height: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  cityChip: {
    backgroundColor: '#E8D5FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cityText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  badgeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  badgeModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    maxWidth: 280,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  badgeModalIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  badgeModalName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  badgeModalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  badgeModalClose: {
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  badgeModalCloseText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});