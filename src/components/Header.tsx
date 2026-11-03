import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Search, 
  Bell, 
  User, 
  BookOpen, 
  SlidersHorizontal 
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
  const { currentScreen, goBack, navigateTo, cartTotalCount, openFilterModal } = useAppStore();
  const cartCount = cartTotalCount();
  const isHome = currentScreen === 'home';

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {/* Left Section: Back Button or Brand Logo */}
        <View style={styles.leftSection}>
          {showBack && !isHome ? (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={goBack}
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={22} color={COLORS.navy} />
            </TouchableOpacity>
          ) : null}

          {isHome || !title ? (
            <TouchableOpacity 
              style={styles.brandContainer} 
              onPress={() => navigateTo('home')}
              activeOpacity={0.8}
            >
              <View style={styles.logoBadge}>
                <BookOpen size={18} color={COLORS.white} strokeWidth={2.4} />
              </View>
              <View>
                <View style={styles.brandTitleRow}>
                  <Text style={styles.brandTitle}>PRINT</Text>
                  <Text style={styles.brandTitleAccent}>BIZZ</Text>
                </View>
                <Text style={styles.brandTagline}>Goa Hub • Express Mumbai</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.screenTitle} numberOfLines={1}>{title}</Text>
          )}
        </View>

        {/* Right Section: Actions */}
        <View style={styles.rightSection}>
          {showFilter && (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={openFilterModal}
              accessibilityLabel="Filter specifications"
            >
              <SlidersHorizontal size={20} color={COLORS.navy} />
            </TouchableOpacity>
          )}

          {showSearch && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => navigateTo('search')}
              accessibilityLabel="Search Black Books"
            >
              <Search size={20} color={COLORS.navy} />
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigateTo('support')}
            accessibilityLabel="Help & Support"
          >
            <Bell size={20} color={COLORS.navy} />
            <View style={styles.dotIndicator} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, styles.cartButton]} 
            onPress={() => navigateTo('cart')}
            accessibilityLabel="Shopping Cart"
          >
            <ShoppingBag size={20} color={COLORS.white} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.avatarButton}
            onPress={() => navigateTo('profile')}
            accessibilityLabel="User Profile"
          >
            <User size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    paddingTop: Platform.OS === 'web' ? SPACING.md : SPACING.base,
    paddingBottom: SPACING.md,
    zIndex: 100,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.darkOrange,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },
  brandTitleAccent: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.oceanBlue,
    letterSpacing: 0.2,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
    letterSpacing: -0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  cartButton: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  dotIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.darkOrange,
  },
  badge: {
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
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.oceanBlue,
  },
});
