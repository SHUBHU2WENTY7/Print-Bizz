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
import { BarcodeView } from '../components/BarcodeView';
import { 
  CheckCircle, 
  Download, 
  Truck, 
  Copy, 
  Check, 
  BookOpen, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react-native';

export const OrderConfirmationScreen: React.FC = () => {
  const { activeOrder, navigateTo } = useAppStore();
  const [copiedTxn, setCopiedTxn] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!activeOrder) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>No Order Found</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigateTo('home')}>
          <Text style={styles.primaryBtnText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCopyTxn = () => {
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  const handleDownloadReceipt = () => {
    setDownloaded(true);
    alert(`E-Receipt for ${activeOrder.orderNumber} generated & downloaded successfully.`);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const firstItem = activeOrder.items[0];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Top Success Banner (Reference 2 concept) */}
          <View style={styles.topBanner}>
            <View style={styles.successIconBubble}>
              <CheckCircle size={36} color={COLORS.success} />
            </View>
            <Text style={styles.successTitle}>Order Confirmed & Placed!</Text>
            <Text style={styles.successSubtitle}>
              Your specifications have been routed to our Goa production press.
            </Text>
          </View>

          {/* DIGITAL RECEIPT CARD (Reference 2 style) */}
          <View style={styles.receiptCard}>
            {/* Header with Print Bizz branding */}
            <View style={styles.receiptHeader}>
              <View style={styles.brandRow}>
                <View style={styles.brandBadge}>
                  <BookOpen size={16} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.receiptBrand}>PRINT BIZZ</Text>
                  <Text style={styles.receiptHub}>Goa Press ➔ Thane Distribution Hub</Text>
                </View>
              </View>

              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>SUCCESS</Text>
              </View>
            </View>

            {/* Product Summary Row */}
            <View style={styles.productSnippet}>
              <Image 
                source={{ uri: firstItem?.product.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' }} 
                style={styles.snippetImage} 
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.snippetTitle}>
                  {firstItem?.product.name || 'Customized Black Book'}
                </Text>
                <Text style={styles.snippetSpecs}>
                  {firstItem?.customization.paperGSM || '80 GSM Bond'} • {firstItem?.customization.binding.split(' ')[0] || 'Gold Embossed'}
                </Text>
                <View style={styles.snippetQtyRow}>
                  <Text style={styles.snippetCopies}>
                    Quantity: {activeOrder.pricing.copies} {activeOrder.pricing.copies > 1 ? 'copies' : 'copy'}
                  </Text>
                  <Text style={styles.snippetPrice}>₹{activeOrder.pricing.subtotal}</Text>
                </View>
              </View>
            </View>

            <View style={styles.receiptDivider} />

            {/* Receipt Meta Grid */}
            <View style={styles.metaGrid}>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Order Reference</Text>
                <Text style={styles.metaVal}>{activeOrder.orderNumber}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Customer Name</Text>
                <Text style={styles.metaVal}>{activeOrder.customerName}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Transaction ID</Text>
                <TouchableOpacity style={styles.txnRow} onPress={handleCopyTxn}>
                  <Text style={styles.txnText}>{activeOrder.transactionId}</Text>
                  {copiedTxn ? <Check size={12} color={COLORS.success} /> : <Copy size={12} color={COLORS.oceanBlue} />}
                </TouchableOpacity>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Order Timestamp</Text>
                <Text style={styles.metaVal}>{activeOrder.orderDate}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Payment Mode</Text>
                <Text style={styles.metaVal}>{activeOrder.paymentMethod} (Verified)</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Destination Address</Text>
                <Text style={[styles.metaVal, { maxWidth: 220, textAlign: 'right' }]} numberOfLines={2}>
                  {activeOrder.address.line1}, {activeOrder.address.city}
                </Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Estimated Delivery</Text>
                <Text style={[styles.metaVal, { color: COLORS.oceanBlue }]}>
                  {activeOrder.estimatedDeliveryDate}
                </Text>
              </View>
            </View>

            <View style={styles.receiptDivider} />

            {/* Total Row */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount Paid</Text>
              <Text style={styles.totalAmount}>₹{activeOrder.pricing.total}</Text>
            </View>

            <View style={styles.receiptDivider} />

            {/* BARCODE / QR VERIFICATION CREDENTIAL (Reference 2) */}
            <View style={styles.barcodeSection}>
              <Text style={styles.barcodeSectionTitle}>Logistics & Dispatch Verification</Text>
              <BarcodeView 
                orderNumber={activeOrder.orderNumber}
                verificationToken={activeOrder.barcodeToken}
              />
            </View>
          </View>

          {/* TWO PROMINENT ACTION BUTTONS (Specification requirement) */}
          <View style={styles.actionButtonsCol}>
            <TouchableOpacity 
              style={styles.trackOrderBtn}
              onPress={() => navigateTo('order_tracking')}
              activeOpacity={0.85}
            >
              <Truck size={18} color={COLORS.white} />
              <Text style={styles.trackOrderBtnText}>Track My Order (11 Stages)</Text>
              <ArrowRight size={16} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.downloadReceiptBtn}
              onPress={handleDownloadReceipt}
              activeOpacity={0.85}
            >
              <Download size={18} color={COLORS.navy} />
              <Text style={styles.downloadReceiptBtnText}>
                {downloaded ? 'Receipt Downloaded!' : 'Download E-Receipt (PDF)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
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
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  topBanner: {
    alignItems: 'center',
    paddingVertical: SPACING.base,
    marginBottom: SPACING.xs,
  },
  successIconBubble: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: -0.3,
  },
  successSubtitle: {
    fontSize: 12,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 340,
    marginTop: 4,
    lineHeight: 17,
  },
  receiptCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: SPACING.base,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptBrand: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0.5,
  },
  receiptHub: {
    fontSize: 10,
    color: COLORS.oceanBlue,
    fontWeight: '600',
  },
  statusPill: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  productSnippet: {
    flexDirection: 'row',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  snippetImage: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
  },
  snippetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  snippetSpecs: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  snippetQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  snippetCopies: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  snippetPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  metaGrid: {
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaKey: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontWeight: '500',
  },
  metaVal: {
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: '700',
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  txnText: {
    fontSize: 12,
    fontFamily: 'Courier',
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.navy,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.navy,
  },
  barcodeSection: {
    marginTop: 4,
    width: '100%',
  },
  barcodeSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  actionButtonsCol: {
    gap: SPACING.sm,
  },
  trackOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 15,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.darkOrange,
  },
  trackOrderBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  downloadReceiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  downloadReceiptBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
  },
});
