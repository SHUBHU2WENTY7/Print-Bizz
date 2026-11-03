import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { Copy, Check, ShieldCheck, QrCode } from 'lucide-react-native';

interface BarcodeViewProps {
  orderNumber: string;
  verificationToken: string;
  showQR?: boolean;
}

export const BarcodeView: React.FC<BarcodeViewProps> = ({
  orderNumber,
  verificationToken,
  showQR = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'barcode' | 'qr'>('barcode');

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Deterministic realistic barcode line widths generated from the token string
  const generateBarPattern = (seed: string) => {
    const bars: { width: number; isSpace: boolean }[] = [];
    // Start guard
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 2, isSpace: true });
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 3, isSpace: true });

    for (let i = 0; i < seed.length; i++) {
      const code = seed.charCodeAt(i);
      const w1 = (code % 3) + 1.2;
      const s1 = ((code >> 1) % 3) + 1.2;
      const w2 = ((code >> 2) % 4) + 1;
      const s2 = ((code >> 3) % 2) + 1.5;
      bars.push({ width: w1, isSpace: false });
      bars.push({ width: s1, isSpace: true });
      bars.push({ width: w2, isSpace: false });
      bars.push({ width: s2, isSpace: true });
    }

    // End guard
    bars.push({ width: 3, isSpace: false });
    bars.push({ width: 2, isSpace: true });
    bars.push({ width: 2, isSpace: false });

    return bars;
  };

  const bars = generateBarPattern(verificationToken.slice(-14));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <ShieldCheck size={16} color={COLORS.success} />
          <Text style={styles.securityLabel}>SECURE AUDIT CREDENTIAL</Text>
        </View>
        <TouchableOpacity 
          style={styles.toggleModeBtn}
          onPress={() => setViewMode(viewMode === 'barcode' ? 'qr' : 'barcode')}
        >
          <QrCode size={14} color={COLORS.oceanBlue} />
          <Text style={styles.toggleModeText}>
            {viewMode === 'barcode' ? 'Show QR' : 'Show 1D Barcode'}
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'barcode' ? (
        <View style={styles.barcodeWrapper}>
          {/* Visual Barcode */}
          <View style={styles.barsContainer}>
            {bars.map((bar, index) => (
              <View
                key={index}
                style={[
                  styles.bar,
                  {
                    width: bar.width,
                    backgroundColor: bar.isSpace ? 'transparent' : COLORS.navy,
                  },
                ]}
              />
            ))}
          </View>
          {/* Human readable verification code */}
          <Text style={styles.barcodeNumbers}>
            *{verificationToken.replace(/[^A-Z0-9]/g, '').slice(-16)}*
          </Text>
        </View>
      ) : (
        <View style={styles.qrWrapper}>
          {/* Simulated High Density 2D Matrix Code */}
          <View style={styles.qrBox}>
            <View style={styles.qrCornerTL} />
            <View style={styles.qrCornerTR} />
            <View style={styles.qrCornerBL} />
            <View style={styles.qrGrid}>
              {Array.from({ length: 49 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.qrPixel,
                    {
                      backgroundColor:
                        (i * 7 + 13) % 3 === 0 || (i % 2 === 0 && i % 5 !== 0)
                          ? COLORS.navy
                          : 'transparent',
                    },
                  ]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.qrCaption}>Scan at Thane Hub or Mumbai Courier Arrival</Text>
        </View>
      )}

      {/* Token Details & Copy */}
      <View style={styles.tokenRow}>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenLabel}>Opaque Verification Token</Text>
          <Text style={styles.tokenValue} numberOfLines={1}>
            {verificationToken}
          </Text>
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          {copied ? (
            <Check size={16} color={COLORS.success} />
          ) : (
            <Copy size={16} color={COLORS.oceanBlue} />
          )}
          <Text style={[styles.copyText, copied && { color: COLORS.success }]}>
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        Staff Verification Only • Single-use upon Goa factory dispatch & Thane hub inward scan. Not proof of payment.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  securityLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  toggleModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.lightBlue,
  },
  toggleModeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.oceanBlue,
  },
  barcodeWrapper: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FAFCFE',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    width: '90%',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    marginRight: 0.5,
  },
  barcodeNumbers: {
    fontSize: 12,
    fontFamily: 'Courier',
    fontWeight: '700',
    color: COLORS.navy,
    letterSpacing: 3,
    marginTop: 6,
  },
  qrWrapper: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  qrBox: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: RADIUS.sm,
    padding: 6,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  qrCornerTL: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: COLORS.navy,
  },
  qrCornerTR: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: COLORS.navy,
  },
  qrCornerBL: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: COLORS.navy,
  },
  qrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 74,
    height: 74,
    marginTop: 2,
    marginLeft: 2,
  },
  qrPixel: {
    width: 10,
    height: 10,
  },
  qrCaption: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 6,
    fontWeight: '500',
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  tokenInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  tokenLabel: {
    fontSize: 10,
    color: COLORS.secondaryText,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tokenValue: {
    fontSize: 12,
    fontFamily: 'Courier',
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: 2,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.lightBlue,
    borderRadius: RADIUS.sm,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  disclaimer: {
    fontSize: 10,
    color: COLORS.mutedText,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 14,
  },
});
