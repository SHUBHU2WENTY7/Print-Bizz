import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  User, 
  BookOpen, 
  Heart,
  SlidersHorizontal,
  X,
  Bell
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
    openFilterModal 
  } = useAppStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const cartCount = cartTotalCount();
  const wishlistCount = wishlist.length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const isHome = currentScreen === 'home';

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 600;

  const handleSearchSubmit = () => {
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      addRecentSearch(localSearch.trim());
      navigateTo('explore');
    }
  };

  return (
    <View style={styles.headerWrapper}>
      {/* Primary Top Bar */}
      <View style={styles.mainBar}>
        <View style={styles.topContainer}>
          {/* Left: Back button and Brand Logo */}
          <View style={styles.leftGroup}>
            {showBack && !isHome && (
              <TouchableOpacity 
                style={styles.backBtn} 
                onPress={goBack}
                accessibilityLabel="Go back"
                activeOpacity={0.7}
              >
                <ArrowLeft size={18} color={COLORS.navy} />
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.logoContainer} 
              onPress={() => navigateTo('home')}
              activeOpacity={0.8}
            >
              <View style={styles.logoIconBadge}>
                <BookOpen size={16} color={COLORS.white} strokeWidth={2.4} />
              </View>
              <View>
                <View style={styles.brandTextRow}>
                  <Text style={styles.brandPrint}>PRINT</Text>
                  <Text style={styles.brandBizz}>BIZZ</Text>
                </View>
                {!isMobile && (
                  <Text style={styles.brandSub}>Academic Printing & Binding</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Center Title (If Not Home and Not Searching) */}
          {title && !isHome && (
            <View style={styles.titleCenterWrap}>
              <Text style={styles.screenTitleText} numberOfLines={1}>{title}</Text>
            </View>
          )}

          {/* Desktop Search Bar (Hidden on mobile) */}
          {showSearch && !isMobile && (
            <View style={styles.desktopSearchWrap}>
              <View style={styles.searchFieldWrap}>
                <Search size={15} color={COLORS.mutedText} style={{ marginRight: 6 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search university editions, paper GSM..."
                  placeholderTextColor={COLORS.mutedText}
                  value={localSearch}
                  onChangeText={setLocalSearch}
                  onSubmitEditing={handleSearchSubmit}
                  returnKeyType="search"
                />
                {localSearch ? (
                  <TouchableOpacity 
                    onPress={() => { setLocalSearch(''); setSearchQuery(''); }} 
                    style={{ padding: 4 }}
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
                <SlidersHorizontal size={17} color={COLORS.navy} />
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
                size={18} 
                color={currentScreen === 'wishlist' ? COLORS.darkOrange : COLORS.navy}
                fill={currentScreen === 'wishlist' ? COLORS.darkOrange : 'transparent'} 
              />
              {wishlistCount > 0 && (
                <View style={styles.counterBadge}>
                  <Text style={styles.counterBadgeText}>{wishlistCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Notifications Button (hidden on very small mobile to prevent any overflow) */}
            {!isMobile && (
              <TouchableOpacity 
                style={[styles.iconActionBtn, currentScreen === 'notifications' && styles.iconActionBtnActive]}
                onPress={() => navigateTo('notifications')}
                accessibilityLabel="Notifications"
                activeOpacity={0.7}
              >
                <Bell size={18} color={COLORS.navy} />
                {unreadNotifCount > 0 && <View style={styles.notificationDot} />}
              </TouchableOpacity>
            )}

            {/* Cart Button */}
            <TouchableOpacity 
              style={[styles.cartBtn, currentScreen === 'cart' && styles.cartBtnActive]} 
              onPress={() => navigateTo('cart')}
              accessibilityLabel="Shopping Cart"
              activeOpacity={0.85}
            >
              <ShoppingCart size={17} color={COLORS.white} />
              {!isMobile && <Text style={styles.cartBtnLabel}>Cart</Text>}
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
              <User size={17} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Search Input (Cleanly rendered below top bar on mobile) */}
        {showSearch && isMobile && (
          <View style={styles.mobileSearchRow}>
            <View style={styles.mobileSearchInputWrap}>
              <Search size={14} color={COLORS.mutedText} style={{ marginRight: 6 }} />
              <TextInput
                style={styles.mobileSearchInput}
                placeholder="Search university black books..."
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
            <TouchableOpacity 
              style={styles.mobileSearchBtn}
              onPress={handleSearchSubmit}
            >
              <Text style={styles.mobileSearchBtnText}>Go</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Sub-navbar completely removed per user request */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A', // Soft warm harvest border
    zIndex: 100,
    width: '100%',
  },
  mainBar: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'web' ? 10 : 12,
    paddingBottom: 10,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoIconBadge: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.darkOrange,
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  brandPrint: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },
  brandBizz: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  titleCenterWrap: {
    flex: 1,
    paddingHorizontal: 6,
  },
  screenTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    textAlign: 'center',
  },
  desktopSearchWrap: {
    flex: 1,
    maxWidth: 440,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchFieldWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopLeftRadius: RADIUS.sm,
    borderBottomLeftRadius: RADIUS.sm,
    paddingHorizontal: 10,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primaryText,
    height: '100%',
    padding: 0,
  },
  searchSubmitBtn: {
    backgroundColor: COLORS.darkOrange,
    height: 36,
    paddingHorizontal: 14,
    borderTopRightRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSubmitBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  iconActionBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: '#F8FAFC',
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
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  counterBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.darkOrange,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navy,
    position: 'relative',
  },
  cartBtnActive: {
    backgroundColor: '#1E293B',
  },
  cartBtnLabel: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  cartCountBadge: {
    backgroundColor: COLORS.darkOrange,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
  },
  cartCountBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  profileBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: '#F8FAFC',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    width: '100%',
  },
  mobileSearchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 10,
    height: 34,
  },
  mobileSearchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primaryText,
    padding: 0,
    height: '100%',
  },
  mobileSearchBtn: {
    backgroundColor: COLORS.darkOrange,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSearchBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
