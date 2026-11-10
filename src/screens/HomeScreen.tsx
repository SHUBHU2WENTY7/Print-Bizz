import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { useAppStore } from '../store/useAppStore';
import { BlackBookCoverThumbnail } from '../components/BlackBookCoverThumbnail';
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  Truck, 
  UploadCloud, 
  Eye, 
  Sliders, 
  Check 
} from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { navigateTo, selectProduct, userProfile } = useAppStore();

  const handleStartCustomizing = (productId?: string) => {
    selectProduct(productId || 'customized-black-book');
    navigateTo('customize');
  };

  const blackBookEditions = BLACK_BOOK_PRODUCTS;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentWrap} showsVerticalScrollIndicator={false}>
      {/* 1. STUDENT VERIFIED BADGE BAR */}
      {userProfile.isRegistered && (
        <View style={styles.verifiedStudentBar}>
          <View style={styles.verifiedStudentLeft}>
            <View style={styles.verifiedIconWrap}>
              <GraduationCap size={16} color={COLORS.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.verifiedStudentName} numberOfLines={1}>{userProfile.name}</Text>
                <View style={styles.verifiedSmallBadge}>
                  <Check size={10} color={COLORS.success} />
                  <Text style={styles.verifiedSmallBadgeText}>Verified</Text>
                </View>
              </View>
              <Text style={styles.verifiedStudentSub} numberOfLines={1}>
                {userProfile.college} • Roll: {userProfile.rollNumber}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editProfilePill}
            onPress={() => navigateTo('profile')}
          >
            <Text style={styles.editProfilePillText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 2. HERO SHOWCASE (WITHOUT PREVIEW OVERFLOW) */}
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Sparkles size={12} color={COLORS.darkOrange} />
          <Text style={styles.heroBadgeText}>OFFICIAL UNIVERSITY BLACK BOOK MAKER</Text>
        </View>

        <Text style={styles.heroHeading}>
          Your University Black Book.{'\n'}Crafted to Absolute Perfection.
        </Text>
        
        <Text style={styles.heroSubtitle}>
          Engineered strictly in compliance with official university guidelines. Deep heated 24K gold foil stamping, archival acid-free bond paper, and rigid hardcover binding.
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
            <Text style={styles.heroSecondaryBtnText}>Compare Specs & Guidelines</Text>
          </TouchableOpacity>
        </View>

        {/* 3 Trust Features */}
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <CheckCircle size={14} color={COLORS.success} />
            <Text style={styles.trustItemText}>University Approved Formats</Text>
          </View>
          <View style={styles.trustItem}>
            <CheckCircle size={14} color={COLORS.success} />
            <Text style={styles.trustItemText}>24K Thermal Foil Embossing</Text>
          </View>
          <View style={styles.trustItem}>
            <CheckCircle size={14} color={COLORS.success} />
            <Text style={styles.trustItemText}>24-48h Campus Delivery</Text>
          </View>
        </View>
      </View>

      {/* 3. OFFICIAL BLACK BOOK EDITIONS */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionPreTitle}>ACCREDITED EDITIONS</Text>
            <Text style={styles.sectionTitle}>Choose Your Black Book Edition</Text>
          </View>
          <TouchableOpacity 
            style={styles.compareBtn}
            onPress={() => navigateTo('explore')}
          >
            <Text style={styles.compareBtnText}>View All Specs</Text>
            <ChevronRight size={14} color={COLORS.oceanBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.editionsGrid}>
          {blackBookEditions.map((edition) => (
            <View key={edition.id} style={styles.editionCard}>
              <BlackBookCoverThumbnail 
                editionName={edition.name}
                badge={edition.badge}
                height={150}
              />

              <View style={styles.editionBody}>
                <Text style={styles.editionName}>{edition.name}</Text>
                <Text style={styles.editionTagline}>{edition.tagline}</Text>

                <View style={styles.specsRow}>
                  <Text style={styles.specItem}>✓ {edition.specifications.paperOptions}</Text>
                  <Text style={styles.specItem}>✓ {edition.specifications.turnaround}</Text>
                </View>

                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.startingAtText}>Starting from</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                      <Text style={styles.priceCurrent}>₹{edition.startingPrice}</Text>
                      <Text style={styles.priceOriginal}>₹{edition.originalPrice}</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.selectEditionBtn}
                    onPress={() => handleStartCustomizing(edition.id)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.selectEditionBtnText}>Select & Build</Text>
                    <ArrowRight size={14} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 4. 5-STEP STREAMLINED FLOW */}
      <View style={styles.section}>
        <View style={styles.flowCard}>
          <Text style={styles.flowCardPreTitle}>STREAMLINED WORKFLOW</Text>
          <Text style={styles.flowCardTitle}>How Print Bizz Delivers Perfection</Text>

          <View style={styles.stepsContainer}>
            {[
              {
                step: '1',
                title: 'Select Edition',
                sub: 'Choose between University Standard, Executive Deluxe, or Doctoral PhD.',
                icon: BookOpen,
              },
              {
                step: '2',
                title: 'Upload Manuscript',
                sub: 'Drag & drop your PDF or Word document with automated preflight validation.',
                icon: UploadCloud,
              },
              {
                step: '3',
                title: 'Customize Cover & Foil',
                sub: 'Configure heated 24K gold foil stamping with your name, college, and title.',
                icon: Sliders,
              },
              {
                step: '4',
                title: 'Live 3D Book Preview',
                sub: 'Inspect your photorealistic virtual 3D book and review layout before printing.',
                icon: Eye,
              },
              {
                step: '5',
                title: 'Fast Campus Dispatch',
                sub: 'Handcrafted, bound, and delivered directly to your college campus.',
                icon: Truck,
              },
            ].map((st, i) => (
              <View key={st.step} style={styles.stepItemRow}>
                <View style={styles.stepNumberBadge}>
                  <st.icon size={15} color={COLORS.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{st.title}</Text>
                  <Text style={styles.stepSub}>{st.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 5. CRAFTSMANSHIP GUARANTEE */}
      <View style={styles.section}>
        <View style={styles.craftsmanshipBox}>
          <ShieldCheck size={32} color={COLORS.navy} />
          <Text style={styles.craftTitle}>100% Viva Voce Academic Guarantee</Text>
          <Text style={styles.craftSub}>
            If your college department or external examiner rejects your project report due to printing margins or binding non-compliance, Print Bizz re-prints and re-binds your Black Book completely free of charge.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
    padding: SPACING.base,
    paddingBottom: 90,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  verifiedStudentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: SPACING.md,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  verifiedStudentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  verifiedIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedStudentName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  verifiedSmallBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  verifiedSmallBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
  },
  verifiedStudentSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  editProfilePill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  editProfilePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: SPACING.lg,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    lineHeight: 28,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 19,
    marginBottom: 16,
  },
  heroCtaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  heroPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroPrimaryBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  heroSecondaryBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
  },
  heroSecondaryBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  sectionPreTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
  },
  compareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compareBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  editionsGrid: {
    gap: SPACING.md,
  },
  editionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#FED7AA',
    overflow: 'hidden',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  editionImageWrap: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  editionImage: {
    width: '100%',
    height: '100%',
  },
  editionBadgePill: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  editionBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  editionBody: {
    padding: 14,
  },
  editionName: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.navy,
  },
  editionTagline: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
    marginBottom: 8,
  },
  specsRow: {
    gap: 3,
    marginBottom: 12,
  },
  specItem: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  startingAtText: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  priceCurrent: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
  },
  priceOriginal: {
    fontSize: 12,
    color: COLORS.mutedText,
    textDecorationLine: 'line-through',
  },
  selectEditionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.sm,
  },
  selectEditionBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  flowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  flowCardPreTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.8,
  },
  flowCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
    marginBottom: 14,
  },
  stepsContainer: {
    gap: 12,
  },
  stepItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  stepSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
    lineHeight: 16,
  },
  craftsmanshipBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  craftTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 8,
    textAlign: 'center',
  },
  craftSub: {
    fontSize: 12,
    color: '#78350F',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
