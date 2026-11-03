import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { processUploadedFile } from '../services/documentService';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  RotateCw,
  Sparkles,
  ArrowRight,
  BookMarked
} from 'lucide-react-native';

export const VirtualBookPreviewScreen: React.FC = () => {
  const { 
    uploadedDocument, 
    setUploadedDocument, 
    customization, 
    navigateTo, 
    isUploading, 
    setIsUploading 
  } = useAppStore();

  const [viewMode, setViewMode] = useState<'cover' | 'pages'>('cover');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalPages = uploadedDocument?.pageCount || 1;
  const foilColor = customization.cover.embossingFoil === 'Silver Foil' ? '#E2E8F0' : '#D4AF37';
  const foilShadow = customization.cover.embossingFoil === 'Silver Foil' ? '#94A3B8' : '#854D0E';

  const handleNextPage = () => {
    if (viewMode === 'cover') {
      setViewMode('pages');
      setCurrentPage(1);
      return;
    }
    if (currentPage < totalPages) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 2));
        setIsFlipping(false);
      }, 250);
    }
  };

  const handlePrevPage = () => {
    if (viewMode === 'pages' && currentPage <= 1) {
      setViewMode('cover');
      return;
    }
    if (currentPage > 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => Math.max(1, prev - 2));
        setIsFlipping(false);
      }, 250);
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const doc = await processUploadedFile(file);
      setUploadedDocument(doc);
      setViewMode('pages');
      setCurrentPage(1);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read document');
    } finally {
      setIsUploading(false);
    }
  };

  // Determine contents of left and right pages in spread
  const leftPageNum = currentPage;
  const rightPageNum = currentPage + 1 <= totalPages ? currentPage + 1 : null;

  const getPageRender = (pageNum: number) => {
    if (!uploadedDocument) return null;
    const idx = pageNum - 1;

    // 1. If rendered canvas image exists
    if (uploadedDocument.renderedPages && uploadedDocument.renderedPages[idx]) {
      return (
        <Image 
          source={{ uri: uploadedDocument.renderedPages[idx] }}
          style={styles.renderedPageImage}
          resizeMode="contain"
        />
      );
    }

    // 2. If extracted real text exists
    if (uploadedDocument.extractedText && uploadedDocument.extractedText[idx]) {
      return (
        <View style={styles.textPageContent}>
          <Text style={styles.pageHeaderTitle}>
            {customization.cover.projectTitle.toUpperCase() || 'PROJECT REPORT'}
          </Text>
          <View style={styles.pageHeaderDivider} />
          <Text style={styles.pageBodyText} numberOfLines={26}>
            {uploadedDocument.extractedText[idx]}
          </Text>
          <Text style={styles.pageFooterNum}>Page {pageNum}</Text>
        </View>
      );
    }

    // 3. Fallback preview for document page
    return (
      <View style={styles.fallbackPageContent}>
        <Text style={styles.pageHeaderTitle}>
          {customization.cover.collegeName || 'ACADEMIC SUBMISSION'}
        </Text>
        <View style={styles.pageHeaderDivider} />
        <View style={styles.pageIllustrationWrap}>
          <FileText size={32} color={COLORS.mutedText} />
          <Text style={styles.pageIllustrationTitle}>Page {pageNum}</Text>
          <Text style={styles.pageIllustrationMeta}>
            {uploadedDocument.name} • {customization.paperGSM}
          </Text>
        </View>
        <Text style={styles.pageFooterNum}>Page {pageNum}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, isFullScreen && styles.fullScreenContainer]}>
      {/* Hidden Web File Input */}
      {Platform.OS === 'web' && (
        <input 
          type="file"
          ref={fileInputRef as any}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      )}

      {/* Top Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.toolbarLeft}>
          <TouchableOpacity 
            style={[styles.viewTabBtn, viewMode === 'cover' && styles.viewTabBtnActive]}
            onPress={() => setViewMode('cover')}
          >
            <BookMarked size={15} color={viewMode === 'cover' ? COLORS.white : COLORS.navy} />
            <Text style={[styles.viewTabBtnText, viewMode === 'cover' && styles.viewTabBtnTextActive]}>
              Hardcover
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.viewTabBtn, viewMode === 'pages' && styles.viewTabBtnActive]}
            onPress={() => setViewMode('pages')}
          >
            <BookOpen size={15} color={viewMode === 'pages' ? COLORS.white : COLORS.navy} />
            <Text style={[styles.viewTabBtnText, viewMode === 'pages' && styles.viewTabBtnTextActive]}>
              Inside Pages
            </Text>
          </TouchableOpacity>
        </View>

        {/* Center Page Indicator */}
        <View style={styles.toolbarCenter}>
          <Text style={styles.pageIndicatorText}>
            {viewMode === 'cover' 
              ? 'Front Cover' 
              : `Pages ${leftPageNum}${rightPageNum ? `–${rightPageNum}` : ''} of ${totalPages}`}
          </Text>
          {uploadedDocument && (
            <View style={styles.verifiedDocBadge}>
              <CheckCircle2 size={12} color={COLORS.success} />
              <Text style={styles.verifiedDocBadgeText} numberOfLines={1}>
                {uploadedDocument.name}
              </Text>
            </View>
          )}
        </View>

        {/* Right Controls: Zoom & Fullscreen */}
        <View style={styles.toolbarRight}>
          <TouchableOpacity 
            style={styles.toolIconBtn}
            onPress={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            accessibilityLabel="Zoom Out"
          >
            <ZoomOut size={16} color={COLORS.navy} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolIconBtn}
            onPress={() => setZoomLevel(1)}
            accessibilityLabel="Reset Zoom"
          >
            <Text style={styles.zoomText}>{Math.round(zoomLevel * 100)}%</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolIconBtn}
            onPress={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            accessibilityLabel="Zoom In"
          >
            <ZoomIn size={16} color={COLORS.navy} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolIconBtn}
            onPress={() => setIsFullScreen(!isFullScreen)}
            accessibilityLabel="Full Screen"
          >
            {isFullScreen ? (
              <Minimize2 size={16} color={COLORS.navy} />
            ) : (
              <Maximize2 size={16} color={COLORS.navy} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Book Stage Area */}
      <ScrollView 
        style={styles.stageScrollView} 
        contentContainerStyle={styles.stageContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.bookStage, { transform: [{ scale: zoomLevel }] }]}>
          {/* HARDCOVER VIEW */}
          {viewMode === 'cover' ? (
            <View style={styles.hardcoverBookContainer}>
              {/* Realistic Book Spine Shadow */}
              <View style={styles.spineShadow} />
              
              {/* The Hardcover Exterior */}
              <View style={[
                styles.hardcoverCover, 
                { backgroundColor: customization.cover.coverColor === 'Royal Navy Blue' ? '#0C1B33' : '#111827' }
              ]}>
                {/* Gold/Silver Decorative Border Frame */}
                <View style={[styles.embossedBorder, { borderColor: foilColor }]}>
                  {/* College Name */}
                  <Text style={[styles.foilCollegeText, { color: foilColor, textShadowColor: foilShadow }]}>
                    {customization.cover.collegeName.toUpperCase()}
                  </Text>

                  {/* University Seal / Emblem Placeholder */}
                  <View style={[styles.foilEmblemCircle, { borderColor: foilColor }]}>
                    <Sparkles size={24} color={foilColor} />
                  </View>

                  {/* Project Title */}
                  <View style={styles.titleWrap}>
                    <Text style={[styles.foilPrefixText, { color: foilColor }]}>A PROJECT REPORT ON</Text>
                    <Text style={[styles.foilProjectTitle, { color: foilColor, textShadowColor: foilShadow }]}>
                      {customization.cover.projectTitle}
                    </Text>
                  </View>

                  {/* Degree / Branch */}
                  <Text style={[styles.foilDegreeText, { color: foilColor }]}>
                    SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS FOR{'\n'}
                    {customization.cover.degreeBranch.toUpperCase()}
                  </Text>

                  {/* Student Details */}
                  <View style={styles.foilStudentSection}>
                    <Text style={[styles.foilStudentLabel, { color: foilColor }]}>SUBMITTED BY:</Text>
                    <Text style={[styles.foilStudentName, { color: foilColor }]}>
                      {customization.cover.studentName}
                    </Text>
                    {customization.cover.rollNumber ? (
                      <Text style={[styles.foilRollNo, { color: foilColor }]}>
                        (ROLL NO: {customization.cover.rollNumber})
                      </Text>
                    ) : null}
                  </View>

                  {/* Guide & Academic Year */}
                  <View style={styles.foilBottomSection}>
                    {customization.cover.guideName ? (
                      <Text style={[styles.foilGuideText, { color: foilColor }]}>
                        UNDER THE GUIDANCE OF: {customization.cover.guideName.toUpperCase()}
                      </Text>
                    ) : null}
                    <Text style={[styles.foilYearText, { color: foilColor }]}>
                      ACADEMIC YEAR: {customization.cover.academicYear}
                    </Text>
                  </View>
                </View>

                {/* Brass Corner Tabs if active */}
                {customization.addOns.goldCornerProtectors && (
                  <>
                    <View style={[styles.cornerTab, styles.cornerTL, { borderColor: foilColor }]} />
                    <View style={[styles.cornerTab, styles.cornerTR, { borderColor: foilColor }]} />
                    <View style={[styles.cornerTab, styles.cornerBL, { borderColor: foilColor }]} />
                    <View style={[styles.cornerTab, styles.cornerBR, { borderColor: foilColor }]} />
                  </>
                )}
              </View>

              {/* Book Spine */}
              <View style={styles.bookSpine}>
                <Text style={[styles.spineText, { color: foilColor }]} numberOfLines={1}>
                  {customization.cover.spineText || `${customization.cover.degreeBranch} - ${customization.cover.studentName}`}
                </Text>
              </View>
            </View>
          ) : (
            /* INSIDE PAGES SPREAD VIEW */
            <View style={styles.pagesSpreadWrapper}>
              {!uploadedDocument ? (
                /* No Document Uploaded State */
                <View style={styles.noDocOverlay}>
                  <UploadCloud size={48} color={COLORS.darkOrange} />
                  <Text style={styles.noDocTitle}>Upload Your Document</Text>
                  <Text style={styles.noDocDesc}>
                    Upload your actual PDF, DOC, or DOCX document to generate realistic two-page preview spreads and inspection.
                  </Text>
                  <TouchableOpacity 
                    style={styles.uploadDocBtn}
                    onPress={() => {
                      if (Platform.OS === 'web') {
                        fileInputRef.current?.click();
                      } else {
                        navigateTo('customize');
                      }
                    }}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <ActivityIndicator color={COLORS.white} size="small" />
                    ) : (
                      <>
                        <UploadCloud size={16} color={COLORS.white} />
                        <Text style={styles.uploadDocBtnText}>Select PDF / Word File</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}
                </View>
              ) : (
                /* Actual Two-Page Spread with Realistic Binding Crease */
                <View style={[styles.twoPageSpread, isFlipping && styles.pageFlippingAnimation]}>
                  {/* Left Page */}
                  <View style={styles.singlePageLeft}>
                    <View style={styles.innerGutterShadowLeft} />
                    {getPageRender(leftPageNum)}
                  </View>

                  {/* Center Binding Crease */}
                  <View style={styles.centerBindingCrease} />

                  {/* Right Page */}
                  <View style={styles.singlePageRight}>
                    <View style={styles.innerGutterShadowRight} />
                    {rightPageNum ? (
                      getPageRender(rightPageNum)
                    ) : (
                      <View style={styles.blankPageContent}>
                        <Text style={styles.blankPageText}>[End of Document]</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Page Turn Controls Floating Row */}
        <View style={styles.pageTurnControls}>
          <TouchableOpacity 
            style={[styles.turnPageBtn, (viewMode === 'cover' && currentPage <= 1) && styles.turnPageBtnDisabled]}
            onPress={handlePrevPage}
            activeOpacity={0.8}
          >
            <ChevronLeft size={18} color={COLORS.navy} />
            <Text style={styles.turnPageBtnText}>Previous</Text>
          </TouchableOpacity>

          <View style={styles.modeSwitchCenter}>
            <TouchableOpacity 
              style={styles.jumpCoverBtn}
              onPress={() => setViewMode(viewMode === 'cover' ? 'pages' : 'cover')}
            >
              <Text style={styles.jumpCoverBtnText}>
                {viewMode === 'cover' ? 'Open Book ➔' : 'View Cover'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.turnPageBtn, (viewMode === 'pages' && currentPage >= totalPages) && styles.turnPageBtnDisabled]}
            onPress={handleNextPage}
            activeOpacity={0.8}
          >
            <Text style={styles.turnPageBtnText}>Next</Text>
            <ChevronRight size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Document Quick Action & Upload Bar */}
        <View style={styles.documentActionBar}>
          <View style={styles.docDetailsCol}>
            <Text style={styles.docActionHeading}>Document & Preflight Status</Text>
            <Text style={styles.docActionSub}>
              {uploadedDocument 
                ? `${uploadedDocument.name} • ${(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB • ${uploadedDocument.pageCount} Pages`
                : 'No document attached. Please upload a PDF or DOCX file to complete order.'}
            </Text>
          </View>

          <View style={styles.docActionButtons}>
            <TouchableOpacity 
              style={styles.reUploadBtn}
              onPress={() => {
                if (Platform.OS === 'web') {
                  fileInputRef.current?.click();
                } else {
                  navigateTo('customize');
                }
              }}
            >
              <UploadCloud size={14} color={COLORS.navy} />
              <Text style={styles.reUploadBtnText}>
                {uploadedDocument ? 'Replace File' : 'Upload File'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.proceedCustomBtn}
              onPress={() => navigateTo('customize')}
            >
              <Text style={styles.proceedCustomBtnText}>Edit Customization</Text>
              <ArrowRight size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Thumbnails Bar */}
        {uploadedDocument && (
          <View style={styles.thumbnailsBar}>
            <Text style={styles.thumbnailsBarTitle}>Page Thumbnails ({totalPages} pages)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailsScroll}>
              {/* Cover thumbnail */}
              <TouchableOpacity
                style={[styles.thumbItem, viewMode === 'cover' && styles.thumbItemActive]}
                onPress={() => setViewMode('cover')}
              >
                <View style={[styles.thumbCover, { backgroundColor: '#111827' }]}>
                  <Text style={[styles.thumbCoverText, { color: foilColor }]}>COVER</Text>
                </View>
                <Text style={styles.thumbLabel}>Cover</Text>
              </TouchableOpacity>

              {/* Page thumbnails */}
              {Array.from({ length: Math.min(totalPages, 20) }, (_, i) => i + 1).map((pNum) => (
                <TouchableOpacity
                  key={pNum}
                  style={[
                    styles.thumbItem, 
                    viewMode === 'pages' && (currentPage === pNum || currentPage + 1 === pNum) && styles.thumbItemActive
                  ]}
                  onPress={() => {
                    setViewMode('pages');
                    setCurrentPage(pNum);
                  }}
                >
                  <View style={styles.thumbPage}>
                    <Text style={styles.thumbPageNum}>{pNum}</Text>
                  </View>
                  <Text style={styles.thumbLabel}>P.{pNum}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Also export as DocumentPreviewScreen for backward compatibility
export const DocumentPreviewScreen = VirtualBookPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark cinema backdrop for 3D book contrast
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    backgroundColor: '#0F172A',
  },
  viewTabBtnActive: {
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: COLORS.darkOrange,
  },
  viewTabBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  viewTabBtnTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  toolbarCenter: {
    alignItems: 'center',
  },
  pageIndicatorText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  verifiedDocBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    maxWidth: 200,
  },
  verifiedDocBadgeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '500',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolIconBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xs,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  stageScrollView: {
    flex: 1,
  },
  stageContent: {
    padding: SPACING.base,
    alignItems: 'center',
    minHeight: '100%',
  },
  bookStage: {
    marginVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Hardcover Styles
  hardcoverBookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  spineShadow: {
    position: 'absolute',
    left: -12,
    top: 4,
    bottom: -4,
    width: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: RADIUS.sm,
  },
  hardcoverCover: {
    width: 380,
    height: 520,
    borderRadius: 8,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    padding: SPACING.base,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  bookSpine: {
    position: 'absolute',
    left: -18,
    top: 4,
    bottom: 4,
    width: 22,
    backgroundColor: '#0B111E',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
  },
  spineText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 2,
    transform: [{ rotate: '90deg' }],
    width: 400,
    textAlign: 'center',
  },
  embossedBorder: {
    flex: 1,
    borderWidth: 2,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foilCollegeText: {
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.8,
    lineHeight: 18,
    textShadowRadius: 1,
  },
  foilEmblemCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  titleWrap: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  foilPrefixText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  foilProjectTitle: {
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  foilDegreeText: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
    letterSpacing: 0.6,
  },
  foilStudentSection: {
    alignItems: 'center',
  },
  foilStudentLabel: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  foilStudentName: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  foilRollNo: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  foilBottomSection: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.3)',
    paddingTop: 6,
    width: '100%',
  },
  foilGuideText: {
    fontSize: 8,
    fontWeight: '700',
    marginBottom: 2,
  },
  foilYearText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cornerTab: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 2,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  // Inside Pages Spread Styles
  pagesSpreadWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoPageSpread: {
    flexDirection: 'row',
    backgroundColor: '#FAF9F6', // Natural bond paper cream-white
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  pageFlippingAnimation: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  singlePageLeft: {
    width: 340,
    height: 480,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: SPACING.md,
    position: 'relative',
  },
  singlePageRight: {
    width: 340,
    height: 480,
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    position: 'relative',
  },
  centerBindingCrease: {
    width: 14,
    height: '100%',
    backgroundColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  innerGutterShadowLeft: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  innerGutterShadowRight: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  renderedPageImage: {
    width: '100%',
    height: '100%',
  },
  textPageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pageHeaderTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  pageHeaderDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  pageBodyText: {
    fontSize: 10,
    color: '#1E293B',
    lineHeight: 15,
  },
  pageFooterNum: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600',
  },
  fallbackPageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pageIllustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  pageIllustrationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: 8,
  },
  pageIllustrationMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  blankPageContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankPageText: {
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  noDocOverlay: {
    width: 600,
    height: 380,
    backgroundColor: '#1E293B',
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  noDocTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  noDocDesc: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 440,
    lineHeight: 19,
    marginBottom: SPACING.lg,
  },
  uploadDocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  uploadDocBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.sm,
  },
  pageTurnControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginVertical: SPACING.md,
  },
  turnPageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.base,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  turnPageBtnDisabled: {
    opacity: 0.4,
  },
  turnPageBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  modeSwitchCenter: {
    alignItems: 'center',
  },
  jumpCoverBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  jumpCoverBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  documentActionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    width: '100%',
    maxWidth: 780,
    marginVertical: SPACING.md,
    gap: SPACING.md,
  },
  docDetailsCol: {
    flex: 1,
    minWidth: 240,
  },
  docActionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  docActionSub: {
    fontSize: 12,
    color: '#94A3B8',
  },
  docActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  reUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
  },
  reUploadBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  proceedCustomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
  },
  proceedCustomBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  thumbnailsBar: {
    width: '100%',
    maxWidth: 780,
    marginTop: SPACING.sm,
  },
  thumbnailsBarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: SPACING.xs,
  },
  thumbnailsScroll: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingVertical: 4,
  },
  thumbItem: {
    alignItems: 'center',
    padding: 3,
    borderRadius: RADIUS.xs,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  thumbItemActive: {
    borderColor: COLORS.darkOrange,
  },
  thumbCover: {
    width: 36,
    height: 48,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCoverText: {
    fontSize: 6,
    fontWeight: '900',
  },
  thumbPage: {
    width: 36,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  thumbPageNum: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  thumbLabel: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
});
