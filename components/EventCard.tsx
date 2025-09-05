import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { Calendar, MapPin, Users, Star, Ticket, Gift, Bell, X, Share } from 'lucide-react-native';

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  price: number;
  match: number;
  attendees: number;
  category: string;
  isFree: boolean;
}

interface Props {
  event: Event;
  onJoin?: () => void;
  showMatchBadge?: boolean;
}

export default function EventCard({ event, onJoin, showMatchBadge = true }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    setIsJoined(true);
    onJoin?.();
    setTimeout(() => setIsJoined(false), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      music: '#A78BFA',
      film: '#F97316', 
      sports: '#10B981',
      art: '#F59E0B',
      gaming: '#FB7185',
    };
    return colors[category.toLowerCase()] || '#6366F1';
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return '#10B981';
    if (match >= 80) return '#F59E0B';
    if (match >= 70) return '#F97316';
    return '#6B7280';
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => setShowDetails(true)}
        activeOpacity={0.95}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          
          <View style={styles.topBadges}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(event.category) }
            ]}>
              <Text style={styles.categoryText}>{event.category.toUpperCase()}</Text>
            </View>
            
            {showMatchBadge && (
              <View style={[
                styles.matchBadge,
                { backgroundColor: getMatchColor(event.match) }
              ]}>
                <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.matchText}>{event.match}%</Text>
              </View>
            )}
          </View>
          
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              {event.isFree ? 'FREE' : `$${event.price}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{event.artist}</Text>
          
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Calendar size={12} color="#6B7280" />
              <Text style={styles.detailText}>{event.date} • {event.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={12} color="#6B7280" />
              <Text style={styles.detailText} numberOfLines={1}>{event.venue}</Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={12} color="#6B7280" />
              <Text style={styles.detailText}>{event.attendees.toLocaleString()} attending</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[
              styles.joinButton,
              isJoined && styles.joinButtonSuccess
            ]}
            onPress={handleJoin}
            activeOpacity={0.8}>
            <Ticket size={14} color="#FFFFFF" />
            <Text style={styles.joinButtonText}>
              {isJoined ? 'Joined!' : event.isFree ? 'Join Event' : 'Buy Ticket'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Event Details Modal */}
      <Modal
        visible={showDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetails(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Event Details</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowDetails(false)}>
              <X size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalScroll}>
            <Image source={{ uri: event.image }} style={styles.modalImage} />
            
            <View style={styles.modalContent}>
              <Text style={styles.modalEventTitle}>{event.title}</Text>
              <Text style={styles.modalArtist}>{event.artist}</Text>
              
              <View style={styles.modalDetails}>
                <View style={styles.modalDetailRow}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.modalDetailText}>{event.date} at {event.time}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.modalDetailText}>{event.venue}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.modalDetailText}>{event.attendees.toLocaleString()} people attending</Text>
                </View>
              </View>
              
              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.optionButton}>
                  <Users size={18} color="#6366F1" />
                  <Text style={styles.optionText}>Invite friends</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionButton}>
                  <Star size={18} color="#A78BFA" />
                  <Text style={styles.optionText}>Go with a match</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionButton}>
                  <Gift size={18} color="#F97316" />
                  <Text style={styles.optionText}>Send as gift</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionButton}>
                  <Share size={18} color="#10B981" />
                  <Text style={styles.optionText}>Share event</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.modalJoinButton} onPress={handleJoin}>
                <Ticket size={16} color="#FFFFFF" />
                <Text style={styles.modalJoinText}>
                  {event.isFree ? 'Join Event' : `Buy Ticket - $${event.price}`}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
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
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  matchText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  priceBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  artist: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  details: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  actionSection: {
    padding: 16,
    paddingTop: 0,
  },
  joinButton: {
    backgroundColor: '#6366F1',
    borderRadius: 24,
    paddingVertical: 14,
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
  joinButtonSuccess: {
    backgroundColor: '#10B981',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalContent: {
    padding: 20,
  },
  modalEventTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  modalArtist: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    fontWeight: '500',
  },
  modalDetails: {
    gap: 12,
    marginBottom: 24,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalDetailText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalOptions: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalJoinButton: {
    backgroundColor: '#6366F1',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalJoinText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});