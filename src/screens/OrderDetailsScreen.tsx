import React, { useState } from 'react';
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
  CheckCircle2, 
  Download, 
  ArrowLeft, 
  FileText, 
  RotateCcw,
  Check
} from 'lucide-react-native';

export const OrderDetailsScreen: React.FC = () => {
  const { selectedOrder, goBack, navigateTo, selectProduct } = useAppStore();
  const [downloadToast, setDownloadToast] = useState(false);

  if (!selectedOrder) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Order Not Found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={styles.backBtnText}>Back to Orders</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDownloadInvoice = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  const handleReorder = () => {
    const firstItem = selectedOrder.items[0];
    if (firstItem) {
      selectProduct(firstItem.product.id);
      navigateTo('customize');
    } else {
      navigateTo('explore');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        {/* Back Link & Header */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backLink} onPress={goBack}>
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.backLinkText}>All Orders</Text>
          </TouchableOpacity>
          <View style={styles.orderStatusPill}>
            <Text style={styles.orderStatusPillText}>{selectedOrder.orderStatus}</Text>
          </View>
        </View>

        {downloadToast && (
          <View style={styles.toastBox}>
            <CheckCircle2 size={16} color={COLORS.success} />
            <Text style={styles.toastText}>Invoice downloaded for {selectedOrder.orderNumber}</Text>
          </View>
        )}

        {/* Order Header Summary Card */}
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.orderHeading}>Order #{selectedOrder.orderNumber}</Text>
            <Text style={styles.orderSub}>Placed on {selectedOrder.orderDate}</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.invoiceBtn}
              onPress={handleDownloadInvoice}
              activeOpacity={0.8}
            >
              <Download size={14} color={COLORS.navy} />
              <Text style={styles.invoiceBtnText}>Invoice</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.reorderBtn}
              onPress={handleReorder}
              activeOpacity={0.8}
            >
              <RotateCcw size={14} color={COLORS.white} />
              <Text style={styles.reorderBtnText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Timeline Section */}
        <View style={styles.timelineCard}>
          <Text style={styles.sectionHeading}>Live Order Progress</Text>
          <Text style={styles.sectionSub}>Estimated Doorstep Delivery: {selectedOrder.estimatedDeliveryDate}</Text>

          <View style={styles.timelineList}>
            {selectedOrder.stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';
              const isLast = idx === selectedOrder.stages.length - 1;

              return (
                <View key={stage.id} style={styles.timelineItem}>
                  <View style={styles.timelineIconCol}>
                    <View style={[
                      styles.stageDot,
                      isCompleted && styles.stageDotCompleted,
                      isCurrent && styles.stageDotCurrent,
                    ]}>
                      {isCompleted ? (
                        <Check size={11} color={COLORS.white} strokeWidth={3} />
                      ) : isCurrent ? (
                        <View style={styles.stageDotPulse} />
                      ) : (
                        <View style={styles.stageDotPending} />
                      )}
                    </View>
                    {!isLast && (
                      <View style={[styles.timelineLine, isCompleted && styles.timelineLineCompleted]} />
                    )}
                  </View>

                  <View style={styles.stageContent}>
                    <View style={styles.stageTitleRow}>
                      <Text style={[styles.stageTitle, (isCompleted || isCurrent) && styles.stageTitleActive]}>
                        {stage.title}
                      </Text>
                      {stage.timestamp && (
                        <Text style={styles.stageTime}>{stage.timestamp}</Text>
                      )}
                    </View>
                    <Text style={styles.stageDesc}>{stage.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Items Ordered Card */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeading}>Items in this Order ({selectedOrder.items.length})</Text>
          {selectedOrder.items.length === 0 ? (
            <View style={styles.defaultItemRow}>
              <View style={styles.defaultItemBox}>
                <FileText size={24} color={COLORS.darkOrange} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>Customized University Black Book</Text>
                <Text style={styles.itemSpecs}>A4 • 80 GSM Bond • Golden Embossed Hardcover</Text>
                <Text style={styles.itemCopies}>{selectedOrder.pricing.copies} Copies</Text>
              </View>
              <Text style={styles.itemPrice}>₹{selectedOrder.pricing.subtotal}</Text>
            </View>
          ) : (
            selectedOrder.items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Image source={{ uri: item.product.image }} style={styles.itemImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemSpecs}>
                    {item.customization.paperSize} • {item.customization.paperGSM} • {item.customization.binding}
                  </Text>
                  <Text style={styles.itemDocName}>Document: {item.document.name}</Text>
                  <Text style={styles.itemCopies}>{item.customization.copies} Copies</Text>
                </View>
                <Text style={styles.itemPrice}>₹{item.pricing.subtotal}</Text>
              </View>
            ))
          )}
        </View>

        {/* Delivery Destination & Payment Breakdown */}
        <View style={styles.detailsGrid}>
          {/* Address */}
          <View style={styles.detailBox}>
            <Text style={styles.boxTitle}>Delivery Destination</Text>
            <Text style={styles.recipientName}>{selectedOrder.address.recipientName}</Text>
            <Text style={styles.addressLine}>{selectedOrder.address.line1}</Text>
            <Text style={styles.addressLine}>{selectedOrder.address.area}, {selectedOrder.address.city} - {selectedOrder.address.pincode}</Text>
            <Text style={styles.phoneLine}>Contact: {selectedOrder.address.phone}</Text>
            {selectedOrder.address.instructions ? (
              <Text style={styles.instructionsText}>Note: {selectedOrder.address.instructions}</Text>
            ) : null}
          </View>

          {/* Payment */}
          <View style={styles.detailBox}>
            <Text style={styles.boxTitle}>Payment Summary</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.bKey}>Items Base Subtotal</Text>
              <Text style={styles.bVal}>₹{selectedOrder.pricing.subtotal}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.bKey}>Delivery Charges</Text>
              <Text style={styles.bVal}>{selectedOrder.pricing.deliveryFee === 0 ? 'FREE' : `₹${selectedOrder.pricing.deliveryFee}`}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.bKey}>GST (12% Printing)</Text>
              <Text style={styles.bVal}>₹{selectedOrder.pricing.gstTax}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalValue}>₹{selectedOrder.pricing.total}</Text>
            </View>
            <Text style={styles.paymentMethodNotice}>Paid via {selectedOrder.paymentMethod} • Ref: {selectedOrder.transactionId}</Text>
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
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  orderStatusPill: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  orderStatusPillText: {
    color: '#0369A1',
    fontSize: 11,
    fontWeight: '800',
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
  },
  toastText: {
    fontSize: 13,
    color: '#15803D',
    fontWeight: '600',
  },
  headerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  orderHeading: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.navy,
  },
  orderSub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  invoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.navy,
  },
  reorderBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  timelineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: SPACING.lg,
  },
  timelineList: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 20,
  },
  stageDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageDotCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stageDotCurrent: {
    backgroundColor: COLORS.darkOrange,
    borderColor: COLORS.darkOrange,
  },
  stageDotPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  stageDotPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderDark,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: COLORS.border,
    marginVertical: 2,
  },
  timelineLineCompleted: {
    backgroundColor: COLORS.success,
  },
  stageContent: {
    flex: 1,
    paddingBottom: SPACING.md,
  },
  stageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  stageTitleActive: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  stageTime: {
    fontSize: 11,
    color: COLORS.mutedText,
  },
  stageDesc: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  cardSection: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  defaultItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  defaultItemBox: {
    width: 48,
    height: 56,
    borderRadius: RADIUS.xs,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
  },
  itemImg: {
    width: 50,
    height: 64,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
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
  itemDocName: {
    fontSize: 11,
    color: COLORS.oceanBlue,
    marginTop: 2,
  },
  itemCopies: {
    fontSize: 11,
    color: COLORS.darkOrange,
    fontWeight: '700',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  detailBox: {
    flex: 1,
    minWidth: 280,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  recipientName: {
    fontSize: 13,
    fontWeight: '700',
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
  instructionsText: {
    fontSize: 11,
    color: COLORS.oceanBlue,
    marginTop: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  bKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  bVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkOrange,
  },
  paymentMethodNotice: {
    fontSize: 10,
    color: COLORS.mutedText,
    marginTop: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  backBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.xs,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
