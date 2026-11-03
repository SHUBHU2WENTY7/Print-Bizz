import type { ComponentType } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from './src/components/BottomNavigation';
import { FilterModal } from './src/components/FilterModal';
import { Header } from './src/components/Header';
import { COLORS, SPACING } from './src/constants/theme';
import { CartScreen } from './src/screens/CartScreen';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { CustomizeScreen } from './src/screens/CustomizeScreen';
import { DocumentPreviewScreen } from './src/screens/DocumentPreviewScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { OrderConfirmationScreen } from './src/screens/OrderConfirmationScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';
import { ScreenName, useAppStore } from './src/store/useAppStore';

const screens: Partial<Record<ScreenName, ComponentType>> = {
  home: HomeScreen,
  product_details: ProductDetailsScreen,
  customize: CustomizeScreen,
  document_preview: DocumentPreviewScreen,
  cart: CartScreen,
  checkout: CheckoutScreen,
  order_confirmation: OrderConfirmationScreen,
};

const screenTitles: Record<ScreenName, string> = {
  home: 'Home',
  product_details: 'Product Details',
  customize: 'Customize Your Book',
  document_preview: 'Document Preview',
  cart: 'Your Cart',
  checkout: 'Checkout',
  order_confirmation: 'Order Confirmation',
  my_orders: 'My Orders',
  order_tracking: 'Order Tracking',
  profile: 'Profile',
  search: 'Explore',
  support: 'Help & Support',
};

const tabScreens: ScreenName[] = ['home', 'search', 'my_orders', 'order_tracking', 'profile'];

function UnavailableScreen({ screen }: { screen: ScreenName }) {
  const navigateTo = useAppStore((state) => state.navigateTo);

  return (
    <View style={styles.unavailable}>
      <Text style={styles.unavailableTitle}>{screenTitles[screen]}</Text>
      <Text style={styles.unavailableMessage}>
        This section is not available in the app preview yet.
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigateTo('home')}
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const currentScreen = useAppStore((state) => state.currentScreen);
  const Screen = screens[currentScreen];
  const isConfirmation = currentScreen === 'order_confirmation';

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      {!isConfirmation && (
        <Header
          title={currentScreen === 'home' ? undefined : screenTitles[currentScreen]}
          showBack={currentScreen !== 'home'}
          showSearch={currentScreen === 'home' || currentScreen === 'search'}
          showFilter={currentScreen === 'search'}
        />
      )}
      <View style={styles.content}>
        {Screen ? <Screen /> : <UnavailableScreen screen={currentScreen} />}
      </View>
      {tabScreens.includes(currentScreen) && <BottomNavigation />}
      <FilterModal />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  unavailable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  unavailableTitle: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  unavailableMessage: {
    color: COLORS.secondaryText,
    fontSize: 16,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: COLORS.navy,
    borderRadius: 10,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  homeButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
