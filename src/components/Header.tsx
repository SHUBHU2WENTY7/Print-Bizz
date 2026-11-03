import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  Bell, 
  User, 
  BookOpen, 
  Heart,
  SlidersHorizontal,
  X
} from 'lucide-react-native';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = true,
  showFilter = false,
}) => {
  const { 
    currentScreen, 
    goBack, 
    navigateTo, 
    cartTotalCount, 
    wishlist, 
    notifications,
    searchQuery, 
    setSearchQuery, 
    addRecentSearch,
    setFilterState,
    openFilterModal 
  } = useAppStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const cartCount = cartTotalCount();
  const wishlistCount = wishlist.length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const isHome = currentScreen === 'home';

  const handleSearchSubmit = () => {
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      addRecentSearch(localSearch.trim());
      navigateTo('explore');
    }
  };

  const handleCategoryNav = (cat: string) => {
    if (cat === 'All Products') {
      setFilterState({ category: 'All' });
    } else {
      setFilterState({ category: cat });
    }
    navigateTo('explore');
  };

  const navCategories = [
    'All Products',
    'Black Books',
    'Project Books',
    'Thesis Binding',
    'Spiral Binding',
    'Printing Services',
    'Stationery',
  ];

  return (
    <View style={styles.headerWrapper}>
      {/* Primary Top Bar */}
      <View style={styles.mainBar}>
        <View style={styles.topContainer}>
          {/* Left: Back button or Brand Logo */}
          <View style={styles.leftGroup}>
            {showBack && !isHome && (
              <TouchableOpacity 
                style={styles.backBtn} 
                onPress={goBack}
                accessibilityLabel="Go back"
                activeOpacity={0.7}
              >
                <ArrowLeft size={20} color={COLORS.navy} />
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.logoContainer} 
              onPress={() => navigateTo('home')}
              activeOpacity={0.8}
            >
              <View style={styles.logoIconBadge}>
                <BookOpen size={18} color={COLORS.white} strokeWidth={2.4} />
              </View>
              <View>
                <View style={styles.brandTextRow}>
                  <Text style={styles.brandPrint}>PRINT</Text>
                  <Text style={styles.brandBizz}>BIZZ</Text>
                </View>
                <Text style={styles.brandSub}>Academic Printing & Binding</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Center: Amazon-Style Search Bar */}
          {showSearch && (
            <View style={styles.searchBarContainer}>
              <View style={styles.searchFieldWrap}>
                <Search size={16} color={COLORS.mutedText} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search university black books, thesis binding, paper GSM..."
                  placeholderTextColor={COLORS.mutedText}
                  value={localSearch}
                  onChangeText={setLocalSearch}
                  onSubmitEditing={handleSearchSubmit}
                  returnKeyType="search"
                />
                {localSearch ? (
                  <TouchableOpacity 
                    onPress={() => { setLocalSearch(''); setSearchQuery(''); }} 
                    style={styles.clearSearchBtn}
                  >
                    <X size={14} color={COLORS.secondaryText} />
                  </TouchableOpacity>
                ) : null}
              </View>
              <TouchableOpacity 
                style={styles.searchSubmitBtn}
                onPress={handleSearchSubmit}
                activeOpacity={0.85}
              >
                <Text style={styles.searchSubmitBtnText}>Search</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Right: Actions (Wishlist, Notifications, Cart, Profile) */}
          <View style={styles.rightGroup}>
            {showFilter && (
              <TouchableOpacity 
                style={styles.iconActionBtn}
                onPress={openFilterModal}
                accessibilityLabel="Filter specifications"
              >
                <SlidersHorizontal size={18} color={COLORS.navy} />
              </TouchableOpacity>
            )}

            {/* Wishlist Button */}
            <TouchableOpacity 
              style={[styles.iconActionBtn, currentScreen === 'wishlist' && styles.iconActionBtnActive]}
              onPress={() => navigateTo('wishlist')}
              accessibilityLabel="Saved Wishlist"
              activeOpacity={0.7}
            >
              <Heart 
                size={19} 
                color={currentScreen === 'wishlist' ? COLORS.darkOrange : COLORS.navy}
                fill={currentScreen === 'wishlist' ? COLORS.darkOrange : 'transparent'} 
              />
              {wishlistCount > 0 && (
                <View style={styles.counterBadge}>
                  <Text style={styles.counterBadgeText}>{wishlistCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Notifications Button */}
            <TouchableOpacity 
              style={[styles.iconActionBtn, currentScreen === 'notifications' && styles.iconActionBtnActive]}
              onPress={() => navigateTo('notifications')}
              accessibilityLabel="Notifications"
              activeOpacity={0.7}
            >
              <Bell size={19} color={COLORS.navy} />
              {unreadNotifCount > 0 && <View style={styles.notificationDot} />}
            </TouchableOpacity>

            {/* Cart Button */}
            <TouchableOpacity 
              style={[styles.cartBtn, currentScreen === 'cart' && styles.cartBtnActive]} 
              onPress={() => navigateTo('cart')}
              accessibilityLabel="Shopping Cart"
              activeOpacity={0.85}
            >
              <ShoppingCart size={18} color={COLORS.white} />
              <Text style={styles.cartBtnLabel}>Cart</Text>
              {cartCount > 0 && (
                <View style={styles.cartCountBadge}>
                  <Text style={styles.cartCountBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Profile Avatar Button */}
            <TouchableOpacity 
              style={[styles.profileBtn, currentScreen === 'profile' && styles.profileBtnActive]}
              onPress={() => navigateTo('profile')}
              accessibilityLabel="User Profile & Account"
              activeOpacity={0.8}
            >
              <User size={18} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Search Input (Visible only if narrow) */}
        {showSearch && (
          <View style={styles.mobileSearchRow}>
            <View style={styles.mobileSearchInputWrap}>
              <Search size={15} color={COLORS.mutedText} style={{ marginRight: 6 }} />
              <TextInput
                style={styles.mobileSearchInput}
                placeholder="Search products, binding, or GSM..."
                placeholderTextColor={COLORS.mutedText}
                value={localSearch}
                onChangeText={setLocalSearch}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
              />
              {localSearch ? (
                <TouchableOpacity onPress={() => { setLocalSearch(''); setSearchQuery(''); }}>
                  <X size={14} color={COLORS.secondaryText} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
      </View>

      {/* Sub Navigation Bar: Categories & Shortcuts */}
      <View style={styles.subNavBar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subNavContent}
        >
          {navCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryPill}
              onPress={() => handleCategoryNav(category)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryPillText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.categoryPill}
            onPress={() => navigateTo('support')}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryPillText}>Help & FAQs</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 100,
  },
  mainBar: {
    paddingHorizontal: SPACING.base,
    paddingTop: Platform.OS === 'web' ? SPACING.md : SPACING.base,
    paddingBottom: SPACING.md,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    gap: SPACING.md,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoIconBadge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.darkOrange,
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  brandPrint: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },
  brandBizz: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.secondaryText,
    letterSpacing: 0.2,
  },
  searchBarContainer: {
    flex: 1,
    maxWidth: 580,
    flexDirection: 'row',
    alignItems: 'center',
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  searchFieldWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopLeftRadius: RADIUS.sm,
    borderBottomLeftRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    height: 40,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primaryText,
    height: '100%',
    padding: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },
  searchSubmitBtn: {
    backgroundColor: COLORS.darkOrange,
    height: 40,
    paddingHorizontal: SPACING.base,
    borderTopRightRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSubmitBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconActionBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  iconActionBtnActive: {
    borderColor: COLORS.darkOrange,
    backgroundColor: '#FFF7ED',
  },
  counterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.darkOrange,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  counterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.darkOrange,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 38,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navy,
    position: 'relative',
  },
  cartBtnActive: {
    backgroundColor: '#1E293B',
  },
  cartBtnLabel: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  cartCountBadge: {
    backgroundColor: COLORS.darkOrange,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
  },
  cartCountBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileBtnActive: {
    borderColor: COLORS.navy,
    backgroundColor: '#E2E8F0',
  },
  mobileSearchRow: {
    marginTop: SPACING.sm,
    display: Platform.OS === 'web' ? 'none' : 'flex',
  },
  mobileSearchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
    height: 38,
  },
  mobileSearchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primaryText,
    height: '100%',
  },
  subNavBar: {
    backgroundColor: COLORS.surfaceSubtle,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 6,
  },
  subNavContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    gap: SPACING.sm,
  },
  categoryPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.xs,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
});
