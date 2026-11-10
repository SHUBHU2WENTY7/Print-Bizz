import type { ComponentType } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation } from './src/components/BottomNavigation';
import { FilterModal } from './src/components/FilterModal';
import { Header } from './src/components/Header';
import { COLORS } from './src/constants/theme';

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
  const Screen = screens[currentScreen] || HomeScreen;
  const isConfirmation = currentScreen === 'order_confirmation';

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      {!isConfirmation && (
        <Header
          title={currentScreen === 'home' ? undefined : screenTitles[currentScreen]}
          showBack={currentScreen !== 'home'}
          showSearch={currentScreen === 'home' || currentScreen === 'explore' || currentScreen === 'search'}
          showFilter={currentScreen === 'explore' || currentScreen === 'search'}
        />
      )}
      <View style={styles.content}>
        <Screen />
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
});
