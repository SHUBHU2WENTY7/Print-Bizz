import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BlackBookProduct } from '../types';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { Star, ShieldCheck, ArrowRight, Heart } from 'lucide-react-native';

interface ProductCardProps {
  product: BlackBookProduct;
  layout?: 'grid' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
}) => {
  const { selectProduct, navigateTo, wishlist, toggleWishlist } = useAppStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleOpenDetails = () => {
    selectProduct(product.id);
    navigateTo('product_details');
  };

  const handleCustomizeDirectly = () => {
    selectProduct(product.id);
    navigateTo('customize');
  };

  return (
    <View style={[styles.card, layout === 'horizontal' && styles.cardHorizontal]}>
      {/* Product Image Area */}
      <View style={[styles.imageContainer, layout === 'horizontal' && styles.imageContainerHorizontal]}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.wishlistBtn}
          onPress={() => toggleWishlist(product.id)}
          accessibilityLabel="Save to wishlist"
        >
          <Heart 
            size={16} 
            color={isWishlisted ? COLORS.darkOrange : COLORS.secondaryText}
            fill={isWishlisted ? COLORS.darkOrange : 'transparent'} 
          />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.infoContainer}>
        {/* Rating and Reviews */}
        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
          <Text style={styles.reviewText}>({product.reviewCount} verified)</Text>
          <View style={styles.hubBadge}>
            <ShieldCheck size={12} color={COLORS.oceanBlue} />
            <Text style={styles.hubBadgeText}>Goa Hub</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.tagline} numberOfLines={1}>{product.tagline}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>

        {/* Pricing & CTA */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.pricePrefix}>Starting at</Text>
            <View style={styles.priceRow}>
              <Text style={styles.currency}>₹</Text>
              <Text style={styles.priceValue}>{product.startingPrice}</Text>
              <Text style={styles.priceSuffix}>/copy</Text>
            </View>
          </View>

          <View style={styles.actionsGroup}>
            <TouchableOpacity 
              style={styles.detailsBtn}
              onPress={handleOpenDetails}
              activeOpacity={0.8}
            >
              <Text style={styles.detailsBtnText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.customizeBtn}
              onPress={handleCustomizeDirectly}
              activeOpacity={0.85}
            >
              <Text style={styles.customizeBtnText}>Customize</Text>
              <ArrowRight size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: SPACING.md,
  },
  cardHorizontal: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    height: 190,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  imageContainerHorizontal: {
    width: 140,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.darkOrange,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: SPACING.base,
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  reviewText: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  hubBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: 'auto',
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  hubBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: -0.2,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkOrange,
    marginTop: 2,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    gap: SPACING.sm,
  },
  pricePrefix: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.secondaryText,
    textTransform: 'uppercase',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.navy,
  },
  priceSuffix: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '500',
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailsBtn: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  customizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: COLORS.navy,
  },
  customizeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
});
