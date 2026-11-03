import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { StickyActionBar } from '../components/StickyActionBar';
import { api } from '../services/apiService';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Sliders, 
  BookMarked, 
  Palette, 
  Layers, 
  Plus, 
  Minus, 
  Check, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react-native';

export const CustomizeScreen: React.FC = () => {
  const { 
    selectedProduct, 
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

  const [activeTab, setActiveTab] = useState<'specs' | 'cover' | 'addons'>('specs');

  // Simulated PDF Document Picker
  const handlePickDocument = async () => {
    setIsUploading(true);
    try {
      const mockSampleFiles = [
        { name: 'Final_Capstone_Thesis_VJTI_2026.pdf', size: 5.2 * 1024 * 1024 },
        { name: 'BlackBook_AI_SupplyChain_Draft_v4.pdf', size: 7.8 * 1024 * 1024 },
        { name: 'Engineering_Project_Report_Final.pdf', size: 4.1 * 1024 * 1024 },
      ];
      const picked = mockSampleFiles[Math.floor(Math.random() * mockSampleFiles.length)];
      const uploaded = await api.uploadPdfFile(picked);
      setUploadedDocument(uploaded);
    } catch (err) {
      alert('Upload failed. Please ensure file is a valid PDF under 50MB.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveDoc = () => {
    setUploadedDocument(null);
  };

  const handleCoverChange = (field: keyof typeof customization.cover, val: string) => {
    updateCustomization({
      cover: {
        ...customization.cover,
        [field]: val,
      },
    });
  };

  const handleAddOnToggle = (addonKey: keyof typeof customization.addOns) => {
    updateCustomization({
      addOns: {
        ...customization.addOns,
        [addonKey]: !customization.addOns[addonKey],
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Header Title & Product Info */}
          <View style={styles.headerBanner}>
            <Text style={styles.productTag}>{selectedProduct.name}</Text>
            <Text style={styles.screenHeading}>Customization Studio</Text>
            <Text style={styles.screenSubheading}>
              Configure your Black Book to exact university guidelines. Instant dynamic pricing.
            </Text>
          </View>

          {/* SECTION A: DOCUMENT UPLOAD (Prioritized PDF Support) */}
          <View style={styles.cardSection}>
            <View style={styles.cardSectionHeader}>
              <View style={styles.iconCircle}>
                <UploadCloud size={20} color={COLORS.navy} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Section A — Document Upload</Text>
                <Text style={styles.sectionSubtitle}>PDF files only (Strict vector & font embedding check)</Text>
              </View>
            </View>

            {uploadedDocument ? (
              <View style={styles.uploadedDocCard}>
                <View style={styles.docRow}>
                  <View style={styles.pdfIconWrap}>
                    <FileText size={28} color={COLORS.darkOrange} />
                  </View>
                  <View style={styles.docInfo}>
                    <Text style={styles.docName} numberOfLines={1}>{uploadedDocument.name}</Text>
                    <Text style={styles.docMeta}>
                      {(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB • {uploadedDocument.pageCount} Pages ({uploadedDocument.colorPageCount} Color, {uploadedDocument.bwPageCount} B&W)
                    </Text>
                    <View style={styles.verifiedRow}>
                      <CheckCircle2 size={13} color={COLORS.success} />
                      <Text style={styles.verifiedText}>Preflight Passed: A4 Margins Validated</Text>
                    </View>
                  </View>
                </View>

                {/* Document Actions */}
                <View style={styles.docActionsRow}>
                  <TouchableOpacity 
                    style={styles.docActionBtn}
                    onPress={() => navigateTo('document_preview')}
                  >
                    <Eye size={15} color={COLORS.oceanBlue} />
                    <Text style={styles.docActionBtnText}>Preview PDF</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.docActionBtn}
                    onPress={handlePickDocument}
                  >
                    <RefreshCw size={15} color={COLORS.navy} />
                    <Text style={[styles.docActionBtnText, { color: COLORS.navy }]}>Replace</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.docActionBtn, styles.removeBtn]}
                    onPress={handleRemoveDoc}
                  >
                    <Trash2 size={15} color={COLORS.error} />
                    <Text style={[styles.docActionBtnText, { color: COLORS.error }]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.uploadDropzone}
                onPress={handlePickDocument}
                activeOpacity={0.8}
                disabled={isUploading}
              >
                {isUploading ? (
                  <View style={styles.uploadingBox}>
                    <RefreshCw size={24} color={COLORS.oceanBlue} />
                    <Text style={styles.uploadingText}>Scanning PDF & calculating pages...</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.uploadIconBubble}>
                      <UploadCloud size={30} color={COLORS.oceanBlue} />
                    </View>
                    <Text style={styles.uploadTitle}>Tap to Upload Project PDF</Text>
                    <Text style={styles.uploadDesc}>
                      Supports PDF up to 50MB. Auto-detects total pages and color charts.
                    </Text>
                    <View style={styles.uploadBtnPlaceholder}>
                      <Text style={styles.uploadBtnText}>Select PDF File</Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Navigation Sub-Tabs: Specs vs Cover vs Add-ons */}
          <View style={styles.tabsBar}>
            {[
              { id: 'specs', label: '1. Print Specifications' },
              { id: 'cover', label: '2. Cover & Embossing' },
              { id: 'addons', label: '3. Add-Ons & Finishing' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.subTab, activeTab === tab.id && styles.subTabActive]}
                onPress={() => setActiveTab(tab.id as any)}
              >
                <Text style={[styles.subTabText, activeTab === tab.id && styles.subTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TAB 1: PRINT SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <View style={styles.specificationsStack}>
              {/* SECTION B: PAPER SIZE */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION B — PAPER SIZE</Text>
                <View style={styles.singleChoiceRow}>
                  <View style={[styles.choiceCard, styles.choiceCardSelected]}>
                    <View style={styles.choiceHeader}>
                      <Text style={styles.choiceTitle}>Standard A4 (210 x 297 mm)</Text>
                      <Check size={16} color={COLORS.oceanBlue} />
                    </View>
                    <Text style={styles.choiceDesc}>
                      Configured manufacturing standard for all university Black Book submissions.
                    </Text>
                  </View>
                </View>
              </View>

              {/* SECTION C: PAPER QUALITY (GSM) */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION C — PAPER QUALITY (GSM)</Text>
                <View style={styles.optionsList}>
                  {[
                    { gsm: '75 GSM Standard', extra: '+₹0', desc: 'Lightweight crisp paper, suitable for drafts & standard reports' },
                    { gsm: '80 GSM Bond', extra: '+₹25/copy', desc: 'University recommended bond paper with zero show-through' },
                    { gsm: '100 GSM Executive', extra: '+₹55/copy', desc: 'Heavyweight smooth executive finish, archival quality' },
                    { gsm: '120 GSM Royal', extra: '+₹95/copy', desc: 'Ultra-luxurious heavyweight paper for VIP external examiners' },
                  ].map((item) => {
                    const isSelected = customization.paperGSM === item.gsm;
                    return (
                      <TouchableOpacity
                        key={item.gsm}
                        style={[styles.optionRowCard, isSelected && styles.optionRowCardSelected]}
                        onPress={() => updateCustomization({ paperGSM: item.gsm as any })}
                      >
                        <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.optionTitleRow}>
                            <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
                              {item.gsm}
                            </Text>
                            <Text style={styles.optionExtraPrice}>{item.extra}</Text>
                          </View>
                          <Text style={styles.optionDesc}>{item.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* SECTION D: PRINT TYPE */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION D — PRINT TYPE</Text>
                <View style={styles.optionsGrid}>
                  {[
                    { type: 'Black & White', desc: 'Deep black carbon laser prints for text and tables' },
                    { type: 'Mixed (B&W + Colour)', desc: 'Smart split: charts & images in color, rest in B&W' },
                    { type: 'Full Colour', desc: 'Full high-definition digital laser press color throughout' },
                  ].map((item) => {
                    const isSelected = customization.printType === item.type;
                    return (
                      <TouchableOpacity
                        key={item.type}
                        style={[styles.gridOptionCard, isSelected && styles.gridOptionCardSelected]}
                        onPress={() => updateCustomization({ printType: item.type as any })}
                      >
                        <View style={styles.gridOptionHeader}>
                          <Text style={[styles.gridOptionTitle, isSelected && styles.gridOptionTitleSelected]}>
                            {item.type}
                          </Text>
                          {isSelected && <Check size={16} color={COLORS.navy} />}
                        </View>
                        <Text style={styles.gridOptionDesc}>{item.desc}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* SECTION E: PRINT SIDES */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION E — PRINT SIDES</Text>
                <View style={styles.twoColumnRow}>
                  {[
                    { sides: 'Double-Sided (Recommended)', desc: 'Standard book format. Saves volume & spine bulk.' },
                    { sides: 'Single-Sided', desc: 'Single face printing for specific institutional requests.' },
                  ].map((item) => {
                    const isSelected = customization.printSides === item.sides;
                    return (
                      <TouchableOpacity
                        key={item.sides}
                        style={[styles.halfCard, isSelected && styles.halfCardSelected]}
                        onPress={() => updateCustomization({ printSides: item.sides as any })}
                      >
                        <View style={styles.gridOptionHeader}>
                          <Text style={[styles.gridOptionTitle, isSelected && styles.gridOptionTitleSelected]}>
                            {item.sides}
                          </Text>
                          {isSelected && <Check size={16} color={COLORS.navy} />}
                        </View>
                        <Text style={styles.gridOptionDesc}>{item.desc}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* SECTION F: PAGE SELECTION */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION F — PAGE SELECTION</Text>
                <View style={styles.pillSelectorRow}>
                  {['All Pages', 'Custom Page Range'].map((p) => {
                    const isSelected = customization.pageSelection === p;
                    return (
                      <TouchableOpacity
                        key={p}
                        style={[styles.pillBtn, isSelected && styles.pillBtnSelected]}
                        onPress={() => updateCustomization({ pageSelection: p as any })}
                      >
                        <Text style={[styles.pillBtnText, isSelected && styles.pillBtnTextSelected]}>
                          {p}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {customization.pageSelection === 'Custom Page Range' && (
                  <View style={styles.customRangeInputWrap}>
                    <Text style={styles.inputLabel}>Enter page range (e.g., 1-45, 48, 52-80):</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.customPageRange}
                      onChangeText={(val) => updateCustomization({ customPageRange: val })}
                      placeholder="e.g. 1-80"
                      placeholderTextColor={COLORS.mutedText}
                    />
                  </View>
                )}
              </View>

              {/* SECTION H: BINDING & FOIL */}
              <View style={styles.cardSection}>
                <Text style={styles.groupLabel}>SECTION H — BINDING & EMBOSSING FINISH</Text>
                <View style={styles.optionsList}>
                  {[
                    { bind: 'Golden Embossed Hardcover (Standard)', extra: '+₹0', badge: 'University Standard' },
                    { bind: 'Silver Foil Embossed Hardcover', extra: '+₹30', badge: 'Sleek Metallic' },
                    { bind: 'Premium Leatherette Rexine', extra: '+₹110', badge: 'Handcrafted Deluxe' },
                    { bind: 'Executive Matte Obsidian', extra: '+₹140', badge: 'Masterpiece Capstone' },
                  ].map((item) => {
                    const isSelected = customization.binding === item.bind;
                    return (
                      <TouchableOpacity
                        key={item.bind}
                        style={[styles.bindingCard, isSelected && styles.bindingCardSelected]}
                        onPress={() => updateCustomization({ binding: item.bind as any })}
                      >
                        <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.optionTitleRow}>
                            <Text style={[styles.bindingTitle, isSelected && styles.bindingTitleSelected]}>
                              {item.bind}
                            </Text>
                            <Text style={styles.optionExtraPrice}>{item.extra}</Text>
                          </View>
                          <View style={styles.bindingBadge}>
                            <Text style={styles.bindingBadgeText}>{item.badge}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          )}

          {/* TAB 2: COVER CUSTOMIZATION */}
          {activeTab === 'cover' && (
            <View style={styles.cardSection}>
              <View style={styles.cardSectionHeader}>
                <View style={styles.iconCircle}>
                  <Palette size={20} color={COLORS.navy} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>Section I — Cover Stamping Details</Text>
                  <Text style={styles.sectionSubtitle}>
                    Heated brass stamp die imprints directly onto front cover & spine.
                  </Text>
                </View>
              </View>

              {/* Cover Color & Foil Swatches */}
              <View style={styles.coverColorBlock}>
                <Text style={styles.inputLabel}>Cover Rexine Material</Text>
                <View style={styles.swatchSelectorRow}>
                  {[
                    { label: 'Classic Midnight Black', hex: '#111827' },
                    { label: 'Royal Navy Blue', hex: '#10233F' },
                    { label: 'Deep Maroon', hex: '#581C87' },
                  ].map((col) => {
                    const isSel = customization.cover.coverColor === col.label;
                    return (
                      <TouchableOpacity
                        key={col.label}
                        style={[styles.colorChip, isSel && styles.colorChipSelected]}
                        onPress={() => handleCoverChange('coverColor', col.label as any)}
                      >
                        <View style={[styles.colorSquare, { backgroundColor: col.hex }]} />
                        <Text style={[styles.colorChipText, isSel && styles.colorChipTextSelected]}>
                          {col.label.split(' ')[0]} {col.label.split(' ')[1]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Cover Input Fields */}
              <View style={styles.formFields}>
                <View style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>Project Title *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={customization.cover.projectTitle}
                    onChangeText={(val) => handleCoverChange('projectTitle', val)}
                    placeholder="e.g. AI-Powered Autonomous Drone Navigation"
                  />
                </View>

                <View style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>Student Full Name(s) *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={customization.cover.studentName}
                    onChangeText={(val) => handleCoverChange('studentName', val)}
                    placeholder="e.g. Aarav Sharma, Priya Patel"
                  />
                </View>

                <View style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>College / Institute Name *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={customization.cover.collegeName}
                    onChangeText={(val) => handleCoverChange('collegeName', val)}
                    placeholder="e.g. Veermata Jijabai Technological Institute (VJTI)"
                  />
                </View>

                <View style={styles.twoColumnRow}>
                  <View style={[styles.fieldItem, { flex: 1 }]}>
                    <Text style={styles.fieldLabel}>Degree & Branch</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.degreeBranch}
                      onChangeText={(val) => handleCoverChange('degreeBranch', val)}
                      placeholder="e.g. B.Tech Computer Engg"
                    />
                  </View>

                  <View style={[styles.fieldItem, { flex: 1 }]}>
                    <Text style={styles.fieldLabel}>Academic Year</Text>
                    <TextInput
                      style={styles.textInput}
                      value={customization.cover.academicYear}
                      onChangeText={(val) => handleCoverChange('academicYear', val)}
                      placeholder="e.g. 2025-2026"
                    />
                  </View>
                </View>

                <View style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>Project Guide / Mentor Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={customization.cover.guideName}
                    onChangeText={(val) => handleCoverChange('guideName', val)}
                    placeholder="e.g. Dr. Ramesh Kulkarni, Professor"
                  />
                </View>

                <View style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>Spine Embossing Text</Text>
                  <TextInput
                    style={styles.textInput}
                    value={customization.cover.spineText}
                    onChangeText={(val) => handleCoverChange('spineText', val)}
                    placeholder="e.g. B.TECH THESIS - AARAV SHARMA - 2026"
                  />
                  <Text style={styles.fieldHelper}>
                    Spine is embossed in matching gold foil for books over 60 pages.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* TAB 3: ADD-ONS */}
          {activeTab === 'addons' && (
            <View style={styles.cardSection}>
              <View style={styles.cardSectionHeader}>
                <View style={styles.iconCircle}>
                  <Sparkles size={20} color={COLORS.navy} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>Section J — Optional Add-Ons</Text>
                  <Text style={styles.sectionSubtitle}>
                    Enhance presentation quality and protect your submission document.
                  </Text>
                </View>
              </View>

              <View style={styles.optionsList}>
                {[
                  {
                    key: 'butterPaperInserts',
                    name: 'Butter Paper Interleaving',
                    price: '+₹30',
                    desc: 'Translucent acid-free sheets inserted before Certificate and Approval pages.',
                  },
                  {
                    key: 'goldCornerProtectors',
                    name: 'Gold Brass Corner Protectors',
                    price: '+₹40',
                    desc: 'Four reinforced metallic brass corner tabs protecting hard edges from dings.',
                  },
                  {
                    key: 'ribbonBookmark',
                    name: 'Silk Ribbon Bookmark',
                    price: '+₹20',
                    desc: 'Woven golden silk ribbon bound into spine for easy chapter referencing during viva.',
                  },
                  {
                    key: 'cdPocketSleeve',
                    name: 'Rear CD/DVD Pocket Sleeve',
                    price: '+₹25',
                    desc: 'Crystal-clear adhesive plastic sleeve on rear inner cover for code repository disc.',
                  },
                  {
                    key: 'certificateLamination',
                    name: 'Color Certificate Thermal Lamination',
                    price: '+₹35',
                    desc: 'Thermal matte gloss protective film on College Guide Signoff & Plagiarism reports.',
                  },
                  {
                    key: 'hardcoverWaterproofing',
                    name: 'Weatherproof Nano-Seal Coating',
                    price: '+₹45',
                    desc: 'Invisible hydrophobic barrier protecting rexine from humidity and transport rain.',
                  },
                ].map((addon) => {
                  const isChecked = !!customization.addOns[addon.key as keyof typeof customization.addOns];
                  return (
                    <TouchableOpacity
                      key={addon.key}
                      style={[styles.addonRow, isChecked && styles.addonRowChecked]}
                      onPress={() => handleAddOnToggle(addon.key as any)}
                    >
                      <View style={[styles.checkboxBox, isChecked && styles.checkboxBoxChecked]}>
                        {isChecked && <Check size={14} color={COLORS.white} />}
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.optionTitleRow}>
                          <Text style={[styles.addonName, isChecked && styles.addonNameChecked]}>
                            {addon.name}
                          </Text>
                          <Text style={styles.addonPrice}>{addon.price}</Text>
                        </View>
                        <Text style={styles.addonDesc}>{addon.desc}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Dynamic Price Summary Box */}
          <View style={styles.pricingSummaryBox}>
            <View style={styles.pricingSummaryHeader}>
              <Text style={styles.pricingTitle}>Dynamic Price Breakdown</Text>
              <View style={styles.goaThaneBadge}>
                <Text style={styles.goaThaneBadgeText}>Goa Press ➔ Thane Hub</Text>
              </View>
            </View>

            <View style={styles.priceLine}>
              <Text style={styles.priceLabel}>Base Black Book ({selectedProduct.basePagesIncluded} pages included)</Text>
              <Text style={styles.priceVal}>₹{currentPrice.basePrice}</Text>
            </View>

            {currentPrice.paperGsmExtra > 0 && (
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>{customization.paperGSM}</Text>
                <Text style={styles.priceVal}>+₹{currentPrice.paperGsmExtra}</Text>
              </View>
            )}

            {currentPrice.bindingCost > 0 && (
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>{customization.binding}</Text>
                <Text style={styles.priceVal}>+₹{currentPrice.bindingCost}</Text>
              </View>
            )}

            {currentPrice.addOnsCost > 0 && (
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>Selected Add-ons</Text>
                <Text style={styles.priceVal}>+₹{currentPrice.addOnsCost}</Text>
              </View>
            )}

            <View style={styles.priceLine}>
              <Text style={styles.priceLabel}>Single Copy Unit Rate</Text>
              <Text style={[styles.priceVal, { fontWeight: '700' }]}>₹{currentPrice.unitPrice}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceLine}>
              <Text style={styles.priceLabel}>Subtotal ({currentPrice.copies} copies)</Text>
              <Text style={styles.priceVal}>₹{currentPrice.subtotal + currentPrice.discount}</Text>
            </View>

            {currentPrice.discount > 0 && (
              <View style={styles.priceLine}>
                <Text style={[styles.priceLabel, { color: COLORS.success }]}>Multi-Copy Volume Discount</Text>
                <Text style={[styles.priceVal, { color: COLORS.success }]}>-₹{currentPrice.discount}</Text>
              </View>
            )}

            <View style={styles.priceLine}>
              <Text style={styles.priceLabel}>Thane to Mumbai Doorstep Delivery</Text>
              <Text style={[styles.priceVal, currentPrice.deliveryFee === 0 && { color: COLORS.success }]}>
                {currentPrice.deliveryFee === 0 ? 'FREE (Orders > ₹699)' : `₹${currentPrice.deliveryFee}`}
              </Text>
            </View>

            <View style={styles.priceLine}>
              <Text style={styles.priceLabel}>GST (12% Printing Services)</Text>
              <Text style={styles.priceVal}>₹{currentPrice.gstTax}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Estimated Cost</Text>
              <Text style={styles.totalAmount}>₹{currentPrice.total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM ACTION BAR (Reference 4) */}
      <StickyActionBar 
        actionTitle="Add to Cart" 
        onActionPress={addToCart} 
        showQuantity={true}
      />
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
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  headerBanner: {
    marginBottom: SPACING.base,
  },
  productTag: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.darkOrange,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  screenHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  screenSubheading: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 4,
    lineHeight: 18,
  },
  cardSection: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.oceanBlue,
    letterSpacing: 0.6,
    marginBottom: SPACING.sm,
  },
  uploadDropzone: {
    borderWidth: 2,
    borderColor: COLORS.oceanBlue,
    borderStyle: 'dashed',
    borderRadius: RADIUS.lg,
    backgroundColor: '#F8FBFC',
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadingBox: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  uploadingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.oceanBlue,
  },
  uploadIconBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
  },
  uploadDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 320,
    lineHeight: 16,
  },
  uploadBtnPlaceholder: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    marginTop: SPACING.md,
  },
  uploadBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  uploadedDocCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  pdfIconWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '800',
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
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
  },
  docActionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  docActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  docActionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  removeBtn: {
    marginLeft: 'auto',
  },
  tabsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  subTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  subTabActive: {
    backgroundColor: COLORS.navy,
  },
  subTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  subTabTextActive: {
    color: COLORS.white,
    fontWeight: '800',
  },
  specificationsStack: {
    gap: SPACING.base,
  },
  singleChoiceRow: {
    marginTop: 2,
  },
  choiceCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  choiceCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  choiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  choiceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  choiceDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },
  optionsList: {
    gap: SPACING.sm,
  },
  optionRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  optionRowCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.navy,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.navy,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.navy,
  },
  optionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  optionNameSelected: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  optionExtraPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.darkOrange,
  },
  optionDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  optionsGrid: {
    gap: SPACING.sm,
  },
  gridOptionCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  gridOptionCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.navy,
  },
  gridOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  gridOptionTitleSelected: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  gridOptionDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    lineHeight: 15,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  halfCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  halfCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.navy,
  },
  pillSelectorRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  pillBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  pillBtnSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  pillBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  pillBtnTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  customRangeInputWrap: {
    marginTop: SPACING.sm,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.navy,
  },
  bindingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  bindingCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.navy,
  },
  bindingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  bindingTitleSelected: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  bindingBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 35, 63, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginTop: 4,
  },
  bindingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.navy,
  },
  coverColorBlock: {
    marginBottom: SPACING.base,
  },
  swatchSelectorRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  colorChipSelected: {
    borderColor: COLORS.navy,
    backgroundColor: COLORS.lightBlue,
  },
  colorSquare: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  colorChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  colorChipTextSelected: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  formFields: {
    gap: SPACING.md,
  },
  fieldItem: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  fieldHelper: {
    fontSize: 10,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  addonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  addonRowChecked: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkboxBoxChecked: {
    backgroundColor: COLORS.oceanBlue,
    borderColor: COLORS.oceanBlue,
  },
  addonName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  addonNameChecked: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  addonPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.darkOrange,
  },
  addonDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
    lineHeight: 15,
  },
  pricingSummaryBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginTop: SPACING.sm,
  },
  pricingSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  pricingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  goaThaneBadge: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  goaThaneBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  priceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  priceVal: {
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.navy,
  },
});
