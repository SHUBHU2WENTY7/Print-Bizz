import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  Check, 
  Sliders, 
  Layers, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react-native';

export const ProductDetailsScreen: React.FC = () => {
  const { 
    selectedProduct, 
    wishlist, 
    toggleWishlist, 
    navigateTo, 
    addToCart,
    customization,
    updateCustomization 
  } = useAppStore();

  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'faqs'>('overview');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleShare = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const discountPercent = selectedProduct.originalPrice > selectedProduct.startingPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.startingPrice) / selectedProduct.originalPrice) * 100)
    : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        {/* Breadcrumb Row */}
        <View style={styles.breadcrumbRow}>
          <TouchableOpacity onPress={() => navigateTo('home')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbDivider}>/</Text>
          <TouchableOpacity onPress={() => navigateTo('explore')}>
            <Text style={styles.breadcrumbLink}>{selectedProduct.category}</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbDivider}>/</Text>
          <Text style={styles.breadcrumbCurrent} numberOfLines={1}>{selectedProduct.name}</Text>
        </View>

        {/* 2-COLUMN MAIN PRODUCT HERO */}
        <View style={styles.mainGrid}>
          {/* LEFT: Product Gallery */}
          <View style={styles.galleryColumn}>
            {/* Main Featured Image */}
            <View style={styles.mainImageWrapper}>
              <Image 
                source={{ uri: selectedProduct.gallery[activeGalleryIdx] || selectedProduct.image }}
                style={styles.mainImage}
                resizeMode="cover"
              />
              {discountPercent && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>{discountPercent}% OFF</Text>
                </View>
              )}
            </View>

            {/* Thumbnail Switcher */}
            <View style={styles.thumbnailsRow}>
              {selectedProduct.gallery.map((uri, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.thumbnailWrap, activeGalleryIdx === idx && styles.thumbnailWrapActive]}
                  onPress={() => setActiveGalleryIdx(idx)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri }} style={styles.thumbnailImg} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* RIGHT: Product Information & Purchase CTAs */}
          <View style={styles.infoColumn}>
            <View style={styles.headerRow}>
              <Text style={styles.categoryBadge}>{selectedProduct.category.toUpperCase()}</Text>
              
              <View style={styles.actionIconsRow}>
                <TouchableOpacity 
                  style={[styles.iconCircle, isWishlisted && styles.iconCircleActive]}
                  onPress={() => toggleWishlist(selectedProduct.id)}
                  accessibilityLabel="Wishlist"
                >
                  <Heart 
                    size={18} 
                    color={isWishlisted ? COLORS.darkOrange : COLORS.navy} 
                    fill={isWishlisted ? COLORS.darkOrange : 'transparent'} 
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.iconCircle}
                  onPress={handleShare}
                  accessibilityLabel="Share Product"
                >
                  <Share2 size={18} color={COLORS.navy} />
                </TouchableOpacity>
              </View>
            </View>

            {copiedNotification && (
              <View style={styles.toastNotice}>
                <Text style={styles.toastNoticeText}>Product link copied to clipboard!</Text>
              </View>
            )}

            <Text style={styles.productTitle}>{selectedProduct.name}</Text>
            <Text style={styles.productTagline}>{selectedProduct.tagline}</Text>

            {/* Rating & Reviews */}
            <View style={styles.ratingRow}>
              <View style={styles.starsBadge}>
                <Star size={13} color="#D97706" fill="#D97706" />
                <Text style={styles.ratingNumber}>{selectedProduct.rating}</Text>
              </View>
              <Text style={styles.reviewsCount}>
                ({selectedProduct.reviewCount} verified university submissions)
              </Text>
            </View>

            {/* Price Box */}
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.currency}>₹</Text>
                <Text style={styles.priceValue}>{selectedProduct.startingPrice}</Text>
                {selectedProduct.originalPrice > selectedProduct.startingPrice && (
                  <Text style={styles.originalPrice}>₹{selectedProduct.originalPrice}</Text>
                )}
                <Text style={styles.priceSuffix}>per copy</Text>
              </View>
              <Text style={styles.taxesIncluded}>Inclusive of all applicable printing taxes</Text>
            </View>

            {/* Short Description */}
            <Text style={styles.descriptionText}>{selectedProduct.description}</Text>

            {/* Quick Available Specifications */}
            <View style={styles.quickSpecsBox}>
              <Text style={styles.quickSpecsHeading}>Product Highlights</Text>
              <View style={styles.specItemRow}>
                <Text style={styles.specKey}>Paper Standard:</Text>
                <Text style={styles.specVal}>{selectedProduct.specifications.paperOptions}</Text>
              </View>
              <View style={styles.specItemRow}>
                <Text style={styles.specKey}>Binding Style:</Text>
                <Text style={styles.specVal}>{selectedProduct.specifications.binding}</Text>
              </View>
              <View style={styles.specItemRow}>
                <Text style={styles.specKey}>Turnaround:</Text>
                <Text style={styles.specVal}>{selectedProduct.specifications.turnaround}</Text>
              </View>
              <View style={styles.specItemRow}>
                <Text style={styles.specKey}>Compliance:</Text>
                <Text style={styles.specVal}>{selectedProduct.specifications.compliance}</Text>
              </View>
            </View>

            {/* Delivery Estimate */}
            <View style={styles.deliveryEstimateBanner}>
              <Truck size={18} color={COLORS.success} />
              <View>
                <Text style={styles.deliveryEstimateTitle}>{selectedProduct.specifications.estimatedDelivery}</Text>
                <Text style={styles.deliveryEstimateSub}>Standard doorstep courier with live tracking</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.ctaButtonGroup}>
              <TouchableOpacity 
                style={styles.customizePrimaryBtn}
                onPress={() => navigateTo('customize')}
                activeOpacity={0.85}
              >
                <Sliders size={16} color={COLORS.white} />
                <Text style={styles.customizePrimaryBtnText}>Customize Your Book</Text>
                <ArrowRight size={16} color={COLORS.white} />
              </TouchableOpacity>

              <View style={styles.secondaryBtnRow}>
                <TouchableOpacity 
                  style={styles.addToCartBtn}
                  onPress={addToCart}
                  activeOpacity={0.85}
                >
                  <Text style={styles.addToCartBtnText}>Add Standard Copy to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.previewBtn}
                  onPress={() => navigateTo('book_preview')}
                  activeOpacity={0.85}
                >
                  <BookOpen size={16} color={COLORS.navy} />
                  <Text style={styles.previewBtnText}>Virtual Preview</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* BELOW: PRODUCT TABS (Overview, Specifications, Reviews, FAQs) */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabHeadersRow}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${selectedProduct.reviewCount})` },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabHeaderBtn, activeTab === tab.id && styles.tabHeaderBtnActive]}
                onPress={() => setActiveTab(tab.id as any)}
              >
                <Text style={[styles.tabHeaderBtnText, activeTab === tab.id && styles.tabHeaderBtnTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContentCard}>
            {activeTab === 'overview' && (
              <View>
                <Text style={styles.tabSectionTitle}>Detailed Overview</Text>
                <Text style={styles.tabParagraph}>{selectedProduct.detailedDescription}</Text>
                
                <Text style={[styles.tabSectionTitle, { marginTop: SPACING.lg }]}>Key Features</Text>
                <View style={styles.featuresList}>
                  {selectedProduct.features.map((feat, idx) => (
                    <View key={idx} style={styles.featureItemRow}>
                      <Check size={16} color={COLORS.success} />
                      <Text style={styles.featureItemText}>{feat}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {activeTab === 'specs' && (
              <View>
                <Text style={styles.tabSectionTitle}>Complete Technical Specifications</Text>
                <View style={styles.specsTable}>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Paper Size</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.specifications.paperSize}</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Paper GSM Weight</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.specifications.paperOptions}</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Binding Style</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.specifications.binding}</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Base Pages Included</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.basePagesIncluded} pages (extra pages supported)</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>University Compliance</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.specifications.compliance}</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Production Turnaround</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.specifications.turnaround}</Text>
                  </View>
                  <View style={styles.specsTableRow}>
                    <Text style={styles.specsTableKey}>Recommended For</Text>
                    <Text style={styles.specsTableVal}>{selectedProduct.popularFor}</Text>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'reviews' && (
              <View>
                <View style={styles.reviewsHeader}>
                  <View>
                    <Text style={styles.tabSectionTitle}>Student Ratings & Reviews</Text>
                    <Text style={styles.tabSubtitle}>100% verified submissions from engineering and university students</Text>
                  </View>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreNumber}>{selectedProduct.rating}</Text>
                    <Text style={styles.scoreOutOf}>out of 5.0</Text>
                  </View>
                </View>

                {/* Review Cards */}
                <View style={styles.reviewsList}>
                  {[
                    {
                      name: 'Rohan Deshmukh',
                      college: 'COEP Technological University, Pune',
                      date: '28 Oct 2026',
                      rating: 5,
                      text: 'The gold foil embossing on the spine and cover was crisp and aligned to the millimeter. Our department head approved the formatting immediately with zero remarks.',
                    },
                    {
                      name: 'Pooja Iyer',
                      college: 'VJTI Mumbai, M.Tech Final Year',
                      date: '24 Oct 2026',
                      rating: 5,
                      text: 'The 100 GSM executive bond paper has great opacity. Colored PCB schematics and graphs came out razor sharp without any ink bleed on the reverse side.',
                    },
                    {
                      name: 'Kunal Verma',
                      college: 'Sardar Patel Institute of Technology (SPIT)',
                      date: '19 Oct 2026',
                      rating: 5,
                      text: 'The 3D virtual preview helped us spot a missing certificate before placing the order. Delivered in sturdy boxed packaging 2 days ahead of schedule.',
                    },
                  ].map((rev, idx) => (
                    <View key={idx} style={styles.reviewCard}>
                      <View style={styles.reviewCardTop}>
                        <View>
                          <Text style={styles.reviewerName}>{rev.name}</Text>
                          <Text style={styles.reviewerCollege}>{rev.college}</Text>
                        </View>
                        <Text style={styles.reviewDate}>{rev.date}</Text>
                      </View>
                      <View style={styles.reviewStars}>
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={13} color="#D97706" fill="#D97706" />
                        ))}
                      </View>
                      <Text style={styles.reviewBody}>{rev.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {activeTab === 'faqs' && (
              <View>
                <Text style={styles.tabSectionTitle}>Frequently Asked Questions</Text>
                <View style={styles.faqsList}>
                  {[
                    {
                      q: 'What format should I upload my document in?',
                      a: 'We accept PDF, DOC, and DOCX documents. PDF is recommended for 100% preservation of fonts, margins, and graph vectors.',
                    },
                    {
                      q: 'How does gold foil embossing work?',
                      a: 'We use heated metallic thermal stamping with durable gold or silver pigment foils applied directly onto rigid binder board for longevity.',
                    },
                    {
                      q: 'Can I order multiple copies with volume discount?',
                      a: 'Yes, orders of 2 or more copies automatically receive volume discounts up to 15% off.',
                    },
                    {
                      q: 'When will I receive my order?',
                      a: 'Standard production and courier delivery takes 3 to 5 business days to your specified doorstep.',
                    },
                  ].map((faq, idx) => (
                    <View key={idx} style={styles.faqCard}>
                      <Text style={styles.faqQuestion}>{faq.q}</Text>
                      <Text style={styles.faqAnswer}>{faq.a}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
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
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.md,
  },
  breadcrumbLink: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  breadcrumbDivider: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  breadcrumbCurrent: {
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: '700',
    flex: 1,
  },
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xl,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  galleryColumn: {
    flex: 1,
    minWidth: 320,
    maxWidth: 520,
  },
  mainImageWrapper: {
    width: '100%',
    height: 380,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  thumbnailsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  thumbnailWrap: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  thumbnailWrapActive: {
    borderColor: COLORS.darkOrange,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  infoColumn: {
    flex: 1.2,
    minWidth: 320,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  actionIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircleActive: {
    backgroundColor: '#FFF7ED',
    borderColor: COLORS.darkOrange,
  },
  toastNotice: {
    backgroundColor: COLORS.navy,
    padding: 6,
    borderRadius: RADIUS.xs,
    marginBottom: 6,
  },
  toastNoticeText: {
    color: COLORS.white,
    fontSize: 11,
    textAlign: 'center',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    lineHeight: 30,
    marginBottom: 4,
  },
  productTagline: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  starsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  reviewsCount: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  priceContainer: {
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currency: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
  },
  priceValue: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.navy,
  },
  originalPrice: {
    fontSize: 15,
    color: COLORS.mutedText,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  priceSuffix: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginLeft: 4,
  },
  taxesIncluded: {
    fontSize: 11,
    color: COLORS.mutedText,
    marginTop: 2,
  },
  descriptionText: {
    fontSize: 13,
    color: COLORS.primaryText,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  quickSpecsBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.borderLight,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  quickSpecsHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 6,
  },
  specItemRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  specKey: {
    width: 130,
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  specVal: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
  },
  deliveryEstimateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: '#F0FDF4',
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: SPACING.lg,
  },
  deliveryEstimateTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  deliveryEstimateSub: {
    fontSize: 11,
    color: '#15803D',
  },
  ctaButtonGroup: {
    gap: SPACING.sm,
  },
  customizePrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
  },
  customizePrimaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryBtnRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  addToCartBtn: {
    flex: 1.4,
    backgroundColor: COLORS.darkOrange,
    paddingVertical: 11,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  previewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 11,
    borderRadius: RADIUS.sm,
  },
  previewBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  // Tabs Container
  tabsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  tabHeadersRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
  },
  tabHeaderBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabHeaderBtnActive: {
    borderBottomColor: COLORS.darkOrange,
    backgroundColor: COLORS.surface,
  },
  tabHeaderBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  tabHeaderBtnTextActive: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  tabContentCard: {
    padding: SPACING.xl,
  },
  tabSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  tabParagraph: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 21,
  },
  featuresList: {
    gap: 8,
    marginTop: SPACING.xs,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureItemText: {
    fontSize: 13,
    color: COLORS.primaryText,
  },
  specsTable: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    marginTop: SPACING.sm,
  },
  specsTableRow: {
    flexDirection: 'row',
    padding: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  specsTableKey: {
    width: 180,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  specsTableVal: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  tabSubtitle: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  scoreBox: {
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  scoreNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#92400E',
  },
  scoreOutOf: {
    fontSize: 10,
    color: '#B45309',
    fontWeight: '600',
  },
  reviewsList: {
    gap: SPACING.md,
  },
  reviewCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reviewCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  reviewerCollege: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  reviewDate: {
    fontSize: 11,
    color: COLORS.mutedText,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 4,
  },
  reviewBody: {
    fontSize: 12,
    color: COLORS.primaryText,
    lineHeight: 18,
  },
  faqsList: {
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  faqCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
});
