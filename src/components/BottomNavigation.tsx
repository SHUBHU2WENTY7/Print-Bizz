import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore, ScreenName } from '../store/useAppStore';
import { 
  Home, 
  Compass, 
  PackageCheck, 
  User 
} from 'lucide-react-native';

export const BottomNavigation: React.FC = () => {
  const { currentScreen, navigateTo, orders } = useAppStore();

  const activeOrdersCount = orders.filter(
    (o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled'
  ).length;

  const tabs: {
    name: string;
    screen: ScreenName;
    icon: (active: boolean) => React.ReactNode;
    badgeCount?: number;
  }[] = [
    {
      name: 'Home',
      screen: 'home',
      icon: (active) => (
        <Home 
          size={22} 
          color={active ? COLORS.navy : COLORS.secondaryText} 
          strokeWidth={active ? 2.5 : 2} 
        />
      ),
    },
    {
      name: 'Explore',
      screen: 'explore',
      icon: (active) => (
        <Compass 
          size={22} 
          color={active ? COLORS.navy : COLORS.secondaryText} 
          strokeWidth={active ? 2.5 : 2} 
        />
      ),
    },
    {
      name: 'My Orders',
      screen: 'my_orders',
      icon: (active) => (
        <PackageCheck 
          size={22} 
          color={active ? COLORS.navy : COLORS.secondaryText} 
          strokeWidth={active ? 2.5 : 2} 
        />
      ),
      badgeCount: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    {
      name: 'Profile',
      screen: 'profile',
      icon: (active) => (
        <User 
          size={22} 
          color={active ? COLORS.navy : COLORS.secondaryText} 
          strokeWidth={active ? 2.5 : 2} 
        />
      ),
    },
  ];

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => navigateTo(tab.screen)}
              activeOpacity={0.7}
              accessibilityLabel={tab.name}
              accessibilityRole="button"
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                {tab.icon(isActive)}
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{tab.badgeCount}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.name}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
    paddingTop: 4,
    alignItems: 'center',
    width: '100%',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.md,
    width: '100%',
    maxWidth: 500,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: RADIUS.md,
  },
  activeIconContainer: {
    backgroundColor: '#F1F5F9',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  activeTabLabel: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.darkOrange,
    marginTop: 2,
  },
  tabBadge: {
    position: 'absolute',
    top: 0,
    right: -3,
    backgroundColor: COLORS.darkOrange,
    minWidth: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  tabBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});
