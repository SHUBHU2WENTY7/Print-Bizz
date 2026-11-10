import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Sliders, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Bookmark,
  Check
} from 'lucide-react-native';

export const ExploreScreen: React.FC = () => {
  const { selectProduct, navigateTo } = useAppStore();

  const [activeTab, setActiveTab] = useState<'editions' | 'specs' | 'guidelines'>('editions');
  const [selectedUniv, setSelectedUniv] = useState<string>('Mumbai University');
  const [selectedGsmTab, setSelectedGsmTab] = useState<'75' | '80' | '100'>('80');

  const handleSelectEdition = (productId: string) => {
    selectProduct(productId);
    navigateTo('customize');
  };

  const universityGuidelines = [
    {
      univ: 'Mumbai University',
      degrees: 'B.E., B.Tech, M.E., MCA, M.Sc (IT/CS)',
      leftMargin: '1.5 inches (38 mm) for spine clearance',
      otherMargins: '1.0 inch (25 mm) Top, Bottom, Right',
      fontStandard: 'Times New Roman 12pt (1.5 line spacing)',
      spineFormat: 'DEGREE - CANDIDATE NAME - PASSING YEAR',
      bindingReq: 'Black Hardbound with Gold Foil Lettering',
      tissueSheets: 'Mandatory before certificate of approval & guide sign leaves',
    },
    {
      univ: 'Savitribai Phule Pune University (SPPU)',
      degrees: 'B.E., M.E., MBA, Ph.D',
      leftMargin: '1.5 inches (38 mm) left gutter',
      otherMargins: '1.0 inch (25 mm) standard margin',
      fontStandard: 'Times New Roman 12pt, 1.5 spacing, Headings 14-16pt bold',
      spineFormat: 'PROJECT TITLE (ABBR) - YEAR - ROLL NO',
      bindingReq: 'Midnight Black Rigid Hardcover with Gold Foil Stamping',
      tissueSheets: 'Required for college approval & university endorsement pages',
    },
    {
      univ: 'Visvesvaraya Technological University (VTU)',
      degrees: 'B.E., M.Tech, MCA, Ph.D',
      leftMargin: '1.5 inches (38 mm) binding side margin',
      otherMargins: '1.0 inch (25 mm) all remaining sides',
      fontStandard: 'Arial or Times New Roman 12pt, 1.5 line spacing',
      spineFormat: 'VTU THESIS - BRANCH - CANDIDATE NAME - YEAR',
      bindingReq: 'Hardbound with Golden Lettering & College Crest',
      tissueSheets: 'Butter paper separator between certificate and declaration',
    },
    {
      univ: 'Anna University Chennai',
      degrees: 'B.E., B.Tech, M.E., MS By Research, Ph.D',
      leftMargin: '1.5 inches (38 mm) binding margin',
      otherMargins: '1.0 inch (25 mm) margins',
      fontStandard: 'Times New Roman 12pt, 1.5 line spacing, fully justified',
      spineFormat: 'THESIS TITLE - NAME - YEAR',
      bindingReq: 'Black Hardbound with Heated Thermal Gold Lettering',
      tissueSheets: 'Acid-free tissue sheets for certificate leaves recommended',
    },
    {
      univ: 'AKTU / Delhi Technological University (DTU)',
      degrees: 'B.Tech, M.Tech, MBA, Ph.D',
      leftMargin: '1.5 inches left edge',
      otherMargins: '1.0 inch top, bottom, right',
      fontStandard: 'Times New Roman 12pt, 1.5 line spacing',
      spineFormat: 'CAPSTONE - NAME - SESSION',
      bindingReq: 'Hardcover with Gold/Silver Foil Stamping',
      tissueSheets: 'Translucent butter paper separators included',
    },
  ];

  const currentGuideline = universityGuidelines.find((g) => g.univ === selectedUniv) || universityGuidelines[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. EXPLORE HERO BANNER */}
      <View style={styles.headerHero}>
        <View style={styles.headerHeroContent}>
          <View style={styles.badgeRow}>
            <GraduationCap size={15} color={COLORS.darkOrange} />
            <Text style={styles.badgeText}>COMPREHENSIVE BLACK BOOK DIRECTORY</Text>
          </View>
          <Text style={styles.pageTitle}>Explore Black Book Editions & Specs</Text>
          <Text style={styles.pageSubtitle}>
            Compare university editions, inspect paper GSM textures, review gold foil embossing standards, and ensure 100% compliance with your university submission rules.
          </Text>

          {/* Navigation Pill Switcher */}
          <View style={styles.tabSwitcher}>
            {[
              { id: 'editions', label: '1. Official Editions', icon: <BookOpen size={14} color={activeTab === 'editions' ? COLORS.white : COLORS.navy} /> },
              { id: 'specs', label: '2. Specifications & Finishes', icon: <Sliders size={14} color={activeTab === 'specs' ? COLORS.white : COLORS.navy} /> },
              { id: 'guidelines', label: '3. University Guidelines', icon: <GraduationCap size={14} color={activeTab === 'guidelines' ? COLORS.white : COLORS.navy} /> },
            ].map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.tabPill, activeTab === t.id && styles.tabPillActive]}
                onPress={() => setActiveTab(t.id as any)}
                activeOpacity={0.8}
              >
                {t.icon}
                <Text style={[styles.tabPillText, activeTab === t.id && styles.tabPillTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.contentWrap}>
        {/* TAB 1: OFFICIAL EDITIONS DEEP DIVE */}
        {activeTab === 'editions' && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionPreTitle}>OFFICIAL ACADEMIC STANDARDS</Text>
              <Text style={styles.sectionMainTitle}>Black Book Submission Editions</Text>
              <Text style={styles.sectionDescription}>
                Choose the edition suited to your degree level. All editions feature genuine heated foil stamping and archive-quality paper.
              </Text>
            </View>

            <View style={styles.editionsGrid}>
              {BLACK_BOOK_PRODUCTS.map((edition) => (
                <View key={edition.id} style={styles.editionCard}>
                  <View style={styles.editionImageWrap}>
                    <Image source={{ uri: edition.image }} style={styles.editionImage} resizeMode="cover" />
                    <View style={styles.badgeTag}>
                      <Text style={styles.badgeTagText}>{edition.badge}</Text>
                    </View>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceTagText}>From ₹{edition.startingPrice}</Text>
                    </View>
                  </View>

                  <View style={styles.editionBody}>
                    <Text style={styles.editionName}>{edition.name}</Text>
                    <Text style={styles.editionTagline}>{edition.tagline}</Text>
                    <Text style={styles.editionDesc}>{edition.description}</Text>

                    <View style={styles.specsList}>
                      <View style={styles.specItemRow}>
                        <CheckCircle2 size={13} color={COLORS.success} />
                        <Text style={styles.specItemText}>{edition.specifications.paperOptions}</Text>
                      </View>
                      <View style={styles.specItemRow}>
                        <CheckCircle2 size={13} color={COLORS.success} />
                        <Text style={styles.specItemText}>{edition.specifications.binding}</Text>
                      </View>
                      <View style={styles.specItemRow}>
                        <CheckCircle2 size={13} color={COLORS.success} />
                        <Text style={styles.specItemText}>{edition.specifications.turnaround}</Text>
                      </View>
                    </View>

                    <View style={styles.editionActions}>
                      <TouchableOpacity 
                        style={styles.previewBtn}
                        onPress={() => navigateTo('book_preview')}
                        activeOpacity={0.8}
                      >
                        <Eye size={14} color={COLORS.navy} />
                        <Text style={styles.previewBtnText}>3D Preview</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.customizeEditionBtn}
                        onPress={() => handleSelectEdition(edition.id)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.customizeEditionBtnText}>Customize</Text>
                        <ArrowRight size={14} color={COLORS.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* TAB 2: SPECIFICATIONS & FINISHES COMPARISON */}
        {activeTab === 'specs' && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionPreTitle}>MATERIALS & FINISHES</Text>
              <Text style={styles.sectionMainTitle}>Interactive Specification Comparator</Text>
              <Text style={styles.sectionDescription}>
                Inspect the tangible differences between bond paper weights, thermal foil stamping, and protective accessories.
              </Text>
            </View>

            {/* Paper GSM Comparison */}
            <View style={styles.comparisonCard}>
              <Text style={styles.compCardTitle}>1. Paper Weight (GSM) Comparison</Text>
              <View style={styles.gsmTabRow}>
                {[
                  { id: '75', label: '75 GSM Standard' },
                  { id: '80', label: '80 GSM Premium Bond (Recommended)' },
                  { id: '100', label: '100 GSM Executive Royal Bond' },
                ].map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={[styles.gsmChoiceBtn, selectedGsmTab === g.id && styles.gsmChoiceBtnActive]}
                    onPress={() => setSelectedGsmTab(g.id as any)}
                  >
                    <Text style={[styles.gsmChoiceText, selectedGsmTab === g.id && styles.gsmChoiceTextActive]}>
                      {g.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.gsmDetailsBox}>
                {selectedGsmTab === '75' && (
                  <View style={styles.gsmInfoCol}>
                    <Text style={styles.gsmHeading}>75 GSM Standard Academic Paper</Text>
                    <Text style={styles.gsmDesc}>
                      Suitable for lab journals, internal interim progress reports, and draft submissions. Clean monochrome laser printing with subtle transparency on heavy graphic pages.
                    </Text>
                    <View style={styles.gsmMetricsRow}>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Opacity</Text><Text style={styles.metricVal}>88%</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Thickness</Text><Text style={styles.metricVal}>95 µm</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Best For</Text><Text style={styles.metricVal}>Interim Reviews</Text></View>
                    </View>
                  </View>
                )}
                {selectedGsmTab === '80' && (
                  <View style={styles.gsmInfoCol}>
                    <Text style={styles.gsmHeading}>80 GSM Archive Bond Paper (Official Standard)</Text>
                    <Text style={styles.gsmDesc}>
                      The gold-standard specification mandated by Mumbai University, VTU, and SPPU. Eliminates toner bleed and back-side show-through on double-sided color charts and diagrams.
                    </Text>
                    <View style={styles.gsmMetricsRow}>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Opacity</Text><Text style={styles.metricVal}>94%</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Thickness</Text><Text style={styles.metricVal}>108 µm</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Best For</Text><Text style={styles.metricVal}>Final University Viva</Text></View>
                    </View>
                  </View>
                )}
                {selectedGsmTab === '100' && (
                  <View style={styles.gsmInfoCol}>
                    <Text style={styles.gsmHeading}>100 GSM Executive Royal Bond Paper</Text>
                    <Text style={styles.gsmDesc}>
                      Heavyweight archival grade bond sheet with brilliant brightness (CIE 165). Chosen for MBA capstone projects, PhD dissertations, and projects submitted to external examiners.
                    </Text>
                    <View style={styles.gsmMetricsRow}>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Opacity</Text><Text style={styles.metricVal}>98%</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Thickness</Text><Text style={styles.metricVal}>135 µm</Text></View>
                      <View style={styles.metricItem}><Text style={styles.metricKey}>Best For</Text><Text style={styles.metricVal}>Executive & PhD Theses</Text></View>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Foil Finishes Showcase */}
            <View style={styles.comparisonCard}>
              <Text style={styles.compCardTitle}>2. Genuine Thermal Heated Foil Embossing</Text>
              <View style={styles.foilsGrid}>
                <View style={styles.foilShowcaseCard}>
                  <View style={[styles.foilSwatchSample, { backgroundColor: '#111827' }]}>
                    <Text style={[styles.foilSampleText, { color: '#D4AF37' }]}>METALLIC GOLD FOIL</Text>
                  </View>
                  <Text style={styles.foilTitle}>Heated Gold Foil Stamping</Text>
                  <Text style={styles.foilNotes}>Universal traditional standard for engineering and management project reports.</Text>
                </View>

                <View style={styles.foilShowcaseCard}>
                  <View style={[styles.foilSwatchSample, { backgroundColor: '#111827' }]}>
                    <Text style={[styles.foilSampleText, { color: '#E2E8F0' }]}>BRILLIANT SILVER FOIL</Text>
                  </View>
                  <Text style={styles.foilTitle}>Brilliant Silver Metallic</Text>
                  <Text style={styles.foilNotes}>Contemporary high-contrast finish popular in computer science and AI submissions.</Text>
                </View>

                <View style={styles.foilShowcaseCard}>
                  <View style={[styles.foilSwatchSample, { backgroundColor: '#111827' }]}>
                    <Text style={[styles.foilSampleText, { color: '#B76E79' }]}>ROSE GOLD FOIL</Text>
                  </View>
                  <Text style={styles.foilTitle}>Rose Gold Luxe Foil</Text>
                  <Text style={styles.foilNotes}>Premium executive presentation finish for specialized design and MBA theses.</Text>
                </View>
              </View>
            </View>

            {/* Add-ons & Hardware */}
            <View style={styles.comparisonCard}>
              <Text style={styles.compCardTitle}>3. Handcrafted Protective Accessories</Text>
              <View style={styles.accessoriesGrid}>
                <View style={styles.accessoryItem}>
                  <ShieldCheck size={20} color={COLORS.navy} />
                  <Text style={styles.accessoryTitle}>Brass Corner Protectors</Text>
                  <Text style={styles.accessoryDesc}>Polished metallic tabs protecting all four corners from denting during viva handling.</Text>
                </View>
                <View style={styles.accessoryItem}>
                  <FileText size={20} color={COLORS.navy} />
                  <Text style={styles.accessoryTitle}>Butter Paper Tissue Inserts</Text>
                  <Text style={styles.accessoryDesc}>Acid-free translucent sheets inserted between signature leaves and certificate pages.</Text>
                </View>
                <View style={styles.accessoryItem}>
                  <Bookmark size={20} color={COLORS.navy} />
                  <Text style={styles.accessoryTitle}>Satin Ribbon Bookmark</Text>
                  <Text style={styles.accessoryDesc}>Convenient embedded reading ribbon marker sewn into the spine head-band.</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* TAB 3: UNIVERSITY GUIDELINES DATABASE */}
        {activeTab === 'guidelines' && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionPreTitle}>OFFICIAL REPOSITORIES</Text>
              <Text style={styles.sectionMainTitle}>University Submission Guidelines</Text>
              <Text style={styles.sectionDescription}>
                Select your university to view mandatory margin clearances, spine stamping formats, and binding requirements.
              </Text>
            </View>

            {/* University Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.univPillsRow}>
              {universityGuidelines.map((ug) => {
                const isSelected = selectedUniv === ug.univ;
                return (
                  <TouchableOpacity
                    key={ug.univ}
                    style={[styles.univPill, isSelected && styles.univPillActive]}
                    onPress={() => setSelectedUniv(ug.univ)}
                    activeOpacity={0.8}
                  >
                    <GraduationCap size={14} color={isSelected ? COLORS.white : COLORS.navy} />
                    <Text style={[styles.univPillText, isSelected && styles.univPillTextActive]}>
                      {ug.univ}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Selected University Specification Card */}
            <View style={styles.guidelineCard}>
              <View style={styles.guidelineHeader}>
                <View>
                  <Text style={styles.guidelineUnivTitle}>{currentGuideline.univ}</Text>
                  <Text style={styles.guidelineDegrees}>{currentGuideline.degrees}</Text>
                </View>
                <View style={styles.verifiedComplianceBadge}>
                  <Check size={12} color={COLORS.white} strokeWidth={3} />
                  <Text style={styles.verifiedComplianceText}>100% Compliant Format</Text>
                </View>
              </View>

              <View style={styles.guidelineTable}>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Binding Side Margin (Left):</Text>
                  <Text style={styles.guideVal}>{currentGuideline.leftMargin}</Text>
                </View>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Remaining Margins:</Text>
                  <Text style={styles.guideVal}>{currentGuideline.otherMargins}</Text>
                </View>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Font & Hierarchy Standard:</Text>
                  <Text style={styles.guideVal}>{currentGuideline.fontStandard}</Text>
                </View>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Spine Stamping Format:</Text>
                  <Text style={styles.guideValBold}>{currentGuideline.spineFormat}</Text>
                </View>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Binding Requirement:</Text>
                  <Text style={styles.guideVal}>{currentGuideline.bindingReq}</Text>
                </View>
                <View style={styles.guideRow}>
                  <Text style={styles.guideKey}>Certificate Page Protection:</Text>
                  <Text style={styles.guideVal}>{currentGuideline.tissueSheets}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.applyGuidelineCta}
                onPress={() => handleSelectEdition('customized-black-book')}
                activeOpacity={0.85}
              >
                <Text style={styles.applyGuidelineCtaText}>
                  Customize Black Book for {currentGuideline.univ}
                </Text>
                <ArrowRight size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerHero: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.xxl,
  },
  headerHeroContent: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.base,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: SPACING.sm,
  },
  badgeText: {
    color: COLORS.darkOrange,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    lineHeight: 22,
    maxWidth: 720,
    marginBottom: SPACING.lg,
  },
  tabSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPillActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  tabPillTextActive: {
    color: COLORS.white,
  },
  contentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
    paddingVertical: SPACING.xxl,
  },
  sectionBlock: {
    gap: SPACING.lg,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionPreTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.5,
  },
  sectionMainTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.secondaryText,
    maxWidth: 680,
    lineHeight: 20,
  },
  // Editions Grid
  editionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  editionCard: {
    flex: 1,
    minWidth: 300,
    maxWidth: 380,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  editionImageWrap: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.navy,
    position: 'relative',
  },
  editionImage: {
    width: '100%',
    height: '100%',
  },
  badgeTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  badgeTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  priceTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  editionBody: {
    padding: SPACING.lg,
    flex: 1,
    justifyContent: 'space-between',
  },
  editionName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 2,
  },
  editionTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkOrange,
    marginBottom: SPACING.sm,
  },
  editionDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  specsList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  specItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  specItemText: {
    fontSize: 11,
    color: COLORS.primaryText,
    fontWeight: '600',
  },
  editionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  customizeEditionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
  },
  customizeEditionBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },

  // Comparison Styles
  comparisonCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  compCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  gsmTabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.md,
  },
  gsmChoiceBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gsmChoiceBtnActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  gsmChoiceText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  gsmChoiceTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  gsmDetailsBox: {
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gsmInfoCol: {
    gap: SPACING.xs,
  },
  gsmHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  gsmDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  gsmMetricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  metricItem: {
    gap: 2,
  },
  metricKey: {
    fontSize: 10,
    color: COLORS.mutedText,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  // Foils Grid
  foilsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  foilShowcaseCard: {
    flex: 1,
    minWidth: 220,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
    overflow: 'hidden',
    padding: SPACING.md,
  },
  foilSwatchSample: {
    width: '100%',
    height: 70,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  foilSampleText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  foilTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  foilNotes: {
    fontSize: 11,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },
  // Accessories
  accessoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  accessoryItem: {
    flex: 1,
    minWidth: 220,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
    gap: 6,
  },
  accessoryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  accessoryDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },

  // Guidelines Styles
  univPillsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.md,
  },
  univPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  univPillActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  univPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  univPillTextActive: {
    color: COLORS.white,
  },
  guidelineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  guidelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.md,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  guidelineUnivTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
  },
  guidelineDegrees: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  verifiedComplianceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  verifiedComplianceText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  guidelineTable: {
    gap: 8,
    marginBottom: SPACING.lg,
  },
  guideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    flexWrap: 'wrap',
    gap: 4,
  },
  guideKey: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    minWidth: 180,
  },
  guideVal: {
    fontSize: 12,
    color: COLORS.secondaryText,
    flex: 1,
    textAlign: 'right',
  },
  guideValBold: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.darkOrange,
    flex: 1,
    textAlign: 'right',
  },
  applyGuidelineCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 13,
    borderRadius: RADIUS.sm,
  },
  applyGuidelineCtaText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
