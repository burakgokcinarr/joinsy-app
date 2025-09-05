import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Plus, Video, Send, Calendar, Users } from 'lucide-react-native';
import JoinsyHeader from '@/components/JoinsyHeader';

const upcomingPlans = [
  {
    id: 1,
    event: 'Summer Jazz Fest',
    date: 'Tomorrow, 7:00 PM',
    attendees: ['Alice', 'Alex'],
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
  },
];

const mockChats = [
  {
    id: 1,
    name: 'Emma',
    lastMessage: 'Are you going to the indie concert tomorrow?',
    time: '2 min ago',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: 'James',
    lastMessage: 'That movie recommendation was perfect! 🎬',
    time: '1 hour ago',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    unread: false,
    online: true,
  },
  {
    id: 3,
    name: 'Sophia',
    lastMessage: 'Thanks for the event suggestion!',
    time: '3 hours ago',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    unread: false,
    online: false,
  },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <JoinsyHeader />

      <View style={styles.content}>
        {/* Start New Conversation */}
        <TouchableOpacity style={styles.startChatButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.startChatText}>Start New Conversation</Text>
        </TouchableOpacity>

        {/* Upcoming Plans */}
        {upcomingPlans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <Image source={{ uri: plan.image }} style={styles.planImage} />
            <View style={styles.planContent}>
              <View style={styles.planHeader}>
                <Calendar size={16} color="#6366F1" />
                <Text style={styles.planTitle}>Upcoming Plan</Text>
              </View>
              <Text style={styles.planEvent}>{plan.event}</Text>
              <Text style={styles.planDate}>{plan.date}</Text>
              <View style={styles.planAttendees}>
                <Users size={14} color="#6B7280" />
                <Text style={styles.planAttendeesText}>
                  {plan.attendees.join(', ')} and you
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Chat List */}
        <ScrollView style={styles.chatsList} showsVerticalScrollIndicator={false}>
          {mockChats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatItem}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: chat.image }} style={styles.avatar} />
                {chat.online && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={[
                  styles.lastMessage,
                  chat.unread && styles.unreadMessage
                ]}>
                  {chat.lastMessage}
                </Text>
              </View>
              
              <View style={styles.chatActions}>
                {chat.unread && <View style={styles.unreadDot} />}
                <TouchableOpacity style={styles.videoButton}>
                  <Video size={18} color="#6366F1" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Message Input */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  startChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startChatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'row',
  },
  planImage: {
    width: 80,
    height: 100,
  },
  planContent: {
    flex: 1,
    padding: 16,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  planEvent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  planDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  planAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planAttendeesText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  chatsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: '#10B981',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1F2937',
  },
  chatActions: {
    alignItems: 'center',
    gap: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#F97316',
    borderRadius: 4,
  },
  videoButton: {
    width: 36,
    height: 36,
    backgroundColor: '#E3F0FF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});