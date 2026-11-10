import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { Bell, CheckCheck, Trash2, Tag, Truck, Info } from 'lucide-react-native';

export const NotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    navigateTo 
  } = useAppStore();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Truck size={18} color={COLORS.oceanBlue} />;
      case 'offer':
        return <Tag size={18} color={COLORS.darkOrange} />;
      default:
        return <Info size={18} color={COLORS.navy} />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageSub}>Updates on orders, academic discounts, and submissions</Text>
          </View>
          {notifications.length > 0 && (
            <TouchableOpacity 
              style={styles.markAllBtn}
              onPress={markAllNotificationsAsRead}
            >
              <CheckCheck size={14} color={COLORS.navy} />
              <Text style={styles.markAllBtnText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Bell size={44} color={COLORS.mutedText} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You are all caught up!</Text>
          </View>
        ) : (
          <View style={styles.notifsList}>
            {notifications.map((n) => (
              <TouchableOpacity
                key={n.id}
                style={[styles.notifCard, !n.read && styles.notifCardUnread]}
                onPress={() => {
                  markNotificationAsRead(n.id);
                  if (n.linkScreen) navigateTo(n.linkScreen as any);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.iconCircle}>
                  {getNotifIcon(n.type)}
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.notifTitle, !n.read && styles.notifTitleUnread]}>
                      {n.title}
                    </Text>
                    <Text style={styles.notifDate}>{n.date}</Text>
                  </View>
                  <Text style={styles.notifMessage}>{n.message}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.deleteBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  accessibilityLabel="Delete notification"
                >
                  <Trash2 size={15} color={COLORS.mutedText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
    maxWidth: 780,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  headerRow: {
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
  pageSub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  markAllBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  notifsList: {
    gap: SPACING.sm,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notifCardUnread: {
    backgroundColor: '#F8FAFC',
    borderColor: COLORS.darkOrange,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
  },
  notifTitleUnread: {
    fontWeight: '800',
    color: COLORS.navy,
  },
  notifDate: {
    fontSize: 10,
    color: COLORS.mutedText,
  },
  notifMessage: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },
  deleteBtn: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
});
