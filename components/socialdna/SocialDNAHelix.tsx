import React from 'react';
import { View, StyleSheet } from 'react-native';

export type SocialDNAHelixProps = {
  size?: number;
  accentColors?: string[];
  showLegend?: boolean;
  ariaLabel?: string;
};

const defaultColors = ['#A78BFA', '#F97316', '#10B981', '#F59E0B', '#67E8F9'];
const categories = ['Music', 'Films', 'Sports', 'Art', 'Travel'];

export default function SocialDNAHelix({
  size = 120,
  accentColors = defaultColors,
  showLegend = false,
  ariaLabel = "Social DNA"
}: SocialDNAHelixProps) {
  const height = Math.round(size * 1.67); // 3:5 aspect ratio
  const strokeWidth = Math.max(2, size * 0.025);
  const rungHeight = Math.max(8, size * 0.067);
  const rungWidth = Math.max(40, size * 0.33);
  
  // Calculate positions for 6 rungs evenly distributed
  const rungPositions = Array.from({ length: 6 }, (_, i) => {
    const y = height * 0.15 + (i * (height * 0.7) / 5);
    return {
      y,
      color: accentColors[i % accentColors.length],
      label: categories[i % categories.length],
      zIndex: i % 2 === 0 ? 1 : 3 // Alternate depth
    };
  });

  // Generate smooth helix curves
  const leftStrandPath = `
    M ${size * 0.25} ${height * 0.1}
    Q ${size * 0.15} ${height * 0.3} ${size * 0.35} ${height * 0.5}
    Q ${size * 0.45} ${height * 0.7} ${size * 0.25} ${height * 0.9}
  `;
  
  const rightStrandPath = `
    M ${size * 0.75} ${height * 0.1}
    Q ${size * 0.85} ${height * 0.3} ${size * 0.65} ${height * 0.5}
    Q ${size * 0.55} ${height * 0.7} ${size * 0.75} ${height * 0.9}
  `;

  const SvgComponent = () => (
    <View style={[styles.container, { width: size, height }]}>
      <View style={[styles.svgContainer, styles.helixAnimation]}>
        {/* Background rungs (behind strands) */}
        {rungPositions
          .filter(rung => rung.zIndex === 1)
          .map((rung, index) => (
            <View
              key={`bg-rung-${index}`}
              style={[
                styles.rung,
                {
                  top: rung.y - rungHeight / 2,
                  left: (size - rungWidth) / 2,
                  width: rungWidth,
                  height: rungHeight,
                  backgroundColor: `${rung.color}20`,
                  borderColor: `${rung.color}40`,
                }
              ]}
            />
          ))}
        
        {/* Left strand */}
        <View style={[styles.strand, styles.leftStrand, { 
          width: strokeWidth,
          height: height * 0.8,
          top: height * 0.1,
          left: size * 0.25 - strokeWidth / 2
        }]} />
        
        {/* Right strand */}
        <View style={[styles.strand, styles.rightStrand, { 
          width: strokeWidth,
          height: height * 0.8,
          top: height * 0.1,
          right: size * 0.25 - strokeWidth / 2
        }]} />
        
        {/* Foreground rungs (in front of strands) */}
        {rungPositions
          .filter(rung => rung.zIndex === 3)
          .map((rung, index) => (
            <View
              key={`fg-rung-${index}`}
              style={[
                styles.rung,
                {
                  top: rung.y - rungHeight / 2,
                  left: (size - rungWidth) / 2,
                  width: rungWidth,
                  height: rungHeight,
                  backgroundColor: `${rung.color}20`,
                  borderColor: `${rung.color}40`,
                }
              ]}
            />
          ))}
      </View>
    </View>
  );

  return <SvgComponent />;
}

// Skeleton variant for loading states
SocialDNAHelix.Skeleton = function SocialDNAHelixSkeleton({ size = 120 }: { size?: number }) {
  const height = Math.round(size * 1.67);
  const strokeWidth = Math.max(2, size * 0.025);
  const rungHeight = Math.max(8, size * 0.067);
  const rungWidth = Math.max(40, size * 0.33);
  
  const rungPositions = Array.from({ length: 6 }, (_, i) => ({
    y: height * 0.15 + (i * (height * 0.7) / 5)
  }));

  return (
    <View style={[styles.container, { width: size, height }]}>
      <View style={styles.svgContainer}>
        {/* Skeleton rungs */}
        {rungPositions.map((rung, index) => (
          <View
            key={`skeleton-rung-${index}`}
            style={[
              styles.rung,
              styles.skeletonRung,
              {
                top: rung.y - rungHeight / 2,
                left: (size - rungWidth) / 2,
                width: rungWidth,
                height: rungHeight,
              }
            ]}
          />
        ))}
        
        {/* Skeleton strands */}
        <View style={[styles.strand, styles.skeletonStrand, { 
          width: strokeWidth,
          height: height * 0.8,
          top: height * 0.1,
          left: size * 0.25 - strokeWidth / 2
        }]} />
        
        <View style={[styles.strand, styles.skeletonStrand, { 
          width: strokeWidth,
          height: height * 0.8,
          top: height * 0.1,
          right: size * 0.25 - strokeWidth / 2
        }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  helixAnimation: {
    // Animation will be handled by transform if needed
  },
  strand: {
    position: 'absolute',
    borderRadius: 999,
  },
  leftStrand: {
    backgroundColor: '#6366F1', // Cool gradient approximation
  },
  rightStrand: {
    backgroundColor: '#A855F7', // Warm gradient approximation
  },
  rung: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
  },
  skeletonStrand: {
    backgroundColor: '#E5E7EB',
  },
  skeletonRung: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
});