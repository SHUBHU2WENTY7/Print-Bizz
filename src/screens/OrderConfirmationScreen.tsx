import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ArrowRight, 
  Download, 
  FileText 
} from 'lucide-react-native';

export const OrderConfirmationScreen: React.FC = () => {
  const { activeOrder, navigateTo, selectOrder } = useAppStore();

  if (!activeOrder) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Order Found</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigateTo('home')}>
          <Text style={styles.primaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTrackOrder = () => {
    selectOrder(activeOrder.id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        {/* Success Header Card */}
        <View style={styles.successCard}>
          <View style={styles.successIconCircle}>
            <CheckCircle2 size={44} color={COLORS.success} />
          </View>
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSub}>
            Thank you for your order. A digital receipt and tracking link have been sent to your university email.
          </Text>

          <View style={styles.orderIdBadge}>
            <Text style={styles.orderIdLabel}>Order Number:</Text>
            <Text style={styles.orderIdValue}>{activeOrder.orderNumber}</Text>
          </View>
        </View>

        {/* Order Details Receipt Card */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptHeading}>Order Summary & Delivery</Text>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptKey}>Order Date & Time</Text>
            <Text style={styles.receiptVal}>{activeOrder.orderDate}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptKey}>Estimated Delivery</Text>
            <Text style={[styles.receiptVal, { color: COLORS.success, fontWeight: '800' }]}>
              {activeOrder.estimatedDeliveryDate}
            </Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptKey}>Payment Method</Text>
            <Text style={styles.receiptVal}>{activeOrder.paymentMethod} (Verified)</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptKey}>Transaction ID</Text>
            <Text style={styles.receiptVal}>{activeOrder.transactionId}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptKey}>Delivery Address</Text>
            <Text style={styles.receiptVal}>
              {activeOrder.address.recipientName}, {activeOrder.address.line1}, {activeOrder.address.city} - {activeOrder.address.pincode}
            </Text>
          </View>

          <View style={styles.receiptDivider} />

          {/* Items Breakdown */}
          <Text style={styles.itemsHeading}>Ordered Items ({activeOrder.items.length})</Text>
          {activeOrder.items.map((item, idx) => (
            <View key={idx} style={styles.receiptItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemSpecs}>
                  {item.customization.paperSize} • {item.customization.paperGSM} • {item.customization.binding}
                </Text>
                <Text style={styles.itemCopies}>{item.customization.copies} {item.customization.copies === 1 ? 'copy' : 'copies'}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.pricing.subtotal}</Text>
            </View>
          ))}

          <View style={styles.receiptDivider} />

          {/* Total Row */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalAmount}>₹{activeOrder.pricing.total}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.trackOrderBtn}
            onPress={handleTrackOrder}
            activeOpacity={0.85}
          >
            <Truck size={16} color={COLORS.white} />
            <Text style={styles.trackOrderBtnText}>Track Order Progress</Text>
            <ArrowRight size={16} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.continueShoppingBtn}
            onPress={() => navigateTo('home')}
            activeOpacity={0.85}
          >
            <Text style={styles.continueShoppingBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
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
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    marginBottom: 6,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 19,
    marginBottom: SPACING.lg,
  },
  orderIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  orderIdLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  orderIdValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  receiptHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  receiptKey: {
    width: 140,
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  receiptVal: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
    textAlign: 'right',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  itemsHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  itemSpecs: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  itemCopies: {
    fontSize: 11,
    color: COLORS.darkOrange,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.darkOrange,
  },
  actionsRow: {
    gap: SPACING.sm,
  },
  trackOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
  },
  trackOrderBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  continueShoppingBtn: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueShoppingBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  primaryBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
