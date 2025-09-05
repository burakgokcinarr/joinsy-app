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
import { Heart, Calendar, MapPin, MessageCircle, X, Star, Users } from 'lucide-react-native';
import JoinsyHeader from '@/components/JoinsyHeader';

const topMatches = [
  {
    id: 1,
    name: 'Alice',
    age: 28,
    location: 'Brooklyn, NY',
    match: 92,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    color: '#A78BFA',
    bio: 'Jazz enthusiast who loves discovering new artists and attending intimate venue concerts. Always up for exploring the city\'s cultural scene.',
    sharedInterests: ['Music', 'Films', 'Art'],
    distance: '2.3 km away',
    mutualFriends: 3,
  },
  {
    id: 2,
    name: 'Alex',
    age: 26,
    location: 'Manhattan, NY',
    match: 87,
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    color: '#F97316',
    bio: 'Concert goer and art gallery visitor who enjoys exploring the city cultural scene and meeting new people.',
    sharedInterests: ['Music', 'Art', 'Travel'],
    distance: '1.8 km away',
    mutualFriends: 5,
  },
  {
    id: 3,
    name: 'Jordan',
    age: 30,
    location: 'Queens, NY',
    match: 85,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    color: '#FB7185',
    bio: 'Sports fan and music lover who never misses a good live performance or game night with friends.',
    sharedInterests: ['Sports', 'Music'],
    distance: '4.1 km away',
    mutualFriends: 2,
  },
];

const recommendedEvents = [
  {
    id: 1,
    title: 'Summer Jazz Festival',
    date: 'Jul 20',
    time: '7:00 PM',
    venue: 'Downtown Arena',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    sharedInterest: 'You and Alex both love jazz and live music',
    matchedFriend: 'Alex',
    price: 45,
    attendees: 850,
  },
];

export default function MatchesScreen() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [likedUsers, setLikedUsers] = useState<number[]>([]);

  const handleLike = (userId: number) => {
    setLikedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const chatButton = (
    <TouchableOpacity style={styles.chatButton}>
      <MessageCircle size={18} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <JoinsyHeader rightElement={chatButton} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Match Insight Header */}
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>
                You and Alex share a lot of common music interests
              </Text>
              <Text style={styles.insightSubtitle}>
                92% compatibility • 3 shared interests • 5 mutual friends
              </Text>
            </View>
            
            {/* Top Matches */}
            <Text style={styles.sectionTitle}>Your Top Matches</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.matchesContent}>
              {topMatches.map((match) => (
                <TouchableOpacity 
                  key={match.id} 
                  style={styles.matchCard}
                  onPress={() => setSelectedMatch(match)}
                  activeOpacity={0.95}>
                  
                  <View style={styles.matchImageContainer}>
                    <Image source={{ uri: match.image }} style={styles.matchImage} />
                    <View style={[styles.matchBadge, { backgroundColor: match.color }]}>
                      <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
                      <Text style={styles.matchPercentage}>{match.match}%</Text>
                    </View>
                  </View>
                  
                  <View style={styles.matchInfo}>
                    <Text style={styles.matchName}>{match.name}, {match.age}</Text>
                    <Text style={styles.matchLocation}>{match.distance}</Text>
                    <Text style={styles.matchBio} numberOfLines={3}>{match.bio}</Text>
                    
                    <View style={styles.matchStats}>
                      <View style={styles.statItem}>
                        <Users size={12} color="#6B7280" />
                        <Text style={styles.statText}>{match.mutualFriends} mutual</Text>
                      </View>
                    </View>
                    
                    <View style={styles.sharedInterestsContainer}>
                      {match.sharedInterests.slice(0, 3).map((interest, index) => (
                        <View key={index} style={[styles.interestTag, { backgroundColor: `${match.color}20` }]}>
                          <Text style={[styles.interestText, { color: match.color }]}>{interest}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.matchActions}>
                    <TouchableOpacity 
                      style={[
                        styles.likeButton, 
                        { backgroundColor: match.color },
                        likedUsers.includes(match.id) && styles.likeButtonLiked
                      ]}
                      onPress={() => handleLike(match.id)}>
                      <Heart 
                        size={14} 
                        color="#FFFFFF" 
                        fill={likedUsers.includes(match.id) ? "#FFFFFF" : "transparent"} 
                      />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.chatMatchButton}>
                      <MessageCircle size={14} color="#6366F1" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Recommended Events */}
            {/* Recommended Events */}
            <View style={styles.eventsSection}>
              <Text style={styles.sectionTitle}>Recommended Events</Text>
              <Text style={styles.sectionSubtitle}>Events you and Alex would enjoy together</Text>
              
              {recommendedEvents.length > 0 ? (
                recommendedEvents.map((event) => (
                  <View key={event.id} style={styles.eventCard}>
                    <Image source={{ uri: event.image }} style={styles.eventImage} />
                    
                    <View style={styles.eventContent}>
                      <View style={styles.eventHeader}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.priceBadge}>
                          <Text style={styles.priceText}>${event.price}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.eventInsight}>{event.sharedInterest}</Text>
                      
                      <View style={styles.eventDetails}>
                        <View style={styles.eventDetailRow}>
                          <Calendar size={14} color="#6B7280" />
                          <Text style={styles.eventDetailText}>{event.date} • {event.time}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                          <MapPin size={14} color="#6B7280" />
                          <Text style={styles.eventDetailText}>{event.venue}</Text>
                        </View>
                        <View style={styles.eventDetailRow}>
                          <Users size={14} color="#6B7280" />
                          <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
                        </View>
                      </View>
                      
                      <TouchableOpacity style={styles.recommendButton}>
                        <Heart size={16} color="#FFFFFF" />
                        <Text style={styles.recommendButtonText}>
                          Recommend going with {event.matchedFriend}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyEventsState}>
                  <Calendar size={48} color="#D1D5DB" />
                  <Text style={styles.emptyEventsTitle}>No recommended events yet</Text>
                  <Text style={styles.emptyEventsText}>
                    Try updating your interests or connecting more platforms to get personalized recommendations!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Match Detail Modal */}
      {selectedMatch && (
        <Modal
          visible={!!selectedMatch}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedMatch(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profile Details</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedMatch(null)}>
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <View style={styles.profileModalContent}>
                <View style={styles.profileImageContainer}>
                  <Image source={{ uri: selectedMatch.image }} style={styles.profileImage} />
                  <View style={[styles.profileMatchBadge, { backgroundColor: selectedMatch.color }]}>
                    <Star size={12} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={styles.profileMatchText}>{selectedMatch.match}%</Text>
                  </View>
                </View>
                
                <Text style={styles.profileName}>{selectedMatch.name}, {selectedMatch.age}</Text>
                <Text style={styles.profileLocation}>{selectedMatch.location}</Text>
                <Text style={styles.profileDistance}>{selectedMatch.distance}</Text>
                
                <View style={styles.profileStats}>
                  <View style={styles.profileStatItem}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.profileStatText}>{selectedMatch.mutualFriends} mutual friends</Text>
                  </View>
                </View>
                
                <Text style={styles.profileBio}>{selectedMatch.bio}</Text>
                
                <View style={styles.profileInterests}>
                  <Text style={styles.interestsTitle}>Shared Interests</Text>
                  <View style={styles.interestsGrid}>
                    {selectedMatch.sharedInterests.map((interest: string, index: number) => (
                      <View key={index} style={[styles.interestChip, { backgroundColor: selectedMatch.color }]}>
                        <Text style={styles.interestChipText}>{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.profileActions}>
                  <TouchableOpacity style={styles.chatActionButton}>
                    <MessageCircle size={16} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Start Chat</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.likeActionButton, { backgroundColor: selectedMatch.color }]}
                    onPress={() => handleLike(selectedMatch.id)}>
                    <Heart 
                      size={16} 
                      color="#FFFFFF" 
                      fill={likedUsers.includes(selectedMatch.id) ? "#FFFFFF" : "transparent"} 
                    />
                    <Text style={styles.actionButtonText}>
                      {likedUsers.includes(selectedMatch.id) ? 'Liked' : 'Like'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  chatButton: {
    width: 36,
    height: 36,
    backgroundColor: '#6366F1',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 26,
    textAlign: 'center',
  },
  insightSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  matchesContent: {
    gap: 16,
    marginBottom: 32,
  },
  matchCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  matchImageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  matchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  matchBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 2,
  },
  matchPercentage: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  matchInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  matchLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  matchBio: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  matchStats: {
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  sharedInterestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
    marginBottom: 12,
  },
  interestTag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  interestText: {
    fontSize: 10,
    fontWeight: '600',
  },
  matchActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  likeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  likeButtonLiked: {
    transform: [{ scale: 1.1 }],
  },
  chatMatchButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  eventsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  priceBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  eventInsight: {
    fontSize: 14,
    color: '#6366F1',
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  eventDetails: {
    gap: 6,
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDetailText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  recommendButton: {
    backgroundColor: '#6366F1',
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyEventsState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyEventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyEventsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
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
    paddingBottom: 16,
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
  profileModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileMatchBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  profileMatchText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  profileDistance: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 12,
  },
  profileStats: {
    marginBottom: 16,
  },
  profileStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileStatText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  profileBio: {
    fontSize: 15,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  profileInterests: {
    width: '100%',
    marginBottom: 32,
  },
  interestsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  interestChip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  interestChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  chatActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 24,
    paddingVertical: 14,
    gap: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  likeActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});