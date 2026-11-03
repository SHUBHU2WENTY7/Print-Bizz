import { create } from 'zustand';
import { 
  BlackBookProduct, 
  CartItem, 
  CustomizationState, 
  CustomerAddress, 
  FilterState, 
  Order, 
  UploadedDocument, 
  PriceBreakdown 
} from '../types';
import { BLACK_BOOK_PRODUCTS, INITIAL_CUSTOMIZATION } from '../constants/products';
import { calculatePrice } from '../services/pricingService';
import { api, MOCK_EXISTING_ORDERS, MOCK_SAVED_ADDRESSES, INITIAL_TRACKING_STAGES } from '../services/apiService';

export type ScreenName = 
  | 'home'
  | 'product_details'
  | 'customize'
  | 'document_preview'
  | 'cart'
  | 'checkout'
  | 'order_confirmation'
  | 'my_orders'
  | 'order_tracking'
  | 'profile'
  | 'search'
  | 'support';

interface AppStore {
  // Navigation
  currentScreen: ScreenName;
  screenHistory: ScreenName[];
  navigateTo: (screen: ScreenName) => void;
  goBack: () => void;

  // Selected Product & Customization
  selectedProduct: BlackBookProduct;
  selectProduct: (productId: string) => void;
  customization: CustomizationState;
  updateCustomization: (updater: Partial<CustomizationState> | ((prev: CustomizationState) => Partial<CustomizationState>)) => void;
  resetCustomization: () => void;

  // Document Upload
  uploadedDocument: UploadedDocument | null;
  setUploadedDocument: (doc: UploadedDocument | null) => void;
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;

  // Dynamic Pricing for current customization
  currentPrice: PriceBreakdown;
  recalculatePrice: () => void;

  // Cart
  cart: CartItem[];
  addToCart: () => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotalCount: () => number;

  // Addresses
  addresses: CustomerAddress[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (addr: Omit<CustomerAddress, 'id'>) => void;

  // Orders & Tracking
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (paymentMethod: Order['paymentMethod'], deliveryInstructions?: string) => Promise<Order>;

  // Filter Modal
  isFilterModalVisible: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  filterState: FilterState;
  setFilterState: (updater: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;

  // Profile
  userProfile: {
    name: string;
    email: string;
    phone: string;
    college: string;
  };
  updateUserProfile: (profile: Partial<AppStore['userProfile']>) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const defaultCustomization: CustomizationState = {
  productId: 'customized-black-book',
  paperSize: 'A4',
  paperGSM: '80 GSM Bond',
  printType: 'Black & White',
  printSides: 'Double-Sided (Recommended)',
  pageSelection: 'All Pages',
  customPageRange: '1-80',
  copies: 1,
  binding: 'Golden Embossed Hardcover (Standard)',
  cover: { ...INITIAL_CUSTOMIZATION.cover },
  addOns: { ...INITIAL_CUSTOMIZATION.addOns },
};

const defaultFilters: FilterState = {
  category: 'All',
  minPrice: 200,
  maxPrice: 800,
  paperGSM: 'All GSM',
  bindingType: 'All Bindings',
  sortBy: 'popular',
};

export const useAppStore = create<AppStore>((set, get) => ({
  // Navigation
  currentScreen: 'home',
  screenHistory: ['home'],
  navigateTo: (screen) => {
    set((state) => {
      // Don't duplicate consecutive screen
      if (state.currentScreen === screen) return state;
      return {
        currentScreen: screen,
        screenHistory: [...state.screenHistory, screen],
      };
    });
  },
  goBack: () => {
    set((state) => {
      if (state.screenHistory.length <= 1) {
        return { currentScreen: 'home', screenHistory: ['home'] };
      }
      const newHistory = state.screenHistory.slice(0, -1);
      const prevScreen = newHistory[newHistory.length - 1];
      return {
        currentScreen: prevScreen,
        screenHistory: newHistory,
      };
    });
  },

  // Selected Product
  selectedProduct: BLACK_BOOK_PRODUCTS[0],
  selectProduct: (productId) => {
    const prod = BLACK_BOOK_PRODUCTS.find((p) => p.id === productId) || BLACK_BOOK_PRODUCTS[0];
    set((state) => {
      const updatedCust = {
        ...state.customization,
        productId: prod.id,
      };
      return {
        selectedProduct: prod,
        customization: updatedCust,
        currentPrice: calculatePrice(updatedCust, state.uploadedDocument?.pageCount),
      };
    });
  },

  // Customization
  customization: defaultCustomization,
  updateCustomization: (updater) => {
    set((state) => {
      const updated = typeof updater === 'function' ? updater(state.customization) : updater;
      const merged = { ...state.customization, ...updated };
      return {
        customization: merged,
        currentPrice: calculatePrice(merged, state.uploadedDocument?.pageCount),
      };
    });
  },
  resetCustomization: () => {
    set((state) => {
      const base = { ...defaultCustomization, productId: state.selectedProduct.id };
      return {
        customization: base,
        currentPrice: calculatePrice(base, state.uploadedDocument?.pageCount),
      };
    });
  },

  // Document Upload
  uploadedDocument: null,
  setUploadedDocument: (doc) => {
    set((state) => {
      const updatedCust = {
        ...state.customization,
        document: doc || undefined,
      };
      return {
        uploadedDocument: doc,
        customization: updatedCust,
        currentPrice: calculatePrice(updatedCust, doc?.pageCount),
      };
    });
  },
  isUploading: false,
  setIsUploading: (val) => set({ isUploading: val }),

  // Pricing
  currentPrice: calculatePrice(defaultCustomization, 80),
  recalculatePrice: () => {
    const state = get();
    set({
      currentPrice: calculatePrice(state.customization, state.uploadedDocument?.pageCount),
    });
  },

  // Cart
  cart: [],
  addToCart: () => {
    const state = get();
    const doc: UploadedDocument = state.uploadedDocument || {
      id: 'doc_default_sample',
      name: 'Project_Final_Thesis_v3.pdf',
      size: 4.8 * 1024 * 1024,
      pageCount: state.selectedProduct.basePagesIncluded,
      colorPageCount: 12,
      bwPageCount: state.selectedProduct.basePagesIncluded - 12,
      uploadedAt: 'Just now',
      status: 'ready',
      validationMessage: 'Auto-verified: standard margin, PDF/X compliance',
      previewPages: ['Front Page', 'Index', 'Chapter 1', 'Results'],
    };

    const newItem: CartItem = {
      id: 'cart_' + Date.now().toString(36),
      product: state.selectedProduct,
      customization: { ...state.customization, document: doc },
      pricing: { ...state.currentPrice },
      document: doc,
      createdAt: new Date().toLocaleTimeString(),
    };

    set((s) => ({
      cart: [newItem, ...s.cart],
      currentScreen: 'cart',
      screenHistory: [...s.screenHistory, 'cart'],
    }));
  },
  updateCartQuantity: (itemId, delta) => {
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === itemId) {
          const newCopies = Math.max(1, item.customization.copies + delta);
          const updatedCustomization = { ...item.customization, copies: newCopies };
          const updatedPricing = calculatePrice(updatedCustomization, item.document.pageCount);
          return {
            ...item,
            customization: updatedCustomization,
            pricing: updatedPricing,
          };
        }
        return item;
      });
      return { cart: updatedCart };
    });
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    }));
  },
  clearCart: () => set({ cart: [] }),
  cartTotalCount: () => {
    const state = get();
    return state.cart.reduce((sum, item) => sum + (item.customization.copies || 1), 0);
  },

  // Addresses
  addresses: MOCK_SAVED_ADDRESSES,
  selectedAddressId: MOCK_SAVED_ADDRESSES[0].id,
  setSelectedAddressId: (id) => set({ selectedAddressId: id }),
  addAddress: (addr) => {
    const newAddr: CustomerAddress = {
      ...addr,
      id: 'addr_' + Date.now(),
    };
    set((state) => ({
      addresses: [newAddr, ...state.addresses],
      selectedAddressId: newAddr.id,
    }));
  },

  // Orders
  orders: MOCK_EXISTING_ORDERS,
  activeOrder: MOCK_EXISTING_ORDERS[0],
  setActiveOrder: (order) => set({ activeOrder: order }),
  placeOrder: async (paymentMethod, deliveryInstructions) => {
    const state = get();
    const address = state.addresses.find((a) => a.id === state.selectedAddressId) || state.addresses[0];
    
    // Calculate aggregate pricing across cart
    let aggTotal = 0;
    let aggSubtotal = 0;
    let aggDelivery = 0;
    let aggGst = 0;

    state.cart.forEach((item) => {
      aggSubtotal += item.pricing.subtotal;
      aggGst += item.pricing.gstTax;
    });

    aggDelivery = aggSubtotal >= 699 ? 0 : 49;
    aggTotal = aggSubtotal + aggDelivery + aggGst;

    const orderNum = 'PB-2026-' + Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const estDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' (Guaranteed)';

    const newOrder: Order = {
      id: 'order_' + Date.now(),
      orderNumber: orderNum,
      orderDate: `${dateStr}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      estimatedDeliveryDate: estDelivery,
      customerName: state.userProfile.name,
      customerPhone: state.userProfile.phone,
      customerEmail: state.userProfile.email,
      address: {
        ...address,
        instructions: deliveryInstructions || address.instructions,
      },
      items: [...state.cart],
      pricing: {
        basePrice: aggSubtotal,
        paperGsmExtra: 0,
        colorPagesCost: 0,
        bindingCost: 0,
        addOnsCost: 0,
        unitPrice: aggSubtotal,
        copies: state.cartTotalCount(),
        subtotal: aggSubtotal,
        deliveryFee: aggDelivery,
        gstTax: aggGst,
        total: aggTotal,
        discount: 0,
      },
      paymentMethod,
      paymentStatus: 'PAID',
      transactionId: `TXN-RZP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      orderStatus: 'In Production (Goa)',
      barcodeToken: api.generateOrderVerificationToken(orderNum),
      stages: INITIAL_TRACKING_STAGES,
    };

    set((s) => ({
      orders: [newOrder, ...s.orders],
      activeOrder: newOrder,
      cart: [],
      currentScreen: 'order_confirmation',
      screenHistory: [...s.screenHistory, 'order_confirmation'],
    }));

    return newOrder;
  },

  // Filters
  isFilterModalVisible: false,
  openFilterModal: () => set({ isFilterModalVisible: true }),
  closeFilterModal: () => set({ isFilterModalVisible: false }),
  filterState: defaultFilters,
  setFilterState: (updater) => {
    set((state) => ({
      filterState: { ...state.filterState, ...updater },
    }));
  },
  resetFilters: () => set({ filterState: defaultFilters }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  recentSearches: ['College Black Book', 'Gold Foil Stamping', 'Engineering Capstone', 'Double Sided A4', '100 GSM Bond'],
  addRecentSearch: (query) => {
    if (!query.trim()) return;
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 8),
    }));
  },

  // User Profile
  userProfile: {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@vjti.ac.in',
    phone: '+91 98201 44521',
    college: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
  },
  updateUserProfile: (profile) => {
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    }));
  },

  // Wishlist
  wishlist: ['customized-black-book'],
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      return {
        wishlist: exists ? state.wishlist.filter((id) => id !== productId) : [...state.wishlist, productId],
      };
    });
  },
}));
