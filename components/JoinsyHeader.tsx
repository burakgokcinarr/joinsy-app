import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface Props {
  title?: string;
  showLogo?: boolean;
  rightElement?: React.ReactNode;
}

export default function JoinsyHeader({ title, showLogo = true, rightElement }: Props) {
  return (
    <View style={styles.container}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            {/* <Sparkles size={20} color="#6366F1" /> */}
            <Image
              style={styles.logoback}
              source={require('../assets/images/joinsy_back.png')}
            />
          </View>
          {/* <Text style={styles.logoText}>Joinsy</Text> */}
        </View>
      )}
      
      {title && !showLogo && (
        <Text style={styles.title}>{title}</Text>
      )}
      
      <View style={styles.spacer} />
      
      {rightElement && (
        <View style={styles.rightContainer}>
          {rightElement}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#E3F0FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366F1',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  spacer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: 'center',
  },
  logoback: {
    width: 80,
    height: 40,
    backgroundColor: '#FFF',
    marginLeft: 8,
  },
});