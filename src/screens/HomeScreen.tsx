import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Image 
} from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { useAppStore } from '../store/useAppStore';
import { 
  BookOpen, 
  ChevronDown, 
  Search, 
  Mic, 
  Heart, 
  Zap, 
  Award, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal,
  MapPin,
  User,
  GraduationCap,
  Percent,
  Flame,
  Star,
  FileText
} from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { 
    navigateTo, 
    selectProduct, 
    userProfile, 
    setSearchQuery,
    wishlist,
    toggleWishlist 
  } = useAppStore();

  const [activeCategory, setActiveCategory] = useState<'blackbooks' | 'express' | 'thesis' | 'spiral'>('blackbooks');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');

  const handleStartCustomizing = (productId?: string) => {
    selectProduct(productId || 'customized-black-book');
    navigateTo('customize');
  };

  const handleSearchSubmit = () => {
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigateTo('explore');
    }
  };

  const collegeDisplay = userProfile.college || (userProfile.city ? `${userProfile.city}, ${userProfile.state}` : 'Select Campus & College');
  const addressDisplay = userProfile.collegeAddress || 'Choose your delivery campus or college address';

  // Quick category services
  const categories = [
    { id: 'blackbooks', name: 'BLACK BOOKS', badge: 'POPULAR', icon: BookOpen },
    { id: 'express', name: 'EXPRESS PRINT', badge: '24 HRS', icon: Zap },
    { id: 'thesis', name: 'THESIS & PhD', badge: 'ARCHIVAL', icon: GraduationCap },
    { id: 'spiral', name: 'SPIRAL BIND', badge: 'FROM ₹99', icon: FileText },
  ];

  // Quick deal tiles (Swiggy style row)
  const dealTiles = [
    { id: 'deal1', title: 'Flat ₹100 OFF', subtitle: 'On 3+ Copies', tag: 'BESTSELLER', icon: Percent, color: '#D97706' },
    { id: 'deal2', title: 'Starts ₹99', subtitle: 'Flash Prints', tag: 'FLASH DEALS', icon: Flame, color: '#EA580C' },
    { id: 'deal3', title: 'Free Delivery', subtitle: 'Above ₹699', tag: 'SAVE ₹49', icon: Award, color: '#2563EB' },
    { id: 'deal4', title: 'Fast Track 24h', subtitle: 'Express Dispatch', tag: 'BOLT ⚡', icon: Zap, color: '#059669' },
  ];

  // Quick filter pills
  const filterPills = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'discount', label: 'MIN ₹100 OFF' },
    { id: 'fast', label: '24-48H DISPATCH' },
    { id: 'hardcover', label: 'RIGID HARDCOVER' },
    { id: 'gold', label: 'GOLD FOIL' },
    { id: 'rated', label: '★ 4.9+ RATING' },
  ];

  // Filtered products
  const displayedProducts = BLACK_BOOK_PRODUCTS.filter((prod) => {
    if (activeFilter === 'discount') return prod.startingPrice < 400;
    if (activeFilter === 'fast') return prod.specifications.turnaround.includes('24');
    if (activeFilter === 'hardcover') return prod.category === 'Black Books';
    if (activeFilter === 'rated') return prod.rating >= 4.95;
    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentWrap} showsVerticalScrollIndicator={false}>
      {/* ================= 1. SWIGGY STYLE LOCATION & PROFILE HEADER ================= */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          style={styles.locationBlock} 
          onPress={() => navigateTo('auth_onboarding')}
          activeOpacity={0.7}
        >
          <View style={styles.locationTitleRow}>
            <MapPin size={18} color={COLORS.navy} />
            <Text style={styles.locationTitleText} numberOfLines={1}>
              {collegeDisplay}
            </Text>
            <ChevronDown size={16} color={COLORS.navy} />
          </View>
          <Text style={styles.locationSubText} numberOfLines={1}>
            {addressDisplay}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.profileAvatarBtn} 
          onPress={() => navigateTo(userProfile.isRegistered ? 'profile' : 'auth_onboarding')}
          activeOpacity={0.8}
        >
          {userProfile.isRegistered ? (
            <View style={styles.avatarCircleRegistered}>
              <Text style={styles.avatarInitials}>
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
          ) : (
            <View style={styles.avatarCircleGuest}>
              <User size={18} color={COLORS.navy} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ================= 2. CATEGORY / SERVICE CARDS (4 SQUIRCLE CARDS) ================= */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, isActive && styles.categoryCardActive]}
              onPress={() => {
                setActiveCategory(cat.id as any);
                if (cat.id === 'blackbooks') handleStartCustomizing('customized-black-book');
                else navigateTo('explore');
              }}
              activeOpacity={0.85}
            >
              <View style={[styles.categoryIconWrap, isActive && styles.categoryIconWrapActive]}>
                <IconComp size={22} color={isActive ? COLORS.white : COLORS.navy} strokeWidth={2.2} />
              </View>
              {cat.badge && (
                <View style={[styles.catBadge, isActive && styles.catBadgeActive]}>
                  <Text style={[styles.catBadgeText, isActive && styles.catBadgeTextActive]}>{cat.badge}</Text>
                </View>
              )}
              <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ================= 3. ATTRACTIVE SWIGGY STYLE SEARCH BAR ================= */}
      <View style={styles.searchBarWrap}>
        <View style={styles.searchBar}>
          <Search size={18} color={COLORS.secondaryText} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search 'Black Book', 'Golden Foil', 'Thesis'..."
            placeholderTextColor={COLORS.mutedText}
            value={localSearch}
            onChangeText={setLocalSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.micButton}
            onPress={handleSearchSubmit}
            activeOpacity={0.7}
          >
            <Mic size={18} color={COLORS.darkOrange} />
          </TouchableOpacity>
        </View>

        {/* Quick Filter Switch Button */}
        <TouchableOpacity 
          style={styles.quickFilterToggle}
          onPress={() => navigateTo('explore')}
          activeOpacity={0.85}
        >
          <SlidersHorizontal size={14} color={COLORS.navy} />
          <Text style={styles.quickFilterToggleText}>SPECS</Text>
        </TouchableOpacity>
      </View>

      {/* ================= 4. PROMOTIONAL HERO BANNER ("Foodie Weekend" Style) ================= */}
      <View style={styles.heroPromoCard}>
        <View style={styles.promoDecorativeCircleLeft}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80' }} 
            style={styles.promoBookThumb}
          />
        </View>

        <View style={styles.promoCenterContent}>
          <View style={styles.promoTagRow}>
            <Sparkles size={13} color="#FBBF24" />
            <Text style={styles.promoTagName}>Viva & Submission Season</Text>
          </View>
          <Text style={styles.promoBigOffer}>Flat ₹100 OFF on 3+ Copies!</Text>
          <TouchableOpacity 
            style={styles.promoOrderNowBtn}
            onPress={() => handleStartCustomizing('customized-black-book')}
            activeOpacity={0.88}
          >
            <Text style={styles.promoOrderNowText}>ORDER NOW</Text>
            <ArrowRight size={13} color={COLORS.navy} strokeWidth={2.6} />
          </TouchableOpacity>
        </View>

        <View style={styles.promoDecorativeCircleRight}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=300&q=80' }} 
            style={styles.promoBookThumb}
          />
        </View>
      </View>

      {/* ================= 5. QUICK DEAL TILES (HORIZONTAL 4 CARDS) ================= */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealTilesRow}>
        {dealTiles.map((tile) => {
          const IconC = tile.icon;
          return (
            <TouchableOpacity 
              key={tile.id}
              style={styles.dealTileCard}
              onPress={() => handleStartCustomizing('customized-black-book')}
              activeOpacity={0.85}
            >
              <View style={styles.dealTileTopRow}>
                <Text style={styles.dealTileHeading}>{tile.title}</Text>
                <IconC size={15} color={tile.color} />
              </View>
              <Text style={styles.dealTileSub}>{tile.subtitle}</Text>
              <View style={[styles.dealTileTag, { backgroundColor: `${tile.color}18` }]}>
                <Text style={[styles.dealTileTagText, { color: tile.color }]}>{tile.tag}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= 6. FILTER PILLS (HORIZONTAL ROW) ================= */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPillsRow}>
        {filterPills.map((pill) => {
          const isSelected = activeFilter === pill.id;
          return (
            <TouchableOpacity
              key={pill.id}
              style={[styles.filterPill, isSelected && styles.filterPillActive]}
              onPress={() => setActiveFilter(pill.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                {pill.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= 7. PRODUCT CARDS (SWIGGY FOOD/RESTAURANT STYLE) ================= */}
      <View style={styles.productsSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recommended Black Books</Text>
          <TouchableOpacity onPress={() => navigateTo('explore')}>
            <Text style={styles.sectionSeeAll}>See All ({BLACK_BOOK_PRODUCTS.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {displayedProducts.map((product) => {
            const isWish = wishlist.includes(product.id);
            return (
              <View key={product.id} style={styles.productCard}>
                {/* Thumbnail Container with Discount Banner & Wishlist Heart */}
                <View style={styles.imageWrap}>
                  <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
                  
                  {/* Heart Button */}
                  <TouchableOpacity 
                    style={styles.wishlistBtn}
                    onPress={() => toggleWishlist(product.id)}
                    activeOpacity={0.85}
                    accessibilityLabel="Toggle Wishlist"
                  >
                    <Heart 
                      size={17} 
                      color={isWish ? COLORS.darkOrange : COLORS.white} 
                      fill={isWish ? COLORS.darkOrange : 'rgba(0,0,0,0.3)'} 
                    />
                  </TouchableOpacity>

                  {/* Bottom Image Discount Ribbon */}
                  <View style={styles.discountRibbon}>
                    <Text style={styles.discountRibbonText}>
                      SAVE ₹{product.originalPrice - product.startingPrice} • UNIVERSITY COMPLIANT
                    </Text>
                  </View>
                </View>

                {/* Details Container */}
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{product.name}</Text>
                  
                  <View style={styles.cardPriceRow}>
                    <Text style={styles.cardPrice}>₹{product.startingPrice}</Text>
                    <Text style={styles.cardOriginalPrice}>₹{product.originalPrice}</Text>
                  </View>

                  {/* Rating Badge */}
                  <View style={styles.ratingRow}>
                    <View style={styles.ratingPill}>
                      <Star size={11} color={COLORS.white} fill={COLORS.white} />
                      <Text style={styles.ratingPillText}>{product.rating}</Text>
                    </View>
                    <Text style={styles.turnaroundText}>• {product.specifications.turnaround}</Text>
                  </View>

                  <Text style={styles.specsCategoryText} numberOfLines={1}>
                    {product.specifications.binding} • {product.category}
                  </Text>

                  {/* Customize / Order Action Button */}
                  <TouchableOpacity 
                    style={styles.customizeCardBtn}
                    onPress={() => handleStartCustomizing(product.id)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.customizeCardBtnText}>Customize & Order</Text>
                    <ArrowRight size={13} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep modern midnight slate background like Swiggy dark theme
  },
  contentWrap: {
    paddingBottom: 60,
  },

  /* 1. Header */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  locationBlock: {
    flex: 1,
    marginRight: 12,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    maxWidth: 240,
  },
  locationSubText: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 2,
    maxWidth: 280,
  },
  profileAvatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircleGuest: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarCircleRegistered: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.darkOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },

  /* 2. Category Row */
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
  },
  categoryCardActive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconWrapActive: {
    backgroundColor: COLORS.navy,
  },
  catBadge: {
    position: 'absolute',
    top: 6,
    right: 4,
    backgroundColor: 'rgba(234, 88, 12, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  catBadgeActive: {
    backgroundColor: COLORS.darkOrange,
  },
  catBadgeText: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#FB923C',
  },
  catBadgeTextActive: {
    color: COLORS.white,
  },
  categoryLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#E2E8F0',
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  categoryLabelActive: {
    color: COLORS.navy,
  },

  /* 3. Search Bar */
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: COLORS.navy,
    paddingVertical: 0,
    height: '100%',
  },
  micButton: {
    padding: 6,
  },
  quickFilterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  quickFilterToggleText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },

  /* 4. Promotional Hero Banner */
  heroPromoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    position: 'relative',
  },
  promoDecorativeCircleLeft: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  promoDecorativeCircleRight: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  promoBookThumb: {
    width: '100%',
    height: '100%',
  },
  promoCenterContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  promoTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  promoTagName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FBBF24',
    letterSpacing: 0.5,
  },
  promoBigOffer: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginVertical: 4,
  },
  promoOrderNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginTop: 4,
  },
  promoOrderNowText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },

  /* 5. Deal Tiles */
  dealTilesRow: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  dealTileCard: {
    width: 130,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dealTileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dealTileHeading: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.white,
  },
  dealTileSub: {
    fontSize: 9.5,
    color: '#94A3B8',
    marginTop: 2,
  },
  dealTileTag: {
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  dealTileTagText: {
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  /* 6. Filter Pills */
  filterPillsRow: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  filterPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterPillActive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.4,
  },
  filterPillTextActive: {
    color: COLORS.navy,
    fontWeight: '800',
  },

  /* 7. Product Cards */
  productsSection: {
    paddingHorizontal: 16,
    marginTop: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.white,
  },
  sectionSeeAll: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  productsGrid: {
    gap: 16,
  },
  productCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  imageWrap: {
    width: '100%',
    height: 170,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountRibbon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  discountRibbonText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardDetails: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
  },
  cardOriginalPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#16A34A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  turnaroundText: {
    fontSize: 11.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  specsCategoryText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  customizeCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.darkOrange,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  customizeCardBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
});
