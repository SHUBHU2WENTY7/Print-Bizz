import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Truck, 
  ArrowLeft 
} from 'lucide-react-native';

export const CartScreen: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    navigateTo, 
    selectProduct,
    clearCart 
  } = useAppStore();

  const handleEdit = (productId: string) => {
    selectProduct(productId);
    navigateTo('customize');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <View style={styles.emptyIconBubble}>
          <ShoppingBag size={42} color={COLORS.mutedText} />
        </View>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtext}>
          No Black Books configured yet. Choose your academic edition and customize your binding specifications.
        </Text>
        <TouchableOpacity 
          style={styles.browseBtn}
          onPress={() => navigateTo('home')}
        >
          <Text style={styles.browseBtnText}>Explore Black Books</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate aggregated totals
  let subtotal = 0;
  let tax = 0;
  let totalCopies = 0;
  cart.forEach((item) => {
    subtotal += item.pricing.subtotal;
    tax += item.pricing.gstTax;
    totalCopies += item.customization.copies;
  });

  const deliveryFee = subtotal >= 699 ? 0 : 49;
  const finalTotal = subtotal + tax + deliveryFee;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.cartTitle}>Order Cart</Text>
              <Text style={styles.cartSubtitle}>
                {cart.length} item{cart.length > 1 ? 's' : ''} ({totalCopies} copies)
              </Text>
            </View>
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Item Cards */}
          <View style={styles.itemsList}>
            {cart.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemMainRow}>
                  <Image source={{ uri: item.product.image }} style={styles.itemThumbnail} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.product.name}</Text>
                    <Text style={styles.itemTagline}>{item.product.tagline}</Text>
                    
                    {/* Document attached */}
                    <View style={styles.docPill}>
                      <FileText size={12} color={COLORS.oceanBlue} />
                      <Text style={styles.docPillText} numberOfLines={1}>
                        {item.document.name} ({item.document.pageCount} pgs)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Specs Pill List */}
                <View style={styles.specsRow}>
                  <Text style={styles.specTag}>{item.customization.paperSize}</Text>
                  <Text style={styles.specTag}>{item.customization.paperGSM}</Text>
                  <Text style={styles.specTag}>{item.customization.printType}</Text>
                  <Text style={styles.specTag}>{item.customization.binding.split(' ')[0]} Stamping</Text>
                </View>

                {/* Quantity & Unit Pricing Controls */}
                <View style={styles.cardBottomRow}>
                  {/* Quantity Counter */}
                  <View style={styles.qtyControl}>
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateCartQuantity(item.id, -1)}
                    >
                      <Minus size={14} color={COLORS.navy} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>
                      {item.customization.copies.toString().padStart(2, '0')}
                    </Text>
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateCartQuantity(item.id, 1)}
                    >
                      <Plus size={14} color={COLORS.navy} />
                    </TouchableOpacity>
                  </View>

                  {/* Actions: Edit & Remove */}
                  <View style={styles.itemActionGroup}>
                    <TouchableOpacity 
                      style={styles.actionBtnSmall}
                      onPress={() => handleEdit(item.product.id)}
                    >
                      <Edit3 size={14} color={COLORS.oceanBlue} />
                      <Text style={styles.actionBtnTextSmall}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.actionBtnSmall, { borderColor: '#FEE2E2' }]}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={14} color={COLORS.error} />
                      <Text style={[styles.actionBtnTextSmall, { color: COLORS.error }]}>Remove</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Item Total Price */}
                  <View style={styles.itemPriceBlock}>
                    <Text style={styles.itemPriceUnit}>
                      ₹{item.pricing.unitPrice} / copy
                    </Text>
                    <Text style={styles.itemPriceTotal}>
                      ₹{item.pricing.subtotal}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Delivery & Logistics Assurance */}
          <View style={styles.deliveryAssuranceCard}>
            <Truck size={18} color={COLORS.oceanBlue} />
            <View style={{ flex: 1 }}>
              <Text style={styles.assuranceTitle}>Express Mumbai Doorstep Dispatch</Text>
              <Text style={styles.assuranceDesc}>
                Manufactured at Goa press. Transported via Thane distribution hub for prompt Mumbai delivery.
              </Text>
            </View>
          </View>

          {/* Transparent Price Breakdown */}
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Price Breakdown</Text>
            
            <View style={styles.bdRow}>
              <Text style={styles.bdLabel}>Subtotal ({totalCopies} copies)</Text>
              <Text style={styles.bdVal}>₹{subtotal}</Text>
            </View>

            <View style={styles.bdRow}>
              <Text style={styles.bdLabel}>Thane to Mumbai Delivery</Text>
              <Text style={[styles.bdVal, deliveryFee === 0 && { color: COLORS.success }]}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </Text>
            </View>

            <View style={styles.bdRow}>
              <Text style={styles.bdLabel}>GST (12% Printing Services)</Text>
              <Text style={styles.bdVal}>₹{tax}</Text>
            </View>

            <View style={styles.bdDivider} />

            <View style={styles.bdTotalRow}>
              <View>
                <Text style={styles.bdTotalLabel}>Grand Total</Text>
                <Text style={styles.taxInclusiveNote}>(Inclusive of all manufacturing & taxes)</Text>
              </View>
              <Text style={styles.bdTotalAmount}>₹{finalTotal}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Checkout CTA */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutBarInner}>
          <TouchableOpacity 
            style={styles.continueShopBtn}
            onPress={() => navigateTo('home')}
          >
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.continueShopText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => navigateTo('checkout')}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            <ArrowRight size={16} color={COLORS.white} />
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
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 90,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  emptyIconBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.base,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.navy,
  },
  emptySubtext: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 320,
    marginTop: 6,
    lineHeight: 18,
  },
  browseBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    marginTop: SPACING.lg,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.base,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
  },
  cartSubtitle: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '600',
    marginTop: 2,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.error,
  },
  itemsList: {
    gap: SPACING.md,
    marginBottom: SPACING.base,
  },
  itemCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemMainRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  itemThumbnail: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
  },
  itemTagline: {
    fontSize: 11,
    color: COLORS.darkOrange,
    fontWeight: '600',
    marginTop: 1,
  },
  docPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  docPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: SPACING.md,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.borderLight,
  },
  specTag: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryText,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    paddingHorizontal: 10,
  },
  itemActionGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  actionBtnTextSmall: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  itemPriceBlock: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  itemPriceUnit: {
    fontSize: 10,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  itemPriceTotal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
  },
  deliveryAssuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.lightBlue,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.oceanBlue,
    marginBottom: SPACING.base,
  },
  assuranceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  assuranceDesc: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
    lineHeight: 15,
  },
  breakdownCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  breakdownTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  bdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bdLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  bdVal: {
    fontSize: 13,
    color: COLORS.navy,
    fontWeight: '700',
  },
  bdDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  bdTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  bdTotalLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.navy,
  },
  taxInclusiveNote: {
    fontSize: 10,
    color: COLORS.secondaryText,
  },
  bdTotalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
  },
  checkoutBar: {
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
  checkoutBarInner: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  continueShopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  continueShopText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
