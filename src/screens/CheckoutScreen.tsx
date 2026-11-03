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
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Check, 
  Truck, 
  Lock, 
  ArrowRight,
  User,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react-native';

export const CheckoutScreen: React.FC = () => {
  const { 
    cart, 
    cartTotalCount, 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    addAddress, 
    userProfile, 
    updateUserProfile, 
    placeOrder, 
    navigateTo 
  } = useAppStore();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cards' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Gate 2 security call if phone unreachable');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  // New address form state
  const [newLabel, setNewLabel] = useState('College Dept');
  const [newLine1, setNewLine1] = useState('Computer Engg Dept, Lab 4');
  const [newArea, setNewArea] = useState('Matunga');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newPincode, setNewPincode] = useState('400019');

  const handleSaveNewAddress = () => {
    if (!newLine1 || !newPincode) {
      alert('Please fill address line and pincode');
      return;
    }
    addAddress({
      label: newLabel,
      recipientName: userProfile.name,
      phone: userProfile.phone,
      line1: newLine1,
      area: newArea,
      city: newCity,
      pincode: newPincode,
      isDefault: false,
    });
    setShowNewAddressModal(false);
  };

  // Pricing calculations
  let subtotal = 0;
  let tax = 0;
  cart.forEach((item) => {
    subtotal += item.pricing.subtotal;
    tax += item.pricing.gstTax;
  });
  const deliveryFee = subtotal >= 699 ? 0 : 49;
  const grandTotal = subtotal + tax + deliveryFee;

  const handlePayAndSubmit = async () => {
    setIsProcessing(true);
    // Simulate secure Razorpay backend webhook verification
    setTimeout(async () => {
      await placeOrder(paymentMethod, deliveryInstructions);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Header */}
          <View style={styles.headerBanner}>
            <View style={styles.secureBadge}>
              <Lock size={12} color={COLORS.success} />
              <Text style={styles.secureBadgeText}>256-BIT ENCRYPTED CHECKOUT</Text>
            </View>
            <Text style={styles.heading}>Order & Delivery Checkout</Text>
            <Text style={styles.subheading}>
              Finalize recipient information, address, and test payment gateway.
            </Text>
          </View>

          {/* 1. CUSTOMER INFORMATION */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeader}>
              <User size={18} color={COLORS.navy} />
              <Text style={styles.sectionTitle}>1. Customer Details</Text>
            </View>

            <View style={styles.formGrid}>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={userProfile.name}
                  onChangeText={(val) => updateUserProfile({ name: val })}
                  placeholder="Student or Faculty Name"
                />
              </View>

              <View style={styles.twoCol}>
                <View style={[styles.fieldWrap, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Mobile Number (for SMS & OTP)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userProfile.phone}
                    onChangeText={(val) => updateUserProfile({ phone: val })}
                    placeholder="+91 98201 00000"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={[styles.fieldWrap, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Email (Receipt & PDF Preflight)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userProfile.email}
                    onChangeText={(val) => updateUserProfile({ email: val })}
                    placeholder="student@college.edu"
                    keyboardType="email-address"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* 2. DELIVERY INFORMATION (Mumbai / Thane) */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeader}>
              <MapPin size={18} color={COLORS.navy} />
              <Text style={styles.sectionTitle}>2. Delivery Destination (Mumbai / Thane)</Text>
            </View>

            {/* Saved addresses selector */}
            <View style={styles.addressesList}>
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <TouchableOpacity
                    key={addr.id}
                    style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                    onPress={() => setSelectedAddressId(addr.id)}
                  >
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.addrHeader}>
                        <Text style={styles.addrLabel}>{addr.label}</Text>
                        {addr.isDefault && (
                          <View style={styles.defaultPill}>
                            <Text style={styles.defaultPillText}>DEFAULT</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.addrLine}>{addr.line1}, {addr.area}</Text>
                      <Text style={styles.addrCity}>{addr.city} — {addr.pincode}</Text>
                      <Text style={styles.addrContact}>Contact: {addr.recipientName} ({addr.phone})</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Add New Address Form / Trigger */}
            {showNewAddressModal ? (
              <View style={styles.newAddrForm}>
                <Text style={styles.newAddrTitle}>Add Delivery Address</Text>
                <TextInput
                  style={[styles.textInput, { marginBottom: 8 }]}
                  placeholder="Address Label (e.g. Hostel, Home, Department)"
                  value={newLabel}
                  onChangeText={setNewLabel}
                />
                <TextInput
                  style={[styles.textInput, { marginBottom: 8 }]}
                  placeholder="Flat / Room / Wing / Street *"
                  value={newLine1}
                  onChangeText={setNewLine1}
                />
                <View style={styles.twoCol}>
                  <TextInput
                    style={[styles.textInput, { flex: 1, marginBottom: 8 }]}
                    placeholder="Area / Campus"
                    value={newArea}
                    onChangeText={setNewArea}
                  />
                  <TextInput
                    style={[styles.textInput, { flex: 1, marginBottom: 8 }]}
                    placeholder="Pincode *"
                    value={newPincode}
                    onChangeText={setNewPincode}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.formBtnRow}>
                  <TouchableOpacity 
                    style={styles.cancelBtn}
                    onPress={() => setShowNewAddressModal(false)}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.saveAddrBtn}
                    onPress={handleSaveNewAddress}
                  >
                    <Text style={styles.saveAddrBtnText}>Save Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addAddrBtn}
                onPress={() => setShowNewAddressModal(true)}
              >
                <Plus size={16} color={COLORS.oceanBlue} />
                <Text style={styles.addAddrBtnText}>Add Another Delivery Address</Text>
              </TouchableOpacity>
            )}

            {/* Delivery Instructions */}
            <View style={styles.instructionsWrap}>
              <Text style={styles.fieldLabel}>Delivery Instructions (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={deliveryInstructions}
                onChangeText={setDeliveryInstructions}
                placeholder="e.g. Leave with gate security, call after 2 PM"
              />
            </View>
          </View>

          {/* 3. PAYMENT METHOD (Razorpay Test Mode Integration) */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeader}>
              <CreditCard size={18} color={COLORS.navy} />
              <Text style={styles.sectionTitle}>3. Payment Method (Razorpay Test Gateway)</Text>
            </View>

            <View style={styles.paymentMethodsGrid}>
              {[
                {
                  id: 'UPI',
                  title: 'Instant UPI (Google Pay, PhonePe, Paytm)',
                  desc: 'Zero transaction charges. Immediate verified production queue placement.',
                  icon: <Smartphone size={20} color={COLORS.oceanBlue} />,
                },
                {
                  id: 'Cards',
                  title: 'Debit / Credit Card (Visa, RuPay, Mastercard)',
                  desc: 'Secure 3D-Secure 2.0 authorization. No card data saved on frontend.',
                  icon: <CreditCard size={20} color={COLORS.navy} />,
                },
                {
                  id: 'Net Banking',
                  title: 'Net Banking (All Major Indian Banks)',
                  desc: 'HDFC, SBI, ICICI, Axis, Kotak and 50+ universities approved banks.',
                  icon: <Building size={20} color={COLORS.navy} />,
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Pay on Doorstep Delivery',
                  desc: 'Verification OTP required upon delivery in Mumbai.',
                  icon: <Banknote size={20} color={COLORS.darkOrange} />,
                },
              ].map((m) => {
                const isSelected = paymentMethod === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.payMethodCard, isSelected && styles.payMethodCardSelected]}
                    onPress={() => setPaymentMethod(m.id as any)}
                  >
                    <View style={styles.payHeader}>
                      <View style={styles.payIconBubble}>{m.icon}</View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.payTitle, isSelected && styles.payTitleSelected]}>
                          {m.title}
                        </Text>
                        <Text style={styles.payDesc}>{m.desc}</Text>
                      </View>
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                    </View>

                    {/* Expand UPI input if selected */}
                    {isSelected && m.id === 'UPI' && (
                      <View style={styles.upiInputBox}>
                        <Text style={styles.upiInputLabel}>Enter UPI ID / VPA:</Text>
                        <TextInput
                          style={styles.textInput}
                          value={upiId}
                          onChangeText={setUpiId}
                          placeholder="yourname@okhdfcbank"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 4. ORDER SUMMARY & FINAL BREAKDOWN */}
          <View style={styles.orderSummaryCard}>
            <Text style={styles.summaryTitle}>Final Order Summary</Text>
            
            {cart.map((item) => (
              <View key={item.id} style={styles.summaryItemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryItemName}>
                    {item.product.name} ({item.customization.copies} {item.customization.copies > 1 ? 'copies' : 'copy'})
                  </Text>
                  <Text style={styles.summaryItemSpecs}>
                    {item.customization.paperGSM} • {item.customization.binding.split(' ')[0]} • {item.document.name}
                  </Text>
                </View>
                <Text style={styles.summaryItemPrice}>₹{item.pricing.subtotal}</Text>
              </View>
            ))}

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryVal}>₹{subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery (Thane Hub to Mumbai)</Text>
              <Text style={[styles.summaryVal, deliveryFee === 0 && { color: COLORS.success }]}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (12% Printing Services)</Text>
              <Text style={styles.summaryVal}>₹{tax}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryTotalRow}>
              <Text style={styles.summaryTotalLabel}>Final Amount to Pay</Text>
              <Text style={styles.summaryTotalVal}>₹{grandTotal}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Place Order CTA */}
      <View style={styles.stickyPayBar}>
        <View style={styles.stickyPayInner}>
          <View>
            <Text style={styles.payLabel}>Amount Payable</Text>
            <Text style={styles.payAmount}>₹{grandTotal}</Text>
          </View>

          <TouchableOpacity 
            style={[styles.paySubmitBtn, isProcessing && styles.paySubmitBtnDisabled]}
            onPress={handlePayAndSubmit}
            disabled={isProcessing}
          >
            <ShieldCheck size={18} color={COLORS.white} />
            <Text style={styles.paySubmitBtnText}>
              {isProcessing ? 'Verifying Payment...' : `Pay & Place Order (₹${grandTotal})`}
            </Text>
            {!isProcessing && <ArrowRight size={16} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
      </View>
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
    maxWidth: 860,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 90,
  },
  headerBanner: {
    marginBottom: SPACING.base,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  cardSection: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  formGrid: {
    gap: SPACING.md,
  },
  fieldWrap: {
    gap: 4,
  },
  twoCol: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
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
  addressesList: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  addressCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioCircleSelected: {
    borderColor: COLORS.oceanBlue,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.oceanBlue,
  },
  addrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  addrLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  defaultPill: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  defaultPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.white,
  },
  addrLine: {
    fontSize: 12,
    color: COLORS.primaryText,
    lineHeight: 16,
  },
  addrCity: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: 2,
  },
  addrContact: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  addAddrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.oceanBlue,
    marginBottom: SPACING.md,
  },
  addAddrBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  newAddrForm: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  newAddrTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  formBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  saveAddrBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  saveAddrBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  instructionsWrap: {
    gap: 4,
  },
  paymentMethodsGrid: {
    gap: SPACING.sm,
  },
  payMethodCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  payMethodCardSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.oceanBlue,
  },
  payHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  payIconBubble: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  payTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  payTitleSelected: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  payDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  upiInputBox: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  upiInputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 4,
  },
  orderSummaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  summaryItemSpecs: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  summaryItemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  summaryVal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.navy,
  },
  summaryTotalVal: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
  },
  stickyPayBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  stickyPayInner: {
    maxWidth: 860,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  payLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondaryText,
    textTransform: 'uppercase',
  },
  payAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
  },
  paySubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  paySubmitBtnDisabled: {
    opacity: 0.6,
  },
  paySubmitBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
