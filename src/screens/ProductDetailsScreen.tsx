import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  Star, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Award, 
  Sliders, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react-native';

export const ProductDetailsScreen: React.FC = () => {
  const { selectedProduct, navigateTo, wishlist, toggleWishlist } = useAppStore();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string>('specifications');
  const [selectedGsmPreview, setSelectedGsmPreview] = useState('80 GSM Bond');
  const [selectedFoilPreview, setSelectedFoilPreview] = useState('Gold Foil');

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? '' : id);
  };

  const handleStartCustomization = () => {
    navigateTo('customize');
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Top Gallery & Hero Image (Reference 3 concept) */}
          <View style={styles.heroGalleryCard}>
            <View style={styles.mainImageWrapper}>
              <Image 
                source={{ uri: selectedProduct.gallery[selectedGalleryIdx] || selectedProduct.image }}
                style={styles.mainImage}
                resizeMode="cover"
              />
              <View style={styles.priceFloatingBadge}>
                <Text style={styles.priceFloatingPrefix}>From</Text>
                <Text style={styles.priceFloatingAmount}>₹{selectedProduct.startingPrice}</Text>
              </View>

              <View style={styles.topActionsRow}>
                <TouchableOpacity 
                  style={styles.iconCircle}
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
                  onPress={() => alert('Product specifications link copied to clipboard')}
                  accessibilityLabel="Share"
                >
                  <Share2 size={18} color={COLORS.navy} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Thumbnail selector */}
            <View style={styles.thumbnailsRow}>
              {selectedProduct.gallery.map((uri, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.thumbnailWrap, selectedGalleryIdx === idx && styles.thumbnailWrapActive]}
                  onPress={() => setSelectedGalleryIdx(idx)}
                >
                  <Image source={{ uri }} style={styles.thumbnailImg} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Product Header & Rating */}
          <View style={styles.metaCard}>
            <View style={styles.badgeRow}>
              <View style={styles.categoryBadge}>
                <Sparkles size={12} color={COLORS.darkOrange} />
                <Text style={styles.categoryBadgeText}>{selectedProduct.tagline}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Star size={13} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
                <Text style={styles.reviewCount}>({selectedProduct.reviewCount} verified)</Text>
              </View>
            </View>

            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productDescription}>{selectedProduct.description}</Text>

            {/* Hub Assurance Banner */}
            <View style={styles.hubAssurance}>
              <Truck size={16} color={COLORS.oceanBlue} />
              <Text style={styles.hubAssuranceText}>
                Goa Manufacturing Facility ➔ Thane Distribution Hub ➔ Mumbai Next-Day Courier
              </Text>
            </View>
          </View>

          {/* Quick Swatch Selectors (Visual Inspiration from Reference 3) */}
          <View style={styles.swatchSection}>
            <Text style={styles.swatchSectionLabel}>Cover Embossing Foil</Text>
            <View style={styles.swatchRow}>
              {[
                { name: 'Gold Foil', color: '#D4AF37', border: '#B8860B' },
                { name: 'Silver Foil', color: '#E2E8F0', border: '#94A3B8' },
                { name: 'Matte Obsidian', color: '#1E293B', border: '#0F172A' },
              ].map((swatch) => (
                <TouchableOpacity
                  key={swatch.name}
                  style={[
                    styles.swatchPill,
                    selectedFoilPreview === swatch.name && styles.swatchPillActive,
                  ]}
                  onPress={() => setSelectedFoilPreview(swatch.name)}
                >
                  <View style={[styles.swatchCircle, { backgroundColor: swatch.color, borderColor: swatch.border }]} />
                  <Text style={[styles.swatchName, selectedFoilPreview === swatch.name && styles.swatchNameActive]}>
                    {swatch.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Paper GSM Quick Preview */}
          <View style={styles.swatchSection}>
            <Text style={styles.swatchSectionLabel}>Paper GSM Standard</Text>
            <View style={styles.swatchRow}>
              {['75 GSM Standard', '80 GSM Bond', '100 GSM Executive'].map((gsm) => (
                <TouchableOpacity
                  key={gsm}
                  style={[
                    styles.gsmPill,
                    selectedGsmPreview === gsm && styles.gsmPillActive,
                  ]}
                  onPress={() => setSelectedGsmPreview(gsm)}
                >
                  <Text style={[styles.gsmText, selectedGsmPreview === gsm && styles.gsmTextActive]}>
                    {gsm}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Collapsible Product Information Sections (1 to 6) */}
          <View style={styles.accordionContainer}>
            {/* Section 1: Detailed Description */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('description')}>
                <Text style={styles.accordionTitle}>1. Detailed Description</Text>
                {expandedSection === 'description' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'description' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.bodyText}>{selectedProduct.detailedDescription}</Text>
                  <View style={styles.featuresList}>
                    {selectedProduct.features.map((feature, i) => (
                      <View key={i} style={styles.featureItem}>
                        <Check size={14} color={COLORS.success} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Section 2: Specifications */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('specifications')}>
                <Text style={styles.accordionTitle}>2. Product Specifications</Text>
                {expandedSection === 'specifications' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'specifications' && (
                <View style={styles.accordionBody}>
                  <View style={styles.specTable}>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Paper Size</Text>
                      <Text style={styles.specVal}>{selectedProduct.specifications.paperSize}</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Paper Quality</Text>
                      <Text style={styles.specVal}>{selectedProduct.specifications.paperOptions}</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Binding Type</Text>
                      <Text style={styles.specVal}>{selectedProduct.specifications.binding}</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Base Pages</Text>
                      <Text style={styles.specVal}>{selectedProduct.basePagesIncluded} pages included in base price</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Manufacturing</Text>
                      <Text style={styles.specVal}>{selectedProduct.specifications.manufacturingHub}</Text>
                    </View>
                    <View style={styles.specRow}>
                      <Text style={styles.specKey}>Distribution Hub</Text>
                      <Text style={styles.specVal}>{selectedProduct.specifications.dispatchHub}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Section 3: Printing Quality */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('quality')}>
                <Text style={styles.accordionTitle}>3. Printing Quality & Paper Science</Text>
                {expandedSection === 'quality' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'quality' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.bodyText}>
                    Our Goa production facility utilizes industrial Xerox and HP Indigo digital presses running at 2400 x 2400 DPI. High-density carbon toner guarantees deep, crisp monochrome text that will not smear or degrade over time. Color pages use precision 4-color laser rasterization with calibrated delta-E color reproduction for academic graphs, PCB schematics, and simulation charts.
                  </Text>
                </View>
              )}
            </View>

            {/* Section 4: Binding Options */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('binding')}>
                <Text style={styles.accordionTitle}>4. Binding Options & Embossing</Text>
                {expandedSection === 'binding' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'binding' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.bodyText}>
                    Each book is constructed with 3.2mm imported binder board wrapped in fine-grain leatherette rexine. Spine is reinforced with heavy-duty calico bookbinding cloth to withstand rigorous viva examination. Lettering is thermally embossed with genuine brass plates in metallic gold or silver foil.
                  </Text>
                </View>
              )}
            </View>

            {/* Section 5: Delivery Information */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('delivery')}>
                <Text style={styles.accordionTitle}>5. Delivery Hub Logistics</Text>
                {expandedSection === 'delivery' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'delivery' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.bodyText}>
                    • Manufacturing: Goa Central Production Press (24 to 48 hours crafting).{'\n'}
                    • In-Transit: Secured express cargo line to Thane Central Distribution Hub.{'\n'}
                    • Local Delivery: Thane Hub to Mumbai, Navi Mumbai, and Thane colleges & residences via local delivery partners.{'\n'}
                    • Transparent 11-stage tracking provided in app.
                  </Text>
                </View>
              )}
            </View>

            {/* Section 6: Frequently Asked Questions */}
            <View style={styles.accordionCard}>
              <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('faq')}>
                <Text style={styles.accordionTitle}>6. Frequently Asked Questions</Text>
                {expandedSection === 'faq' ? <ChevronUp size={18} color={COLORS.navy} /> : <ChevronDown size={18} color={COLORS.navy} />}
              </TouchableOpacity>
              {expandedSection === 'faq' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.faqQ}>Q: Can I approve the cover layout before it is printed?</Text>
                  <Text style={styles.faqA}>A: Yes, our customization preview allows you to enter student name, college name, project title, and guide name to preview the layout before placing the order.</Text>
                  <Text style={styles.faqQ}>Q: What if my PDF has more than the base page count?</Text>
                  <Text style={styles.faqA}>A: The pricing calculator updates automatically when you upload your document, adding exact per-page costs transparently.</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInner}>
          <View>
            <Text style={styles.bottomPriceLabel}>Starting from</Text>
            <View style={styles.bottomPriceRow}>
              <Text style={styles.bottomCurrency}>₹</Text>
              <Text style={styles.bottomPrice}>{selectedProduct.startingPrice}</Text>
              <Text style={styles.bottomPerCopy}>/ copy</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.customizeCtaBtn}
            onPress={handleStartCustomization}
            activeOpacity={0.85}
          >
            <Text style={styles.customizeCtaText}>Customize Your Black Book</Text>
            <ArrowRight size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentWrap: {
    padding: SPACING.base,
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 100,
  },
  heroGalleryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  mainImageWrapper: {
    width: '100%',
    height: 320,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  priceFloatingBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(16, 35, 63, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.darkOrange,
  },
  priceFloatingPrefix: {
    fontSize: 10,
    fontWeight: '700',
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },
  priceFloatingAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
  },
  topActionsRow: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    justifyContent: 'center',
  },
  thumbnailWrap: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailWrapActive: {
    borderColor: COLORS.navy,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  metaCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  reviewCount: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  productName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
    marginTop: 4,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.secondaryText,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: SPACING.md,
  },
  hubAssurance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hubAssuranceText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
    flex: 1,
    lineHeight: 16,
  },
  swatchSection: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  swatchSectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  swatchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  swatchPillActive: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.navy,
  },
  swatchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
  },
  swatchName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  swatchNameActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  gsmPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  gsmPillActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  gsmText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  gsmTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  accordionContainer: {
    gap: SPACING.sm,
  },
  accordionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.base,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  accordionBody: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
  },
  bodyText: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 19,
  },
  featuresList: {
    marginTop: SPACING.sm,
    gap: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  specTable: {
    gap: 8,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  specKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  specVal: {
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: '700',
    textAlign: 'right',
  },
  faqQ: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: 6,
  },
  faqA: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16,
    marginTop: 2,
    marginBottom: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomBarInner: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomPriceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondaryText,
    textTransform: 'uppercase',
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomCurrency: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  bottomPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
  },
  bottomPerCopy: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginLeft: 3,
  },
  customizeCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  customizeCtaText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
});
