import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Check if user is logged in
  // In a real app, you'd check authentication state from storage/context
  const isLoggedIn = false; // This would come from your auth state
  
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/login" />;
  }
}