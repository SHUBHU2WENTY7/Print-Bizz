import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BlackBookProduct } from '../types';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { Star, Heart, ArrowRight } from 'lucide-react-native';

interface ProductCardProps {
  product: BlackBookProduct;
  layout?: 'grid' | 'horizontal';
  onCustomize?: () => void;
  onViewDetails?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
  onCustomize,
  onViewDetails,
}) => {
  const { selectProduct, navigateTo, wishlist, toggleWishlist } = useAppStore();
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.originalPrice && product.originalPrice > product.startingPrice
    ? Math.round(((product.originalPrice - product.startingPrice) / product.originalPrice) * 100)
    : null;

  const handleOpenDetails = (e?: any) => {
    e?.stopPropagation?.();
    selectProduct(product.id);
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigateTo('product_details');
    }
  };

  const handleCustomizeDirectly = (e?: any) => {
    e?.stopPropagation?.();
    selectProduct(product.id);
    if (onCustomize) {
      onCustomize();
    } else {
      navigateTo('customize');
    }
  };

  const handleWishlistToggle = (e?: any) => {
    e?.stopPropagation?.();
    toggleWishlist(product.id);
  };

  return (
    <View style={[styles.card, layout === 'horizontal' && styles.cardHorizontal]}>
      {/* Product Image Area */}
      <TouchableOpacity 
        style={[styles.imageContainer, layout === 'horizontal' && styles.imageContainerHorizontal]}
        onPress={handleOpenDetails}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Badges Overlay */}
        <View style={styles.badgeOverlay}>
          {discountPercent ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{discountPercent}% OFF</Text>
            </View>
          ) : product.badge ? (
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>

        {/* Wishlist Button */}
        <TouchableOpacity 
          style={[styles.wishlistBtn, isWishlisted && styles.wishlistBtnActive]}
          onPress={handleWishlistToggle}
          accessibilityLabel={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          activeOpacity={0.8}
        >
          <Heart 
            size={16} 
            color={isWishlisted ? COLORS.darkOrange : COLORS.secondaryText}
            fill={isWishlisted ? COLORS.darkOrange : 'transparent'} 
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Content Area */}
      <View style={styles.infoContainer}>
        {/* Category & Rating Row */}
        <View style={styles.metaRow}>
          <Text style={styles.categoryLabel}>{product.category}</Text>
          <View style={styles.ratingBadge}>
            <Star size={11} color="#D97706" fill="#D97706" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
        </View>

        {/* Product Title */}
        <TouchableOpacity onPress={handleOpenDetails} activeOpacity={0.8}>
          <Text style={styles.title} numberOfLines={2}>
            {product.name}
          </Text>
        </TouchableOpacity>

        {/* Short Description */}
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Pricing & Delivery Tag */}
        <View style={styles.pricingSection}>
          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.priceValue}>{product.startingPrice}</Text>
            {product.originalPrice > product.startingPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
            <Text style={styles.priceSuffix}>/copy</Text>
          </View>
          <Text style={styles.deliveryTag}>Est. delivery 3–5 days</Text>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.detailsBtn}
            onPress={handleOpenDetails}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsBtnText}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.customizeBtn}
            onPress={handleCustomizeDirectly}
            activeOpacity={0.85}
          >
            <Text style={styles.customizeBtnText}>Customize</Text>
            <ArrowRight size={13} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    flex: 1,
    minWidth: 230,
    maxWidth: 320,
    margin: SPACING.xs,
    display: 'flex',
    flexDirection: 'column',
  },
  cardHorizontal: {
    flexDirection: 'row',
    maxWidth: '100%',
    minWidth: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 165,
    backgroundColor: COLORS.surfaceSubtle,
    position: 'relative',
  },
  imageContainerHorizontal: {
    width: 140,
    height: '100%',
    minHeight: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    gap: 4,
  },
  discountBadge: {
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  promoBadge: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  promoBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 10,
  },
  wishlistBtnActive: {
    backgroundColor: '#FFF7ED',
  },
  infoContainer: {
    padding: SPACING.md,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.mutedText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  reviewCount: {
    fontSize: 10,
    color: '#B45309',
    fontWeight: '500',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.navy,
    lineHeight: 20,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 17,
    marginBottom: SPACING.sm,
  },
  pricingSection: {
    marginVertical: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  currencySymbol: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.mutedText,
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  priceSuffix: {
    fontSize: 11,
    color: COLORS.mutedText,
    marginLeft: 2,
  },
  deliveryTag: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  detailsBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  customizeBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: COLORS.navy,
  },
  customizeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});
