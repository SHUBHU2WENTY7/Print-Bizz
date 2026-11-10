import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Image, 
  ScrollView
} from 'react-native';
import { 
  ChevronLeft, 
  ChevronRight, 
  RefreshCcw, 
  X, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Layers, 
  Sparkles,
  BarChart3,
  Cpu,
  GraduationCap
} from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { CustomizationState, UploadedDocument } from '../types';

export interface BookPage {
  title?: string;
  category?: string;
  content: React.ReactNode;
  backContent?: React.ReactNode;
  pageNumber: number;
}

export interface InteractiveBookProps {
  coverImage?: string;
  bookTitle?: string;
  bookAuthor?: string;
  collegeName?: string;
  rollNumber?: string;
  degreeBranch?: string;
  academicYear?: string;
  guideName?: string;
  embossingFoil?: 'Gold Foil' | 'Silver Foil' | 'Rose Gold';
  coverColor?: string;
  uploadedDocument?: UploadedDocument | null;
  customization?: CustomizationState;
  className?: string;
  width?: number;
  height?: number;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({
  coverImage = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  bookTitle = 'AI-POWERED DISTRIBUTED SUPPLY CHAIN OPTIMIZATION',
  bookAuthor = 'Aarav Sharma',
  collegeName = 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
  rollNumber = '221080045',
  degreeBranch = 'B.Tech in Computer Engineering',
  academicYear = '2025-2026',
  guideName = 'Dr. Ramesh Kulkarni, Professor',
  embossingFoil = 'Gold Foil',
  coverColor = '#111827',
  uploadedDocument = null,
  customization,
  width = 340,
  height = 490,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);

  const foilHex = embossingFoil === 'Silver Foil' ? '#E2E8F0' : embossingFoil === 'Rose Gold' ? '#B76E79' : '#D4AF37';
  const foilShadowHex = embossingFoil === 'Silver Foil' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)';

  // Build authentic, academic-grade sample pages
  const defaultPages: BookPage[] = [
    {
      pageNumber: 1,
      title: 'TITLE & CERTIFICATE OF AUTHENTICITY',
      category: 'Official Submission',
      content: (
        <View style={pageStyles.pageContainer}>
          <View style={pageStyles.crestContainer}>
            <View style={[pageStyles.crestCircle, { borderColor: foilHex }]}>
              <GraduationCap size={22} color={COLORS.navy} />
            </View>
            <Text style={pageStyles.collegeHeading}>{collegeName.toUpperCase()}</Text>
            <Text style={pageStyles.deptSub}>DEPARTMENT OF COMPUTER ENGINEERING</Text>
          </View>

          <View style={pageStyles.titleBlock}>
            <Text style={pageStyles.reportType}>A CAPSTONE PROJECT REPORT ON</Text>
            <Text style={pageStyles.mainProjectTitle}>{bookTitle}</Text>
            <Text style={pageStyles.submissionNotice}>
              Submitted in partial fulfillment of the requirements for the award of degree of
            </Text>
            <Text style={pageStyles.degreeTitle}>{degreeBranch.toUpperCase()}</Text>
          </View>

          <View style={pageStyles.candidateBlock}>
            <Text style={pageStyles.candidateRole}>SUBMITTED BY</Text>
            <Text style={pageStyles.candidateName}>{bookAuthor.toUpperCase()}</Text>
            <Text style={pageStyles.candidateRoll}>Seat / Roll No: {rollNumber}</Text>
          </View>

          <View style={pageStyles.bottomGuideBlock}>
            <Text style={pageStyles.guideLabel}>PROJECT GUIDE</Text>
            <Text style={pageStyles.guideNameText}>{guideName}</Text>
            <Text style={pageStyles.academicSession}>Academic Year: {academicYear}</Text>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <View style={pageStyles.certificateHeader}>
            <Award size={26} color={COLORS.navy} />
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

          <View style={pageStyles.sealContainer}>
            <View style={pageStyles.officialSeal}>
              <FileCheck size={18} color={COLORS.darkOrange} />
              <Text style={pageStyles.officialSealText}>INSTITUTIONAL SEAL VERIFIED</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      pageNumber: 2,
      title: 'EXECUTIVE ABSTRACT & SYSTEM OVERVIEW',
      category: 'Research Summary',
      content: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>ABSTRACT</Text>
          <View style={pageStyles.abstractBox}>
            <Text style={pageStyles.abstractParagraph}>
              Modern multi-echelon supply networks face critical throughput bottlenecks, cascading stockouts, and elevated carbon footprints caused by asynchronous inventory tracking. This project formulates an autonomous distributed orchestration architecture powered by federated deep Q-networks (DQN) and consensus verification.
            </Text>
            <Text style={pageStyles.abstractParagraph}>
              By decomposing centralized scheduling into localized edge nodes, the model achieves dynamic demand prediction with minimal parameter synchronization overhead. Empirical benchmarks indicate a 34.2% latency reduction and 99.4% SLA adherence.
            </Text>
          </View>

          <Text style={pageStyles.keywordsLabel}>KEYWORDS</Text>
          <Text style={pageStyles.keywordsText}>
            Distributed Consensus • Deep Q-Networks • Supply Chain Analytics • Edge Orchestration • Low-Latency Consensus
          </Text>

          <View style={pageStyles.calloutHighlight}>
            <Sparkles size={16} color={COLORS.darkOrange} />
            <Text style={pageStyles.calloutText}>
              Complies with IEEE PES academic citation standards & institutional guidelines.
            </Text>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>SYSTEM ARCHITECTURE</Text>
          <Text style={pageStyles.systemIntro}>
            High-level modular pipeline illustrating edge ingest, inference consensus, and ledger commitment:
          </Text>

          <View style={pageStyles.archDiagram}>
            <View style={pageStyles.archNode}>
              <Cpu size={16} color={COLORS.navy} />
              <Text style={pageStyles.archNodeTitle}>Edge Telemetry Layer</Text>
              <Text style={pageStyles.archNodeSub}>RFID + Sensor Ingestion</Text>
            </View>
            <View style={pageStyles.archArrow}><Text style={pageStyles.archArrowText}>↓</Text></View>
            <View style={[pageStyles.archNode, pageStyles.archNodeActive]}>
              <Layers size={16} color={COLORS.darkOrange} />
              <Text style={pageStyles.archNodeTitle}>Federated DQN Engine</Text>
              <Text style={pageStyles.archNodeSub}>Real-Time Policy Optimization</Text>
            </View>
            <View style={pageStyles.archArrow}><Text style={pageStyles.archArrowText}>↓</Text></View>
            <View style={pageStyles.archNode}>
              <BarChart3 size={16} color={COLORS.oceanBlue} />
              <Text style={pageStyles.archNodeTitle}>Dispatch & Audit Core</Text>
              <Text style={pageStyles.archNodeSub}>Immutable Ledger Stamping</Text>
            </View>
          </View>

          <Text style={pageStyles.figureCaption}>Figure 2.1: End-to-End Distributed Orchestration Pipeline</Text>
        </View>
      ),
    },
    {
      pageNumber: 3,
      title: 'EXPERIMENTAL RESULTS & CONCLUSION',
      category: 'Benchmarking & Analysis',
      content: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>EMPIRICAL BENCHMARKS</Text>
          <Text style={pageStyles.benchIntro}>
            Comparative throughput evaluation across synthetic and historical logistics traces:
          </Text>

          <View style={pageStyles.tableWrapper}>
            <View style={pageStyles.tableHeaderRow}>
              <Text style={[pageStyles.tableHeadCell, { flex: 1.4 }]}>Architecture</Text>
              <Text style={[pageStyles.tableHeadCell, { flex: 1 }]}>Latency</Text>
              <Text style={[pageStyles.tableHeadCell, { flex: 1 }]}>Accuracy</Text>
              <Text style={[pageStyles.tableHeadCell, { flex: 1 }]}>SLA Rate</Text>
            </View>
            <View style={pageStyles.tableRow}>
              <Text style={[pageStyles.tableCell, { flex: 1.4 }]}>Centralized ARIMA</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>184 ms</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>84.2%</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>91.0%</Text>
            </View>
            <View style={pageStyles.tableRow}>
              <Text style={[pageStyles.tableCell, { flex: 1.4 }]}>Standard LSTM</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>92 ms</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>91.8%</Text>
              <Text style={[pageStyles.tableCell, { flex: 1 }]}>96.3%</Text>
            </View>
            <View style={[pageStyles.tableRow, pageStyles.tableRowHighlight]}>
              <Text style={[pageStyles.tableCellBold, { flex: 1.4 }]}>Proposed (Ours)</Text>
              <Text style={[pageStyles.tableCellBold, { flex: 1 }]}>28 ms</Text>
              <Text style={[pageStyles.tableCellBold, { flex: 1 }]}>98.6%</Text>
              <Text style={[pageStyles.tableCellBold, { flex: 1 }]}>99.4%</Text>
            </View>
          </View>

          <View style={pageStyles.miniChart}>
            <Text style={pageStyles.chartTitle}>Throughput Speedup: 3.4x vs Baseline</Text>
            <View style={pageStyles.chartBarRow}>
              <Text style={pageStyles.chartLabel}>Proposed</Text>
              <View style={[pageStyles.barFill, { width: '85%', backgroundColor: COLORS.darkOrange }]} />
              <Text style={pageStyles.chartVal}>2,840 tx/s</Text>
            </View>
            <View style={pageStyles.chartBarRow}>
              <Text style={pageStyles.chartLabel}>Baseline</Text>
              <View style={[pageStyles.barFill, { width: '30%', backgroundColor: COLORS.secondaryText }]} />
              <Text style={pageStyles.chartVal}>820 tx/s</Text>
            </View>
          </View>
        </View>
      ),
      backContent: (
        <View style={pageStyles.pageContainer}>
          <Text style={pageStyles.sectionHeading}>CONCLUSION & REFERENCES</Text>
          <Text style={pageStyles.conclusionBody}>
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
    },
  ];

  // If user uploaded a document, build dynamic pages from real extracted text
  const pages: BookPage[] = (uploadedDocument?.extractedText && uploadedDocument.extractedText.length > 0)
    ? uploadedDocument.extractedText.slice(0, 10).map((text, i) => ({
        pageNumber: i + 1,
        title: `PAGE ${i + 1}: ${bookTitle.slice(0, 36).toUpperCase()}`,
        category: 'Uploaded Document',
        content: (
          <View style={pageStyles.pageContainer}>
            <View style={pageStyles.pageTopHeader}>
              <Text style={pageStyles.pageTopTitle}>{bookTitle.toUpperCase()}</Text>
              <Text style={pageStyles.pageTopNum}>{i * 2 + 1}</Text>
            </View>
            <View style={pageStyles.pageTopLine} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <Text style={pageStyles.realDocText}>{text}</Text>
            </ScrollView>
            <View style={pageStyles.pageFootWrap}>
              <Text style={pageStyles.pageFootText}>{collegeName}</Text>
              <Text style={pageStyles.pageFootText}>Page {i * 2 + 1}</Text>
            </View>
          </View>
        ),
        backContent: (
          <View style={pageStyles.pageContainer}>
            <View style={pageStyles.pageTopHeader}>
              <Text style={pageStyles.pageTopNum}>{i * 2 + 2}</Text>
              <Text style={pageStyles.pageTopTitle}>{collegeName.toUpperCase()}</Text>
            </View>
            <View style={pageStyles.pageTopLine} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <Text style={pageStyles.realDocText}>
                {uploadedDocument.extractedText?.[i + 1] || text}
              </Text>
            </ScrollView>
            <View style={pageStyles.pageFootWrap}>
              <Text style={pageStyles.pageFootText}>Page {i * 2 + 2}</Text>
              <Text style={pageStyles.pageFootText}>{bookAuthor}</Text>
            </View>
          </View>
        ),
      }))
    : defaultPages;

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
        setIsOpen(false);
        setCurrentPageIndex(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pages.length]);

  return (
    <View style={styles.outerContainer}>
      {/* 3D Book Interactive Wrapper */}
      <View 
        style={[
          styles.stage, 
          { 
            width: isOpen ? width * 2 + 30 : width, 
            height: height + 40,
            perspective: 2000,
          } as any
        ]}
      >
        {/* Closed / Shifted Container */}
        <View 
          style={[
            styles.bookContainer,
            {
              width: width,
              height: height,
              transform: [
                { translateX: isOpen ? width / 2 : 0 },
              ],
              transition: 'transform 1.2s cubic-bezier(0.25, 0, 0, 1)',
              transformStyle: 'preserve-3d',
            } as any
          ]}
        >
          {/* FRONT COVER */}
          <View
            style={[
              styles.frontCoverWrapper,
              {
                width: width,
                height: height,
                transformOrigin: 'left center',
                transform: [
                  { rotateY: isOpen ? '-180deg' : isHovering ? '-12deg' : '0deg' },
                ],
                transition: 'transform 1.2s cubic-bezier(0.25, 0, 0, 1)',
                zIndex: isOpen ? 0 : 50,
                transformStyle: 'preserve-3d',
              } as any
            ]}
          >
            {/* Front Face (Photorealistic Black Book Cover) */}
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
              {/* Authentic High-Resolution Leatherette Background Image */}
              <Image 
                source={{ uri: coverImage }} 
                style={styles.coverImageBg}
                resizeMode="cover"
              />
              <View style={styles.coverDarkGradient} />

              {/* Spine Highlight & Crease */}
              <View style={styles.spineGrip} />
              <View style={styles.spineCreaseLine} />

              {/* Embossed Thermal Gold Foil Cover Stamping */}
              <View style={[styles.foilFrame, { borderColor: foilHex }]}>
                {/* College Title */}
                <Text style={[styles.foilCollegeText, { color: foilHex, textShadowColor: foilShadowHex }]}>
                  {collegeName.toUpperCase()}
                </Text>

                {/* University Emblem Crest */}
                <View style={[styles.emblemCircle, { borderColor: foilHex }]}>
                  <Sparkles size={20} color={foilHex} />
                </View>

                {/* Project Title */}
                <View style={styles.titleSection}>
                  <Text style={[styles.reportLead, { color: foilHex }]}>A PROJECT REPORT ON</Text>
                  <Text style={[styles.foilBookTitle, { color: foilHex, textShadowColor: foilShadowHex }]}>
                    {bookTitle}
                  </Text>
                  <Text style={[styles.foilDegree, { color: foilHex }]}>
                    {degreeBranch.toUpperCase()}
                  </Text>
                </View>

                {/* Student Credentials */}
                <View style={styles.candidateSection}>
                  <Text style={[styles.submittedBy, { color: foilHex }]}>SUBMITTED BY:</Text>
                  <Text style={[styles.studentName, { color: foilHex }]}>{bookAuthor.toUpperCase()}</Text>
                  {rollNumber ? (
                    <Text style={[styles.rollNo, { color: foilHex }]}>ROLL NO: {rollNumber}</Text>
                  ) : null}
                </View>

                {/* Guide & Year */}
                <View style={[styles.bottomFoilRow, { borderTopColor: 'rgba(212,175,55,0.3)' }]}>
                  {guideName ? (
                    <Text style={[styles.guideText, { color: foilHex }]}>
                      GUIDE: {guideName.toUpperCase()}
                    </Text>
                  ) : null}
                  <Text style={[styles.yearText, { color: foilHex }]}>
                    ACADEMIC YEAR: {academicYear}
                  </Text>
                </View>
              </View>

              {/* Corner Brass Protectors */}
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
                  <BookOpen size={24} color={COLORS.navy} />
                </View>
                <Text style={pageStyles.frontispieceTitle}>{bookTitle}</Text>
                <View style={pageStyles.dividerGold} />
                <Text style={pageStyles.frontispieceAuthor}>AUTHORED BY {bookAuthor.toUpperCase()}</Text>
                <Text style={pageStyles.frontispieceDept}>{degreeBranch}</Text>
                <Text style={pageStyles.frontispieceCollege}>{collegeName}</Text>
                <View style={pageStyles.editionBadge}>
                  <Text style={pageStyles.editionBadgeText}>OFFICIAL VIRTUAL INTERACTIVE EDITION</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* PAGES STACK */}
          <View style={[styles.pagesStackContainer, { transformStyle: 'preserve-3d' } as any]}>
            {pages.map((page, index) => {
              const isFlipped = index <= currentPageIndex;

              return (
                <View
                  key={index}
                  style={[
                    styles.pageLayer,
                    {
                      width: width,
                      height: height,
                      transformOrigin: 'left center',
                      transform: [
                        { rotateY: isFlipped ? '-180deg' : '0deg' },
                      ],
                      transition: 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)',
                      zIndex: isFlipped ? index + 1 : pages.length - index,
                      transformStyle: 'preserve-3d',
                    } as any
                  ]}
                >
                  {/* Front Face (Right Page Spread) */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.pageFaceFront,
                      {
                        backfaceVisibility: 'hidden',
                      } as any
                    ]}
                    onPress={nextPage}
                  >
                    <View style={styles.pageGutterLeftShadow} />
                    <View style={styles.pageInnerScroll}>
                      {page.content}
                    </View>
                    <View style={styles.pageFooterBar}>
                      <Text style={styles.pageNumberRight}>{page.pageNumber * 2 - 1}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Back Face (Left Page Spread) */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.pageFaceBack,
                      {
                        transform: [{ rotateY: '180deg' }],
                        backfaceVisibility: 'hidden',
                      } as any
                    ]}
                    onPress={prevPage}
                  >
                    <View style={styles.pageGutterRightShadow} />
                    <View style={styles.pageInnerScroll}>
                      {page.backContent || (
                        <View style={styles.blankPageWatermark}>
                          <Text style={styles.watermarkNumber}>{page.pageNumber * 2}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.pageFooterBar}>
                      <Text style={styles.pageNumberLeft}>{page.pageNumber * 2}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            {/* STATIC BACK COVER */}
            <View style={[styles.staticBackCover, { width: width, height: height }]}>
              <View style={styles.endCoverContent}>
                <BookOpen size={36} color={COLORS.navy} />
                <Text style={styles.theEndText}>The End of Document</Text>
                <Text style={styles.theEndSub}>University Capstone Final Submission</Text>
                <TouchableOpacity 
                  style={styles.restartBtn}
                  onPress={restartBook}
                >
                  <RefreshCcw size={14} color={COLORS.navy} />
                  <Text style={styles.restartBtnText}>Read Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Floating Controls: Close Button */}
        {isOpen && (
          <TouchableOpacity
            style={styles.floatingCloseBtn}
            onPress={handleCloseBook}
            accessibilityLabel="Close Book"
          >
            <X size={20} color={COLORS.navy} />
          </TouchableOpacity>
        )}

        {/* Bottom Hint */}
        {!isOpen && (
          <TouchableOpacity 
            style={styles.openHintPill}
            onPress={handleOpenBook}
            activeOpacity={0.8}
          >
            <BookOpen size={14} color={COLORS.navy} />
            <Text style={styles.openHintText}>CLICK TO OPEN 3D BLACK BOOK</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Navigation Controls Bar */}
      {isOpen && (
        <View style={styles.pageControlsBar}>
          <TouchableOpacity 
            style={[styles.navArrowBtn, currentPageIndex < 0 && styles.navArrowDisabled]}
            onPress={prevPage}
            disabled={currentPageIndex < 0}
          >
            <ChevronLeft size={18} color={currentPageIndex < 0 ? COLORS.mutedText : COLORS.navy} />
            <Text style={[styles.navArrowText, currentPageIndex < 0 && styles.navArrowTextDisabled]}>
              Previous
            </Text>
          </TouchableOpacity>

          <View style={styles.progressCenter}>
            <Text style={styles.pageCounterText}>
              {currentPageIndex === -1 ? 'Front Cover' : `Page ${currentPageIndex + 1} of ${pages.length}`}
            </Text>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${Math.max(10, ((currentPageIndex + 2) / (pages.length + 1)) * 100)}%` }
                ]} 
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.navArrowBtn, currentPageIndex >= pages.length - 1 && styles.navArrowDisabled]}
            onPress={nextPage}
            disabled={currentPageIndex >= pages.length - 1}
          >
            <Text style={[styles.navArrowText, currentPageIndex >= pages.length - 1 && styles.navArrowTextDisabled]}>
              Next
            </Text>
            <ChevronRight size={18} color={currentPageIndex >= pages.length - 1 ? COLORS.mutedText : COLORS.navy} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
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
  },
  frontFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 28,
    elevation: 16,
    padding: 18,
  },
  coverImageBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.85,
  },
  coverDarkGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 15, 26, 0.82)',
  },
  spineGrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  spineCreaseLine: {
    position: 'absolute',
    top: 0,
    left: 18,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  foilFrame: {
    flex: 1,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  foilCollegeText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    lineHeight: 16,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emblemCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  reportLead: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  foilBookTitle: {
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0.4,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  foilDegree: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  candidateSection: {
    alignItems: 'center',
  },
  submittedBy: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  studentName: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginTop: 1,
  },
  rollNo: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  bottomFoilRow: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 4,
  },
  guideText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  yearText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 1,
  },
  brassCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 2.5,
  },
  brassTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  brassTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  brassBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  brassBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  // Inner Cover Back Face
  innerCoverBackFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    borderLeftWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  frontispieceWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 6,
  },
  innerCrestBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  // Pages Stack
  pagesStackContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pageLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pageFaceFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FDFBF7',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E5DF',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  pageFaceBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FDFBF7',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E5DF',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  pageGutterLeftShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 22,
    backgroundColor: 'rgba(0,0,0,0.035)',
  },
  pageGutterRightShadow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 22,
    backgroundColor: 'rgba(0,0,0,0.035)',
  },
  pageInnerScroll: {
    flex: 1,
  },
  pageFooterBar: {
    borderTopWidth: 1,
    borderTopColor: '#EAE6DF',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pageNumberRight: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
  },
  pageNumberLeft: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
  },
  blankPageWatermark: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.05,
  },
  watermarkNumber: {
    fontSize: 64,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#000',
  },

  // Static Back Cover
  staticBackCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 14 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    zIndex: -1,
  },
  endCoverContent: {
    alignItems: 'center',
    padding: 24,
  },
  theEndText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: 12,
  },
  theEndSub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 4,
    marginBottom: 16,
  },
  restartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
  },
  restartBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },

  // Floating Close Button
  floatingCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    zIndex: 100,
  },
  openHintPill: {
    position: 'absolute',
    bottom: -14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 10,
  },
  openHintText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 0.8,
  },

  // Bottom Controls
  pageControlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  navArrowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navArrowDisabled: {
    opacity: 0.4,
  },
  navArrowText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  navArrowTextDisabled: {
    color: COLORS.mutedText,
  },
  progressCenter: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  pageCounterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 4,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.darkOrange,
  },
});

// Inner Page Specific Styles
const pageStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  crestContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  crestCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: '#F8FAFC',
  },
  collegeHeading: {
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
    color: '#0F172A',
    letterSpacing: 0.4,
  },
  deptSub: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 1,
  },
  titleBlock: {
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  reportType: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  mainProjectTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginVertical: 4,
    lineHeight: 16,
  },
  submissionNotice: {
    fontSize: 7.5,
    color: '#64748B',
    textAlign: 'center',
  },
  degreeTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  candidateBlock: {
    alignItems: 'center',
    marginVertical: 4,
  },
  candidateRole: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  candidateName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  candidateRoll: {
    fontSize: 8,
    color: '#475569',
  },
  bottomGuideBlock: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 4,
  },
  guideLabel: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#64748B',
  },
  guideNameText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
  },
  academicSession: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },

  // Certificate
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  certTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  headerUnderline: {
    width: 40,
    height: 1.5,
    backgroundColor: COLORS.darkOrange,
    marginTop: 3,
  },
  certBody: {
    fontSize: 8.5,
    lineHeight: 14,
    color: '#334155',
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '800',
    color: '#0F172A',
  },
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  sigCol: {
    width: 110,
    alignItems: 'center',
  },
  signatureLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#0F172A',
    marginBottom: 4,
  },
  sigName: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0F172A',
  },
  sigRole: {
    fontSize: 7,
    color: '#64748B',
  },
  sealContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  officialSeal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  officialSealText: {
    fontSize: 7.5,
    fontWeight: '800',
    color: COLORS.darkOrange,
  },

  // Abstract
  sectionHeading: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  abstractBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.navy,
  },
  abstractParagraph: {
    fontSize: 8,
    lineHeight: 12,
    color: '#334155',
    marginBottom: 4,
    textAlign: 'justify',
  },
  keywordsLabel: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
  },
  keywordsText: {
    fontSize: 7.5,
    color: '#475569',
    fontStyle: 'italic',
  },
  calloutHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    backgroundColor: '#FFF7ED',
    borderRadius: 4,
    marginTop: 6,
  },
  calloutText: {
    fontSize: 7.5,
    color: '#9A3412',
    fontWeight: '600',
    flex: 1,
  },

  // Architecture
  systemIntro: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 8,
  },
  archDiagram: {
    alignItems: 'center',
    gap: 2,
  },
  archNode: {
    width: '100%',
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  archNodeActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  archNodeTitle: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  archNodeSub: {
    fontSize: 7,
    color: '#64748B',
  },
  archArrow: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  archArrowText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
  },
  figureCaption: {
    fontSize: 7.5,
    fontStyle: 'italic',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },

  // Benchmarks Table
  benchIntro: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 6,
  },
  tableWrapper: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableHeadCell: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#FFF',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableRowHighlight: {
    backgroundColor: '#FFF7ED',
  },
  tableCell: {
    fontSize: 7.5,
    color: '#334155',
  },
  tableCellBold: {
    fontSize: 7.5,
    fontWeight: '800',
    color: COLORS.darkOrange,
  },
  miniChart: {
    marginTop: 8,
    padding: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
  },
  chartTitle: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  chartBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 2,
  },
  chartLabel: {
    fontSize: 7,
    width: 44,
    color: '#475569',
  },
  barFill: {
    height: 8,
    borderRadius: 2,
  },
  chartVal: {
    fontSize: 7,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Conclusion
  conclusionBody: {
    fontSize: 8,
    lineHeight: 12,
    color: '#334155',
    textAlign: 'justify',
  },
  refHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  refList: {
    gap: 3,
  },
  refItem: {
    fontSize: 7,
    color: '#475569',
    lineHeight: 10,
  },
  endSealWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 6,
  },
  endSealText: {
    fontSize: 7.5,
    fontWeight: '700',
    color: COLORS.success,
  },

  // Real Doc Pages
  pageTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTopTitle: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748B',
    maxWidth: 220,
  },
  pageTopNum: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0F172A',
  },
  pageTopLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  realDocText: {
    fontSize: 8.5,
    lineHeight: 13,
    color: '#1E293B',
    textAlign: 'justify',
  },
  pageFootWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 4,
    marginTop: 4,
  },
  pageFootText: {
    fontSize: 7.5,
    color: '#94A3B8',
  },

  // Frontispiece
  frontispieceTitle: {
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.navy,
    lineHeight: 17,
  },
  dividerGold: {
    width: 32,
    height: 1.5,
    backgroundColor: COLORS.darkOrange,
    marginVertical: 8,
  },
  frontispieceAuthor: {
    fontSize: 9,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.6,
  },
  frontispieceDept: {
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  frontispieceCollege: {
    fontSize: 8,
    color: '#94A3B8',
    marginTop: 2,
    textAlign: 'center',
  },
  editionBadge: {
    marginTop: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  editionBadgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },
});
