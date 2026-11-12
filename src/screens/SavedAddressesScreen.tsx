import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Star 
} from 'lucide-react-native';

export const SavedAddressesScreen: React.FC = () => {
  const { 
    addresses, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress, 
    goBack 
  } = useAppStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [label, setLabel] = useState('Hostel / College');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = () => {
    if (!recipientName || !phone || !line1 || !pincode) {
      alert('Please fill in recipient name, phone, address and PIN code.');
      return;
    }
    addAddress({
      label,
      recipientName,
      phone,
      line1,
      area,
      city,
      pincode,
      instructions,
      isDefault: addresses.length === 0,
    });
    setShowAddForm(false);
    setRecipientName('');
    setPhone('');
    setLine1('');
    setArea('');
    setPincode('');
    setInstructions('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.backBtnText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={15} color={COLORS.white} />
            <Text style={styles.addBtnText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Saved Delivery Addresses</Text>
        <Text style={styles.pageSub}>Manage your college, department hostel, or home delivery destinations</Text>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add New Delivery Address</Text>

            <View style={styles.labelsRow}>
              {['Hostel / College', 'Home', 'Department Lab'].map((l) => (
                <TouchableOpacity
                  key={l}
                  style={[styles.labelPill, label === l && styles.labelPillActive]}
                  onPress={() => setLabel(l)}
                >
                  <Text style={[styles.labelPillText, label === l && styles.labelPillTextActive]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Recipient Name</Text>
              <TextInput style={styles.input} value={recipientName} onChangeText={setRecipientName} placeholder="Full Name" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+91 98765 43210" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Flat / Room / Building / Department</Text>
              <TextInput style={styles.input} value={line1} onChangeText={setLine1} placeholder="e.g. Room 304, Hostel B / Campus Gate" />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Area / Locality</Text>
                <TextInput style={styles.input} value={area} onChangeText={setArea} placeholder="e.g. Campus Road / Area" />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Mumbai" />
              </View>
              <View style={[styles.inputGroup, { width: 110 }]}>
                <Text style={styles.inputLabel}>PIN Code</Text>
                <TextInput style={styles.input} value={pincode} onChangeText={setPincode} keyboardType="numeric" placeholder="400019" />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Delivery Instructions (Optional)</Text>
              <TextInput style={styles.input} value={instructions} onChangeText={setInstructions} placeholder="e.g. Call upon arrival at security gate" />
            </View>

            <View style={styles.formButtonsRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddForm(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Addresses List */}
        <View style={styles.addressList}>
          {addresses.map((addr) => (
            <View key={addr.id} style={[styles.addressCard, addr.isDefault && styles.addressCardDefault]}>
              <View style={styles.addressTop}>
                <View style={styles.tagWrap}>
                  <Text style={styles.tagText}>{addr.label}</Text>
                  {addr.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Star size={11} color="#B45309" fill="#B45309" />
                      <Text style={styles.defaultBadgeText}>Default Address</Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={() => deleteAddress(addr.id)}
                  accessibilityLabel="Delete address"
                >
                  <Trash2 size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>

              <Text style={styles.recipientTitle}>{addr.recipientName}</Text>
              <Text style={styles.addressLine}>{addr.line1}</Text>
              <Text style={styles.addressLine}>{addr.area}, {addr.city} - {addr.pincode}</Text>
              <Text style={styles.phoneLine}>Mobile: {addr.phone}</Text>
              {addr.instructions ? (
                <Text style={styles.notesText}>Note: {addr.instructions}</Text>
              ) : null}

              {!addr.isDefault && (
                <TouchableOpacity 
                  style={styles.makeDefaultBtn}
                  onPress={() => setDefaultAddress(addr.id)}
                >
                  <Text style={styles.makeDefaultBtnText}>Set as Default Address</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
    maxWidth: 760,
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.xs,
  },
  addBtnText: {
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
  formCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 4,
  },
  labelsRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginBottom: 6,
  },
  labelPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSubtle,
  },
  labelPillActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  labelPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  labelPillTextActive: {
    color: COLORS.white,
  },
  inputGroup: {
    gap: 3,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 7,
    fontSize: 12,
    backgroundColor: COLORS.white,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  formButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    marginTop: 6,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  saveBtn: {
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  addressList: {
    gap: SPACING.md,
  },
  addressCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressCardDefault: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  addressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagText: {
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  recipientTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  addressLine: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  phoneLine: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginTop: 4,
  },
  notesText: {
    fontSize: 11,
    color: COLORS.oceanBlue,
    marginTop: 4,
  },
  makeDefaultBtn: {
    alignSelf: 'flex-start',
    marginTop: SPACING.md,
    paddingTop: SPACING.xs,
  },
  makeDefaultBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
});
