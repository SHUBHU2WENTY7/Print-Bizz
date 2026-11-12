import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  FileText, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Edit3, 
  Check, 
  GraduationCap,
  Mail,
  Phone
} from 'lucide-react-native';

export const ProfileScreen: React.FC = () => {
  const { userProfile, updateUserProfile, navigateTo, wishlist, orders, userDocuments } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [college, setCollege] = useState(userProfile.college);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    updateUserProfile({ name, email, phone, college });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const navMenuItems = [
    {
      title: 'Student Verification & College Info',
      sub: `${userProfile.college} • Roll: ${userProfile.rollNumber}`,
      icon: <GraduationCap size={18} color={COLORS.darkOrange} />,
      screen: 'auth_onboarding',
    },
    {
      title: 'Order History',
      sub: `${orders.length} orders placed`,
      icon: <Package size={18} color={COLORS.navy} />,
      screen: 'my_orders',
    },
    {
      title: 'Saved Wishlist',
      sub: `${wishlist.length} saved products`,
      icon: <Heart size={18} color={COLORS.darkOrange} />,
      screen: 'wishlist',
    },
    {
      title: 'Saved Delivery Addresses',
      sub: 'Manage hostel, college, or home addresses',
      icon: <MapPin size={18} color={COLORS.oceanBlue} />,
      screen: 'saved_addresses',
    },
    {
      title: 'My Documents Library',
      sub: `${userDocuments.length} uploaded PDF & Word files`,
      icon: <FileText size={18} color={COLORS.navy} />,
      screen: 'my_documents',
    },
    {
      title: 'Help Centre & Support',
      sub: 'FAQs, academic guidelines & customer care',
      icon: <HelpCircle size={18} color={COLORS.navy} />,
      screen: 'support',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <Text style={styles.pageTitle}>Account & Profile</Text>

        {savedToast && (
          <View style={styles.toastBox}>
            <Check size={16} color={COLORS.success} />
            <Text style={styles.toastText}>Profile information updated successfully!</Text>
          </View>
        )}

        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={28} color={COLORS.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userCollege}>{userProfile.college}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editBtn} 
              onPress={() => setIsEditing(!isEditing)}
            >
              <Edit3 size={14} color={COLORS.navy} />
              <Text style={styles.editBtnText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
              </View>
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>University Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
              </View>
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              </View>
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>College / Institution</Text>
                <TextInput style={styles.input} value={college} onChangeText={setCollege} />
              </View>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <Mail size={14} color={COLORS.secondaryText} />
                <Text style={styles.infoText}>{userProfile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Phone size={14} color={COLORS.secondaryText} />
                <Text style={styles.infoText}>{userProfile.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <GraduationCap size={14} color={COLORS.secondaryText} />
                <Text style={styles.infoText}>{userProfile.college} ({userProfile.university || 'University of Mumbai'})</Text>
              </View>
              {userProfile.rollNumber ? (
                <View style={styles.infoRow}>
                  <MapPin size={14} color={COLORS.secondaryText} />
                  <Text style={styles.infoText}>Roll No: {userProfile.rollNumber} • {userProfile.city || 'Campus'}, {userProfile.state || 'India'}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* Real Uploaded Student ID Cards Display */}
          {(userProfile.idCardFront || userProfile.idCardBack) && (
            <View style={{ marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#E2E8F0' }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.navy, marginBottom: 8 }}>
                Uploaded Student ID Cards
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {userProfile.idCardFront ? (
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image 
                      source={{ uri: userProfile.idCardFront }} 
                      style={{ width: '100%', height: 90, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1' }} 
                      resizeMode="cover" 
                    />
                    <Text style={{ fontSize: 11, color: COLORS.secondaryText, marginTop: 4 }}>ID Front</Text>
                  </View>
                ) : null}
                {userProfile.idCardBack ? (
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image 
                      source={{ uri: userProfile.idCardBack }} 
                      style={{ width: '100%', height: 90, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1' }} 
                      resizeMode="cover" 
                    />
                    <Text style={{ fontSize: 11, color: COLORS.secondaryText, marginTop: 4 }}>ID Back</Text>
                  </View>
                ) : null}
              </View>
            </View>
          )}
        </View>

        {/* Quick Menu Links */}
        <View style={styles.menuCard}>
          <Text style={styles.menuHeading}>Quick Management</Text>
          {navMenuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, idx === navMenuItems.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => navigateTo(item.screen as any)}
              activeOpacity={0.8}
            >
              <View style={styles.menuIconWrap}>{item.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSub}>{item.sub}</Text>
              </View>
              <ChevronRight size={16} color={COLORS.mutedText} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout / Switch Session Action */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => {
            updateUserProfile({
              name: '',
              email: '',
              phone: '',
              state: '',
              city: '',
              college: '',
              collegeAddress: '',
              university: '',
              rollNumber: '',
              idCardFront: null,
              idCardBack: null,
              isRegistered: false,
            });
            navigateTo('auth_onboarding');
          }}
        >
          <LogOut size={16} color={COLORS.error} />
          <Text style={styles.logoutBtnText}>Log Out / Switch Account</Text>
        </TouchableOpacity>
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
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.lg,
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: SPACING.md,
  },
  toastText: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.oceanBlue,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.navy,
  },
  userCollege: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  infoGrid: {
    gap: 8,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.secondaryText,
  },
  editForm: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    gap: SPACING.sm,
  },
  inputWrap: {
    gap: 3,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 7,
    fontSize: 13,
  },
  saveBtn: {
    backgroundColor: COLORS.navy,
    paddingVertical: 10,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  menuHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
    paddingHorizontal: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  menuItemSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  logoutBtnText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '700',
  },
});
