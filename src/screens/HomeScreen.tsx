import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { useAppStore } from '../store/useAppStore';
import { ProductCard } from '../components/ProductCard';
import { 
  BookOpen, 
  UploadCloud, 
  Sliders, 
  Truck, 
  ShieldCheck, 
  Award, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  CheckCircle, 
  PhoneCall,
  ArrowRight,
  FileCheck,
  Package,
  Layers,
  Star
} from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { navigateTo, selectProduct, setFilterState } = useAppStore();

  const handleStartCustomizing = () => {
    selectProduct('customized-black-book');
    navigateTo('customize');
  };

  const handleCategoryClick = (categoryName: string) => {
    setFilterState({ category: categoryName });
    navigateTo('explore');
  };

  const categories = [
    {
      name: 'Black Books',
      desc: 'University guideline editions',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Project Books',
      desc: 'Engineering & MBA capstones',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Thesis Binding',
      desc: 'Doctoral & masters dissertations',
      image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Spiral Binding',
      desc: 'Twin-loop Wire-O reports',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Hardcover Binding',
      desc: 'Rigid gold/silver foil cases',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Printing Services',
      desc: 'High-DPI laser mono & color',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Stationery',
      desc: 'CD pockets & certificate tissue',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const bestSellers = BLACK_BOOK_PRODUCTS.slice(0, 4);
  const featuredProducts = BLACK_BOOK_PRODUCTS.slice(2, 6);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContentWrap}>
          <View style={styles.heroTextCol}>
            <View style={styles.heroBadge}>
              <Sparkles size={13} color={COLORS.darkOrange} />
              <Text style={styles.heroBadgeText}>OFFICIAL ACADEMIC PRINTING & BINDING</Text>
            </View>

            <Text style={styles.heroHeading}>
              Your Academic Projects.{'\n'}Professionally Printed.
            </Text>
            
            <Text style={styles.heroSubtitle}>
              Customize, preview and order your university black books with complete control over paper GSM, foil embossing, and rigid hardcover binding.
            </Text>

            <View style={styles.heroCtaRow}>
              <TouchableOpacity 
                style={styles.heroPrimaryBtn}
                onPress={handleStartCustomizing}
                activeOpacity={0.85}
              >
                <Text style={styles.heroPrimaryBtnText}>Create Your Black Book</Text>
                <ArrowRight size={16} color={COLORS.white} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.heroSecondaryBtn}
                onPress={() => navigateTo('explore')}
                activeOpacity={0.85}
              >
                <Text style={styles.heroSecondaryBtnText}>Explore Products</Text>
              </TouchableOpacity>
            </View>

            {/* Trust Highlights */}
            <View style={styles.heroTrustRow}>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>University Guidelines Compliant</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>Live 3D Virtual Book Preview</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>Doorstep Courier Delivery</Text>
              </View>
            </View>
          </View>

          {/* Hero Image Showcase */}
          <View style={styles.heroImageCol}>
            <View style={styles.heroImageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80' }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.floatingPreviewCard}>
                <BookOpen size={16} color={COLORS.darkOrange} />
                <View>
                  <Text style={styles.floatingCardTitle}>Gold Foil Stamped Hardbound</Text>
                  <Text style={styles.floatingCardSub}>80 GSM Bond • Double-Sided</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 2. SHOP BY CATEGORY */}
      <View style={styles.sectionWrap}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionPreTitle}>ACADEMIC CATALOG</Text>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => navigateTo('explore')}
          >
            <Text style={styles.viewAllBtnText}>View All</Text>
            <ChevronRight size={15} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryCardsRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              style={styles.categoryCard}
              onPress={() => handleCategoryClick(cat.name)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: cat.image }} style={styles.categoryImage} resizeMode="cover" />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryDesc}>{cat.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. BEST SELLERS GRID (4-column responsive grid) */}
      <View style={styles.sectionWrap}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionPreTitle}>STUDENT FAVORITES</Text>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => navigateTo('explore')}
          >
            <Text style={styles.viewAllBtnText}>See More</Text>
            <ChevronRight size={15} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </View>
      </View>

      {/* 4. SUBWAY CUSTOMIZATION PROMOTIONAL STRIP */}
      <View style={styles.subwayPromoStrip}>
        <View style={styles.subwayPromoContent}>
          <View style={styles.subwayBadge}>
            <Sliders size={14} color={COLORS.darkOrange} />
            <Text style={styles.subwayBadgeText}>SUBWAY-STYLE CUSTOMIZATION</Text>
          </View>
          <Text style={styles.subwayHeading}>
            Build Your Black Book Step-by-Step
          </Text>
          <Text style={styles.subwaySubtext}>
            Pick your product, upload your PDF or Word document, choose paper GSM and cover foil, and inspect your live price in real time.
          </Text>
          <TouchableOpacity 
            style={styles.subwayCtaBtn}
            onPress={handleStartCustomizing}
          >
            <Text style={styles.subwayCtaBtnText}>Start Customizing Now</Text>
            <ArrowRight size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. FEATURED & EXECUTIVE EDITIONS */}
      <View style={styles.sectionWrap}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionPreTitle}>PREMIUM CRAFTSMANSHIP</Text>
            <Text style={styles.sectionTitle}>Featured Products</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => navigateTo('explore')}
          >
            <Text style={styles.viewAllBtnText}>View Catalog</Text>
            <ChevronRight size={15} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </View>
      </View>

      {/* 6. WHY CHOOSE PRINT BIZZ */}
      <View style={styles.benefitsSection}>
        <View style={styles.benefitsContentWrap}>
          <View style={styles.centerHeadingWrap}>
            <Text style={styles.sectionPreTitleCenter}>OUR COMMITMENT</Text>
            <Text style={styles.sectionTitleCenter}>Why Choose Print Bizz?</Text>
            <Text style={styles.sectionSubtitleCenter}>
              Engineered to make academic printing stress-free, accurate, and completely transparent.
            </Text>
          </View>

          <View style={styles.benefitsGrid}>
            {[
              {
                icon: <Sliders size={22} color={COLORS.darkOrange} />,
                title: 'Customizable Printing',
                desc: 'Tailor paper GSM, monochrome or full color, single or double sided printing to your university requirements.',
              },
              {
                icon: <Award size={22} color={COLORS.navy} />,
                title: 'Premium Binding',
                desc: 'Heavyboard hardcover binding with genuine heated thermal gold or silver foil embossing and reinforced spines.',
              },
              {
                icon: <FileCheck size={22} color={COLORS.oceanBlue} />,
                title: 'Real Document Preview',
                desc: 'Turn pages of your actual uploaded PDF or Word document in our 3D hardcover preview before placing your order.',
              },
              {
                icon: <ShieldCheck size={22} color={COLORS.success} />,
                title: 'Academic Quality Materials',
                desc: 'Acid-free archive-grade bond paper guaranteed to prevent ink show-through and preserve your project for years.',
              },
              {
                icon: <Truck size={22} color={COLORS.darkOrange} />,
                title: 'Convenient Doorstep Ordering',
                desc: 'Skip printing queues. Order right from your laptop or phone with live order tracking and prompt delivery.',
              },
            ].map((b, idx) => (
              <View key={idx} style={styles.benefitCard}>
                <View style={styles.benefitIconWrap}>{b.icon}</View>
                <Text style={styles.benefitCardTitle}>{b.title}</Text>
                <Text style={styles.benefitCardDesc}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 7. HOW IT WORKS (4 Simple Steps) */}
      <View style={styles.sectionWrap}>
        <View style={styles.centerHeadingWrap}>
          <Text style={styles.sectionPreTitleCenter}>SIMPLE ORDERING</Text>
          <Text style={styles.sectionTitleCenter}>How It Works</Text>
          <Text style={styles.sectionSubtitleCenter}>
            Four effortless steps to submit your project with confidence.
          </Text>
        </View>

        <View style={styles.stepsRow}>
          {[
            {
              step: '1',
              title: 'Choose Product',
              desc: 'Select from College Standard, Capstone, or PhD Thesis Binding.',
            },
            {
              step: '2',
              title: 'Upload Document',
              desc: 'Select your genuine PDF, DOC, or DOCX document with instant preflight.',
            },
            {
              step: '3',
              title: 'Customize Specs',
              desc: 'Select GSM weight, color pages, cover foil, and input project details.',
            },
            {
              step: '4',
              title: 'Preview & Order',
              desc: 'Inspect your virtual black book, confirm pricing, and place order.',
            },
          ].map((st) => (
            <View key={st.step} style={styles.stepCard}>
              <View style={styles.stepBadgeCircle}>
                <Text style={styles.stepBadgeNumber}>{st.step}</Text>
              </View>
              <Text style={styles.stepCardTitle}>{st.title}</Text>
              <Text style={styles.stepCardDesc}>{st.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 8. PROFESSIONAL E-COMMERCE FOOTER */}
      <View style={styles.footerSection}>
        <View style={styles.footerContentWrap}>
          <View style={styles.footerColsRow}>
            {/* Brand Column */}
            <View style={styles.footerBrandCol}>
              <View style={styles.footerLogoRow}>
                <BookOpen size={20} color={COLORS.white} />
                <Text style={styles.footerBrandName}>PRINT</Text>
                <Text style={styles.footerBrandAccent}>BIZZ</Text>
              </View>
              <Text style={styles.footerBrandDesc}>
                {"India's premier e-commerce platform for academic printing, thesis binding, and university black books."}
              </Text>
              <Text style={styles.footerCopyright}>
                © 2026 Print Bizz Technologies Pvt Ltd. All rights reserved.
              </Text>
            </View>

            {/* Products Column */}
            <View style={styles.footerLinksCol}>
              <Text style={styles.footerColHeading}>Products</Text>
              <TouchableOpacity onPress={() => handleCategoryClick('Black Books')}><Text style={styles.footerLink}>University Black Books</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryClick('Project Books')}><Text style={styles.footerLink}>Project Reports</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryClick('Thesis Binding')}><Text style={styles.footerLink}>PhD Thesis Hardbound</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryClick('Spiral Binding')}><Text style={styles.footerLink}>Wire-O Spiral Binding</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryClick('Printing Services')}><Text style={styles.footerLink}>High-DPI Laser Printing</Text></TouchableOpacity>
            </View>

            {/* Customer Care Column */}
            <View style={styles.footerLinksCol}>
              <Text style={styles.footerColHeading}>Customer Care</Text>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Help Centre & FAQs</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('my_orders')}><Text style={styles.footerLink}>Track Your Order</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Shipping Policy</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Returns & Refunds</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Contact Support</Text></TouchableOpacity>
            </View>

            {/* Legal Column */}
            <View style={styles.footerLinksCol}>
              <Text style={styles.footerColHeading}>Policies & Legal</Text>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Terms & Conditions</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Security & Data Protection</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Academic Integrity Statement</Text></TouchableOpacity>
            </View>
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
  // Hero Styles
  heroSection: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.xxl,
  },
  heroContentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  heroTextCol: {
    flex: 1.2,
    minWidth: 320,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
  },
  heroBadgeText: {
    color: COLORS.darkOrange,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.navy,
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: SPACING.md,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.secondaryText,
    lineHeight: 22,
    marginBottom: SPACING.xl,
    maxWidth: 540,
  },
  heroCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  heroPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
  },
  heroPrimaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  heroSecondaryBtn: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
  },
  heroSecondaryBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  heroTrustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.base,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  heroImageCol: {
    flex: 1,
    minWidth: 320,
    alignItems: 'center',
  },
  heroImageCard: {
    width: '100%',
    maxWidth: 460,
    height: 310,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  floatingPreviewCard: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  floatingCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  floatingCardSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  // Section Styles
  sectionWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xxl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  sectionPreTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  // Category Cards
  categoryCardsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingVertical: 4,
  },
  categoryCard: {
    width: 170,
    height: 180,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.navy,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.sm + 2,
    backgroundColor: 'rgba(10, 25, 47, 0.85)',
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  categoryDesc: {
    fontSize: 10,
    color: '#CBD5E1',
    marginTop: 2,
  },
  // Products Grid
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'flex-start',
  },
  // Subway Promo Strip
  subwayPromoStrip: {
    backgroundColor: '#0A192F',
    paddingVertical: SPACING.xxl,
    marginVertical: SPACING.lg,
  },
  subwayPromoContent: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
    alignItems: 'center',
    textAlign: 'center',
  },
  subwayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(234, 88, 12, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.md,
  },
  subwayBadgeText: {
    color: '#FB923C',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subwayHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subwaySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 21,
    marginBottom: SPACING.lg,
  },
  subwayCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  subwayCtaBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  // Benefits Section
  benefitsSection: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.xxxl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  benefitsContentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
  },
  centerHeadingWrap: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  sectionPreTitleCenter: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  sectionTitleCenter: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
  },
  sectionSubtitleCenter: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: 480,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  benefitCard: {
    flex: 1,
    minWidth: 220,
    maxWidth: 240,
    padding: SPACING.lg,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  benefitIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  benefitCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 6,
  },
  benefitCardDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
  // How it works steps
  stepsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  stepCard: {
    flex: 1,
    minWidth: 220,
    maxWidth: 280,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    textAlign: 'center',
  },
  stepBadgeCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  stepBadgeNumber: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
  stepCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
    textAlign: 'center',
  },
  stepCardDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
    textAlign: 'center',
  },
  // Footer
  footerSection: {
    backgroundColor: '#0A192F',
    paddingVertical: SPACING.xxxl,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  footerContentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
  },
  footerColsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xxl,
    justifyContent: 'space-between',
  },
  footerBrandCol: {
    flex: 1.5,
    minWidth: 260,
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.md,
  },
  footerBrandName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  footerBrandAccent: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  footerBrandDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  footerCopyright: {
    fontSize: 11,
    color: '#64748B',
  },
  footerLinksCol: {
    flex: 1,
    minWidth: 150,
  },
  footerColHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.md,
  },
  footerLink: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
  },
});
