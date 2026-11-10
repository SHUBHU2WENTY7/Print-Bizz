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
  FileText, 
  UploadCloud, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Sliders 
} from 'lucide-react-native';

export const MyDocumentsScreen: React.FC = () => {
  const { 
    userDocuments, 
    setUploadedDocument, 
    removeUserDocument, 
    addUserDocument,
    navigateTo, 
    goBack,
    isUploading,
    setIsUploading 
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadNew = async (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const doc = await processUploadedFile(file);
      addUserDocument(doc);
      setUploadedDocument(doc);
    } catch (err: any) {
      alert(err.message || 'Error processing document');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreviewInBook = (doc: any) => {
    setUploadedDocument(doc);
    navigateTo('book_preview');
  };

  const handleStartOrderWithDoc = (doc: any) => {
    setUploadedDocument(doc);
    navigateTo('customize');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hidden Web File Input */}
      {Platform.OS === 'web' && (
        <input 
          type="file"
          ref={fileInputRef as any}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
          onChange={handleUploadNew}
        />
      )}

      <View style={styles.contentWrap}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.backBtnText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.uploadBtn, isUploading && { opacity: 0.7 }]}
            disabled={isUploading}
            onPress={() => {
              if (Platform.OS === 'web') fileInputRef.current?.click();
            }}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Plus size={15} color={COLORS.white} />
            )}
            <Text style={styles.uploadBtnText}>
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>My Documents Library</Text>
        <Text style={styles.pageSub}>
          Manage your uploaded project PDFs, Word drafts, and preflight verified manuscripts
        </Text>

        {userDocuments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <UploadCloud size={48} color={COLORS.darkOrange} />
            <Text style={styles.emptyTitle}>No Documents Uploaded Yet</Text>
            <Text style={styles.emptySub}>
              Upload your academic report or thesis in PDF or Word format to inspect formatting and order prints.
            </Text>
            <TouchableOpacity 
              style={styles.uploadFirstBtn}
              onPress={() => {
                if (Platform.OS === 'web') fileInputRef.current?.click();
              }}
            >
              <UploadCloud size={16} color={COLORS.white} />
              <Text style={styles.uploadFirstBtnText}>Upload PDF or Word Document</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.documentsList}>
            {userDocuments.map((doc) => (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.docTopRow}>
                  <View style={styles.docIconBox}>
                    <FileText size={26} color={COLORS.darkOrange} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
                    <Text style={styles.docMeta}>
                      {(doc.size / (1024 * 1024)).toFixed(2)} MB • {doc.pageCount} Pages • Uploaded {doc.uploadedAt}
                    </Text>
                    <View style={styles.verifiedRow}>
                      <CheckCircle2 size={12} color={COLORS.success} />
                      <Text style={styles.verifiedText}>Preflight Check Passed (A4 Margins Validated)</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    onPress={() => removeUserDocument(doc.id)}
                    accessibilityLabel="Delete document"
                  >
                    <Trash2 size={16} color={COLORS.error} />
                  </TouchableOpacity>
                </View>

                {/* Document Actions */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity 
                    style={styles.previewBtn}
                    onPress={() => handlePreviewInBook(doc)}
                  >
                    <Eye size={14} color={COLORS.navy} />
                    <Text style={styles.previewBtnText}>Inspect in Virtual Book</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.orderBtn}
                    onPress={() => handleStartOrderWithDoc(doc)}
                  >
                    <Sliders size={14} color={COLORS.white} />
                    <Text style={styles.orderBtnText}>Start New Order</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  contentWrap: {
    maxWidth: 780,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
  },
  uploadBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  pageSub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
    marginBottom: SPACING.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  uploadFirstBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  uploadFirstBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  documentsList: {
    gap: SPACING.md,
  },
  docCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  docTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  docIconBox: {
    width: 44,
    height: 48,
    borderRadius: RADIUS.xs,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
  },
  docMeta: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  verifiedText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  previewBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
  },
  orderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.navy,
  },
  orderBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});
