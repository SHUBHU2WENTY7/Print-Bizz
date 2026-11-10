import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { EditBlackBookModal } from '../components/EditBlackBookModal';
import { CartItem } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  Edit3,
  User,
  BookOpen
} from 'lucide-react-native';

export const CheckoutScreen: React.FC = () => {
  const { 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    addAddress,
    cart, 
    placeOrder, 
    updateCartItemCustomization
  } = useAppStore();

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cards' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingCheckoutItem, setEditingCheckoutItem] = useState<CartItem | null>(null);

  // New Address Form State
  const [newLabel, setNewLabel] = useState('College');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newPincode, setNewPincode] = useState('');

  let subtotal = 0;
  let taxGst = 0;
  cart.forEach((i) => {
    subtotal += i.pricing.subtotal;
    taxGst += i.pricing.gstTax;
  });

  const baseDeliveryFee = subtotal >= 699 ? 0 : 49;
  const speedFee = deliverySpeed === 'express' ? 99 : baseDeliveryFee;
  const grandTotal = subtotal + speedFee + taxGst;

  const handleSaveAddress = () => {
    if (!newName || !newPhone || !newLine1 || !newPincode) {
      alert('Please fill in recipient name, phone, address and PIN code.');
      return;
    }
    addAddress({
      label: newLabel,
      recipientName: newName,
      phone: newPhone,
      line1: newLine1,
      area: newArea,
      city: newCity,
      pincode: newPincode,
      isDefault: false,
    });
    setShowAddAddressForm(false);
  };

  const handleConfirmOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await placeOrder(paymentMethod, deliveryInstructions);
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <Text style={styles.pageHeading}>Secure Checkout</Text>

        <View style={styles.checkoutLayout}>
          {/* LEFT: Checkout Steps */}
          <View style={styles.stepsCol}>
            {/* ORDER ITEMS REVIEW & EDIT CARD */}
            <View style={styles.checkoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.stepNumBadge, { backgroundColor: COLORS.darkOrange }]}>
                  <BookOpen size={14} color={COLORS.white} />
                </View>
                <Text style={styles.cardHeaderTitle}>Items in Your Order ({cart.length})</Text>
                <Text style={styles.editHintBadge}>Tap item to edit name or details</Text>
              </View>

              <View style={styles.orderItemsList}>
                {cart.map((item) => (
                  <View key={item.id} style={styles.checkoutItemRow}>
                    <View style={styles.itemMetaLeft}>
                      <Text style={styles.checkoutItemName}>{item.product.name}</Text>
                      
                      {/* Candidate Name Badge (Interactive) */}
                      <TouchableOpacity 
                        style={styles.candidateNameBadge}
                        onPress={() => setEditingCheckoutItem(item)}
                        activeOpacity={0.8}
                      >
                        <User size={12} color={COLORS.navy} />
                        <Text style={styles.candidateNameText}>
                          Student: {item.customization.cover.studentName}
                        </Text>
                        <Text style={styles.inlineEditBtnText}>Edit Name ✏️</Text>
                      </TouchableOpacity>

                      <Text style={styles.checkoutItemSub} numberOfLines={1}>
                        &ldquo;{item.customization.cover.projectTitle}&rdquo; • {item.customization.paperGSM} • {item.customization.cover.embossingFoil}
                      </Text>
                      <Text style={styles.checkoutItemCollege} numberOfLines={1}>
                        {item.customization.cover.collegeName}
                      </Text>
                    </View>

                    <View style={styles.itemMetaRight}>
                      <TouchableOpacity 
                        style={styles.quickEditBtn}
                        onPress={() => setEditingCheckoutItem(item)}
                        activeOpacity={0.8}
                      >
                        <Edit3 size={12} color={COLORS.navy} />
                        <Text style={styles.quickEditBtnText}>Edit</Text>
                      </TouchableOpacity>
                      <Text style={styles.checkoutItemQtyPrice}>
                        {item.customization.copies} {item.customization.copies === 1 ? 'copy' : 'copies'} • ₹{item.pricing.subtotal}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* STEP 1: DELIVERY ADDRESS */}
            <View style={styles.checkoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.stepNumBadge}><Text style={styles.stepNumText}>1</Text></View>
                <Text style={styles.cardHeaderTitle}>Delivery Address</Text>
                <TouchableOpacity 
                  style={styles.addAddressToggleBtn}
                  onPress={() => setShowAddAddressForm(!showAddAddressForm)}
                >
                  <Plus size={14} color={COLORS.navy} />
                  <Text style={styles.addAddressToggleText}>Add Address</Text>
                </TouchableOpacity>
              </View>

              {/* Add Address Form Modal / Inline */}
              {showAddAddressForm && (
                <View style={styles.newAddressFormBox}>
                  <Text style={styles.formSectionTitle}>Add New Delivery Address</Text>
                  
                  {/* Address Type Selector */}
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                    {['College', 'Hostel', 'Home'].map((tag) => (
                      <TouchableOpacity
                        key={tag}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 5,
                          borderRadius: RADIUS.full,
                          borderWidth: 1,
                          borderColor: newLabel === tag ? COLORS.navy : COLORS.border,
                          backgroundColor: newLabel === tag ? COLORS.navy : COLORS.white,
                        }}
                        onPress={() => setNewLabel(tag)}
                      >
                        <Text style={{
                          fontSize: 11,
                          fontWeight: '700',
                          color: newLabel === tag ? COLORS.white : COLORS.secondaryText,
                        }}>{tag}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.formRow}>
                    <TextInput 
                      style={[styles.formInput, { flex: 1 }]} 
                      placeholder="Recipient Full Name" 
                      value={newName} 
                      onChangeText={setNewName} 
                    />
                    <TextInput 
                      style={[styles.formInput, { flex: 1 }]} 
                      placeholder="Contact Phone Number" 
                      value={newPhone} 
                      onChangeText={setNewPhone} 
                      keyboardType="phone-pad" 
                    />
                  </View>
                  <TextInput 
                    style={styles.formInput} 
                    placeholder="Flat / Room No., Building Name, College Campus" 
                    value={newLine1} 
                    onChangeText={setNewLine1} 
                  />
                  <View style={styles.formRow}>
                    <TextInput 
                      style={[styles.formInput, { flex: 1 }]} 
                      placeholder="Area / Street / Locality" 
                      value={newArea} 
                      onChangeText={setNewArea} 
                    />
                    <TextInput 
                      style={[styles.formInput, { flex: 1 }]} 
                      placeholder="City" 
                      value={newCity} 
                      onChangeText={setNewCity} 
                    />
                    <TextInput 
                      style={[styles.formInput, { width: 100 }]} 
                      placeholder="PIN Code" 
                      value={newPincode} 
                      onChangeText={setNewPincode} 
                      keyboardType="numeric" 
                    />
                  </View>
                  <View style={styles.formActionsRow}>
                    <TouchableOpacity 
                      style={styles.cancelAddressBtn}
                      onPress={() => setShowAddAddressForm(false)}
                    >
                      <Text style={styles.cancelAddressBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.saveAddressBtn}
                      onPress={handleSaveAddress}
                    >
                      <Text style={styles.saveAddressBtnText}>Save Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Addresses List */}
              <View style={styles.addressesList}>
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <TouchableOpacity
                      key={addr.id}
                      style={[styles.addressItemCard, isSelected && styles.addressItemCardSelected]}
                      onPress={() => setSelectedAddressId(addr.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <View style={styles.radioInnerDot} />}
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.addressLabelRow}>
                          <Text style={styles.addressRecipient}>{addr.recipientName}</Text>
                          <View style={styles.addressTag}><Text style={styles.addressTagText}>{addr.label}</Text></View>
                        </View>
                        <Text style={styles.addressText}>{addr.line1}, {addr.area}, {addr.city} - {addr.pincode}</Text>
                        <Text style={styles.addressPhone}>Phone: {addr.phone}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TextInput
                style={styles.instructionsInput}
                placeholder="Optional: Gate pass instructions or delivery notes..."
                value={deliveryInstructions}
                onChangeText={setDeliveryInstructions}
              />
            </View>

            {/* STEP 2: DELIVERY SPEED */}
            <View style={styles.checkoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.stepNumBadge}><Text style={styles.stepNumText}>2</Text></View>
                <Text style={styles.cardHeaderTitle}>Delivery Speed</Text>
              </View>

              <View style={styles.speedOptionsGrid}>
                <TouchableOpacity
                  style={[styles.speedCard, deliverySpeed === 'standard' && styles.speedCardSelected]}
                  onPress={() => setDeliverySpeed('standard')}
                  activeOpacity={0.8}
                >
                  <View style={styles.speedCardTop}>
                    <Text style={styles.speedName}>Standard Delivery</Text>
                    <Text style={styles.speedPrice}>{subtotal >= 699 ? 'FREE' : '₹49'}</Text>
                  </View>
                  <Text style={styles.speedDays}>Estimated: 3–5 business days</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.speedCard, deliverySpeed === 'express' && styles.speedCardSelected]}
                  onPress={() => setDeliverySpeed('express')}
                  activeOpacity={0.8}
                >
                  <View style={styles.speedCardTop}>
                    <Text style={styles.speedName}>Priority Express Courier</Text>
                    <Text style={styles.speedPrice}>₹99</Text>
                  </View>
                  <Text style={styles.speedDays}>Estimated: 1–2 business days</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* STEP 3: PAYMENT METHOD */}
            <View style={styles.checkoutCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.stepNumBadge}><Text style={styles.stepNumText}>3</Text></View>
                <Text style={styles.cardHeaderTitle}>Payment Method</Text>
              </View>

              <View style={styles.paymentMethodsList}>
                {[
                  { id: 'UPI', label: 'Instant UPI (Google Pay, PhonePe, Paytm, QR)', note: 'Fastest verification' },
                  { id: 'Cards', label: 'Credit / Debit Cards (Visa, MasterCard, RuPay)', note: 'All bank cards supported' },
                  { id: 'Net Banking', label: 'Net Banking (SBI, HDFC, ICICI, Axis & 50+ Banks)', note: 'Direct bank transfer' },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery (Pay upon arrival)', note: 'Cash or QR scan at doorstep' },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <TouchableOpacity
                      key={pm.id}
                      style={[styles.paymentMethodCard, isSelected && styles.paymentMethodCardSelected]}
                      onPress={() => setPaymentMethod(pm.id as any)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <View style={styles.radioInnerDot} />}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.paymentLabel}>{pm.label}</Text>
                        <Text style={styles.paymentNote}>{pm.note}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* RIGHT: Order Summary Sidebar */}
          <View style={styles.sidebarCol}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryHeading}>Payment Breakdown</Text>

              <View style={styles.summaryItemRow}>
                <Text style={styles.summaryKey}>Items Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</Text>
                <Text style={styles.summaryVal}>₹{subtotal}</Text>
              </View>

              <View style={styles.summaryItemRow}>
                <Text style={styles.summaryKey}>Delivery Charges</Text>
                <Text style={styles.summaryVal}>{speedFee === 0 ? 'FREE' : `₹${speedFee}`}</Text>
              </View>

              <View style={styles.summaryItemRow}>
                <Text style={styles.summaryKey}>GST Tax (12%)</Text>
                <Text style={styles.summaryVal}>₹{taxGst}</Text>
              </View>

              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Total Payable</Text>
                <Text style={styles.grandTotalAmount}>₹{grandTotal}</Text>
              </View>

              <TouchableOpacity 
                style={styles.placeOrderBtn}
                onPress={handleConfirmOrder}
                disabled={isPlacingOrder}
                activeOpacity={0.85}
              >
                {isPlacingOrder ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <>
                    <Text style={styles.placeOrderBtnText}>Place Order • ₹{grandTotal}</Text>
                    <ArrowRight size={16} color={COLORS.white} />
                  </>
                )}
              </TouchableOpacity>

              <View style={styles.securitySealRow}>
                <ShieldCheck size={16} color={COLORS.success} />
                <Text style={styles.securitySealText}>256-Bit SSL Encrypted & Verified</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Black Book Details Modal on Checkout */}
      <EditBlackBookModal
        visible={Boolean(editingCheckoutItem)}
        item={editingCheckoutItem}
        onClose={() => setEditingCheckoutItem(null)}
        onSave={updateCartItemCustomization}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentWrap: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  pageHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.lg,
  },
  checkoutLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  stepsCol: {
    flex: 1.4,
    minWidth: 320,
    gap: SPACING.md,
  },
  checkoutCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  stepNumBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNumText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    flex: 1,
  },
  addAddressToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addAddressToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
  },
  newAddressFormBox: {
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  formSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  formRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  formInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    fontSize: 12,
  },
  formActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    marginTop: 4,
  },
  cancelAddressBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelAddressBtnText: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  saveAddressBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
  },
  saveAddressBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  addressesList: {
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  addressItemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressItemCardSelected: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioCircleSelected: {
    borderColor: COLORS.navy,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.navy,
  },
  addressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressRecipient: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  addressTag: {
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  addressTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  addressPhone: {
    fontSize: 11,
    color: COLORS.mutedText,
    marginTop: 2,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  speedOptionsGrid: {
    gap: SPACING.sm,
  },
  speedCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  speedCardSelected: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  speedCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speedName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  speedPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
  speedDays: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  paymentMethodsList: {
    gap: SPACING.sm,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentMethodCardSelected: {
    borderColor: COLORS.navy,
    backgroundColor: '#F8FAFC',
  },
  paymentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  paymentNote: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  sidebarCol: {
    width: 340,
  },
  summaryBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  summaryHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  summaryVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.navy,
    marginBottom: SPACING.lg,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  grandTotalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.darkOrange,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
  },
  placeOrderBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  securitySealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: SPACING.md,
  },
  securitySealText: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  // Order Items Review on Checkout
  editHintBadge: {
    fontSize: 10,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  orderItemsList: {
    gap: SPACING.sm,
  },
  checkoutItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  itemMetaLeft: {
    flex: 1,
  },
  checkoutItemName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  candidateNameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  candidateNameText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.navy,
  },
  inlineEditBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.darkOrange,
    marginLeft: 4,
  },
  checkoutItemSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  checkoutItemCollege: {
    fontSize: 10,
    color: COLORS.mutedText,
    marginTop: 1,
  },
  itemMetaRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  quickEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickEditBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  checkoutItemQtyPrice: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
});
