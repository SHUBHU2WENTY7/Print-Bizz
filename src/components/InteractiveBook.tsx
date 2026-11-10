import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
  ScrollView 
} from 'react-native';
import { 
  ChevronLeft, 
  ChevronRight, 
  RefreshCcw, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  GraduationCap,
  X
} from 'lucide-react-native';
import { COLORS, RADIUS } from '../constants/theme';
import { CustomizationState, UploadedDocument } from '../types';

export interface BookPage {
  title?: string;
  category?: string;
  content: React.ReactNode;
  backContent?: React.ReactNode;
  pageNumber: number;
}

export interface InteractiveBookProps {
  bookTitle?: string;
  bookAuthor?: string;
  collegeName?: string;
  university?: string;
  rollNumber?: string;
  degreeBranch?: string;
  academicYear?: string;
  guideName?: string;
  embossingFoil?: 'Gold Foil' | 'Silver Foil' | 'Rose Gold';
  coverColor?: string;
  uploadedDocument?: UploadedDocument | null;
  customization?: CustomizationState;
  width?: number;
  height?: number;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({
  bookTitle = 'AI-POWERED DISTRIBUTED SUPPLY CHAIN OPTIMIZATION',
  bookAuthor = 'Aarav Sharma',
  collegeName = 'Veermata Jijabai Technological Institute (VJTI)',
  university = 'University of Mumbai',
  rollNumber = '221080045',
  degreeBranch = 'B.Tech in Computer Engineering',
  academicYear = '2025-2026',
  guideName = 'Dr. Ramesh Kulkarni, Professor',
  embossingFoil = 'Gold Foil',
  coverColor = '#0B0E14',
  uploadedDocument = null,
  customization,
  width: propWidth,
  height: propHeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth < 680;

  // Responsive page width: fits 100% within mobile screen when open side-by-side
  const pageWidth = isMobile 
    ? Math.floor((windowWidth - 44) / 2) 
    : (propWidth || 320);
  const pageHeight = propHeight || Math.round(pageWidth * 1.44);

  const foilHex = embossingFoil === 'Silver Foil' ? '#E2E8F0' : embossingFoil === 'Rose Gold' ? '#B76E79' : '#D4AF37';
  const foilBorderHex = embossingFoil === 'Silver Foil' ? '#94A3B8' : embossingFoil === 'Rose Gold' ? '#9D4D58' : '#B8860B';
  const foilShadowHex = embossingFoil === 'Silver Foil' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.7)';

  // Authentic academic sample pages
  const defaultPages: BookPage[] = [
    {
      pageNumber: 1,
      title: 'TITLE & CERTIFICATE OF APPROVAL',
      category: 'Official Submission',
      content: (
        <View style={pageStyles.pageContainer}>
          <View style={pageStyles.crestContainer}>
            <View style={[pageStyles.crestCircle, { borderColor: foilHex }]}>
              <GraduationCap size={18} color={COLORS.navy} />
            </View>
            <Text style={pageStyles.collegeHeading} numberOfLines={2}>{collegeName.toUpperCase()}</Text>
            <Text style={pageStyles.deptSub}>DEPARTMENT OF COMPUTER ENGINEERING</Text>
          </View>

          <View style={pageStyles.titleBlock}>
            <Text style={pageStyles.reportType}>A CAPSTONE PROJECT REPORT ON</Text>
            <Text style={pageStyles.mainProjectTitle} numberOfLines={3}>{bookTitle}</Text>
            <Text style={pageStyles.submissionNotice}>
              Submitted in partial fulfillment of the requirements for the degree of
            </Text>
            <Text style={pageStyles.degreeTitle}>{degreeBranch.toUpperCase()}</Text>
          </View>

          <View style={pageStyles.authorBlock}>
            <Text style={pageStyles.byLabel}>SUBMITTED BY</Text>
            <Text style={pageStyles.authorName}>{bookAuthor.toUpperCase()}</Text>
            <Text style={pageStyles.rollLabel}>Roll No: {rollNumber}</Text>
          </View>

          <View style={pageStyles.guideBlock}>
            <Text style={pageStyles.guideLabel}>UNDER THE GUIDANCE OF</Text>
            <Text style={pageStyles.guideNameVal}>{guideName.toUpperCase()}</Text>
            <Text style={pageStyles.guideYear}>ACADEMIC YEAR {academicYear}</Text>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <View style={pageStyles.certificateHeader}>
            <Award size={22} color={COLORS.navy} />
            <Text style={pageStyles.certTitle}>CERTIFICATE OF APPROVAL</Text>
            <View style={pageStyles.headerUnderline} />
          </View>

          <Text style={pageStyles.certBody}>
            This is to certify that the project entitled <Text style={pageStyles.boldText}>&ldquo;{bookTitle}&rdquo;</Text> is a bona fide record of work carried out by <Text style={pageStyles.boldText}>{bookAuthor}</Text> (Roll No: {rollNumber}) under my supervision and guidance towards partial fulfillment of the requirements for <Text style={pageStyles.boldText}>{degreeBranch}</Text>.
          </Text>

          <View style={pageStyles.signaturesRow}>
            <View style={pageStyles.sigCol}>
              <View style={pageStyles.signatureLine} />
              <Text style={pageStyles.sigName}>{guideName}</Text>
              <Text style={pageStyles.sigRole}>Project Supervisor</Text>
            </View>

            <View style={pageStyles.sigCol}>
              <View style={pageStyles.signatureLine} />
              <Text style={pageStyles.sigName}>Dr. S. K. Mehta</Text>
              <Text style={pageStyles.sigRole}>Head of Department</Text>
            </View>
          </View>

          <View style={pageStyles.examinerSignBox}>
            <View style={pageStyles.signatureLine} />
            <Text style={pageStyles.sigName}>External Examiner</Text>
            <Text style={pageStyles.sigRole}>Date of Examination: May 2026</Text>
          </View>
        </View>
      ),
    },
    {
      pageNumber: 2,
      title: 'ABSTRACT & SYSTEM ARCHITECTURE',
      category: 'Technical Specifications',
      content: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>ABSTRACT</Text>
          <Text style={pageStyles.abstractBody}>
            Modern academic supply chains and distributed campus printing hubs demand real-time verification, cryptographic proof of integrity, and automated telemetry. This thesis presents a fault-tolerant architecture capable of coordinating heterogeneous nodes across pan-university testbeds.
          </Text>

          <View style={pageStyles.diagramCard}>
            <View style={pageStyles.diagramHeader}>
              <Cpu size={14} color={COLORS.navy} />
              <Text style={pageStyles.diagramTitle}>Figure 1.1: Core Pipeline Architecture</Text>
            </View>
            <View style={pageStyles.archDiagramBox}>
              <View style={pageStyles.archNode}><Text style={pageStyles.archNodeText}>Client Layer (Mobile/Web)</Text></View>
              <Text style={pageStyles.archArrow}>↓</Text>
              <View style={pageStyles.archNode}><Text style={pageStyles.archNodeText}>Preflight & PDF Parsing</Text></View>
              <Text style={pageStyles.archArrow}>↓</Text>
              <View style={[pageStyles.archNode, { backgroundColor: '#FEF3C7', borderColor: '#D97706' }]}>
                <Text style={[pageStyles.archNodeText, { color: '#B45309' }]}>Laser Print Engine & 24K Foil Stamping</Text>
              </View>
            </View>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>EMPIRICAL RESULTS & BENCHMARKS</Text>
          <Text style={pageStyles.resultsBody}>
            Extensive stress testing across 10,000 requests shows sub-80ms rendering latency and 99.98% preflight accuracy on standard A4 academic bond papers.
          </Text>

          <View style={pageStyles.metricsTable}>
            <View style={pageStyles.tableHeaderRow}>
              <Text style={pageStyles.tableHeadText}>Metric</Text>
              <Text style={pageStyles.tableHeadText}>Target</Text>
              <Text style={pageStyles.tableHeadText}>Observed</Text>
            </View>
            <View style={pageStyles.tableRow}>
              <Text style={pageStyles.tableCell}>DPI Resolution</Text>
              <Text style={pageStyles.tableCell}>600 DPI</Text>
              <Text style={[pageStyles.tableCell, { fontWeight: '700', color: COLORS.success }]}>1200 DPI</Text>
            </View>
            <View style={pageStyles.tableRow}>
              <Text style={pageStyles.tableCell}>Spine Adhesion</Text>
              <Text style={pageStyles.tableCell}>45 N/cm</Text>
              <Text style={[pageStyles.tableCell, { fontWeight: '700', color: COLORS.success }]}>58.4 N/cm</Text>
            </View>
            <View style={pageStyles.tableRow}>
              <Text style={pageStyles.tableCell}>Foil Durability</Text>
              <Text style={pageStyles.tableCell}>500 cycles</Text>
              <Text style={[pageStyles.tableCell, { fontWeight: '700', color: COLORS.success }]}>1200 cycles</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      pageNumber: 3,
      title: 'CONCLUSION & REFERENCES',
      category: 'Viva Voce Ready',
      content: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>CONCLUSION & RECOMMENDATIONS</Text>
          <Text style={pageStyles.abstractBody}>
            The experimental outcomes validate that decentralized coordination combined with localized policy reinforcement drastically outperforms monolithic solvers in dynamic logistics scenarios. Future extensions will incorporate zero-knowledge proofs for cross-border privacy preservation.
          </Text>

          <Text style={pageStyles.refHeading}>KEY REFERENCES</Text>
          <View style={pageStyles.refList}>
            <Text style={pageStyles.refItem}>
              [1] Kulkarni, R. et al., &ldquo;Autonomous Distributed Coordination in Academic Systems,&rdquo; IEEE Trans. Ind. Inform., vol. 18, 2024.
            </Text>
            <Text style={pageStyles.refItem}>
              [2] Sharma, A., &ldquo;Neural Policy Optimization in E-Commerce Fulfillment,&rdquo; Int. Conf. Software Eng. (ICSE), 2025.
            </Text>
            <Text style={pageStyles.refItem}>
              [3] Goodfellow, I. et al., &ldquo;Deep Learning Architectures,&rdquo; MIT Press, Cambridge, MA, 2023.
            </Text>
          </View>

          <View style={pageStyles.endSealWrap}>
            <CheckCircle2 size={16} color={COLORS.success} />
            <Text style={pageStyles.endSealText}>University Examination Ready • Bound by Print Bizz</Text>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <View style={pageStyles.backEndorsementWrap}>
            <GraduationCap size={28} color={COLORS.navy} />
            <Text style={pageStyles.backEndorsementTitle}>{university.toUpperCase()}</Text>
            <Text style={pageStyles.backEndorsementSub}>{collegeName}</Text>
            <View style={pageStyles.dividerGold} />
            <Text style={pageStyles.backEndorsementFooter}>
              End of Black Book Capstone Report • Archival Bond Edition
            </Text>
          </View>
        </View>
      ),
    },
  ];

  const pages = defaultPages;

  const handleOpenBook = () => setIsOpen(true);
  const handleCloseBook = () => {
    setIsOpen(false);
    setCurrentPageIndex(-1);
  };

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex >= 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const restartBook = () => {
    setCurrentPageIndex(-1);
  };

  // Keyboard navigation on Web
  useEffect(() => {
    if (Platform.OS !== 'web' || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentPageIndex((prev) => (prev >= 0 ? prev - 1 : prev));
      }
      if (e.key === 'Escape') {
        handleCloseBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pages.length]);

  return (
    <View style={styles.outerContainer}>
      {/* 3D Book Interactive Stage */}
      <View 
        style={[
          styles.stage, 
          { 
            width: isOpen ? pageWidth * 2 + 10 : pageWidth, 
            height: pageHeight + 20,
            perspective: 2000,
          } as any
        ]}
      >
        {/* Book Container with 3D shift */}
        <View 
          style={[
            styles.bookContainer,
            {
              width: pageWidth,
              height: pageHeight,
              transform: [
                { translateX: isOpen ? pageWidth / 2 : 0 },
              ],
              transition: 'transform 1.1s cubic-bezier(0.25, 0, 0, 1)',
              transformStyle: 'preserve-3d',
            } as any
          ]}
        >
          {/* FRONT COVER */}
          <View
            style={[
              styles.frontCoverWrapper,
              {
                width: pageWidth,
                height: pageHeight,
                transformOrigin: 'left center',
                transform: [
                  { rotateY: isOpen ? '-180deg' : isHovering ? '-12deg' : '0deg' },
                ],
                transition: 'transform 1.1s cubic-bezier(0.25, 0, 0, 1)',
                zIndex: isOpen ? 0 : 50,
                transformStyle: 'preserve-3d',
              } as any
            ]}
          >
            {/* Front Face: Photorealistic Luxury Black Book Rexine */}
            <TouchableOpacity
              activeOpacity={0.95}
              {...({
                onMouseEnter: () => !isOpen && setIsHovering(true),
                onMouseLeave: () => setIsHovering(false),
              } as any)}
              style={[
                styles.frontFace,
                {
                  backgroundColor: coverColor,
                  backfaceVisibility: 'hidden',
                } as any
              ]}
              onPress={!isOpen ? handleOpenBook : undefined}
            >
              {/* Authentic Midnight Leatherette Texture Background (No Unsplash Photo) */}
              <View style={styles.solidRexineBg} />
              
              {/* Spine Highlight & Depth Crease */}
              <View style={styles.spineGrip} />
              <View style={styles.spineCreaseLine} />

              {/* 24K Embossed Metallic Gold Foil Border Frame */}
              <View style={[styles.foilOuterFrame, { borderColor: foilHex }]}>
                <View style={[styles.foilInnerFrame, { borderColor: foilBorderHex }]}>
                  
                  {/* Top: University & College Name */}
                  <View style={styles.foilHeaderSection}>
                    <Text style={[styles.foilCollegeText, { color: foilHex, textShadowColor: foilShadowHex }]} numberOfLines={2}>
                      {collegeName.toUpperCase()}
                    </Text>
                    {university ? (
                      <Text style={[styles.foilUnivText, { color: foilHex }]} numberOfLines={1}>
                        AFFILIATED TO {university.toUpperCase()}
                      </Text>
                    ) : null}
                  </View>

                  {/* Embossed Academic Seal / University Crest */}
                  <View style={styles.crestSealWrap}>
                    <View style={[styles.sealOuterRing, { borderColor: foilHex }]}>
                      <View style={[styles.sealInnerRing, { borderColor: foilBorderHex }]}>
                        <GraduationCap size={16} color={foilHex} />
                      </View>
                    </View>
                    <View style={styles.sealStarsRow}>
                      <Sparkles size={10} color={foilHex} />
                      <Text style={[styles.sealStarText, { color: foilHex }]}>★ ★ ★</Text>
                      <Sparkles size={10} color={foilHex} />
                    </View>
                  </View>

                  {/* Project Title Block */}
                  <View style={styles.foilTitleSection}>
                    <Text style={[styles.foilLeadText, { color: foilHex }]}>A PROJECT REPORT ON</Text>
                    <Text style={[styles.foilProjectTitle, { color: foilHex, textShadowColor: foilShadowHex }]} numberOfLines={3}>
                      {bookTitle}
                    </Text>
                    <Text style={[styles.foilDegreeText, { color: foilHex }]}>
                      {degreeBranch.toUpperCase()}
                    </Text>
                  </View>

                  {/* Candidate Details */}
                  <View style={styles.foilCandidateSection}>
                    <Text style={[styles.foilSubmittedLabel, { color: foilHex }]}>SUBMITTED BY:</Text>
                    <Text style={[styles.foilStudentName, { color: foilHex }]} numberOfLines={1}>
                      {bookAuthor.toUpperCase()}
                    </Text>
                    {rollNumber ? (
                      <Text style={[styles.foilRollNo, { color: foilHex }]}>
                        ROLL NO: {rollNumber}
                      </Text>
                    ) : null}
                  </View>

                  {/* Guide & Academic Year */}
                  <View style={[styles.foilBottomSection, { borderTopColor: foilBorderHex }]}>
                    {guideName ? (
                      <Text style={[styles.foilGuideText, { color: foilHex }]} numberOfLines={1}>
                        GUIDE: {guideName.toUpperCase()}
                      </Text>
                    ) : null}
                    <Text style={[styles.foilYearText, { color: foilHex }]}>
                      ACADEMIC YEAR: {academicYear}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 4 Authentic Metallic Brass Corner Tabs */}
              <View style={[styles.brassCorner, styles.brassTL, { borderColor: foilHex }]} />
              <View style={[styles.brassCorner, styles.brassTR, { borderColor: foilHex }]} />
              <View style={[styles.brassCorner, styles.brassBL, { borderColor: foilHex }]} />
              <View style={[styles.brassCorner, styles.brassBR, { borderColor: foilHex }]} />
            </TouchableOpacity>

            {/* Back Face (Inner Front Cover) */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.innerCoverBackFace,
                {
                  transform: [{ rotateY: '180deg' }],
                  backfaceVisibility: 'hidden',
                } as any
              ]}
              onPress={prevPage}
            >
              <View style={styles.frontispieceWrap}>
                <View style={styles.innerCrestBadge}>
                  <BookOpen size={20} color={COLORS.navy} />
                </View>
                <Text style={pageStyles.frontispieceTitle} numberOfLines={2}>{bookTitle}</Text>
                <View style={pageStyles.dividerGold} />
                <Text style={pageStyles.frontispieceAuthor}>{bookAuthor}</Text>
                <Text style={pageStyles.frontispieceSub}>Official University Submission Edition</Text>
                <Text style={pageStyles.tapInstructionText}>Tap right side to flip next page →</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* PAGES STACK */}
          {pages.map((page, idx) => {
            const isFlipped = idx <= currentPageIndex;
            return (
              <View
                key={idx}
                style={[
                  styles.pageSheetWrapper,
                  {
                    width: pageWidth,
                    height: pageHeight,
                    transformOrigin: 'left center',
                    transform: [
                      { rotateY: isFlipped ? '-180deg' : '0deg' },
                    ],
                    transition: 'transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    zIndex: isFlipped ? idx + 10 : pages.length - idx,
                    transformStyle: 'preserve-3d',
                  } as any
                ]}
              >
                {/* Front Face (Right Page) */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.pageFrontFace,
                    { backfaceVisibility: 'hidden' } as any
                  ]}
                  onPress={nextPage}
                >
                  <View style={styles.pageHeaderBar}>
                    <Text style={styles.pageCategoryLabel}>{page.category || 'ACADEMIC REPORT'}</Text>
                    <Text style={styles.pageNumberBadge}>{page.pageNumber * 2 - 1}</Text>
                  </View>

                  <ScrollView style={styles.pageContentScroll} showsVerticalScrollIndicator={false}>
                    {page.content}
                  </ScrollView>

                  <View style={styles.pageFooterBar}>
                    <Text style={styles.pageFooterNote}>Print Bizz Accredited Standard</Text>
                    <Text style={styles.pageTurnHint}>Click to turn →</Text>
                  </View>
                </TouchableOpacity>

                {/* Back Face (Left Page when flipped) */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.pageBackFace,
                    {
                      transform: [{ rotateY: '180deg' }],
                      backfaceVisibility: 'hidden',
                    } as any
                  ]}
                  onPress={prevPage}
                >
                  <View style={styles.pageHeaderBar}>
                    <Text style={styles.pageNumberBadge}>{page.pageNumber * 2}</Text>
                    <Text style={styles.pageCategoryLabel}>{page.title || 'REPORT CONTINUED'}</Text>
                  </View>

                  <ScrollView style={styles.pageContentScroll} showsVerticalScrollIndicator={false}>
                    {page.backContent || page.content}
                  </ScrollView>

                  <View style={styles.pageFooterBar}>
                    <Text style={styles.pageTurnHint}>← Click to turn back</Text>
                    <Text style={styles.pageFooterNote}>Page {page.pageNumber * 2}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/* Control Bar & Progress */}
      <View style={[styles.controlBar, { maxWidth: pageWidth * 2 }]}>
        {!isOpen ? (
          <TouchableOpacity 
            style={styles.openBookBtn}
            onPress={handleOpenBook}
            activeOpacity={0.85}
          >
            <BookOpen size={16} color={COLORS.white} />
            <Text style={styles.openBookBtnText}>Click to Open & Flip Black Book</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navigationRow}>
            <TouchableOpacity 
              style={[styles.navBtn, currentPageIndex < 0 && styles.navBtnDisabled]}
              onPress={prevPage}
              disabled={currentPageIndex < 0}
            >
              <ChevronLeft size={16} color={currentPageIndex < 0 ? COLORS.mutedText : COLORS.navy} />
              <Text style={[styles.navBtnText, currentPageIndex < 0 && styles.navBtnTextDisabled]}>Previous</Text>
            </TouchableOpacity>

            <View style={styles.paginationIndicator}>
              <Text style={styles.paginationText}>
                {currentPageIndex === -1 ? 'Cover' : `Page ${currentPageIndex + 1} of ${pages.length}`}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentPageIndex + 2) / (pages.length + 1)) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.navBtn, currentPageIndex >= pages.length - 1 && styles.navBtnDisabled]}
              onPress={nextPage}
              disabled={currentPageIndex >= pages.length - 1}
            >
              <Text style={[styles.navBtnText, currentPageIndex >= pages.length - 1 && styles.navBtnTextDisabled]}>Next</Text>
              <ChevronRight size={16} color={currentPageIndex >= pages.length - 1 ? COLORS.mutedText : COLORS.navy} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.closeBookBtn}
              onPress={restartBook}
              accessibilityLabel="Restart to Cover"
            >
              <RefreshCcw size={14} color={COLORS.navy} />
              <Text style={styles.closeBookText}>Restart</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.closeBookBtn}
              onPress={handleCloseBook}
              accessibilityLabel="Close Book"
            >
              <X size={14} color={COLORS.navy} />
              <Text style={styles.closeBookText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  stage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bookContainer: {
    position: 'relative',
  },
  frontCoverWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: RADIUS.xs,
  },
  frontFace: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
  },
  solidRexineBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0D1117',
  },
  spineGrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#080A0E',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
    zIndex: 10,
  },
  spineCreaseLine: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 10,
  },
  foilOuterFrame: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 10,
    bottom: 10,
    borderWidth: 2,
    borderRadius: 3,
    padding: 3,
    justifyContent: 'space-between',
  },
  foilInnerFrame: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foilHeaderSection: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 4,
  },
  foilCollegeText: {
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  foilUnivText: {
    fontSize: 7.5,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.4,
    marginTop: 2,
    opacity: 0.9,
  },
  crestSealWrap: {
    alignItems: 'center',
    marginVertical: 4,
  },
  sealOuterRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  sealInnerRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  sealStarText: {
    fontSize: 7,
    letterSpacing: 1.5,
  },
  foilTitleSection: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  foilLeadText: {
    fontSize: 6.5,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 3,
    opacity: 0.85,
  },
  foilProjectTitle: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.4,
    lineHeight: 14,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  foilDegreeText: {
    fontSize: 7.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
    opacity: 0.9,
  },
  foilCandidateSection: {
    alignItems: 'center',
    width: '100%',
  },
  foilSubmittedLabel: {
    fontSize: 6.5,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.85,
  },
  foilStudentName: {
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 2,
  },
  foilRollNo: {
    fontSize: 7.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 1,
    opacity: 0.9,
  },
  foilBottomSection: {
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 4,
  },
  foilGuideText: {
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  foilYearText: {
    fontSize: 6.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  brassCorner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderWidth: 2,
    zIndex: 15,
  },
  brassTL: { top: 0, left: 14, borderRightWidth: 0, borderBottomWidth: 0 },
  brassTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  brassBL: { bottom: 0, left: 14, borderRightWidth: 0, borderTopWidth: 0 },
  brassBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  innerCoverBackFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FBF9F5',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontispieceWrap: {
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  innerCrestBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pageSheetWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: RADIUS.xs,
  },
  pageFrontFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FDFCF7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    justifyContent: 'space-between',
  },
  pageBackFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FDFCF7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    justifyContent: 'space-between',
  },
  pageHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 4,
    marginBottom: 6,
  },
  pageCategoryLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  pageNumberBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.navy,
  },
  pageContentScroll: {
    flex: 1,
  },
  pageFooterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 4,
    marginTop: 6,
  },
  pageFooterNote: {
    fontSize: 7.5,
    color: '#94A3B8',
  },
  pageTurnHint: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  controlBar: {
    width: '100%',
    marginTop: 14,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  openBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  openBookBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  navBtnTextDisabled: {
    color: COLORS.mutedText,
  },
  paginationIndicator: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  paginationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.darkOrange,
  },
  closeBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
    backgroundColor: '#F1F5F9',
  },
  closeBookText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
});

const pageStyles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 4,
  },
  crestContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  crestCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  collegeHeading: {
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.navy,
  },
  deptSub: {
    fontSize: 7.5,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  titleBlock: {
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  reportType: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.mutedText,
    letterSpacing: 0.8,
  },
  mainProjectTitle: {
    fontSize: 10.5,
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.navy,
    marginVertical: 3,
    lineHeight: 14,
  },
  submissionNotice: {
    fontSize: 7,
    textAlign: 'center',
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  degreeTitle: {
    fontSize: 8,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.navy,
    marginTop: 2,
  },
  authorBlock: {
    alignItems: 'center',
    marginVertical: 4,
  },
  byLabel: {
    fontSize: 6.5,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  authorName: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: 1,
  },
  rollLabel: {
    fontSize: 7.5,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  guideBlock: {
    alignItems: 'center',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 4,
  },
  guideLabel: {
    fontSize: 6.5,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  guideNameVal: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: 1,
  },
  guideYear: {
    fontSize: 7,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 6,
  },
  certTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.6,
    marginTop: 3,
  },
  headerUnderline: {
    width: 32,
    height: 1.5,
    backgroundColor: COLORS.darkOrange,
    marginTop: 3,
  },
  certBody: {
    fontSize: 8,
    lineHeight: 12,
    color: COLORS.secondaryText,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '800',
    color: COLORS.navy,
  },
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  sigCol: {
    alignItems: 'center',
    width: '45%',
  },
  signatureLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#94A3B8',
    marginBottom: 3,
  },
  sigName: {
    fontSize: 7.5,
    fontWeight: '700',
    color: COLORS.navy,
    textAlign: 'center',
  },
  sigRole: {
    fontSize: 6.5,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  examinerSignBox: {
    marginTop: 12,
    alignItems: 'center',
    paddingTop: 4,
  },
  sectionHeading: {
    fontSize: 9.5,
    fontWeight: '900',
    color: COLORS.navy,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  abstractBody: {
    fontSize: 8,
    lineHeight: 12,
    color: COLORS.secondaryText,
    textAlign: 'justify',
  },
  diagramCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: RADIUS.xs,
    padding: 6,
    marginTop: 8,
  },
  diagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  diagramTitle: {
    fontSize: 7.5,
    fontWeight: '700',
    color: COLORS.navy,
  },
  archDiagramBox: {
    alignItems: 'center',
    gap: 2,
  },
  archNode: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: 8,
    paddingVertical: 3,
    width: '100%',
    alignItems: 'center',
  },
  archNodeText: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.navy,
  },
  archArrow: {
    fontSize: 9,
    color: COLORS.mutedText,
  },
  resultsBody: {
    fontSize: 8,
    lineHeight: 12,
    color: COLORS.secondaryText,
    marginBottom: 6,
  },
  metricsTable: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  tableHeadText: {
    flex: 1,
    fontSize: 7.5,
    fontWeight: '800',
    color: COLORS.navy,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  tableCell: {
    flex: 1,
    fontSize: 7,
    color: COLORS.secondaryText,
  },
  refHeading: {
    fontSize: 8.5,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: 8,
    marginBottom: 4,
  },
  refList: {
    gap: 3,
  },
  refItem: {
    fontSize: 7,
    lineHeight: 10,
    color: COLORS.secondaryText,
  },
  endSealWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  endSealText: {
    fontSize: 7.5,
    fontWeight: '700',
    color: COLORS.success,
  },
  frontispieceTitle: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.navy,
    lineHeight: 15,
  },
  dividerGold: {
    width: 28,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 6,
  },
  frontispieceAuthor: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.navy,
  },
  frontispieceSub: {
    fontSize: 8,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  tapInstructionText: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.darkOrange,
    marginTop: 16,
  },
  backEndorsementWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  backEndorsementTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.navy,
    textAlign: 'center',
    marginTop: 8,
  },
  backEndorsementSub: {
    fontSize: 8.5,
    fontWeight: '600',
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 2,
  },
  backEndorsementFooter: {
    fontSize: 7.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
});
