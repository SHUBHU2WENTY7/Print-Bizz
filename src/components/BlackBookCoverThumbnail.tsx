import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GraduationCap, Sparkles } from 'lucide-react-native';

interface BlackBookCoverThumbnailProps {
  editionName: string;
  badge?: string;
  foilColor?: 'gold' | 'silver';
  height?: number;
  startingPrice?: number;
}

export const BlackBookCoverThumbnail: React.FC<BlackBookCoverThumbnailProps> = ({
  editionName,
  badge,
  foilColor = 'gold',
  height = 150,
  startingPrice,
}) => {
  const isSilver = foilColor === 'silver';
  const foilHex = isSilver ? '#E2E8F0' : '#D4AF37';
  const foilBorderHex = isSilver ? '#94A3B8' : '#997300';
  const foilGlow = isSilver ? 'rgba(226, 232, 240, 0.4)' : 'rgba(212, 175, 55, 0.45)';

  return (
    <View style={[styles.container, { height }]}>
      {/* Authentic Midnight Obsidian Rexine Texture */}
      <View style={styles.rexineBackground} />

      {/* Book Spine Highlight Bar & Crease Line */}
      <View style={styles.spineGrip} />
      <View style={styles.spineLine} />

      {/* Outer & Inner 24K Gold/Silver Foil Borders */}
      <View style={[styles.outerFrame, { borderColor: foilHex }]}>
        <View style={[styles.innerFrame, { borderColor: foilBorderHex }]}>
          
          {/* University Seal / Academic Crest */}
          <View style={[styles.sealCircle, { borderColor: foilHex }]}>
            <GraduationCap size={15} color={foilHex} />
          </View>

          {/* Academic Stamping Typography */}
          <Text style={[styles.academicLabel, { color: foilHex }]}>
            UNIVERSITY EDITION
          </Text>
          
          <Text style={[styles.titleText, { color: foilHex, textShadowColor: foilGlow }]} numberOfLines={1}>
            BLACK BOOK
          </Text>

          <Text style={[styles.editionLabel, { color: foilHex }]} numberOfLines={1}>
            {editionName.toUpperCase()}
          </Text>

          {/* Subtle Foil Spec Stamp */}
          <View style={styles.specStampRow}>
            <Sparkles size={8} color={foilHex} />
            <Text style={[styles.specStampText, { color: foilHex }]}>
              THERMAL METALLIC FOIL EMBOSSED
            </Text>
            <Sparkles size={8} color={foilHex} />
          </View>
        </View>
      </View>

      {/* 4 Polished Metallic Corner Tabs */}
      <View style={[styles.cornerTab, styles.cornerTL, { borderColor: foilHex }]} />
      <View style={[styles.cornerTab, styles.cornerTR, { borderColor: foilHex }]} />
      <View style={[styles.cornerTab, styles.cornerBL, { borderColor: foilHex }]} />
      <View style={[styles.cornerTab, styles.cornerBR, { borderColor: foilHex }]} />

      {/* Badge Pill Overlay */}
      {badge ? (
        <View style={styles.badgeOverlay}>
          <Text style={styles.badgeOverlayText}>{badge}</Text>
        </View>
      ) : null}

      {/* Starting Price Pill Overlay */}
      {startingPrice ? (
        <View style={styles.priceOverlay}>
          <Text style={styles.priceOverlayText}>From ₹{startingPrice}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#0A0D12',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rexineBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0D1117',
    opacity: 0.98,
  },
  spineGrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#05070A',
    borderRightWidth: 1,
    borderRightColor: '#1A202C',
  },
  spineLine: {
    position: 'absolute',
    left: 17,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
  },
  outerFrame: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 26,
    right: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    padding: 3,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 0.75,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sealCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 4,
  },
  academicLabel: {
    fontSize: 7.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    opacity: 0.9,
    marginBottom: 2,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  editionLabel: {
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    opacity: 0.95,
    marginTop: 2,
    marginBottom: 4,
    textAlign: 'center',
  },
  specStampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specStampText: {
    fontSize: 6.5,
    fontWeight: '700',
    letterSpacing: 0.6,
    opacity: 0.85,
  },
  cornerTab: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  cornerTL: {
    top: 6,
    left: 22,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTR: {
    top: 6,
    right: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBL: {
    bottom: 6,
    left: 22,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBR: {
    bottom: 6,
    right: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  badgeOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#0F172A',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#D4AF37',
  },
  badgeOverlayText: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  priceOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 26,
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#D4AF37',
  },
  priceOverlayText: {
    color: '#F8FAFC',
    fontSize: 9,
    fontWeight: '700',
  },
});
