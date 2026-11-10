import React, { useState } from 'react';
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
  Package, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react-native';

export const MyOrdersScreen: React.FC = () => {
  const { orders, selectOrder, navigateTo } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('All');

  const statusTabs = [
    'All',
    'Processing',
    'Printing',
    'Binding',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Processing') return o.orderStatus === 'Processing';
    if (activeTab === 'Printing') return o.orderStatus === 'Printing';
    if (activeTab === 'Binding') return o.orderStatus === 'Binding';
    if (activeTab === 'Shipped') return o.orderStatus === 'Shipped';
    if (activeTab === 'Delivered') return o.orderStatus === 'Delivered';
    if (activeTab === 'Cancelled') return o.orderStatus === 'Cancelled';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { text: '#15803D', bg: '#DCFCE7' };
      case 'Shipped':
      case 'Out for Delivery':
        return { text: '#0369A1', bg: '#E0F2FE' };
      case 'Printing':
      case 'Binding':
        return { text: '#B45309', bg: '#FEF3C7' };
      case 'Cancelled':
        return { text: '#B91C1C', bg: '#FEE2E2' };
      default:
        return { text: COLORS.navy, bg: '#F1F5F9' };
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>My Orders</Text>
            <Text style={styles.pageSub}>
              Track your black books and manage project order history
            </Text>
          </View>
        </View>

        {/* Status Tabs Filter */}
        <View style={styles.tabsWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {statusTabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.statusTabBtn, isSelected && styles.statusTabBtnSelected]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.statusTabText, isSelected && styles.statusTabTextSelected]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Package size={48} color={COLORS.mutedText} />
            <Text style={styles.emptyTitle}>No orders in {activeTab}</Text>
            <Text style={styles.emptyDesc}>
              You do not have any orders matching the selected status filter.
            </Text>
            <TouchableOpacity 
              style={styles.exploreBtn} 
              onPress={() => navigateTo('explore')}
            >
              <Text style={styles.exploreBtnText}>Explore Products</Text>
              <ArrowRight size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ordersList}>
            {filteredOrders.map((order) => {
              const statusStyle = getStatusColor(order.orderStatus);
              const totalCopies = order.pricing.copies || 1;
              const firstItem = order.items[0];

              return (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  onPress={() => selectOrder(order.id)}
                  activeOpacity={0.85}
                >
                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                      <Text style={styles.orderDate}>{order.orderDate}</Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
                        {order.orderStatus}
                      </Text>
                    </View>
                  </View>

                  {/* Order Preview Content */}
                  <View style={styles.cardBody}>
                    <View style={styles.cardInfoCol}>
                      <Text style={styles.orderProductsSummary}>
                        {firstItem ? firstItem.product.name : 'University Black Book'}
                        {order.items.length > 1 ? ` + ${order.items.length - 1} more item(s)` : ''}
                      </Text>
                      <Text style={styles.orderMetaLine}>
                        Quantity: {totalCopies} {totalCopies === 1 ? 'copy' : 'copies'} • {order.paymentMethod}
                      </Text>
                      <Text style={styles.deliveryEstimate}>
                        Estimated: {order.estimatedDeliveryDate}
                      </Text>
                    </View>

                    <View style={styles.cardPriceCol}>
                      <Text style={styles.totalPrice}>₹{order.pricing.total}</Text>
                      <View style={styles.viewDetailsRow}>
                        <Text style={styles.viewDetailsText}>View Timeline</Text>
                        <ChevronRight size={14} color={COLORS.navy} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  headerRow: {
    marginBottom: SPACING.md,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  pageSub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  tabsWrap: {
    marginBottom: SPACING.lg,
  },
  tabsScroll: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  statusTabBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusTabBtnSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  statusTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  statusTabTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  ordersList: {
    gap: SPACING.md,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.base,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  orderDate: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  cardInfoCol: {
    flex: 1,
    marginRight: SPACING.md,
  },
  orderProductsSummary: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 2,
  },
  orderMetaLine: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  deliveryEstimate: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 4,
  },
  cardPriceCol: {
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.navy,
    marginBottom: 4,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  exploreBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
