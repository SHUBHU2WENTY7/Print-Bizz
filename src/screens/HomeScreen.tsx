import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions 
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
  MapPin,
  ArrowRight
} from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { navigateTo, selectProduct } = useAppStore();

  const handleOrderHero = () => {
    selectProduct('customized-black-book');
    navigateTo('customize');
  };

  const handleDetails = (id: string) => {
    selectProduct(id);
    navigateTo('product_details');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. HERO BANNER (Reference 5 & Specification) */}
      <View style={styles.heroSection}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Sparkles size={14} color={COLORS.darkOrange} />
            <Text style={styles.heroBadgeText}>OFFICIAL ACADEMIC PRINTING</Text>
          </View>

          <Text style={styles.heroHeading}>
            Your Black Book,{'\n'}Made Easy.
          </Text>
          <Text style={styles.heroSubheading}>
            Customize. Print. Get Delivered.
          </Text>

          {/* Hub Logistics Pill */}
          <View style={styles.logisticsPill}>
            <MapPin size={13} color={COLORS.oceanBlue} />
            <Text style={styles.logisticsPillText}>
              Goa Manufacturing Hub ➔ Thane Distribution Hub ➔ Express Mumbai Delivery
            </Text>
          </View>

          {/* Hero CTAs */}
          <View style={styles.heroCtaRow}>
            <TouchableOpacity 
              style={styles.heroPrimaryBtn}
              onPress={handleOrderHero}
              activeOpacity={0.85}
            >
              <Text style={styles.heroPrimaryBtnText}>Order Your Black Book</Text>
              <ArrowRight size={16} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.heroSecondaryBtn}
              onPress={() => navigateTo('support')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroSecondaryBtnText}>How It Works</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Showcase Image */}
          <View style={styles.heroImageWrapper}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlayBadge}>
              <Award size={14} color="#F59E0B" />
              <Text style={styles.heroOverlayBadgeText}>Gold Foil Stamped • A4 Bond</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. EXPLORE BLACK BOOKS (Product Section) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionCategory}>SPECIALIZED PRINTING</Text>
            <Text style={styles.sectionTitle}>Explore Black Books</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => navigateTo('search')}
          >
            <Text style={styles.viewAllText}>All Options</Text>
            <ChevronRight size={16} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtext}>
          Strictly compliant with Mumbai University, SPPU, and national engineering/management format guidelines.
        </Text>

        <View style={styles.productsGrid}>
          {BLACK_BOOK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>

      {/* 3. HOW IT WORKS (4 Steps) */}
      <View style={[styles.section, styles.howItWorksBg]}>
        <View style={styles.sectionHeaderCenter}>
          <Text style={styles.sectionCategoryCenter}>EFFORTLESS 4-STEP PROCESS</Text>
          <Text style={styles.sectionTitleCenter}>How It Works</Text>
          <Text style={styles.sectionSubtextCenter}>
            Order in minutes from your phone or laptop with real-time preflight verification.
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {[
            {
              num: '1',
              title: 'Choose Your Black Book',
              desc: 'Select from College Standard, Capstone Project, or Custom University guidelines edition.',
              icon: <BookOpen size={20} color={COLORS.navy} />,
            },
            {
              num: '2',
              title: 'Upload Your Document',
              desc: 'Drag & drop your PDF with instant preflight margin, page count, and DPI checks.',
              icon: <UploadCloud size={20} color={COLORS.navy} />,
            },
            {
              num: '3',
              title: 'Customize Your Printing',
              desc: 'Configure 80/100 GSM paper, gold embossing, spine lettering, and add-on certificates.',
              icon: <Sliders size={20} color={COLORS.navy} />,
            },
            {
              num: '4',
              title: 'Get It Delivered',
              desc: 'Manufactured at our Goa press, routed through Thane Hub, and delivered to Mumbai doorsteps.',
              icon: <Truck size={20} color={COLORS.navy} />,
            },
          ].map((step, idx) => (
            <View key={step.num} style={styles.stepCard}>
              <View style={styles.stepNumBadge}>
                <Text style={styles.stepNumText}>{step.num}</Text>
              </View>
              <View style={styles.stepIconWrap}>{step.icon}</View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 4. WHY PRINT BIZZ */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderCenter}>
          <Text style={styles.sectionCategoryCenter}>PREMIUM GUARANTEE</Text>
          <Text style={styles.sectionTitleCenter}>Why Print Bizz?</Text>
        </View>

        <View style={styles.whyGrid}>
          {[
            {
              title: 'Customizable Printing',
              desc: 'Tailor every single specification: paper GSM, print sides, custom gold foil fonts and spine lettering.',
              icon: <Sliders size={22} color={COLORS.darkOrange} />,
            },
            {
              title: 'Quality Materials',
              desc: 'Imported leatherette rexine, 100% acid-free bond paper, and heavy duty 3mm binders boards.',
              icon: <Award size={22} color={COLORS.oceanBlue} />,
            },
            {
              title: 'Convenient Ordering',
              desc: 'No more standing in long local xerox shop queues before submission deadlines. Order from home.',
              icon: <Clock size={22} color={COLORS.navy} />,
            },
            {
              title: '11-Stage Live Tracking',
              desc: 'Real-time transparent audit trail from Goa industrial press to Thane sorting hub and delivery.',
              icon: <ShieldCheck size={22} color={COLORS.success} />,
            },
          ].map((item, i) => (
            <View key={i} style={styles.whyCard}>
              <View style={styles.whyIconBubble}>{item.icon}</View>
              <Text style={styles.whyTitle}>{item.title}</Text>
              <Text style={styles.whyDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 5. CAMPUS SUBMISSION DEADLINE NOTICE */}
      <View style={styles.section}>
        <View style={styles.campusAlertCard}>
          <View style={styles.alertContent}>
            <View style={styles.alertBadge}>
              <Clock size={14} color={COLORS.darkOrange} />
              <Text style={styles.alertBadgeText}>FAST TURNAROUND FOR SUBMISSIONS</Text>
            </View>
            <Text style={styles.alertTitle}>Submitting this week in Mumbai?</Text>
            <Text style={styles.alertDesc}>
              Our daily express freight connects Goa production facility directly to Thane distribution hub, providing rapid delivery to colleges across Mumbai, Navi Mumbai, and Thane.
            </Text>
            <TouchableOpacity 
              style={styles.alertCta}
              onPress={handleOrderHero}
            >
              <Text style={styles.alertCtaText}>Start Customization Now</Text>
              <ArrowRight size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionCategory}>SUPPORT & GUIDANCE</Text>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          </View>
        </View>

        <View style={styles.faqList}>
          {[
            {
              q: 'What is the standard margin requirement for Black Book binding?',
              a: 'University guidelines require a 1.25 inch (32mm) left inner margin for hardcover binding so that no text is concealed when opened. Our system preflights your PDF automatically.',
            },
            {
              q: 'How does gold foil embossing work?',
              a: 'We use heated brass stamping dies that imprint metallic gold foil permanently into the midnight black hardcover rexine, matching authentic university seals.',
            },
            {
              q: 'How does delivery between Goa and Mumbai operate?',
              a: 'All manufacturing takes place in our specialized high-capacity Goa industrial facility. Orders are dispatched in bulk overnight to our Thane hub, where local Mumbai couriers take over for prompt delivery.',
            },
            {
              q: 'Can I select only specific color pages for printing?',
              a: 'Yes! In the customization screen, choose "Mixed (B&W + Colour)" or specify custom page ranges so you only pay color rates for diagrams and charts.',
            },
          ].map((faq, i) => (
            <View key={i} style={styles.faqCard}>
              <View style={styles.faqQRow}>
                <HelpCircle size={16} color={COLORS.oceanBlue} />
                <Text style={styles.faqQuestion}>{faq.q}</Text>
              </View>
              <Text style={styles.faqAnswer}>{faq.a}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 7. FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerBrandRow}>
          <View style={styles.footerLogoBadge}>
            <BookOpen size={16} color={COLORS.white} />
          </View>
          <Text style={styles.footerBrandText}>PRINT BIZZ</Text>
        </View>
        <Text style={styles.footerMission}>
          Official academic project & thesis binding platform. Built for university students, researchers, and colleges.
        </Text>
        <View style={styles.footerHubsRow}>
          <Text style={styles.footerHubItem}>🏭 Manufacturing: Goa Central Facility</Text>
          <Text style={styles.footerHubItem}>📦 Distribution: Thane Hub, Maharashtra</Text>
          <Text style={styles.footerHubItem}>🚀 Coverage: Mumbai Metropolitan Region</Text>
        </View>
        <View style={styles.footerDivider} />
        <Text style={styles.footerCopyright}>
          © {new Date().getFullYear()} PRINT BIZZ. All rights reserved. Customer Application v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    padding: SPACING.base,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  heroCard: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#1E3A5F',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(217, 107, 39, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.darkOrange,
    marginBottom: SPACING.md,
  },
  heroBadgeText: {
    color: COLORS.darkOrange,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroHeading: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  heroSubheading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A5C4D4',
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  logisticsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(22, 138, 173, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  logisticsPillText: {
    color: '#E0F2FE',
    fontSize: 11,
    fontWeight: '600',
  },
  heroCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  heroPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  heroPrimaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  heroSecondaryBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroSecondaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  heroImageWrapper: {
    width: '100%',
    height: 180,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    marginTop: SPACING.sm,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(16, 35, 63, 0.88)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  heroOverlayBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  howItWorksBg: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    marginVertical: SPACING.md,
    paddingVertical: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.xs,
  },
  sectionHeaderCenter: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.oceanBlue,
    letterSpacing: 0.8,
  },
  sectionCategoryCenter: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.oceanBlue,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  sectionTitleCenter: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionSubtext: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: SPACING.base,
    lineHeight: 18,
  },
  sectionSubtextCenter: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 500,
    marginTop: 4,
    lineHeight: 18,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingBottom: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  productsGrid: {
    gap: SPACING.md,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  stepCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  stepNumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.oceanBlue,
  },
  stepIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 17,
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  whyCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  whyIconBubble: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  whyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  whyDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 17,
  },
  campusAlertCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    padding: SPACING.lg,
  },
  alertContent: {
    gap: SPACING.sm,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.6,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
  },
  alertDesc: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 19,
  },
  alertCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  alertCtaText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  faqList: {
    gap: SPACING.md,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  faqQRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 18,
    paddingLeft: 24,
  },
  footer: {
    backgroundColor: COLORS.navy,
    padding: SPACING.xl,
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  footerLogoBadge: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.darkOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBrandText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
  footerMission: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  footerHubsRow: {
    gap: 4,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  footerHubItem: {
    fontSize: 11,
    color: '#E0F2FE',
    fontWeight: '600',
  },
  footerDivider: {
    width: '100%',
    maxWidth: 600,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: SPACING.md,
  },
  footerCopyright: {
    fontSize: 11,
    color: '#64748B',
  },
});
