import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Layers, 
  ShieldCheck, 
  ArrowLeft,
  Check
} from 'lucide-react-native';

export const DocumentPreviewScreen: React.FC = () => {
  const { uploadedDocument, setUploadedDocument, goBack, navigateTo } = useAppStore();
  const [activePageIndex, setActivePageIndex] = useState(0);

  if (!uploadedDocument) {
    return (
      <View style={styles.emptyContainer}>
        <FileText size={48} color={COLORS.mutedText} />
        <Text style={styles.emptyTitle}>No Document Uploaded</Text>
        <Text style={styles.emptyDesc}>
          Please select a PDF document from the customization studio to inspect preflight validation.
        </Text>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigateTo('customize')}
        >
          <Text style={styles.backBtnText}>Go to Customization</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const samplePages = [
    {
      pageNo: 1,
      title: 'TITLE PAGE & UNIVERSITY EMBOSS',
      type: 'B&W Text',
      margin: '1.25" Left Margin (Binding Cleared)',
      previewContent: [
        'VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE (VJTI)',
        'AUTONOMOUS INSTITUTE AFFILIATED TO UNIVERSITY OF MUMBAI',
        '',
        'A PROJECT REPORT ON',
        'AI-POWERED DISTRIBUTED SUPPLY CHAIN OPTIMIZATION',
        '',
        'SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS',
        'FOR THE DEGREE OF BACHELOR OF TECHNOLOGY',
        'IN COMPUTER ENGINEERING',
        '',
        'SUBMITTED BY: AARAV SHARMA (221080045)',
        'UNDER THE GUIDANCE OF: DR. RAMESH KULKARNI',
        'DEPARTMENT OF COMPUTER ENGINEERING',
        'ACADEMIC YEAR: 2025-2026',
      ],
    },
    {
      pageNo: 2,
      title: 'CERTIFICATE OF ENDORSEMENT',
      type: 'Colour Seal (High DPI)',
      margin: '1.25" Left Margin (Binding Cleared)',
      previewContent: [
        'CERTIFICATE OF AUTHENTICITY',
        '',
        'This is to certify that the project entitled "AI-Powered Distributed Supply Chain',
        'Optimization" submitted by Aarav Sharma is a bona fide work completed',
        'under my supervision during the academic semester.',
        '',
        'Guide Signature: _________________________',
        'Head of Department: _______________________',
        'External Examiner: _______________________',
        '[Official College Seal Hologram Position]',
      ],
    },
    {
      pageNo: 3,
      title: 'SYSTEM ARCHITECTURE & BENCHMARK',
      type: 'Full Colour Diagram (300 DPI)',
      margin: '1.25" Left Margin (Binding Cleared)',
      previewContent: [
        'CHAPTER 4: DISTRIBUTED MULTI-AGENT ARCHITECTURE',
        '',
        'Figure 4.1: End-to-End Pipeline Latency Comparison',
        '[Vector Diagram: Goa Press ➔ Thane Hub Route Simulation]',
        '',
        'Benchmark Results Table 4.2:',
        '• Model Convergence: 99.4% precision',
        '• Batch Inference Latency: 14.2 ms',
        '• Memory Footprint: 218 MB VRAM',
      ],
    },
  ];

  const currentPage = samplePages[activePageIndex] || samplePages[0];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Top Bar with Status */}
          <View style={styles.topStatusCard}>
            <View style={styles.statusBadgeRow}>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={14} color={COLORS.success} />
                <Text style={styles.verifiedBadgeText}>PDF PREFLIGHT VERIFIED</Text>
              </View>
              <Text style={styles.fileSizeText}>
                {(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </View>

            <Text style={styles.fileName}>{uploadedDocument.name}</Text>
            <Text style={styles.validationNote}>{uploadedDocument.validationMessage}</Text>

            {/* Metric Pills */}
            <View style={styles.metricsRow}>
              <View style={styles.metricPill}>
                <Text style={styles.metricVal}>{uploadedDocument.pageCount}</Text>
                <Text style={styles.metricLbl}>Total Pages</Text>
              </View>
              <View style={styles.metricPill}>
                <Text style={styles.metricVal}>{uploadedDocument.bwPageCount}</Text>
                <Text style={styles.metricLbl}>B&W Pages</Text>
              </View>
              <View style={styles.metricPill}>
                <Text style={styles.metricVal}>{uploadedDocument.colorPageCount}</Text>
                <Text style={styles.metricLbl}>Color Pages</Text>
              </View>
              <View style={styles.metricPill}>
                <Text style={[styles.metricVal, { color: COLORS.success }]}>1.25"</Text>
                <Text style={styles.metricLbl}>Gutter Margin</Text>
              </View>
            </View>
          </View>

          {/* Interactive Document Page Viewer */}
          <View style={styles.viewerCard}>
            <View style={styles.viewerHeader}>
              <View style={styles.pageIndicator}>
                <Text style={styles.pageIndicatorText}>
                  Previewing Sheet {activePageIndex + 1} of {samplePages.length}
                </Text>
              </View>
              <View style={styles.pageTypeTag}>
                <Text style={styles.pageTypeTagText}>{currentPage.type}</Text>
              </View>
            </View>

            {/* Simulated Sheet Canvas */}
            <View style={styles.sheetCanvas}>
              {/* Left Binding Margin Indicator Line */}
              <View style={styles.marginGuideLine}>
                <Text style={styles.marginGuideText}>1.25" BINDING CLEARANCE</Text>
              </View>

              <View style={styles.sheetContent}>
                <Text style={styles.sheetHeading}>{currentPage.title}</Text>
                <View style={styles.ruleLine} />
                {currentPage.previewContent.map((line, i) => (
                  <Text key={i} style={[styles.sheetLine, line.startsWith('[') && styles.diagramPlaceholder]}>
                    {line}
                  </Text>
                ))}
              </View>
            </View>

            {/* Page Navigation Controls */}
            <View style={styles.pageControls}>
              <TouchableOpacity
                style={[styles.navBtn, activePageIndex === 0 && styles.navBtnDisabled]}
                disabled={activePageIndex === 0}
                onPress={() => setActivePageIndex(activePageIndex - 1)}
              >
                <ChevronLeft size={18} color={COLORS.navy} />
                <Text style={styles.navBtnText}>Previous Sheet</Text>
              </TouchableOpacity>

              <Text style={styles.pageCountSummary}>
                {activePageIndex + 1} / {samplePages.length}
              </Text>

              <TouchableOpacity
                style={[styles.navBtn, activePageIndex === samplePages.length - 1 && styles.navBtnDisabled]}
                disabled={activePageIndex === samplePages.length - 1}
                onPress={() => setActivePageIndex(activePageIndex + 1)}
              >
                <Text style={styles.navBtnText}>Next Sheet</Text>
                <ChevronRight size={18} color={COLORS.navy} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preflight Checks Checklist */}
          <View style={styles.checksCard}>
            <Text style={styles.checksTitle}>Automated Preflight Inspection</Text>
            {[
              { label: 'Left Inner Binding Margin (≥ 30mm)', status: 'Passed (32mm detected)' },
              { label: 'Embedded Typefaces & Font Glyphs', status: 'Passed (100% vector fonts embedded)' },
              { label: 'Image DPI for Color Charts & Diagrams', status: 'Passed (300 DPI high resolution)' },
              { label: 'Color Page Separation Detection', status: `Passed (${uploadedDocument.colorPageCount} color sheets indexed)` },
            ].map((chk, i) => (
              <View key={i} style={styles.chkRow}>
                <View style={styles.chkIcon}>
                  <Check size={14} color={COLORS.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.chkLabel}>{chk.label}</Text>
                  <Text style={styles.chkStatus}>{chk.status}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.continueBtn}
              onPress={() => navigateTo('customize')}
            >
              <Text style={styles.continueBtnText}>Return to Customization</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollArea: {
    flex: 1,
  },
  contentWrap: {
    padding: SPACING.base,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 320,
    lineHeight: 18,
  },
  backBtn: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  backBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  topStatusCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
  },
  fileSizeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondaryText,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
    marginTop: 2,
  },
  validationNote: {
    fontSize: 12,
    color: COLORS.oceanBlue,
    marginTop: 4,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  metricPill: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.navy,
  },
  metricLbl: {
    fontSize: 10,
    color: COLORS.secondaryText,
    fontWeight: '600',
    marginTop: 2,
  },
  viewerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  viewerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  pageIndicator: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  pageIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  pageTypeTag: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  pageTypeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  sheetCanvas: {
    backgroundColor: '#FAFBFD',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 380,
    padding: SPACING.lg,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  marginGuideLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 48,
    width: 1,
    backgroundColor: '#F87171',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#F87171',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginGuideText: {
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
    fontSize: 8,
    fontWeight: '800',
    color: '#DC2626',
    width: 180,
    textAlign: 'center',
  },
  sheetContent: {
    paddingLeft: 42,
  },
  sheetHeading: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  ruleLine: {
    height: 1,
    backgroundColor: COLORS.navy,
    marginBottom: SPACING.md,
  },
  sheetLine: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: COLORS.primaryText,
    lineHeight: 18,
    marginBottom: 2,
  },
  diagramPlaceholder: {
    backgroundColor: COLORS.lightBlue,
    padding: 6,
    borderRadius: 4,
    color: COLORS.oceanBlue,
    fontWeight: '700',
    marginVertical: 4,
  },
  pageControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  pageCountSummary: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondaryText,
  },
  checksCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  checksTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  chkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  chkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chkLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  chkStatus: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  actionsRow: {
    gap: SPACING.sm,
  },
  continueBtn: {
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
