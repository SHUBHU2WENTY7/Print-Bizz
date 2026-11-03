import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Platform,
  ActivityIndicator,
  Image 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';
import { processUploadedFile } from '../services/documentService';
import { 
  Check, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Sliders, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react-native';

export const CustomizeScreen: React.FC = () => {
  const { 
    selectedProduct, 
    selectProduct,
    customization, 
    updateCustomization, 
    uploadedDocument, 
    setUploadedDocument, 
    isUploading, 
    setIsUploading, 
    currentPrice, 
    navigateTo, 
    addToCart 
  } = useAppStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const steps = [
    { num: 1, title: 'Choose Product', subtitle: 'Select academic style' },
    { num: 2, title: 'Upload Document', subtitle: 'PDF, DOC, DOCX' },
    { num: 3, title: 'Print Options', subtitle: 'Paper, GSM & Color' },
    { num: 4, title: 'Binding & Cover', subtitle: 'Foil, Spine & Stamping' },
    { num: 5, title: 'Quantity', subtitle: 'Copies & Discounts' },
    { num: 6, title: 'Summary & Price', subtitle: 'Live Calculation' },
  ];

  const handleFileSelected = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const doc = await processUploadedFile(file);
      setUploadedDocument(doc);
    } catch (err: any) {
      setUploadError(err.message || 'Error processing document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverTextChange = (field: keyof typeof customization.cover, val: string) => {
    updateCustomization({
      cover: {
        ...customization.cover,
        [field]: val,
      },
    });
  };

  const handleAddOnToggle = (key: keyof typeof customization.addOns) => {
    updateCustomization({
      addOns: {
        ...customization.addOns,
        [key]: !customization.addOns[key],
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Hidden Web File Input */}
      {Platform.OS === 'web' && (
        <input 
          type="file"
          ref={fileInputRef as any}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const f = e.target?.files?.[0];
            if (f) handleFileSelected(f);
          }}
        />
      )}

      {/* Subway Stepper Navigation Bar */}
      <View style={styles.stepperContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stepperScroll}>
          {steps.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <TouchableOpacity
                key={st.num}
                style={[
                  styles.stepItem,
                  isCurrent && styles.stepItemCurrent,
                  isCompleted && styles.stepItemCompleted,
                ]}
                onPress={() => setCurrentStep(st.num)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.stepBadge,
                  isCurrent && styles.stepBadgeCurrent,
                  isCompleted && styles.stepBadgeCompleted,
                ]}>
                  {isCompleted ? (
                    <Check size={12} color={COLORS.white} strokeWidth={3} />
                  ) : (
                    <Text style={[styles.stepNum, isCurrent && styles.stepNumCurrent]}>
                      {st.num}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={[styles.stepTitle, isCurrent && styles.stepTitleCurrent]}>
                    {st.title}
                  </Text>
                  <Text style={styles.stepSubtitle}>{st.subtitle}</Text>
                </View>
                {st.num < 6 && <ChevronRight size={14} color={COLORS.mutedText} style={{ marginLeft: 8 }} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main 2-Column Customization Layout */}
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrap}>
          {/* Left / Main: Step Configuration Area */}
          <View style={styles.configurationArea}>
            {/* STEP 1: CHOOSE PRODUCT */}
            {currentStep === 1 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 1: Choose Academic Product</Text>
                  <Text style={styles.stepSubtext}>
                    Select your base book type formatted to university guidelines.
                  </Text>
                </View>

                <View style={styles.productListGrid}>
                  {BLACK_BOOK_PRODUCTS.map((prod) => {
                    const isSelected = selectedProduct.id === prod.id;
                    return (
                      <TouchableOpacity
                        key={prod.id}
                        style={[styles.productOptionCard, isSelected && styles.productOptionCardSelected]}
                        onPress={() => selectProduct(prod.id)}
                        activeOpacity={0.85}
                      >
                        <Image source={{ uri: prod.image }} style={styles.prodThumb} />
                        <View style={styles.prodInfo}>
                          <View style={styles.prodRow}>
                            <Text style={styles.prodName}>{prod.name}</Text>
                            {isSelected && (
                              <View style={styles.selectedPill}>
                                <Check size={11} color={COLORS.white} />
                                <Text style={styles.selectedPillText}>Selected</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.prodTagline}>{prod.tagline}</Text>
                          <Text style={styles.prodPrice}>From ₹{prod.startingPrice}/copy</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* STEP 2: UPLOAD DOCUMENT */}
            {currentStep === 2 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 2: Upload Your Document</Text>
                  <Text style={styles.stepSubtext}>
                    Upload your actual PDF, DOC, or DOCX document. We strictly verify margins, font embedding, and pagination.
                  </Text>
                </View>

                {uploadedDocument ? (
                  <View style={styles.uploadedFileCard}>
                    <View style={styles.uploadedFileRow}>
                      <View style={styles.pdfIconBox}>
                        <FileText size={28} color={COLORS.darkOrange} />
                      </View>
                      <View style={styles.uploadedFileMeta}>
                        <Text style={styles.uploadedFileName} numberOfLines={1}>
                          {uploadedDocument.name}
                        </Text>
                        <Text style={styles.uploadedFileSize}>
                          {(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB • {uploadedDocument.pageCount} Pages ({uploadedDocument.colorPageCount} Color, {uploadedDocument.bwPageCount} B&W)
                        </Text>
                        <View style={styles.verifiedRow}>
                          <CheckCircle2 size={13} color={COLORS.success} />
                          <Text style={styles.verifiedText}>
                            {uploadedDocument.validationMessage || 'PDF preflight verified • Ready for printing'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.uploadActionsRow}>
                      <TouchableOpacity 
                        style={styles.actionBtnSecondary}
                        onPress={() => navigateTo('book_preview')}
                      >
                        <Eye size={15} color={COLORS.navy} />
                        <Text style={styles.actionBtnSecondaryText}>Open Book Preview</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionBtnSecondary}
                        onPress={() => {
                          if (Platform.OS === 'web') fileInputRef.current?.click();
                        }}
                      >
                        <RotateCcw size={15} color={COLORS.navy} />
                        <Text style={styles.actionBtnSecondaryText}>Replace File</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionBtnDelete}
                        onPress={() => setUploadedDocument(null)}
                      >
                        <Trash2 size={15} color={COLORS.error} />
                        <Text style={styles.actionBtnDeleteText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.dropZone}>
                    {isUploading ? (
                      <View style={styles.uploadingState}>
                        <ActivityIndicator size="large" color={COLORS.darkOrange} />
                        <Text style={styles.uploadingText}>Verifying preflight margins & pages...</Text>
                      </View>
                    ) : (
                      <>
                        <UploadCloud size={46} color={COLORS.darkOrange} />
                        <Text style={styles.dropZoneTitle}>Select your Project Document</Text>
                        <Text style={styles.dropZoneSub}>
                          Accepts PDF, DOC, DOCX up to 100MB
                        </Text>
                        <TouchableOpacity 
                          style={styles.browseFilesBtn}
                          onPress={() => {
                            if (Platform.OS === 'web') fileInputRef.current?.click();
                          }}
                        >
                          <UploadCloud size={16} color={COLORS.white} />
                          <Text style={styles.browseFilesBtnText}>Browse Files</Text>
                        </TouchableOpacity>
                        {uploadError && <Text style={styles.errorBanner}>{uploadError}</Text>}
                      </>
                    )}
                  </View>
                )}

                <View style={styles.preflightNoticeBox}>
                  <ShieldCheck size={18} color={COLORS.oceanBlue} />
                  <Text style={styles.preflightNoticeText}>
                    Authentic Guarantee: We never generate mock pages. Your actual document will be rendered directly in the virtual black book preview.
                  </Text>
                </View>
              </View>
            )}

            {/* STEP 3: CONFIGURE PRINTING */}
            {currentStep === 3 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 3: Configure Printing Specifications</Text>
                  <Text style={styles.stepSubtext}>
                    Select paper size, GSM weight, monochrome or full color, and page orientation.
                  </Text>
                </View>

                {/* Paper Size */}
                <Text style={styles.fieldSectionLabel}>Paper Size</Text>
                <View style={styles.optionsRow}>
                  {[
                    { id: 'A4', title: 'Standard A4', desc: '210 x 297 mm (Universal standard for submissions)' },
                    { id: 'A3', title: 'Large A3', desc: '297 x 420 mm (Architectural & drawing folios)' },
                  ].map((sz) => (
                    <TouchableOpacity
                      key={sz.id}
                      style={[styles.specOptionPill, customization.paperSize === sz.id && styles.specOptionPillActive]}
                      onPress={() => updateCustomization({ paperSize: sz.id as any })}
                    >
                      <Text style={[styles.specOptionTitle, customization.paperSize === sz.id && styles.specOptionTitleActive]}>
                        {sz.title}
                      </Text>
                      <Text style={styles.specOptionDesc}>{sz.desc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Paper GSM */}
                <Text style={styles.fieldSectionLabel}>Paper GSM (Thickness & Opacity)</Text>
                <View style={styles.optionsGrid}>
                  {[
                    { id: '75 GSM Standard', label: '75 GSM Standard', note: 'Standard office print' },
                    { id: '80 GSM Bond', label: '80 GSM Premium Bond', note: 'Recommended standard for Black Books (+₹25)' },
                    { id: '100 GSM Executive', label: '100 GSM Royal Bond', note: 'Heavyweight archival quality (+₹55)' },
                  ].map((gsm) => (
                    <TouchableOpacity
                      key={gsm.id}
                      style={[styles.specOptionPill, customization.paperGSM === gsm.id && styles.specOptionPillActive]}
                      onPress={() => updateCustomization({ paperGSM: gsm.id as any })}
                    >
                      <Text style={[styles.specOptionTitle, customization.paperGSM === gsm.id && styles.specOptionTitleActive]}>
                        {gsm.label}
                      </Text>
                      <Text style={styles.specOptionDesc}>{gsm.note}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Print Type */}
                <Text style={styles.fieldSectionLabel}>Color Mode</Text>
                <View style={styles.optionsRow}>
                  {[
                    { id: 'Black & White', title: 'Black & White', desc: 'Deep monochrome laser printing' },
                    { id: 'Mixed (B&W + Colour)', title: 'Mixed (B&W + Color)', desc: 'Full-color charts + monochrome text' },
                    { id: 'Full Colour', title: 'Full Color All Pages', desc: 'Vivid color across all sheets' },
                  ].map((pt) => (
                    <TouchableOpacity
                      key={pt.id}
                      style={[styles.specOptionPill, customization.printType === pt.id && styles.specOptionPillActive]}
                      onPress={() => updateCustomization({ printType: pt.id as any })}
                    >
                      <Text style={[styles.specOptionTitle, customization.printType === pt.id && styles.specOptionTitleActive]}>
                        {pt.title}
                      </Text>
                      <Text style={styles.specOptionDesc}>{pt.desc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Print Sides */}
                <Text style={styles.fieldSectionLabel}>Printing Sides</Text>
                <View style={styles.optionsRow}>
                  {[
                    { id: 'Double-Sided (Recommended)', title: 'Double-Sided (Front & Back)', desc: 'Standard university requirement' },
                    { id: 'Single-Sided', title: 'Single-Sided (One Page per Sheet)', desc: 'Traditional single-side folio' },
                  ].map((sd) => (
                    <TouchableOpacity
                      key={sd.id}
                      style={[styles.specOptionPill, customization.printSides === sd.id && styles.specOptionPillActive]}
                      onPress={() => updateCustomization({ printSides: sd.id as any })}
                    >
                      <Text style={[styles.specOptionTitle, customization.printSides === sd.id && styles.specOptionTitleActive]}>
                        {sd.title}
                      </Text>
                      <Text style={styles.specOptionDesc}>{sd.desc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* STEP 4: CONFIGURE BINDING & COVER */}
            {currentStep === 4 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 4: Configure Binding & Cover Foil</Text>
                  <Text style={styles.stepSubtext}>
                    Select your cover color, foil lettering, and fill in your university cover details.
                  </Text>
                </View>

                {/* Binding Style */}
                <Text style={styles.fieldSectionLabel}>Binding Style</Text>
                <View style={styles.optionsGrid}>
                  {[
                    { id: 'Golden Embossed Hardcover (Standard)', label: 'Golden Hardcover (Standard)' },
                    { id: 'Silver Foil Embossed Hardcover', label: 'Silver Foil Hardcover (+₹30)' },
                    { id: 'Premium Leatherette Rexine', label: 'Leatherette Deluxe Hardbound (+₹110)' },
                    { id: 'Wire-O Spiral Binding', label: 'Wire-O Metal Spiral' },
                  ].map((b) => (
                    <TouchableOpacity
                      key={b.id}
                      style={[styles.specOptionPill, customization.binding === b.id && styles.specOptionPillActive]}
                      onPress={() => updateCustomization({ binding: b.id as any })}
                    >
                      <Text style={[styles.specOptionTitle, customization.binding === b.id && styles.specOptionTitleActive]}>
                        {b.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Cover Color & Foil Swatches */}
                <View style={styles.swatchesRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldSectionLabel}>Cover Color</Text>
                    <View style={styles.swatchGroup}>
                      {[
                        { name: 'Classic Midnight Black', color: '#111827' },
                        { name: 'Royal Navy Blue', color: '#0C1B33' },
                        { name: 'Deep Maroon', color: '#581845' },
                        { name: 'Dark Emerald', color: '#064E3B' },
                      ].map((col) => (
                        <TouchableOpacity
                          key={col.name}
                          style={[
                            styles.colorCircle,
                            { backgroundColor: col.color },
                            customization.cover.coverColor === col.name && styles.colorCircleActive,
                          ]}
                          onPress={() => handleCoverTextChange('coverColor', col.name as any)}
                        />
                      ))}
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldSectionLabel}>Embossing Foil</Text>
                    <View style={styles.swatchGroup}>
                      {[
                        { name: 'Gold Foil', color: '#D4AF37' },
                        { name: 'Silver Foil', color: '#E2E8F0' },
                        { name: 'Rose Gold', color: '#B76E79' },
                      ].map((foil) => (
                        <TouchableOpacity
                          key={foil.name}
                          style={[
                            styles.foilBadge,
                            customization.cover.embossingFoil === foil.name && styles.foilBadgeActive,
                          ]}
                          onPress={() => handleCoverTextChange('embossingFoil', foil.name as any)}
                        >
                          <View style={[styles.foilMiniDot, { backgroundColor: foil.color }]} />
                          <Text style={styles.foilBadgeText}>{foil.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                {/* Cover Text Inputs */}
                <Text style={styles.fieldSectionLabel}>Cover Stamping Details</Text>
                <View style={styles.formGrid}>
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>University / College Name</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.collegeName}
                      onChangeText={(val) => handleCoverTextChange('collegeName', val)}
                      placeholder="e.g. University of Mumbai / VJTI"
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>Project / Thesis Title</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.projectTitle}
                      onChangeText={(val) => handleCoverTextChange('projectTitle', val)}
                      placeholder="Title of your academic project"
                    />
                  </View>

                  <View style={styles.inputWrapHalf}>
                    <Text style={styles.inputLabel}>Student Name</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.studentName}
                      onChangeText={(val) => handleCoverTextChange('studentName', val)}
                      placeholder="Full Name"
                    />
                  </View>

                  <View style={styles.inputWrapHalf}>
                    <Text style={styles.inputLabel}>Roll Number / Seat No.</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.rollNumber}
                      onChangeText={(val) => handleCoverTextChange('rollNumber', val)}
                      placeholder="e.g. 221080045"
                    />
                  </View>

                  <View style={styles.inputWrapHalf}>
                    <Text style={styles.inputLabel}>Degree & Branch</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.degreeBranch}
                      onChangeText={(val) => handleCoverTextChange('degreeBranch', val)}
                      placeholder="e.g. B.Tech Computer Engineering"
                    />
                  </View>

                  <View style={styles.inputWrapHalf}>
                    <Text style={styles.inputLabel}>Academic Year</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.academicYear}
                      onChangeText={(val) => handleCoverTextChange('academicYear', val)}
                      placeholder="2025-2026"
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>Spine Embossing Text</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.spineText}
                      onChangeText={(val) => handleCoverTextChange('spineText', val)}
                      placeholder="e.g. B.TECH THESIS - AARAV SHARMA - 2026"
                    />
                  </View>
                </View>

                {/* Add-ons Checklist */}
                <Text style={styles.fieldSectionLabel}>Optional Add-Ons</Text>
                <View style={styles.addOnsGrid}>
                  {[
                    { key: 'butterPaperInserts', title: 'Butter Paper Tissue Separators', price: '+₹30', desc: 'Acid-free translucent sheets for certificates' },
                    { key: 'goldCornerProtectors', title: 'Brass Corner Protectors', price: '+₹40', desc: 'Protective metal corner tabs' },
                    { key: 'ribbonBookmark', title: 'Silk Ribbon Bookmark', price: '+₹20', desc: 'Convenient reading ribbon marker' },
                    { key: 'cdPocketSleeve', title: 'Peel-and-Stick CD Sleeve', price: '+₹25', desc: 'Adhesive clear pocket on back inside cover' },
                    { key: 'certificateLamination', title: 'Certificate Page Lamination', price: '+₹35', desc: 'Matte thermal lamination on first 2 sheets' },
                  ].map((ad) => {
                    const isChecked = customization.addOns[ad.key as keyof typeof customization.addOns];
                    return (
                      <TouchableOpacity
                        key={ad.key}
                        style={[styles.addOnCard, isChecked && styles.addOnCardChecked]}
                        onPress={() => handleAddOnToggle(ad.key as any)}
                        activeOpacity={0.8}
                      >
                        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                          {isChecked && <Check size={12} color={COLORS.white} strokeWidth={3} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.addOnTitleRow}>
                            <Text style={styles.addOnTitle}>{ad.title}</Text>
                            <Text style={styles.addOnPrice}>{ad.price}</Text>
                          </View>
                          <Text style={styles.addOnDesc}>{ad.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* STEP 5: QUANTITY */}
            {currentStep === 5 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 5: Select Number of Copies</Text>
                  <Text style={styles.stepSubtext}>
                    Order copies for yourself, your guide, department library, and external examiner.
                  </Text>
                </View>

                <View style={styles.quantityPickerBox}>
                  <Text style={styles.quantityLabel}>Total Copies Needed</Text>
                  <View style={styles.quantityStepper}>
                    <TouchableOpacity 
                      style={styles.stepperBtn}
                      onPress={() => updateCustomization({ copies: Math.max(1, customization.copies - 1) })}
                    >
                      <Minus size={18} color={COLORS.navy} />
                    </TouchableOpacity>
                    <Text style={styles.quantityCount}>{customization.copies}</Text>
                    <TouchableOpacity 
                      style={styles.stepperBtn}
                      onPress={() => updateCustomization({ copies: customization.copies + 1 })}
                    >
                      <Plus size={18} color={COLORS.navy} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Bulk Tier Discounts */}
                <View style={styles.bulkDiscountsBox}>
                  <Text style={styles.bulkDiscountsTitle}>Tiered Student Discounts</Text>
                  <View style={styles.bulkRow}>
                    <View style={[styles.bulkPill, customization.copies >= 2 && styles.bulkPillActive]}>
                      <Text style={styles.bulkPillText}>2 Copies: 5% Off</Text>
                    </View>
                    <View style={[styles.bulkPill, customization.copies >= 3 && styles.bulkPillActive]}>
                      <Text style={styles.bulkPillText}>3 Copies: 10% Off</Text>
                    </View>
                    <View style={[styles.bulkPill, customization.copies >= 5 && styles.bulkPillActive]}>
                      <Text style={styles.bulkPillText}>5+ Copies: 15% Off</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* STEP 6: SUMMARY & REVIEW */}
            {currentStep === 6 && (
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeading}>Step 6: Review Customization Summary</Text>
                  <Text style={styles.stepSubtext}>
                    Inspect your specifications before previewing your virtual book or placing your order.
                  </Text>
                </View>

                <View style={styles.summaryTable}>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Product</Text>
                    <Text style={styles.summaryTableVal}>{selectedProduct.name}</Text>
                  </View>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Paper & GSM</Text>
                    <Text style={styles.summaryTableVal}>{customization.paperSize} • {customization.paperGSM}</Text>
                  </View>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Print Mode</Text>
                    <Text style={styles.summaryTableVal}>{customization.printType} • {customization.printSides}</Text>
                  </View>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Binding & Foil</Text>
                    <Text style={styles.summaryTableVal}>{customization.binding} ({customization.cover.embossingFoil})</Text>
                  </View>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Document</Text>
                    <Text style={styles.summaryTableVal}>
                      {uploadedDocument ? uploadedDocument.name : 'Pending upload'}
                    </Text>
                  </View>
                  <View style={styles.summaryTableRow}>
                    <Text style={styles.summaryTableKey}>Copies</Text>
                    <Text style={styles.summaryTableVal}>{customization.copies} {customization.copies === 1 ? 'copy' : 'copies'}</Text>
                  </View>
                </View>

                {/* Virtual Book Preview CTA Button */}
                <TouchableOpacity 
                  style={styles.openBookPreviewBtn}
                  onPress={() => navigateTo('book_preview')}
                >
                  <Eye size={18} color={COLORS.white} />
                  <Text style={styles.openBookPreviewBtnText}>Inspect Virtual 3D Black Book</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Stepper Navigation Buttons */}
            <View style={styles.navRow}>
              {currentStep > 1 && (
                <TouchableOpacity 
                  style={styles.prevStepBtn}
                  onPress={() => setCurrentStep(currentStep - 1)}
                >
                  <ChevronLeft size={16} color={COLORS.navy} />
                  <Text style={styles.prevStepBtnText}>Back</Text>
                </TouchableOpacity>
              )}

              {currentStep < 6 ? (
                <TouchableOpacity 
                  style={styles.nextStepBtn}
                  onPress={() => setCurrentStep(currentStep + 1)}
                >
                  <Text style={styles.nextStepBtnText}>Next: {steps[currentStep].title}</Text>
                  <ChevronRight size={16} color={COLORS.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.addToCartFinalBtn}
                  onPress={addToCart}
                >
                  <Text style={styles.addToCartFinalBtnText}>Add to Cart • ₹{currentPrice.total}</Text>
                  <ArrowRight size={16} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Right / Sidebar: Live Dynamic Price Summary */}
          <View style={styles.sidebarSticky}>
            <View style={styles.priceSummaryCard}>
              <Text style={styles.priceSummaryTitle}>Live Price Breakdown</Text>
              <Text style={styles.priceSummarySub}>Updates instantly with each specification</Text>

              <View style={styles.priceLineRow}>
                <Text style={styles.priceLineKey}>Base Book ({selectedProduct.basePagesIncluded} pages)</Text>
                <Text style={styles.priceLineVal}>₹{currentPrice.basePrice}</Text>
              </View>

              {currentPrice.paperGsmExtra > 0 && (
                <View style={styles.priceLineRow}>
                  <Text style={styles.priceLineKey}>Paper Upgrade ({customization.paperGSM})</Text>
                  <Text style={styles.priceLineVal}>+₹{currentPrice.paperGsmExtra}</Text>
                </View>
              )}

              {currentPrice.bindingCost > 0 && (
                <View style={styles.priceLineRow}>
                  <Text style={styles.priceLineKey}>Binding Style Upgrade</Text>
                  <Text style={styles.priceLineVal}>+₹{currentPrice.bindingCost}</Text>
                </View>
              )}

              {currentPrice.addOnsCost > 0 && (
                <View style={styles.priceLineRow}>
                  <Text style={styles.priceLineKey}>Selected Add-ons</Text>
                  <Text style={styles.priceLineVal}>+₹{currentPrice.addOnsCost}</Text>
                </View>
              )}

              <View style={[styles.priceLineRow, styles.unitPriceRow]}>
                <Text style={styles.unitPriceKey}>Price Per Copy</Text>
                <Text style={styles.unitPriceVal}>₹{currentPrice.unitPrice}</Text>
              </View>

              <View style={styles.priceLineRow}>
                <Text style={styles.priceLineKey}>Copies: {customization.copies}</Text>
                <Text style={styles.priceLineVal}>₹{currentPrice.unitPrice * customization.copies}</Text>
              </View>

              {currentPrice.discount > 0 && (
                <View style={styles.priceLineRow}>
                  <Text style={[styles.priceLineKey, { color: COLORS.success }]}>Volume Discount</Text>
                  <Text style={[styles.priceLineVal, { color: COLORS.success }]}>-₹{currentPrice.discount}</Text>
                </View>
              )}

              <View style={styles.priceLineRow}>
                <Text style={styles.priceLineKey}>Estimated Doorstep Delivery</Text>
                <Text style={styles.priceLineVal}>
                  {currentPrice.deliveryFee === 0 ? 'FREE' : `₹${currentPrice.deliveryFee}`}
                </Text>
              </View>

              <View style={styles.priceLineRow}>
                <Text style={styles.priceLineKey}>GST (12% Academic Print)</Text>
                <Text style={styles.priceLineVal}>₹{currentPrice.gstTax}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>₹{currentPrice.total}</Text>
              </View>

              <TouchableOpacity 
                style={styles.sidebarAddToCartBtn}
                onPress={addToCart}
                activeOpacity={0.85}
              >
                <Text style={styles.sidebarAddToCartBtnText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sidebarPreviewBtn}
                onPress={() => navigateTo('book_preview')}
                activeOpacity={0.85}
              >
                <Eye size={15} color={COLORS.navy} />
                <Text style={styles.sidebarPreviewBtnText}>Virtual Book Preview</Text>
              </TouchableOpacity>

              <View style={styles.deliveryAssurance}>
                <Text style={styles.deliveryAssuranceText}>
                  Estimated delivery: 3–5 business days to your doorstep.
                </Text>
              </View>
            </View>
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
  stepperContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.sm,
  },
  stepperScroll: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    gap: SPACING.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  stepItemCurrent: {
    backgroundColor: '#FFF7ED',
  },
  stepItemCompleted: {},
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepBadgeCurrent: {
    backgroundColor: COLORS.darkOrange,
    borderColor: COLORS.darkOrange,
  },
  stepBadgeCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondaryText,
  },
  stepNumCurrent: {
    color: COLORS.white,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  stepTitleCurrent: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  stepSubtitle: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  scrollArea: {
    flex: 1,
  },
  bodyWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  configurationArea: {
    flex: 1,
    minWidth: 320,
  },
  stepCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  stepHeader: {
    marginBottom: SPACING.lg,
  },
  stepHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  stepSubtext: {
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
  productListGrid: {
    gap: SPACING.sm,
  },
  productOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    gap: SPACING.md,
  },
  productOptionCardSelected: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  prodThumb: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.sm,
  },
  prodInfo: {
    flex: 1,
  },
  prodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.navy,
  },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  selectedPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
  },
  prodTagline: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  prodPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkOrange,
    marginTop: 4,
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.borderDark,
    borderRadius: RADIUS.md,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceSubtle,
  },
  dropZoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: SPACING.sm,
  },
  dropZoneSub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  browseFilesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  browseFilesBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  uploadingState: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  uploadingText: {
    marginTop: SPACING.md,
    fontSize: 13,
    color: COLORS.navy,
    fontWeight: '600',
  },
  errorBanner: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.sm,
  },
  uploadedFileCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    backgroundColor: '#F8FAFC',
  },
  uploadedFileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  pdfIconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedFileMeta: {
    flex: 1,
  },
  uploadedFileName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
  },
  uploadedFileSize: {
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
    color: COLORS.success,
    fontWeight: '600',
  },
  uploadActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnSecondaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
  },
  actionBtnDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    marginLeft: 'auto',
  },
  actionBtnDeleteText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.error,
  },
  preflightNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: '#F0F9FF',
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.md,
  },
  preflightNoticeText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.oceanBlue,
    lineHeight: 17,
  },
  fieldSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  optionsRow: {
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  optionsGrid: {
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  specOptionPill: {
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  specOptionPillActive: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  specOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  specOptionTitleActive: {
    color: COLORS.navy,
  },
  specOptionDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  swatchesRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginVertical: SPACING.sm,
  },
  swatchGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleActive: {
    borderColor: COLORS.darkOrange,
    transform: [{ scale: 1.1 }],
  },
  foilBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  foilBadgeActive: {
    borderColor: COLORS.navy,
    backgroundColor: '#F1F5F9',
  },
  foilMiniDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  foilBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  inputWrap: {
    width: '100%',
  },
  inputWrapHalf: {
    flex: 1,
    minWidth: 150,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.primaryText,
    backgroundColor: COLORS.surface,
  },
  addOnsGrid: {
    gap: SPACING.xs,
    marginTop: 4,
  },
  addOnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  addOnCardChecked: {
    borderColor: COLORS.darkOrange,
    backgroundColor: '#FFF7ED',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.xs,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.darkOrange,
    borderColor: COLORS.darkOrange,
  },
  addOnTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addOnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  addOnPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  addOnDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  quantityPickerBox: {
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  quantityStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  stepperBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityCount: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    minWidth: 40,
    textAlign: 'center',
  },
  bulkDiscountsBox: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  bulkDiscountsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  bulkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  bulkPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bulkPillActive: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.success,
  },
  bulkPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  summaryTable: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  summaryTableRow: {
    flexDirection: 'row',
    padding: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  summaryTableKey: {
    width: 140,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  summaryTableVal: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  openBookPreviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  openBookPreviewBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  prevStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  prevStepBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  nextStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    marginLeft: 'auto',
  },
  nextStepBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  addToCartFinalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    marginLeft: 'auto',
  },
  addToCartFinalBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  // Sidebar Sticky Styles
  sidebarSticky: {
    width: 320,
  },
  priceSummaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  priceSummaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
  },
  priceSummarySub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  priceLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLineKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  priceLineVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  unitPriceRow: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.borderLight,
    marginVertical: 6,
  },
  unitPriceKey: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  unitPriceVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.navy,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.darkOrange,
  },
  sidebarAddToCartBtn: {
    backgroundColor: COLORS.darkOrange,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  sidebarAddToCartBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  sidebarPreviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
  },
  sidebarPreviewBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  deliveryAssurance: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  deliveryAssuranceText: {
    fontSize: 11,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 16,
  },
});
