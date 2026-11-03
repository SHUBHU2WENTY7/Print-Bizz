import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react-native';

export const WishlistScreen: React.FC = () => {
  const { wishlist, navigateTo } = useAppStore();

  const wishlistedProducts = BLACK_BOOK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>My Wishlist</Text>
            <Text style={styles.pageSubtitle}>
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for later
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={() => navigateTo('explore')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueBtnText}>Explore More</Text>
            <ArrowRight size={14} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        {wishlistedProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Heart size={36} color={COLORS.mutedText} />
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptyDesc}>
              Save your favorite academic black books, project reports, and binding styles here to customize and order anytime.
            </Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigateTo('explore')}
              activeOpacity={0.85}
            >
              <ShoppingBag size={16} color={COLORS.white} />
              <Text style={styles.exploreBtnText}>Discover Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Products Grid */
          <View style={styles.gridContainer}>
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  pageSubtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  continueBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 1.5,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.base,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  exploreBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'flex-start',
  },
});
