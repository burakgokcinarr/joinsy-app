import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface Props {
  width?: number | string;
  height?: number;
  style?: any;
}

export default function InteractiveMap({ 
  width = '100%', 
  height = 200,
  style 
}: Props) {
  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; }
          iframe { width: 100%; height: 100vh; border: none; }
        </style>
      </head>
      <body>
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.openstreetmap.org/export/embed.html?bbox=-109.16015625000001%2C-16.63619187839765%2C94.57031250000001%2C77.65534600967779&amp;layer=mapnik"
          style="border: none;">
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={[{ width, height }, style]}>
      <WebView
        source={{ html: mapHTML }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
});