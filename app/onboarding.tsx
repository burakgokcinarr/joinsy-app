import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Music, 
  Film, 
  Tv, 
  ArrowRight, 
  Sparkles,
  Check,
  Shield,
  Info,
  Link
} from 'lucide-react-native';

const platforms = [
  { 
    name: 'Spotify', 
    icon: Music, 
    color: '#1DB954',
    description: 'Music preferences & playlists',
    privacyNote: 'Only listening history and saved music'
  },
  { 
    name: 'Netflix', 
    icon: Film, 
    color: '#E50914',
    description: 'Movie & TV show preferences',
    privacyNote: 'Only viewing history and ratings'
  },
  { 
    name: 'YouTube', 
    icon: Tv, 
    color: '#FF0000',
    description: 'Video interests & subscriptions',
    privacyNote: 'Only subscriptions and watch history'
  },
];

export default function OnboardingScreen() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const connectPlatform = (platformName: string) => {
    setConnectedPlatforms(prev => 
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const showPrivacyInfo = () => {
    Alert.alert(
      'Data Privacy & Security',
      'We only access public preferences to create your Social DNA. Your personal information is encrypted and never shared. You can disconnect platforms anytime in settings.',
      [{ text: 'Understood', style: 'default' }]
    );
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FAFBFF', '#F0F9FF']}
        style={styles.background}>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                {/* <Sparkles size={28} color="#6366F1" /> */}
                <Image
                  style={styles.logoback}
                  source={require('../assets/images/joinsy_back.png')}
                />
              </View>
              {/* <Text style={styles.appName}>Joinsy</Text> */}
            </View>
            <Text style={styles.tagline}>Create Your Social DNA</Text>
            <Text style={styles.description}>
              Connect your streaming platforms to generate personalized event recommendations and find like-minded people
            </Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Platform Connection Rows */}
            <View style={styles.platformsContainer}>
              {platforms.map((platform) => {
                const IconComponent = platform.icon;
                const isConnected = connectedPlatforms.includes(platform.name);
                
                return (
                  <View key={platform.name} style={styles.platformRow}>
                    <View style={[styles.platformIcon, { backgroundColor: `${platform.color}15` }]}>
                      <IconComponent size={20} color={platform.color} />
                    </View>
                    
                    <View style={styles.platformInfo}>
                      <Text style={styles.platformName}>{platform.name}</Text>
                      <Text style={styles.platformDescription}>{platform.description}</Text>
                    </View>
                    
                    <TouchableOpacity
                      style={[
                        styles.connectButton,
                        isConnected && styles.connectButtonConnected
                      ]}
                      onPress={() => connectPlatform(platform.name)}>
                      {isConnected ? (
                        <>
                          <Check size={12} color="#FFFFFF" />
                          <Text style={styles.connectedText}>Connected</Text>
                        </>
                      ) : (
                        <>
                          <Link size={12} color="#6366F1" />
                          <Text style={styles.connectButtonText}>Connect</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {connectedPlatforms.length} of {platforms.length} platforms connected
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(connectedPlatforms.length / platforms.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            {/* Privacy Notice */}
            <TouchableOpacity style={styles.privacyContainer} onPress={showPrivacyInfo}>
              <Shield size={14} color="#6B7280" />
              <Text style={styles.privacyText}>Your data is secure and private</Text>
              <Info size={14} color="#6366F1" />
            </TouchableOpacity>

            {/* Action Buttons */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                connectedPlatforms.length === 0 && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              disabled={connectedPlatforms.length === 0}>
              <Text style={[
                styles.continueButtonText,
                connectedPlatforms.length === 0 && styles.continueButtonTextDisabled
              ]}>
                {connectedPlatforms.length > 0 ? 'Generate My Social DNA' : 'Connect at least one platform'}
              </Text>
              {connectedPlatforms.length > 0 && (
                <ArrowRight size={16} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleContinue} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 44,
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6366F1',
  },
  tagline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  platformsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  platformDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    minWidth: 90,
    justifyContent: 'center',
  },
  connectButtonConnected: {
    backgroundColor: '#10B981',
  },
  connectButtonText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
  },
  connectedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    gap: 6,
  },
  privacyText: {
    fontSize: 12,
    color: '#6B7280',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    gap: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#9CA3AF',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  logoback: {
    width: 120,
    height: 50,
    backgroundColor: 'transparent',
  },
});