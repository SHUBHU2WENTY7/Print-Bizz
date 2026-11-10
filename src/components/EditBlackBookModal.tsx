import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { CartItem, CustomizationState } from '../types';
import { 
  X, 
  Check, 
  Edit3,
  Plus,
  Minus
} from 'lucide-react-native';

interface EditBlackBookModalProps {
  visible: boolean;
  item: CartItem | null;
  onClose: () => void;
  onSave: (itemId: string, updatedCust: Partial<CustomizationState>) => void;
}

interface EditBlackBookFormProps {
  item: CartItem;
  onClose: () => void;
  onSave: (itemId: string, updatedCust: Partial<CustomizationState>) => void;
}

const EditBlackBookForm: React.FC<EditBlackBookFormProps> = ({
  item,
  onClose,
  onSave,
}) => {
  const [studentName, setStudentName] = useState(item.customization.cover.studentName);
  const [projectTitle, setProjectTitle] = useState(item.customization.cover.projectTitle);
  const [collegeName, setCollegeName] = useState(item.customization.cover.collegeName);
  const [rollNumber, setRollNumber] = useState(item.customization.cover.rollNumber || '');
  const [degreeBranch, setDegreeBranch] = useState(item.customization.cover.degreeBranch);
  const [academicYear, setAcademicYear] = useState(item.customization.cover.academicYear);
  const [guideName, setGuideName] = useState(item.customization.cover.guideName || '');
  const [copies, setCopies] = useState(item.customization.copies || 1);
  const [embossingFoil, setEmbossingFoil] = useState(item.customization.cover.embossingFoil);
  const [paperGSM, setPaperGSM] = useState(item.customization.paperGSM);

  const handleSave = () => {
    onSave(item.id, {
      copies,
      paperGSM,
      cover: {
        ...item.customization.cover,
        studentName,
        projectTitle,
        collegeName,
        rollNumber,
        degreeBranch,
        academicYear,
        guideName,
        embossingFoil,
      },
    });
    onClose();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <View style={styles.headerTitleRow}>
            <View style={styles.editIconBadge}>
              <Edit3 size={16} color={COLORS.navy} />
            </View>
            <View>
              <Text style={styles.modalTitle}>Edit Black Book Details</Text>
              <Text style={styles.modalSub}>{item.product.name}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={onClose}
            accessibilityLabel="Close edit window"
          >
            <X size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Form Scroll Area */}
        <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
          {/* Candidate & Stamping Details */}
          <Text style={styles.sectionHeader}>Cover Stamping Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Student Name (Printed in Foil)</Text>
            <TextInput
              style={styles.textInput}
              value={studentName}
              onChangeText={setStudentName}
              placeholder="Full student name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Project / Thesis Title</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={projectTitle}
              onChangeText={setProjectTitle}
              placeholder="Full title of project"
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>College / University Name</Text>
            <TextInput
              style={styles.textInput}
              value={collegeName}
              onChangeText={setCollegeName}
              placeholder="e.g. University of Mumbai / VJTI"
            />
          </View>

          <View style={styles.rowTwoCols}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Seat / Roll No.</Text>
              <TextInput
                style={styles.textInput}
                value={rollNumber}
                onChangeText={setRollNumber}
                placeholder="e.g. 221080045"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Academic Year</Text>
              <TextInput
                style={styles.textInput}
                value={academicYear}
                onChangeText={setAcademicYear}
                placeholder="2025-2026"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Degree & Branch</Text>
            <TextInput
              style={styles.textInput}
              value={degreeBranch}
              onChangeText={setDegreeBranch}
              placeholder="e.g. B.Tech in Computer Engineering"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Project Guide Name</Text>
            <TextInput
              style={styles.textInput}
              value={guideName}
              onChangeText={setGuideName}
              placeholder="e.g. Dr. Ramesh Kulkarni, Professor"
            />
          </View>

          {/* Foil Stamping Options */}
          <Text style={styles.sectionHeader}>Foil Stamping Color</Text>
          <View style={styles.optionsRow}>
            {[
              { name: 'Gold Foil', color: '#D4AF37' },
              { name: 'Silver Foil', color: '#CBD5E1' },
              { name: 'Rose Gold', color: '#B76E79' },
            ].map((f) => (
              <TouchableOpacity
                key={f.name}
                style={[styles.foilChoicePill, embossingFoil === f.name && styles.foilChoicePillActive]}
                onPress={() => setEmbossingFoil(f.name as any)}
              >
                <View style={[styles.foilDot, { backgroundColor: f.color }]} />
                <Text style={[styles.foilChoiceText, embossingFoil === f.name && styles.foilChoiceTextActive]}>
                  {f.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Paper GSM Options */}
          <Text style={styles.sectionHeader}>Paper Weight (GSM)</Text>
          <View style={styles.optionsRow}>
            {[
              { gsm: '75 GSM Standard', label: '75 GSM' },
              { gsm: '80 GSM Bond', label: '80 GSM Bond' },
              { gsm: '100 GSM Executive', label: '100 GSM Executive' },
            ].map((p) => (
              <TouchableOpacity
                key={p.gsm}
                style={[styles.foilChoicePill, paperGSM === p.gsm && styles.foilChoicePillActive]}
                onPress={() => setPaperGSM(p.gsm as any)}
              >
                <Text style={[styles.foilChoiceText, paperGSM === p.gsm && styles.foilChoiceTextActive]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Number of Copies */}
          <Text style={styles.sectionHeader}>Number of Copies</Text>
          <View style={styles.copiesCounterRow}>
            <TouchableOpacity 
              style={[styles.counterBtn, copies <= 1 && styles.counterBtnDisabled]}
              onPress={() => setCopies(Math.max(1, copies - 1))}
              disabled={copies <= 1}
            >
              <Minus size={16} color={copies <= 1 ? COLORS.mutedText : COLORS.navy} />
            </TouchableOpacity>

            <View style={styles.copiesDisplayBox}>
              <Text style={styles.copiesCountText}>{copies}</Text>
              <Text style={styles.copiesCountSub}>{copies === 1 ? 'Hardbound Copy' : 'Hardbound Copies'}</Text>
            </View>

            <TouchableOpacity 
              style={styles.counterBtn}
              onPress={() => setCopies(Math.min(20, copies + 1))}
            >
              <Plus size={16} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal Footer */}
        <View style={styles.modalFooter}>
          <TouchableOpacity 
            style={styles.cancelBtn} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveBtn} 
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Check size={16} color={COLORS.white} strokeWidth={2.5} />
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const EditBlackBookModal: React.FC<EditBlackBookModalProps> = ({
  visible,
  item,
  onClose,
  onSave,
}) => {
  if (!visible || !item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <EditBlackBookForm item={item} onClose={onClose} onSave={onSave} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.base,
    zIndex: 9999,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    width: '100%',
    maxWidth: 540,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editIconBadge: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xs,
    backgroundColor: '#EEF2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  modalSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formScroll: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: SPACING.sm,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.primaryText,
  },
  multilineInput: {
    minHeight: 52,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.xs,
  },
  foilChoicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  foilChoicePillActive: {
    backgroundColor: '#F0F9FF',
    borderColor: COLORS.navy,
  },
  foilDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  foilChoiceText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  foilChoiceTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  copiesCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.xs,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    opacity: 0.4,
  },
  copiesDisplayBox: {
    flex: 1,
    alignItems: 'center',
  },
  copiesCountText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
  },
  copiesCountSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
