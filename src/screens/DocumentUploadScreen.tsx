import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { processUploadedFile } from '../services/documentService';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Sliders, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react-native';

export const DocumentUploadScreen: React.FC = () => {
  const { 
    uploadedDocument, 
    setUploadedDocument, 
    isUploading, 
    setIsUploading, 
    navigateTo, 
    goBack 
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const doc = await processUploadedFile(file);
      setUploadedDocument(doc);
    } catch (err: any) {
      alert(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {Platform.OS === 'web' && (
        <input 
          type="file"
          ref={fileInputRef as any}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      )}

      <View style={styles.contentWrap}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Upload Project Document</Text>
        <Text style={styles.pageSub}>
          Upload your genuine manuscript in PDF or Word format for preflight margin verification and virtual book preview.
        </Text>

        {uploadedDocument ? (
          <View style={styles.uploadedCard}>
            <View style={styles.fileRow}>
              <View style={styles.iconBox}>
                <FileText size={32} color={COLORS.darkOrange} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{uploadedDocument.name}</Text>
                <Text style={styles.fileMeta}>
                  {(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB • {uploadedDocument.pageCount} Pages • {uploadedDocument.colorPageCount} Color pages
                </Text>
                <View style={styles.verifiedRow}>
                  <CheckCircle2 size={13} color={COLORS.success} />
                  <Text style={styles.verifiedText}>Preflight Check Passed • Margins & Resolution Validated</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.deleteBtn}
                onPress={() => setUploadedDocument(null)}
              >
                <Trash2 size={16} color={COLORS.error} />
              </TouchableOpacity>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity 
                style={styles.previewBtn}
                onPress={() => navigateTo('book_preview')}
              >
                <Eye size={16} color={COLORS.navy} />
                <Text style={styles.previewBtnText}>Inspect in Virtual Black Book</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.customizeBtn}
                onPress={() => navigateTo('customize')}
              >
                <Sliders size={16} color={COLORS.white} />
                <Text style={styles.customizeBtnText}>Configure Specs</Text>
                <ArrowRight size={14} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.dropZone}>
            {isUploading ? (
              <View style={styles.uploadingBox}>
                <ActivityIndicator size="large" color={COLORS.darkOrange} />
                <Text style={styles.uploadingText}>Parsing PDF / Word pages and inspecting margins...</Text>
              </View>
            ) : (
              <>
                <UploadCloud size={52} color={COLORS.darkOrange} />
                <Text style={styles.dropTitle}>Select or Drag & Drop Document</Text>
                <Text style={styles.dropSub}>Supports PDF, DOC, DOCX up to 100MB</Text>

                <TouchableOpacity 
                  style={styles.browseBtn}
                  onPress={() => {
                    if (Platform.OS === 'web') fileInputRef.current?.click();
                  }}
                >
                  <UploadCloud size={16} color={COLORS.white} />
                  <Text style={styles.browseBtnText}>Browse Files</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* Preflight Guidelines Box */}
        <View style={styles.guidelinesBox}>
          <ShieldCheck size={20} color={COLORS.oceanBlue} />
          <View style={{ flex: 1 }}>
            <Text style={styles.guideTitle}>Preflight Margin Requirements</Text>
            <Text style={styles.guideText}>
              {'• Keep a minimum 1.25" to 1.5" left margin for hardcover sewing and thermal casing.'}{'\n'}
              • Standard A4 page size (210 x 297 mm) with embedded vector fonts.{'\n'}
              • High-contrast figures and graphs (recommended 300 DPI minimum).
            </Text>
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
  contentWrap: {
    maxWidth: 780,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  topRow: {
    marginBottom: SPACING.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  pageSub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 2,
    marginBottom: SPACING.lg,
  },
  dropZone: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.borderDark,
    padding: SPACING.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  dropTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
  },
  dropSub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  uploadingBox: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  uploadingText: {
    fontSize: 13,
    color: COLORS.navy,
    fontWeight: '700',
    marginTop: SPACING.md,
  },
  uploadedCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconBox: {
    width: 54,
    height: 58,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  fileMeta: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.success,
  },
  deleteBtn: {
    padding: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  previewBtn: {
    flex: 1,
    minWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  previewBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  customizeBtn: {
    flex: 1,
    minWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  customizeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  guidelinesBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    backgroundColor: '#F0F9FF',
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  guideTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  guideText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
});
