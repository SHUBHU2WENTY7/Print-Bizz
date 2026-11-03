import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Edit3,
  FileText
} from 'lucide-react-native';

export const CartScreen: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    editCartItem, 
    navigateTo,
    clearCart 
  } = useAppStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Compute Cart Aggregates
  let subtotal = 0;
  let taxGst = 0;

  cart.forEach((item) => {
    subtotal += item.pricing.subtotal;
    taxGst += item.pricing.gstTax;
  });

  const deliveryFee = subtotal >= 699 || subtotal === 0 ? 0 : 49;
  const totalAmount = Math.max(0, subtotal + deliveryFee + taxGst - promoDiscount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'STUDENT10') {
      const disc = Math.round(subtotal * 0.1);
      setPromoDiscount(disc);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "STUDENT10" for 10% off.');
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <ShoppingBag size={48} color={COLORS.mutedText} />
        </View>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptyDesc}>
          Explore our university black books, project reports, and dissertation bindings to start customizing your order.
        </Text>
        <TouchableOpacity 
          style={styles.exploreBtn}
          onPress={() => navigateTo('explore')}
          activeOpacity={0.85}
        >
          <Text style={styles.exploreBtnText}>Explore Products</Text>
          <ArrowRight size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearCartText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartLayout}>
          {/* LEFT: Cart Items List */}
          <View style={styles.itemsColumn}>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItemCard}>
                <View style={styles.itemTopRow}>
                  <Image source={{ uri: item.product.image }} style={styles.itemImage} />

                  <View style={styles.itemDetailsCol}>
                    <View style={styles.itemNameRow}>
                      <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                      <TouchableOpacity 
                        onPress={() => removeFromCart(item.id)}
                        accessibilityLabel="Remove item"
                      >
                        <Trash2 size={16} color={COLORS.error} />
                      </TouchableOpacity>
                    </View>

                    {/* Customization Specs Summary Badge */}
                    <View style={styles.specsSummaryBox}>
                      <Text style={styles.specLine}>
                        {item.customization.paperSize} • {item.customization.paperGSM} • {item.customization.printType}
                      </Text>
                      <Text style={styles.specLine}>
                        {item.customization.binding} ({item.customization.cover.embossingFoil})
                      </Text>
                      <View style={styles.docNameRow}>
                        <FileText size={12} color={COLORS.oceanBlue} />
                        <Text style={styles.docNameText} numberOfLines={1}>
                          {item.document?.name || 'Document pending upload'}
                        </Text>
                      </View>
                    </View>

                    {/* Price & Quantity Stepper */}
                    <View style={styles.itemPriceQtyRow}>
                      <View style={styles.stepperContainer}>
                        <TouchableOpacity 
                          style={styles.stepperBtn}
                          onPress={() => updateCartQuantity(item.id, -1)}
                        >
                          <Minus size={14} color={COLORS.navy} />
                        </TouchableOpacity>
                        <Text style={styles.stepperCount}>{item.customization.copies}</Text>
                        <TouchableOpacity 
                          style={styles.stepperBtn}
                          onPress={() => updateCartQuantity(item.id, 1)}
                        >
                          <Plus size={14} color={COLORS.navy} />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity 
                        style={styles.editSpecsBtn}
                        onPress={() => editCartItem(item.id)}
                      >
                        <Edit3 size={13} color={COLORS.navy} />
                        <Text style={styles.editSpecsBtnText}>Edit Specs</Text>
                      </TouchableOpacity>

                      <View style={styles.itemTotalPrice}>
                        <Text style={styles.itemUnitRate}>₹{item.pricing.unitPrice} each</Text>
                        <Text style={styles.itemTotalAmount}>₹{item.pricing.subtotal}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity 
              style={styles.continueShoppingBtn}
              onPress={() => navigateTo('explore')}
            >
              <Text style={styles.continueShoppingText}>+ Add More Academic Items</Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT: Order Summary & Checkout Sidebar */}
          <View style={styles.summaryColumn}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              {/* Promo Code Input */}
              <View style={styles.promoWrap}>
                <View style={styles.promoInputRow}>
                  <Tag size={16} color={COLORS.mutedText} style={{ marginLeft: 8 }} />
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter Coupon (e.g. STUDENT10)"
                    value={promoCode}
                    onChangeText={setPromoCode}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity 
                    style={styles.applyBtn} 
                    onPress={handleApplyPromo}
                  >
                    <Text style={styles.applyBtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
                {promoApplied && (
                  <Text style={styles.promoAppliedText}>Coupon STUDENT10 applied successfully!</Text>
                )}
              </View>

              {/* Price Breakdown */}
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownKey}>Items Subtotal</Text>
                <Text style={styles.breakdownVal}>₹{subtotal}</Text>
              </View>

              {promoDiscount > 0 && (
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownKey, { color: COLORS.success }]}>Promo Discount</Text>
                  <Text style={[styles.breakdownVal, { color: COLORS.success }]}>-₹{promoDiscount}</Text>
                </View>
              )}

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownKey}>Estimated Delivery</Text>
                <Text style={styles.breakdownVal}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </Text>
              </View>

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownKey}>GST (12% Printing)</Text>
                <Text style={styles.breakdownVal}>₹{taxGst}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalAmount}>₹{totalAmount}</Text>
              </View>

              <TouchableOpacity 
                style={styles.checkoutBtn}
                onPress={() => navigateTo('checkout')}
                activeOpacity={0.85}
              >
                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                <ArrowRight size={16} color={COLORS.white} />
              </TouchableOpacity>

              <View style={styles.trustBadgesRow}>
                <ShieldCheck size={14} color={COLORS.oceanBlue} />
                <Text style={styles.trustBadgeText}>
                  Safe & Secure Checkout • Razorpay Verified
                </Text>
              </View>
            </View>
          </View>
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
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  clearCartText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  cartLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  itemsColumn: {
    flex: 1.4,
    minWidth: 320,
    gap: SPACING.md,
  },
  cartItemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  itemTopRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  itemImage: {
    width: 90,
    height: 110,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
  },
  itemDetailsCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.navy,
    flex: 1,
    marginRight: 8,
  },
  specsSummaryBox: {
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.xs + 2,
    borderRadius: RADIUS.xs,
    marginVertical: 6,
  },
  specLine: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  docNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  docNameText: {
    fontSize: 11,
    color: COLORS.oceanBlue,
    fontWeight: '600',
  },
  itemPriceQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
  },
  stepperBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepperCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    minWidth: 20,
    textAlign: 'center',
  },
  editSpecsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editSpecsBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.navy,
  },
  itemTotalPrice: {
    alignItems: 'flex-end',
  },
  itemUnitRate: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  itemTotalAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
  },
  continueShoppingBtn: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueShoppingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  // Summary Sidebar
  summaryColumn: {
    width: 340,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  promoWrap: {
    marginBottom: SPACING.md,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
  },
  promoInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primaryText,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  applyBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
    marginRight: 3,
  },
  applyBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  promoAppliedText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  breakdownKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  breakdownVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.navy,
    marginBottom: SPACING.lg,
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
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingVertical: 13,
    borderRadius: RADIUS.sm,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: SPACING.md,
  },
  trustBadgeText: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: SPACING.xl,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
  },
  exploreBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
