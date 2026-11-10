import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { useAppStore } from '../store/useAppStore';
import { ProductCard } from '../components/ProductCard';
import { InteractiveBook } from '../components/InteractiveBook';
import { 
  BookOpen, 
  Sliders, 
  Truck, 
  Award, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  FileCheck,
  Star,
  GraduationCap
} from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { navigateTo, selectProduct } = useAppStore();

  const handleStartCustomizing = (productId?: string) => {
    selectProduct(productId || 'customized-black-book');
    navigateTo('customize');
  };

  const windowWidth = Dimensions.get('window').width;
  const heroBookWidth = Math.min(320, Math.max(260, windowWidth - 64));
  const heroBookHeight = Math.round(heroBookWidth * 1.45);

  const blackBookEditions = BLACK_BOOK_PRODUCTS;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. HERO SECTION WITH LIVE 3D BLACK BOOK */}
      <View style={styles.heroSection}>
        <View style={styles.heroContentWrap}>
          {/* Left Text Column */}
          <View style={styles.heroTextCol}>
            <View style={styles.heroBadge}>
              <Sparkles size={13} color={COLORS.darkOrange} />
              <Text style={styles.heroBadgeText}>OFFICIAL UNIVERSITY BLACK BOOK MAKER</Text>
            </View>

            <Text style={styles.heroHeading}>
              Your University Black Book.{'\n'}Crafted to Perfection.
            </Text>
            
            <Text style={styles.heroSubtitle}>
              Strictly compliant with official university guidelines. Custom gold & silver thermal foil stamping, archival bond paper, rigid hardcover binding, and live 3D preview before printing.
            </Text>

            <View style={styles.heroCtaRow}>
              <TouchableOpacity 
                style={styles.heroPrimaryBtn}
                onPress={() => handleStartCustomizing('customized-black-book')}
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
                <Text style={styles.heroSecondaryBtnText}>Explore Editions & Specs</Text>
              </TouchableOpacity>
            </View>

            {/* Trust Highlights */}
            <View style={styles.heroTrustRow}>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>University Compliant Formats</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>Thermal Foil Embossing</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle size={15} color={COLORS.success} />
                <Text style={styles.trustText}>Prompt Doorstep Courier</Text>
              </View>
            </View>
          </View>

          {/* Right Showcase Column: Real Interactive 3D Black Book */}
          <View style={styles.heroImageCol}>
            <View style={styles.heroInteractiveContainer}>
              <InteractiveBook
                bookTitle="AI-POWERED DISTRIBUTED SUPPLY CHAIN OPTIMIZATION"
                bookAuthor="Aarav Sharma"
                collegeName="Veermata Jijabai Technological Institute (VJTI)"
                rollNumber="221080045"
                degreeBranch="B.Tech in Computer Engineering"
                academicYear="2025-2026"
                guideName="Dr. Ramesh Kulkarni, Professor"
                embossingFoil="Gold Foil"
                width={heroBookWidth}
                height={heroBookHeight}
              />
              <View style={styles.floatingPreviewCard}>
                <Sparkles size={16} color={COLORS.darkOrange} />
                <View>
                  <Text style={styles.floatingCardTitle}>Interactive 3D Preview</Text>
                  <Text style={styles.floatingCardSub}>Click the cover above to open & flip inside pages</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 2. BLACK BOOK EDITIONS SHOWCASE */}
      <View style={styles.sectionWrap}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionPreTitle}>OFFICIAL EDITIONS</Text>
            <Text style={styles.sectionTitle}>Choose Your Black Book Edition</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => navigateTo('explore')}
          >
            <Text style={styles.viewAllBtnText}>Compare Specs</Text>
            <ChevronRight size={15} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {blackBookEditions.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </View>
      </View>

      {/* 3. STEP-BY-STEP SUBWAY CUSTOMIZATION PROMOTIONAL STRIP */}
      <View style={styles.subwayPromoStrip}>
        <View style={styles.subwayPromoContent}>
          <View style={styles.subwayBadge}>
            <Sliders size={14} color="#FB923C" />
            <Text style={styles.subwayBadgeText}>SUBWAY-STYLE CUSTOMIZATION</Text>
          </View>
          <Text style={styles.subwayHeading}>
            Build Your Black Book in 5 Seamless Steps
          </Text>
          <Text style={styles.subwaySubtext}>
            Upload your document, configure paper GSM and cover foil, inspect your virtual 3D book, and order with 100% submission confidence.
          </Text>
          <TouchableOpacity 
            style={styles.subwayCtaBtn}
            onPress={() => handleStartCustomizing()}
            activeOpacity={0.85}
          >
            <Text style={styles.subwayCtaBtnText}>Start Customizing Now</Text>
            <ArrowRight size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. CRAFTSMANSHIP & UNIVERSITY STANDARDS */}
      <View style={styles.benefitsSection}>
        <View style={styles.benefitsContentWrap}>
          <View style={styles.centerHeadingWrap}>
            <Text style={styles.sectionPreTitleCenter}>ACADEMIC EXCELLENCE</Text>
            <Text style={styles.sectionTitleCenter}>Engineered for University Acceptance</Text>
            <Text style={styles.sectionSubtitleCenter}>
              Every detail adheres strictly to university thesis guidelines for margin clearances, font hierarchy, and archival binding durability.
            </Text>
          </View>

          <View style={styles.benefitsGrid}>
            {[
              {
                icon: <Award size={22} color={COLORS.darkOrange} />,
                title: 'Thermal Foil Embossing',
                desc: 'Deep heated metallic gold or silver foil letters that never flake, rub off, or fade under handling.',
              },
              {
                icon: <FileCheck size={22} color={COLORS.navy} />,
                title: 'Archival Bond Paper',
                desc: 'Acid-free 80 GSM / 100 GSM executive bond sheets with high opacity to eliminate show-through.',
              },
              {
                icon: <BookOpen size={22} color={COLORS.oceanBlue} />,
                title: 'Rigid Heavyboard Binding',
                desc: 'Reinforced multi-ply bookbinding board engineered to withstand viva handling and university archival storage.',
              },
              {
                icon: <GraduationCap size={22} color={COLORS.success} />,
                title: 'University Format Compliant',
                desc: 'Precise margin tolerances for Mumbai University, SPPU, VTU, Anna University, and others.',
              },
              {
                icon: <Truck size={22} color={COLORS.darkOrange} />,
                title: 'Weatherproof Packaging',
                desc: 'Double bubble-cushioned and moisture-sealed packaging delivered right to your college or home.',
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

      {/* 5. HOW IT WORKS */}
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
              title: 'Select Edition',
              desc: 'Choose Standard, Executive Deluxe, or Doctoral Thesis Black Book.',
            },
            {
              step: '2',
              title: 'Upload Document',
              desc: 'Attach your genuine PDF or Word document with automated preflight validation.',
            },
            {
              step: '3',
              title: 'Customize Specs',
              desc: 'Input student name, roll number, college, paper GSM, and foil color.',
            },
            {
              step: '4',
              title: 'Live 3D Preview',
              desc: 'Turn pages of your 3D Black Book in real time before checkout.',
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

      {/* 6. VERIFIED STUDENT REVIEWS */}
      <View style={styles.reviewsSection}>
        <View style={styles.benefitsContentWrap}>
          <View style={styles.centerHeadingWrap}>
            <Text style={styles.sectionPreTitleCenter}>STUDENT EXPERIENCES</Text>
            <Text style={styles.sectionTitleCenter}>Trusted by 10,000+ Students</Text>
            <Text style={styles.sectionSubtitleCenter}>
              Hear from engineering, MBA, and PhD scholars who submitted their Black Books through Print Bizz.
            </Text>
          </View>

          <View style={styles.reviewsGrid}>
            {[
              {
                name: 'Rohan Deshmukh',
                college: 'VJTI, Mumbai • Computer Engineering',
                review: 'The gold foil stamping and binding quality was unmatched. The examiner specifically praised the clean typography and butter paper certificate separators. Delivered in 36 hours!',
                rating: 5,
              },
              {
                name: 'Priya Sundaram',
                college: 'College of Engineering Pune (COEP) • Mechanical',
                review: 'The live 3D book preview gave me so much peace of mind. Seeing my project title and student name embossed in gold before paying was amazing. 10/10 recommendation.',
                rating: 5,
              },
              {
                name: 'Ananya Roy',
                college: 'Delhi Technological University (DTU) • MBA',
                review: 'I ordered 4 copies for my guide and university library. The volume discount was great, and the executive leatherette rexine finish looked super luxurious.',
                rating: 5,
              },
            ].map((rev, idx) => (
              <View key={idx} style={styles.reviewCard}>
                <View style={styles.starsRow}>
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={15} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>
                <Text style={styles.reviewText}>&ldquo;{rev.review}&rdquo;</Text>
                <View style={styles.reviewerMeta}>
                  <Text style={styles.reviewerName}>{rev.name}</Text>
                  <Text style={styles.reviewerCollege}>{rev.college}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 7. FOOTER */}
      <View style={styles.footerSection}>
        <View style={styles.footerContentWrap}>
          <View style={styles.footerColsRow}>
            <View style={styles.footerBrandCol}>
              <View style={styles.footerLogoRow}>
                <BookOpen size={20} color={COLORS.white} />
                <Text style={styles.footerBrandName}>PRINT</Text>
                <Text style={styles.footerBrandAccent}>BIZZ</Text>
              </View>
              <Text style={styles.footerBrandDesc}>
                Official academic printing and university black book platform. Compliant with top universities across India.
              </Text>
              <Text style={styles.footerCopyright}>
                © 2026 Print Bizz Technologies Pvt Ltd. All rights reserved.
              </Text>
            </View>

            <View style={styles.footerLinksCol}>
              <Text style={styles.footerColHeading}>Black Book Editions</Text>
              <TouchableOpacity onPress={() => handleStartCustomizing('customized-black-book')}><Text style={styles.footerLink}>University Standard Edition</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleStartCustomizing('deluxe-black-book')}><Text style={styles.footerLink}>Executive Deluxe Edition</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleStartCustomizing('doctoral-black-book')}><Text style={styles.footerLink}>Doctoral & PhD Thesis Edition</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('book_preview')}><Text style={styles.footerLink}>3D Live Book Preview</Text></TouchableOpacity>
            </View>

            <View style={styles.footerLinksCol}>
              <Text style={styles.footerColHeading}>Support & Policies</Text>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>University Guidelines FAQs</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('my_orders')}><Text style={styles.footerLink}>Track Courier Delivery</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo('support')}><Text style={styles.footerLink}>Margin & Preflight Help</Text></TouchableOpacity>
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
    justifyContent: 'space-between',
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
    flexWrap: 'wrap',
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
    justifyContent: 'center',
  },
  heroInteractiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  floatingPreviewCard: {
    marginTop: 12,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  floatingCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.navy,
  },
  floatingCardSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'flex-start',
  },
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
    textAlign: 'center',
  },
  sectionSubtitleCenter: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: 520,
    lineHeight: 20,
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
  stepsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  stepCard: {
    flex: 1,
    minWidth: 220,
    maxWidth: 260,
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
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
    textAlign: 'center',
  },
  stepCardDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
  },
  // Reviews Section
  reviewsSection: {
    backgroundColor: COLORS.surfaceSubtle,
    paddingVertical: SPACING.xxxl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  reviewsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  reviewCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: SPACING.sm,
  },
  reviewText: {
    fontSize: 13,
    color: COLORS.primaryText,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  reviewerMeta: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.sm,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  reviewerCollege: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  footerSection: {
    backgroundColor: '#0F172A',
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
    justifyContent: 'space-between',
    gap: SPACING.xl,
  },
  footerBrandCol: {
    flex: 1.4,
    minWidth: 260,
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: SPACING.md,
  },
  footerBrandName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  footerBrandAccent: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.darkOrange,
  },
  footerBrandDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  footerCopyright: {
    fontSize: 11,
    color: '#64748B',
  },
  footerLinksCol: {
    flex: 1,
    minWidth: 180,
    gap: 8,
  },
  footerColHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  footerLink: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
});
