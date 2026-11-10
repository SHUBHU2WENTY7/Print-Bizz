import type { ComponentType } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { BottomNavigation } from './src/components/BottomNavigation';
import { FilterModal } from './src/components/FilterModal';
import { Header } from './src/components/Header';
import { COLORS } from './src/constants/theme';

import { AuthOnboardingScreen } from './src/screens/AuthOnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';
import { CustomizeScreen } from './src/screens/CustomizeScreen';
import { DocumentUploadScreen } from './src/screens/DocumentUploadScreen';
import { VirtualBookPreviewScreen } from './src/screens/VirtualBookPreviewScreen';
import { CartScreen } from './src/screens/CartScreen';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { OrderConfirmationScreen } from './src/screens/OrderConfirmationScreen';
import { MyOrdersScreen } from './src/screens/MyOrdersScreen';
import { OrderDetailsScreen } from './src/screens/OrderDetailsScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SavedAddressesScreen } from './src/screens/SavedAddressesScreen';
import { MyDocumentsScreen } from './src/screens/MyDocumentsScreen';
import { SupportScreen } from './src/screens/SupportScreen';

import { ScreenName, useAppStore } from './src/store/useAppStore';

const screens: Record<ScreenName, ComponentType> = {
  home: HomeScreen,
  auth_onboarding: AuthOnboardingScreen,
  explore: ExploreScreen,
  product_details: ProductDetailsScreen,
  customize: CustomizeScreen,
  document_upload: DocumentUploadScreen,
  book_preview: VirtualBookPreviewScreen,
  document_preview: VirtualBookPreviewScreen,
  cart: CartScreen,
  checkout: CheckoutScreen,
  order_confirmation: OrderConfirmationScreen,
  my_orders: MyOrdersScreen,
  order_details: OrderDetailsScreen,
  wishlist: WishlistScreen,
  notifications: NotificationsScreen,
  profile: ProfileScreen,
  saved_addresses: SavedAddressesScreen,
  my_documents: MyDocumentsScreen,
  support: SupportScreen,
  search: ExploreScreen,
};

const screenTitles: Record<ScreenName, string> = {
  home: 'Print Bizz',
  auth_onboarding: 'Student Verification & Sign-In',
  explore: 'Explore Products',
  product_details: 'Product Details',
  customize: 'Customize Your Black Book',
  document_upload: 'Upload Document',
  book_preview: 'Virtual Black Book Preview',
  document_preview: 'Virtual Black Book Preview',
  cart: 'Shopping Cart',
  checkout: 'Checkout',
  order_confirmation: 'Order Confirmation',
  my_orders: 'My Orders',
  order_details: 'Order Details',
  wishlist: 'My Wishlist',
  notifications: 'Notifications',
  profile: 'Profile & Account',
  saved_addresses: 'Saved Addresses',
  my_documents: 'My Documents',
  support: 'Help & Support',
  search: 'Search Products',
};

// Bottom tabs navigation is shown on these primary screens
const tabScreens: ScreenName[] = ['home', 'explore', 'my_orders', 'profile', 'search'];

export default function App() {
  const currentScreen = useAppStore((state) => state.currentScreen);
  const userProfile = useAppStore((state) => state.userProfile);

  // If user hasn't completed onboarding/sign-in, direct to auth_onboarding
  const activeScreenName: ScreenName = !userProfile.isRegistered ? 'auth_onboarding' : currentScreen;
  const Screen = screens[activeScreenName] || HomeScreen;
  const isConfirmation = activeScreenName === 'order_confirmation';
  const isOnboarding = activeScreenName === 'auth_onboarding';

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      {!isConfirmation && !isOnboarding && (
        <Header
          title={activeScreenName === 'home' ? undefined : screenTitles[activeScreenName]}
          showBack={activeScreenName !== 'home'}
          showSearch={activeScreenName === 'home' || activeScreenName === 'explore' || activeScreenName === 'search'}
          showFilter={activeScreenName === 'explore' || activeScreenName === 'search'}
        />
      )}
      <View style={styles.content}>
        <Screen />
      </View>
      {!isOnboarding && tabScreens.includes(activeScreenName) && <BottomNavigation />}
      <FilterModal />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#FFFDF7',
    ...(Platform.OS === 'web' ? {
      backgroundImage: `
        radial-gradient(at 15% 12%, #FDE68A 0px, transparent 50%),
        radial-gradient(at 85% 15%, #FBBF24 0px, transparent 48%),
        radial-gradient(at 50% 45%, #FED7AA 0px, transparent 55%),
        radial-gradient(at 80% 85%, #FECDD3 0px, transparent 50%),
        radial-gradient(at 15% 85%, #FEF3C7 0px, transparent 45%),
        #FFFDF7
      `,
      backgroundAttachment: 'fixed',
    } as any : {}),
  },
  content: {
    flex: 1,
  },
});
