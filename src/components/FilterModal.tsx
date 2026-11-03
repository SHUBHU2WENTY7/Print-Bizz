import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { X, RotateCcw, Check, SlidersHorizontal, IndianRupee } from 'lucide-react-native';

export const FilterModal: React.FC = () => {
  const { 
    isFilterModalVisible, 
    closeFilterModal, 
    filterState, 
    setFilterState, 
    resetFilters,
    updateCustomization,
    customization
  } = useAppStore();

  const [localCategory, setLocalCategory] = useState(filterState.category);
  const [localGSM, setLocalGSM] = useState(customization.paperGSM);
  const [localPrintType, setLocalPrintType] = useState(customization.printType);
  const [localSides, setLocalSides] = useState(customization.printSides);
  const [localBinding, setLocalBinding] = useState(customization.binding);
  const [localSort, setLocalSort] = useState(filterState.sortBy);
  const [localMaxPrice, setLocalMaxPrice] = useState(filterState.maxPrice);

  const categories = ['All', 'Customized', 'College Standard', 'Project Executive'];
  const gsmOptions = ['75 GSM Standard', '80 GSM Bond', '100 GSM Executive', '120 GSM Royal'];
  const printTypeOptions = ['Black & White', 'Mixed (B&W + Colour)', 'Full Colour'];
  const sideOptions = ['Double-Sided (Recommended)', 'Single-Sided'];
  const bindingOptions = [
    'Golden Embossed Hardcover (Standard)',
    'Silver Foil Embossed Hardcover',
    'Premium Leatherette Rexine',
    'Executive Matte Obsidian'
  ];
  const sortOptions: { id: typeof filterState.sortBy; label: string }[] = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'fastest', label: 'Fastest Dispatch' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
  ];

  const handleApply = () => {
    setFilterState({
      category: localCategory,
      sortBy: localSort,
      maxPrice: localMaxPrice,
      paperGSM: localGSM,
      bindingType: localBinding,
    });
    updateCustomization({
      paperGSM: localGSM as any,
      printType: localPrintType as any,
      printSides: localSides as any,
      binding: localBinding as any,
    });
    closeFilterModal();
  };

  const handleReset = () => {
    resetFilters();
    setLocalCategory('All');
    setLocalGSM('80 GSM Bond');
    setLocalPrintType('Black & White');
    setLocalSides('Double-Sided (Recommended)');
    setLocalBinding('Golden Embossed Hardcover (Standard)');
    setLocalSort('popular');
    setLocalMaxPrice(800);
  };

  if (!isFilterModalVisible) return null;

  return (
    <Modal
      visible={isFilterModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeFilterModal}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.titleGroup}>
              <SlidersHorizontal size={20} color={COLORS.navy} />
              <Text style={styles.sheetTitle}>Customization & Filter</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={closeFilterModal}
              accessibilityLabel="Close filter"
            >
              <X size={20} color={COLORS.navy} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.sheetBody} showsVerticalScrollIndicator={false}>
            {/* Category selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Category</Text>
              <View style={styles.pillContainer}>
                {categories.map((cat) => {
                  const isSelected = localCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.pill, isSelected && styles.pillSelected]}
                      onPress={() => setLocalCategory(cat)}
                    >
                      {isSelected && <Check size={14} color={COLORS.white} style={styles.checkIcon} />}
                      <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Price Range Filter with Histogram Graphic (Reference 1 concept) */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Budget Cap</Text>
                <Text style={styles.priceHighlight}>Up to ₹{localMaxPrice}</Text>
              </View>
              {/* Histogram bars simulation matching Reference 1 */}
              <View style={styles.histogram}>
                {[12, 18, 25, 34, 48, 62, 78, 92, 110, 85, 60, 45, 30, 20].map((h, i) => {
                  const isActive = i * 60 + 200 <= localMaxPrice;
                  return (
                    <View
                      key={i}
                      style={[
                        styles.histoBar,
                        { height: h * 0.4 },
                        isActive ? styles.histoBarActive : styles.histoBarInactive,
                      ]}
                    />
                  );
                })}
              </View>
              <View style={styles.pricePillRow}>
                {[350, 500, 700, 950].map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[styles.smallPill, localMaxPrice === val && styles.smallPillSelected]}
                    onPress={() => setLocalMaxPrice(val)}
                  >
                    <Text style={[styles.smallPillText, localMaxPrice === val && styles.smallPillTextSelected]}>
                      ₹{val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Paper GSM Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Paper Quality (GSM)</Text>
              <View style={styles.pillContainer}>
                {gsmOptions.map((gsm) => {
                  const isSelected = localGSM === gsm;
                  return (
                    <TouchableOpacity
                      key={gsm}
                      style={[styles.pill, isSelected && styles.pillSelected]}
                      onPress={() => setLocalGSM(gsm as any)}
                    >
                      {isSelected && <Check size={14} color={COLORS.white} style={styles.checkIcon} />}
                      <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                        {gsm}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Print Type & Sides */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Print Type</Text>
              <View style={styles.pillContainer}>
                {printTypeOptions.map((type) => {
                  const isSelected = localPrintType === type;
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[styles.pill, isSelected && styles.pillSelected]}
                      onPress={() => setLocalPrintType(type as any)}
                    >
                      <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Binding Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Binding & Foil Stamping</Text>
              <View style={styles.verticalList}>
                {bindingOptions.map((bind) => {
                  const isSelected = localBinding === bind;
                  return (
                    <TouchableOpacity
                      key={bind}
                      style={[styles.cardPill, isSelected && styles.cardPillSelected]}
                      onPress={() => setLocalBinding(bind as any)}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.cardPillText, isSelected && styles.cardPillTextSelected]}>
                        {bind}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Sort by */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort Options</Text>
              <View style={styles.pillContainer}>
                {sortOptions.map((sort) => {
                  const isSelected = localSort === sort.id;
                  return (
                    <TouchableOpacity
                      key={sort.id}
                      style={[styles.pill, isSelected && styles.pillSelected]}
                      onPress={() => setLocalSort(sort.id)}
                    >
                      <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                        {sort.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons: Reset & Apply (Matches Reference 1) */}
          <View style={styles.sheetFooter}>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <RotateCcw size={16} color={COLORS.secondaryText} />
              <Text style={styles.resetBtnText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 35, 63, 0.45)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    width: '100%',
    maxWidth: 640,
    maxHeight: '85%',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
    overflow: 'hidden',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.navy,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBody: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.xs,
  },
  priceHighlight: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkOrange,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  checkIcon: {
    marginRight: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  pillTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  histogram: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 48,
    gap: 4,
    paddingVertical: 4,
    marginBottom: SPACING.sm,
  },
  histoBar: {
    flex: 1,
    borderRadius: 3,
  },
  histoBarActive: {
    backgroundColor: COLORS.oceanBlue,
  },
  histoBarInactive: {
    backgroundColor: COLORS.borderLight,
  },
  pricePillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  smallPill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallPillSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  smallPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  smallPillTextSelected: {
    color: COLORS.oceanBlue,
    fontWeight: '700',
  },
  verticalList: {
    gap: SPACING.sm,
  },
  cardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  cardPillSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.oceanBlue,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.oceanBlue,
  },
  cardPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryText,
    flex: 1,
  },
  cardPillTextSelected: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  sheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondaryText,
  },
  applyBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.darkOrange,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
