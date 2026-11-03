import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Filter, 
  Check, 
  RotateCcw 
} from 'lucide-react-native';

export const ExploreScreen: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filterState, 
    setFilterState, 
    resetFilters,
    navigateTo 
  } = useAppStore();

  const [sortOption, setSortOption] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [selectedCategory, setSelectedCategory] = useState<string>(filterState.category || 'All');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(filterState.maxPrice || 1000);

  const categories = [
    'All',
    'Black Books',
    'Project Books',
    'Thesis Binding',
    'Spiral Binding',
    'Hardcover Binding',
    'Printing Services',
    'Stationery',
  ];

  const filteredProducts = useMemo(() => {
    let result = [...BLACK_BOOK_PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.popularFor.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Max Price filter
    if (selectedMaxPrice) {
      result = result.filter((p) => p.startingPrice <= selectedMaxPrice);
    }

    // Sorting
    if (sortOption === 'price_low') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortOption === 'price_high') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMaxPrice, sortOption]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedMaxPrice(1000);
    setSortOption('popular');
    resetFilters();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        {/* Breadcrumb / Title Bar */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>All Products & Printing Services</Text>
            <Text style={styles.pageSubtitle}>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
              {searchQuery ? ` for "${searchQuery}"` : ''}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </Text>
          </View>

          {/* Quick Active Filters Clear */}
          {(searchQuery || selectedCategory !== 'All' || selectedMaxPrice < 1000) && (
            <TouchableOpacity 
              style={styles.resetBtn} 
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <RotateCcw size={13} color={COLORS.darkOrange} />
              <Text style={styles.resetBtnText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Horizontal Filter Pills */}
        <View style={styles.categoryPillsWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPillsScroll}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catPill, isSelected && styles.catPillSelected]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.catPillText, isSelected && styles.catPillTextSelected]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Controls Bar: Sort Dropdown & Quick Price Filter */}
        <View style={styles.controlsBar}>
          {/* Sort Buttons */}
          <View style={styles.sortGroup}>
            <Text style={styles.controlLabel}>Sort by:</Text>
            {[
              { id: 'popular', label: 'Popular' },
              { id: 'rating', label: 'Top Rated' },
              { id: 'price_low', label: 'Price: Low' },
              { id: 'price_high', label: 'Price: High' },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[styles.sortPill, sortOption === opt.id && styles.sortPillActive]}
                onPress={() => setSortOption(opt.id as any)}
              >
                <Text style={[styles.sortPillText, sortOption === opt.id && styles.sortPillTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range Filter Pills */}
          <View style={styles.priceFilterGroup}>
            <Text style={styles.controlLabel}>Budget:</Text>
            {[
              { label: 'All', max: 1000 },
              { label: '< ₹300', max: 300 },
              { label: '< ₹500', max: 500 },
            ].map((p) => (
              <TouchableOpacity
                key={p.label}
                style={[styles.pricePill, selectedMaxPrice === p.max && styles.pricePillActive]}
                onPress={() => setSelectedMaxPrice(p.max)}
              >
                <Text style={[styles.pricePillText, selectedMaxPrice === p.max && styles.pricePillTextActive]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Filter size={40} color={COLORS.mutedText} />
            <Text style={styles.emptyTitle}>No matching products found</Text>
            <Text style={styles.emptyDesc}>
              {'Try clearing your filters or searching for terms like "black book", "thesis", or "spiral".'}
            </Text>
            <TouchableOpacity style={styles.emptyResetBtn} onPress={handleReset}>
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {filteredProducts.map((product) => (
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
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
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
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: COLORS.darkOrange,
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  categoryPillsWrap: {
    marginBottom: SPACING.md,
  },
  categoryPillsScroll: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  catPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catPillSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  catPillTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  controlsBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  sortGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  priceFilterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    marginRight: 4,
  },
  sortPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortPillActive: {
    backgroundColor: '#F0F9FF',
    borderColor: COLORS.oceanBlue,
  },
  sortPillText: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  sortPillTextActive: {
    color: COLORS.oceanBlue,
    fontWeight: '700',
  },
  pricePill: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pricePillActive: {
    backgroundColor: '#F0F9FF',
    borderColor: COLORS.oceanBlue,
  },
  pricePillText: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  pricePillTextActive: {
    color: COLORS.oceanBlue,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  emptyResetBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  emptyResetBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'flex-start',
  },
});
