import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { processUploadedFile } from '../services/documentService';
import { InteractiveBook } from '../components/InteractiveBook';
import { 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Edit3,
  UploadCloud 
} from 'lucide-react-native';

export const VirtualBookPreviewScreen: React.FC = () => {
  const { 
    uploadedDocument, 
    setUploadedDocument, 
    customization, 
    navigateTo, 
    isUploading, 
    setIsUploading,
    addToCart,
    currentPrice 
  } = useAppStore();

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const doc = await processUploadedFile(file);
      setUploadedDocument(doc);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read document');
    } finally {
      setIsUploading(false);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const bookWidth = Math.min(360, Math.max(280, windowWidth - 36));
  const bookHeight = Math.round(bookWidth * 1.42);

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

      {/* Top Toolbar - Fully Responsive, Never Blows Out Mobile Viewport */}
      <View style={styles.toolbar}>
        <View style={styles.titleBadge}>
          <Sparkles size={14} color={COLORS.darkOrange} />
          <Text style={styles.titleBadgeText}>LIVE VIRTUAL BOOK PREVIEW</Text>
        </View>

        {uploadedDocument ? (
          <View style={styles.verifiedDocBadge}>
            <CheckCircle2 size={13} color={COLORS.success} />
            <Text style={styles.verifiedDocBadgeText} numberOfLines={1}>
              {uploadedDocument.name} • {uploadedDocument.pageCount} Pages
            </Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadDocPill}
            onPress={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={13} color={COLORS.darkOrange} />
            <Text style={styles.uploadDocPillText}>Upload PDF</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.toolIconBtn}
          onPress={() => setIsFullScreen(!isFullScreen)}
          accessibilityLabel="Full Screen"
        >
          {isFullScreen ? (
            <Minimize2 size={16} color={COLORS.white} />
          ) : (
            <Maximize2 size={16} color={COLORS.white} />
          )}
        </TouchableOpacity>
      </View>

      {/* Responsive Book Stage */}
      <ScrollView 
        style={styles.stageScrollView} 
        contentContainerStyle={styles.stageContent}
        showsVerticalScrollIndicator={false}
      >
        {isUploading && (
          <View style={styles.loadingBanner}>
            <ActivityIndicator size="small" color={COLORS.darkOrange} />
            <Text style={styles.loadingBannerText}>Rendering authentic PDF pages...</Text>
          </View>
        )}
        {uploadError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{uploadError}</Text>
          </View>
        )}

        <View style={styles.bookStage}>
          <InteractiveBook
            bookTitle={customization.cover.projectTitle}
            bookAuthor={customization.cover.studentName}
            collegeName={customization.cover.collegeName}
            university={customization.cover.university}
            rollNumber={customization.cover.rollNumber}
            degreeBranch={customization.cover.degreeBranch}
            academicYear={customization.cover.academicYear}
            guideName={customization.cover.guideName}
            embossingFoil={customization.cover.embossingFoil}
            coverColor={customization.cover.coverColor === 'Royal Navy Blue' ? '#0C1B33' : '#0B0E14'}
            uploadedDocument={uploadedDocument}
            customization={customization}
            width={bookWidth}
            height={bookHeight}
          />
        </View>

        {/* Real-Time Action Bar */}
        <View style={styles.documentActionBar}>
          <View style={styles.docDetailsCol}>
            <View style={styles.statusRow}>
              <ShieldCheck size={16} color={COLORS.success} />
              <Text style={styles.docActionHeading}>
                Preflight Verification
              </Text>
            </View>
            <Text style={styles.docActionSub}>
              {uploadedDocument 
                ? `${uploadedDocument.name} (${(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB) • ${customization.paperGSM} • ${customization.cover.embossingFoil}`
                : `Customized Black Book structure. Click front cover or buttons to flip through pages.`}
            </Text>
          </View>

          <View style={styles.docActionButtons}>
            <TouchableOpacity 
              style={styles.reUploadBtn}
              onPress={() => navigateTo('customize')}
              activeOpacity={0.8}
            >
              <Edit3 size={14} color={COLORS.white} />
              <Text style={styles.reUploadBtnText}>Edit Details</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.proceedCustomBtn}
              onPress={() => {
                addToCart();
                navigateTo('checkout');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.proceedCustomBtnText}>Confirm & Checkout (₹{currentPrice.total})</Text>
              <ArrowRight size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const DocumentPreviewScreen = VirtualBookPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
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
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 8,
    width: '100%',
  },
  titleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(234, 88, 12, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(234, 88, 12, 0.3)',
  },
  titleBadgeText: {
    color: '#FB923C',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verifiedDocBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    maxWidth: 240,
  },
  verifiedDocBadgeText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '600',
  },
  uploadDocPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  uploadDocPillText: {
    color: COLORS.darkOrange,
    fontSize: 11,
    fontWeight: '700',
  },
  toolIconBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xs,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  stageScrollView: {
    flex: 1,
    width: '100%',
  },
  stageContent: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bookStage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  documentActionBar: {
    maxWidth: 820,
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#1F2937',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  docDetailsCol: {
    flex: 1,
    minWidth: 240,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  docActionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  docActionSub: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
  docActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  reUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: '#374151',
  },
  reUploadBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  proceedCustomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
  },
  proceedCustomBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  loadingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    marginBottom: 16,
  },
  loadingBannerText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  errorBanner: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    marginBottom: 16,
  },
  errorBannerText: {
    color: '#FECACA',
    fontSize: 13,
    fontWeight: '600',
  },
});
