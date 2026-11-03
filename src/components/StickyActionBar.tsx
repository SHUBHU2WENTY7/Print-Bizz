import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react-native';

interface StickyActionBarProps {
  onActionPress?: () => void;
  actionTitle?: string;
  showQuantity?: boolean;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({
  onActionPress,
  actionTitle = 'Add to Cart',
  showQuantity = true,
}) => {
  const { currentPrice, customization, updateCustomization, addToCart } = useAppStore();

  const handleMinus = () => {
    if (customization.copies > 1) {
      updateCustomization({ copies: customization.copies - 1 });
    }
  };

  const handlePlus = () => {
    updateCustomization({ copies: customization.copies + 1 });
  };

  const handlePress = () => {
    if (onActionPress) {
      onActionPress();
    } else {
      addToCart();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.bar}>
        {/* Left: Dynamic Pricing & Configuration summary */}
        <View style={styles.priceContainer}>
          <Text style={styles.estLabel}>ESTIMATED TOTAL</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.priceAmount}>{currentPrice.total}</Text>
            {customization.copies > 1 && (
              <Text style={styles.unitNote}>
                (₹{currentPrice.unitPrice}/copy)
              </Text>
            )}
          </View>
          <Text style={styles.specSummary} numberOfLines={1}>
            {customization.paperSize} • {customization.paperGSM.split(' ')[0]} GSM • {customization.binding.split(' ')[0]}
          </Text>
        </View>

        {/* Middle: Interactive Quantity Selector (Matching Reference 4) */}
        {showQuantity && (
          <View style={styles.qtyContainer}>
            <TouchableOpacity 
              style={[styles.qtyBtn, customization.copies <= 1 && styles.qtyBtnDisabled]} 
              onPress={handleMinus}
              disabled={customization.copies <= 1}
              accessibilityLabel="Decrease copies"
            >
              <Minus size={14} color={customization.copies <= 1 ? COLORS.mutedText : COLORS.navy} />
            </TouchableOpacity>
            
            <View style={styles.qtyNumberBox}>
              <Text style={styles.qtyNumber}>
                {customization.copies.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.qtyLabel}>Copies</Text>
            </View>

            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={handlePlus}
              accessibilityLabel="Increase copies"
            >
              <Plus size={14} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        )}

        {/* Right: CTA Button */}
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={handlePress}
          activeOpacity={0.85}
          accessibilityLabel={actionTitle}
        >
          <ShoppingBag size={18} color={COLORS.white} />
          <Text style={styles.actionBtnText}>{actionTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 12,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1000,
    gap: SPACING.md,
  },
  priceContainer: {
    flex: 1.2,
  },
  estLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.secondaryText,
    letterSpacing: 0.6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
  },
  priceAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.5,
  },
  unitNote: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '600',
    marginLeft: 4,
  },
  specSummary: {
    fontSize: 11,
    color: COLORS.oceanBlue,
    fontWeight: '600',
    marginTop: 1,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  qtyBtnDisabled: {
    opacity: 0.4,
    backgroundColor: 'transparent',
  },
  qtyNumberBox: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  qtyLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginTop: -2,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.darkOrange,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});
