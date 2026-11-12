import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
  Image 
} from 'react-native';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText,
  Sparkles, 
  GraduationCap
} from 'lucide-react-native';
import { COLORS, RADIUS } from '../constants/theme';
import { CustomizationState, UploadedDocument } from '../types';

export interface BookPage {
  title?: string;
  category?: string;
  content: React.ReactNode;
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
  bookTitle,
  bookAuthor,
  collegeName,
  university,
  rollNumber,
  degreeBranch,
  academicYear = '2025-2026',
  guideName,
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

  // Dynamic window width
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }: { window: any }) => {
      setWindowWidth(window.width);
    });
    return () => sub?.remove();
  }, []);

  const isMobile = windowWidth < 640;

  // Derive actual text fields
  const finalTitle = (bookTitle || customization?.cover?.projectTitle || '').trim() || 'PROJECT TITLE';
  const finalAuthor = (bookAuthor || customization?.cover?.studentName || '').trim() || 'STUDENT NAME';
  const finalCollege = (collegeName || customization?.cover?.collegeName || '').trim() || 'UNIVERSITY / COLLEGE NAME';
  const finalUniversity = (university || customization?.cover?.university || '').trim();
  const finalRollNumber = (rollNumber || customization?.cover?.rollNumber || '').trim();
  const finalDegree = (degreeBranch || customization?.cover?.degreeBranch || '').trim() || 'BACHELOR OF TECHNOLOGY';
  const finalGuide = (guideName || customization?.cover?.guideName || '').trim();
  const finalYear = academicYear || customization?.cover?.academicYear || '2025-2026';
  const collegeLogo = customization?.cover?.collegeLogo || null;

  // Responsive page width & height (strictly fits within screen width on mobile)
  const pageWidth = isMobile
    ? Math.min(360, Math.max(280, windowWidth - 36))
    : (propWidth ? Math.min(propWidth, 340) : 320);

  const pageHeight = propHeight || Math.round(pageWidth * 1.42);

  const foilHex = embossingFoil === 'Silver Foil' ? '#E2E8F0' : embossingFoil === 'Rose Gold' ? '#B76E79' : '#D4AF37';
  const foilBorderHex = embossingFoil === 'Silver Foil' ? '#94A3B8' : embossingFoil === 'Rose Gold' ? '#9D4D58' : '#B8860B';
  const foilShadowHex = embossingFoil === 'Silver Foil' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.7)';

  // Build Real Document Pages from uploaded file
  const realPdfPages: BookPage[] = (uploadedDocument?.renderedPages && uploadedDocument.renderedPages.length > 0)
    ? uploadedDocument.renderedPages.map((pageImg, idx) => ({
        pageNumber: idx + 1,
        title: `Page ${idx + 1} of ${uploadedDocument.pageCount}`,
        category: 'Uploaded PDF Document',
        content: (
          <View style={styles.realPdfPageWrap}>
            <Image
              source={{ uri: pageImg }}
              style={styles.realPdfImage}
              resizeMode="contain"
            />
          </View>
        ),
      }))
    : [];

  // When no PDF is uploaded yet
  const emptyPlaceholderPages: BookPage[] = [
    {
      pageNumber: 1,
      title: 'DOCUMENT REQUIRED',
      category: 'Real-time Preview',
      content: (
        <View style={styles.emptyNoticeContainer}>
          <FileText size={42} color={COLORS.navy} style={{ marginBottom: 16 }} />
          <Text style={styles.emptyNoticeTitle}>No Document Uploaded Yet</Text>
          <Text style={styles.emptyNoticeText}>
            Upload your project PDF in Step 2 or via the top bar. Your genuine document pages will render here instantly with exact text, graphs, and layouts.
          </Text>
        </View>
      ),
    },
  ];

  const pages = realPdfPages.length > 0 ? realPdfPages : emptyPlaceholderPages;

  const handleOpenBook = () => {
    setIsOpen(true);
    setCurrentPageIndex(0);
  };

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
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    } else {
      handleCloseBook();
    }
  };

  // Keyboard navigation on Web
  useEffect(() => {
    if (Platform.OS !== 'web' || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : 0));
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
      {/* ================= COVER / CLOSED VIEW ================= */}
      {!isOpen ? (
        <View style={[styles.coverContainer, { width: pageWidth, height: pageHeight }]}>
          <TouchableOpacity
            activeOpacity={0.92}
            {...({
              onMouseEnter: () => setIsHovering(true),
              onMouseLeave: () => setIsHovering(false),
            } as any)}
            style={[
              styles.frontFace,
              {
                backgroundColor: coverColor,
                width: pageWidth,
                height: pageHeight,
                transform: [{ scale: isHovering ? 1.015 : 1 }],
              },
            ]}
            onPress={handleOpenBook}
          >
            {/* Authentic Midnight Leatherette Rexine Texture */}
            <View style={styles.solidRexineBg} />
            <View style={styles.spineGrip} />
            <View style={styles.spineCreaseLine} />

            {/* Embossed Metallic Gold Foil Border Frame */}
            <View style={[styles.foilOuterFrame, { borderColor: foilHex }]}>
              <View style={[styles.foilInnerFrame, { borderColor: foilBorderHex }]}>
                {/* College / University Name */}
                <View style={styles.foilHeaderSection}>
                  <Text 
                    style={[styles.foilCollegeText, { color: foilHex, textShadowColor: foilShadowHex }]} 
                    numberOfLines={2}
                  >
                    {finalCollege.toUpperCase()}
                  </Text>
                  {finalUniversity ? (
                    <Text style={[styles.foilUnivText, { color: foilHex }]} numberOfLines={1}>
                      AFFILIATED TO {finalUniversity.toUpperCase()}
                    </Text>
                  ) : null}
                </View>

                {/* College Seal / Crest */}
                <View style={styles.crestSealWrap}>
                  <View style={[styles.sealOuterRing, { borderColor: foilHex }]}>
                    <View style={[styles.sealInnerRing, { borderColor: foilBorderHex }]}>
                      {collegeLogo ? (
                        <Image 
                          source={{ uri: collegeLogo }} 
                          style={styles.sealLogoImage} 
                          resizeMode="contain" 
                        />
                      ) : (
                        <GraduationCap size={16} color={foilHex} />
                      )}
                    </View>
                  </View>
                  <View style={styles.sealStarsRow}>
                    <Sparkles size={9} color={foilHex} />
                    <Text style={[styles.sealStarText, { color: foilHex }]}>★ ★ ★</Text>
                    <Sparkles size={9} color={foilHex} />
                  </View>
                </View>

                {/* Project Title Block */}
                <View style={styles.foilTitleSection}>
                  <Text style={[styles.foilLeadText, { color: foilHex }]}>A PROJECT REPORT ON</Text>
                  <Text 
                    style={[styles.foilProjectTitle, { color: foilHex, textShadowColor: foilShadowHex }]} 
                    numberOfLines={3}
                  >
                    {finalTitle}
                  </Text>
                  <Text style={[styles.foilDegreeText, { color: foilHex }]}>
                    {finalDegree.toUpperCase()}
                  </Text>
                </View>

                {/* Candidate Details */}
                <View style={styles.foilCandidateSection}>
                  <Text style={[styles.foilSubmittedLabel, { color: foilHex }]}>SUBMITTED BY:</Text>
                  <Text style={[styles.foilStudentName, { color: foilHex }]} numberOfLines={1}>
                    {finalAuthor.toUpperCase()}
                  </Text>
                  {finalRollNumber ? (
                    <Text style={[styles.foilRollNo, { color: foilHex }]}>
                      ROLL NO: {finalRollNumber}
                    </Text>
                  ) : null}
                </View>

                {/* Guide & Academic Year */}
                <View style={[styles.foilBottomSection, { borderTopColor: foilBorderHex }]}>
                  {finalGuide ? (
                    <Text style={[styles.foilGuideText, { color: foilHex }]} numberOfLines={1}>
                      GUIDE: {finalGuide.toUpperCase()}
                    </Text>
                  ) : null}
                  <Text style={[styles.foilYearText, { color: foilHex }]}>
                    ACADEMIC YEAR: {finalYear}
                  </Text>
                </View>
              </View>
            </View>

            {/* Brass Corner Tabs */}
            <View style={[styles.brassCorner, styles.brassTL, { borderColor: foilHex }]} />
            <View style={[styles.brassCorner, styles.brassTR, { borderColor: foilHex }]} />
            <View style={[styles.brassCorner, styles.brassBL, { borderColor: foilHex }]} />
            <View style={[styles.brassCorner, styles.brassBR, { borderColor: foilHex }]} />
          </TouchableOpacity>
        </View>
      ) : (
        /* ================= OPEN DOCUMENT VIEWER ================= */
        <View style={[styles.openedViewerContainer, { width: pageWidth, height: pageHeight }]}>
          <View style={styles.openedPageCard}>
            {/* Header info */}
            <View style={styles.openedHeaderBar}>
              <Text style={styles.openedPageCategory}>
                {pages[currentPageIndex]?.category || 'Document Page'}
              </Text>
              <Text style={styles.openedPageNumber}>
                Page {currentPageIndex + 1} of {pages.length}
              </Text>
            </View>

            {/* Content (Real Uploaded PDF Page Image or Notice) */}
            <View style={styles.openedBodyArea}>
              {pages[currentPageIndex]?.content}
            </View>
          </View>
        </View>
      )}

      {/* ================= NAVIGATION CONTROLS ================= */}
      <View style={[styles.controlBar, { width: pageWidth }]}>
        {!isOpen ? (
          <TouchableOpacity 
            style={styles.openBookBtn}
            onPress={handleOpenBook}
            activeOpacity={0.85}
          >
            <BookOpen size={16} color={COLORS.white} />
            <Text style={styles.openBookBtnText}>Click to Open & Flip Pages</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navigationRow}>
            <TouchableOpacity 
              style={[styles.navBtn, currentPageIndex <= 0 && styles.navBtnDisabled]}
              onPress={prevPage}
            >
              <ChevronLeft size={16} color={COLORS.navy} />
              <Text style={styles.navBtnText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.closeBookBtn}
              onPress={handleCloseBook}
              accessibilityLabel="Close Book & View Cover"
            >
              <BookOpen size={14} color={COLORS.navy} />
              <Text style={styles.closeBookText}>Cover</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navBtn, currentPageIndex >= pages.length - 1 && styles.navBtnDisabled]}
              onPress={nextPage}
              disabled={currentPageIndex >= pages.length - 1}
            >
              <Text style={[styles.navBtnText, currentPageIndex >= pages.length - 1 && styles.navBtnTextDisabled]}>Next</Text>
              <ChevronRight size={16} color={currentPageIndex >= pages.length - 1 ? COLORS.mutedText : COLORS.navy} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  coverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  frontFace: {
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 12,
  },
  solidRexineBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0B0E14',
    opacity: 0.98,
  },
  spineGrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
  },
  spineCreaseLine: {
    position: 'absolute',
    left: 23,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  foilOuterFrame: {
    position: 'absolute',
    left: 28,
    right: 12,
    top: 14,
    bottom: 14,
    borderWidth: 2,
    borderRadius: 4,
    padding: 3,
  },
  foilInnerFrame: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foilHeaderSection: {
    alignItems: 'center',
    width: '100%',
  },
  foilCollegeText: {
    fontSize: 9.5,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 13,
  },
  foilUnivText: {
    fontSize: 7,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  crestSealWrap: {
    alignItems: 'center',
    marginVertical: 4,
  },
  sealOuterRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealInnerRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sealLogoImage: {
    width: 26,
    height: 26,
  },
  sealStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  sealStarText: {
    fontSize: 6.5,
    letterSpacing: 1.5,
  },
  foilTitleSection: {
    alignItems: 'center',
    width: '100%',
  },
  foilLeadText: {
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 3,
  },
  foilProjectTitle: {
    fontSize: 10.5,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 14,
  },
  foilDegreeText: {
    fontSize: 7.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  foilCandidateSection: {
    alignItems: 'center',
    width: '100%',
  },
  foilSubmittedLabel: {
    fontSize: 6.5,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  foilStudentName: {
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  foilRollNo: {
    fontSize: 7.5,
    fontWeight: '700',
    marginTop: 2,
  },
  foilBottomSection: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 6,
  },
  foilGuideText: {
    fontSize: 7,
    fontWeight: '700',
  },
  foilYearText: {
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  brassCorner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderWidth: 2,
  },
  brassTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  brassTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  brassBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  brassBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },

  /* Opened viewer */
  openedViewerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  openedPageCard: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  openedHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  openedPageCategory: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.secondaryText,
    letterSpacing: 0.5,
  },
  openedPageNumber: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.navy,
  },
  openedBodyArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  realPdfPageWrap: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  realPdfImage: {
    width: '100%',
    height: '100%',
  },
  emptyNoticeContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
  },
  emptyNoticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyNoticeText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 260,
  },

  /* Controls */
  controlBar: {
    marginTop: 14,
    alignItems: 'center',
  },
  openBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  openBookBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  navBtnDisabled: {
    opacity: 0.35,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  navBtnTextDisabled: {
    color: COLORS.mutedText,
  },
  closeBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  closeBookText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
});
