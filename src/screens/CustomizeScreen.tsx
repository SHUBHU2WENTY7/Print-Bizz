import React, { useState, useRef, useEffect } from 'react';
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
  Trash2, 
  Eye, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Lock
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
    addToCart,
    userProfile 
  } = useAppStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync profile details if available
  useEffect(() => {
    if (userProfile.isRegistered && !customization.cover.studentName) {
      updateCustomization((prev) => ({
        cover: {
          ...prev.cover,
          studentName: userProfile.name,
          collegeName: userProfile.college,
          university: userProfile.university,
          rollNumber: userProfile.rollNumber,
        },
      }));
    }
  }, [userProfile, customization.cover.studentName, updateCustomization]);

  // Step fulfillment validation
  const isStep1Fulfilled = Boolean(selectedProduct && selectedProduct.id);
  const isStep2Fulfilled = Boolean(uploadedDocument);
  const isStep3Fulfilled = Boolean(customization.paperSize && customization.paperGSM && customization.printType);
  const isStep4Fulfilled = Boolean(
    customization.cover.studentName?.trim() && 
    customization.cover.collegeName?.trim() && 
    customization.cover.projectTitle?.trim()
  );
  const isStep5Fulfilled = Boolean(customization.copies >= 1);

  const isAllStepsFulfilled = isStep1Fulfilled && isStep2Fulfilled && isStep3Fulfilled && isStep4Fulfilled && isStep5Fulfilled;

  const isStepFulfilled = (num: number) => {
    if (num === 1) return isStep1Fulfilled;
    if (num === 2) return isStep2Fulfilled;
    if (num === 3) return isStep3Fulfilled;
    if (num === 4) return isStep4Fulfilled;
    if (num === 5) return isStep5Fulfilled;
    if (num === 6) return isAllStepsFulfilled;
    return false;
  };

  const pendingRequirements: { step: number; label: string }[] = [];
  if (!isStep2Fulfilled) pendingRequirements.push({ step: 2, label: 'Upload your genuine project document (PDF/Word)' });
  if (!isStep4Fulfilled) pendingRequirements.push({ step: 4, label: 'Complete cover details (Student Name, College & Title)' });

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
            const isCompleted = isStepFulfilled(st.num);
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

                {/* Image 6 Upload UI Design */}
                <View style={styles.image6UploadContainer}>
                  <View 
                    style={[
                      styles.image6DashedBox,
                      isDragOver && styles.image6DashedBoxActive
                    ]}
                    {...({
                      onDragOver: (e: any) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      },
                      onDragLeave: () => setIsDragOver(false),
                      onDrop: (e: any) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        const dropped = e.dataTransfer?.files?.[0];
                        if (dropped) handleFileSelected(dropped);
                      }
                    } as any)}
                  >
                    {/* Layered Card Graphic with Arrow */}
                    <View style={styles.layeredIconWrap}>
                      <View style={styles.layeredIconBack} />
                      <View style={styles.layeredIconFront}>
                        <UploadCloud size={20} color="#CBD5E1" />
                      </View>
                    </View>

                    <Text style={styles.image6UploadTitle}>Click to upload or drop files</Text>
                    <Text style={styles.image6UploadSub}>PDF, DOC/DOCX, XLSX, CSV, PNG, or JPG</Text>

                    <TouchableOpacity 
                      style={styles.image6BrowseBtn}
                      onPress={() => {
                        if (Platform.OS === 'web') fileInputRef.current?.click();
                      }}
                      activeOpacity={0.8}
                    >
                      <UploadCloud size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.image6BrowseBtnText}>Browse files</Text>
                    </TouchableOpacity>

                    {isUploading && (
                      <View style={styles.image6UploadingIndicator}>
                        <ActivityIndicator size="small" color="#F59E0B" />
                        <Text style={styles.image6UploadingText}>Analyzing manuscript & preflight margins...</Text>
                      </View>
                    )}
                    {uploadError && <Text style={styles.image6ErrorText}>{uploadError}</Text>}
                  </View>

                  {/* Uploaded File Pill Card matching Image 6 */}
                  {uploadedDocument ? (
                    <View style={styles.image6FileCard}>
                      <View style={styles.image6FileLeft}>
                        <View style={styles.image6FileIconWrap}>
                          <FileText size={18} color="#94A3B8" />
                        </View>
                        <View style={{ flex: 1, paddingRight: 8 }}>
                          <Text style={styles.image6FileName} numberOfLines={1}>{uploadedDocument.name}</Text>
                          <Text style={styles.image6FileMeta}>
                            {uploadedDocument.fileType?.toUpperCase() || 'PDF'} • {(uploadedDocument.size / 1024).toFixed(1)} KB • {uploadedDocument.pageCount} Pages
                          </Text>
                        </View>
                      </View>
                      <View style={styles.image6RightWrap}>
                        <View style={styles.image6ReadyBadge}>
                          <Text style={styles.image6ReadyBadgeText}>Ready</Text>
                        </View>
                        <TouchableOpacity 
                          style={styles.image6RemoveBtn}
                          onPress={() => setUploadedDocument(null)}
                        >
                          <Trash2 size={13} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </View>

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

                {/* Requirements Fulfillment Warning Card */}
                {!isAllStepsFulfilled && (
                  <View style={styles.requirementsLockBox}>
                    <View style={styles.requirementsLockHeader}>
                      <Lock size={16} color={COLORS.darkOrange} />
                      <Text style={styles.requirementsLockTitle}>
                        Steps Required Before Ordering & Previewing
                      </Text>
                    </View>
                    <Text style={styles.requirementsLockSub}>
                      All university guidelines require complete project metadata and a verified document file:
                    </Text>
                    <View style={styles.requirementsList}>
                      {pendingRequirements.map((req) => (
                        <TouchableOpacity
                          key={req.step}
                          style={styles.pendingReqItem}
                          onPress={() => setCurrentStep(req.step)}
                          activeOpacity={0.8}
                        >
                          <AlertCircle size={14} color={COLORS.darkOrange} />
                          <Text style={styles.pendingReqText}>{req.label}</Text>
                          <Text style={styles.pendingReqJump}>Go to Step {req.step} ➔</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Virtual Book Preview CTA Button */}
                <TouchableOpacity 
                  style={[
                    styles.openBookPreviewBtn,
                    !isAllStepsFulfilled && styles.buttonDisabledLocked
                  ]}
                  onPress={isAllStepsFulfilled ? () => navigateTo('book_preview') : undefined}
                  disabled={!isAllStepsFulfilled}
                  activeOpacity={isAllStepsFulfilled ? 0.85 : 1}
                >
                  {isAllStepsFulfilled ? (
                    <>
                      <Eye size={18} color={COLORS.white} />
                      <Text style={styles.openBookPreviewBtnText}>Inspect Virtual 3D Black Book</Text>
                    </>
                  ) : (
                    <>
                      <Lock size={16} color="#94A3B8" />
                      <Text style={styles.buttonDisabledText}>
                        Live 3D Preview (Complete all steps to unlock)
                      </Text>
                    </>
                  )}
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
                  style={[
                    styles.addToCartFinalBtn,
                    !isAllStepsFulfilled && styles.buttonDisabledLocked
                  ]}
                  onPress={isAllStepsFulfilled ? addToCart : undefined}
                  disabled={!isAllStepsFulfilled}
                  activeOpacity={isAllStepsFulfilled ? 0.85 : 1}
                >
                  {isAllStepsFulfilled ? (
                    <>
                      <Text style={styles.addToCartFinalBtnText}>Add to Cart • ₹{currentPrice.total}</Text>
                      <ArrowRight size={16} color={COLORS.white} />
                    </>
                  ) : (
                    <>
                      <Lock size={16} color="#94A3B8" />
                      <Text style={styles.buttonDisabledText}>
                        Add to Cart (Complete all steps)
                      </Text>
                    </>
                  )}
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

              {!isAllStepsFulfilled && (
                <View style={styles.sidebarLockNotice}>
                  <Lock size={13} color={COLORS.darkOrange} />
                  <Text style={styles.sidebarLockNoticeText}>
                    {!isStep2Fulfilled ? 'Upload document required' : 'Cover details required'}
                  </Text>
                </View>
              )}

              <TouchableOpacity 
                style={[
                  styles.sidebarAddToCartBtn,
                  !isAllStepsFulfilled && styles.buttonDisabledLocked
                ]}
                onPress={isAllStepsFulfilled ? addToCart : undefined}
                disabled={!isAllStepsFulfilled}
                activeOpacity={isAllStepsFulfilled ? 0.85 : 1}
              >
                {isAllStepsFulfilled ? (
                  <Text style={styles.sidebarAddToCartBtnText}>Add to Cart</Text>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Lock size={14} color="#94A3B8" />
                    <Text style={styles.buttonDisabledText}>Add to Cart (Locked)</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.sidebarPreviewBtn,
                  !isAllStepsFulfilled && styles.buttonDisabledLocked
                ]}
                onPress={isAllStepsFulfilled ? () => navigateTo('book_preview') : undefined}
                disabled={!isAllStepsFulfilled}
                activeOpacity={isAllStepsFulfilled ? 0.85 : 1}
              >
                {isAllStepsFulfilled ? (
                  <>
                    <Eye size={15} color={COLORS.navy} />
                    <Text style={styles.sidebarPreviewBtnText}>Virtual Book Preview</Text>
                  </>
                ) : (
                  <>
                    <Lock size={14} color="#94A3B8" />
                    <Text style={styles.buttonDisabledText}>Live Preview (Locked)</Text>
                  </>
                )}
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
  // Requirements Lock & Incomplete State Styles
  requirementsLockBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  requirementsLockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  requirementsLockTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#9A3412',
  },
  requirementsLockSub: {
    fontSize: 11,
    color: '#7C2D12',
    lineHeight: 16,
    marginBottom: SPACING.sm,
  },
  requirementsList: {
    gap: 6,
  },
  pendingReqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: '#FDBA74',
    gap: 6,
  },
  pendingReqText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
  },
  pendingReqJump: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  buttonDisabledLocked: {
    backgroundColor: '#E2E8F0',
    borderColor: '#CBD5E1',
    opacity: 0.85,
  },
  buttonDisabledText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  sidebarLockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginTop: SPACING.md,
  },
  sidebarLockNoticeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9A3412',
    flex: 1,
  },
  // Image 6 Upload UI Styles
  image6UploadContainer: {
    backgroundColor: '#0F131A',
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: SPACING.md,
  },
  image6DashedBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#334155',
    borderRadius: RADIUS.md,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image6DashedBoxActive: {
    borderColor: COLORS.darkOrange,
    backgroundColor: 'rgba(234, 88, 12, 0.05)',
  },
  layeredIconWrap: {
    width: 44,
    height: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  layeredIconBack: {
    position: 'absolute',
    width: 32,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#475569',
    backgroundColor: '#1E293B',
    transform: [{ rotate: '-8deg' }],
  },
  layeredIconFront: {
    width: 32,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#64748B',
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image6UploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  image6UploadSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 14,
    textAlign: 'center',
  },
  image6BrowseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  image6BrowseBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  image6UploadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  image6UploadingText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '600',
  },
  image6ErrorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 8,
  },
  image6FileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161E2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
  },
  image6FileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  image6FileIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image6FileName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  image6FileMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  image6RightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image6ReadyBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#334155',
  },
  image6ReadyBadgeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  image6RemoveBtn: {
    padding: 4,
  },
});
