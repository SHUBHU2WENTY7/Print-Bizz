import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { 
  INDIAN_STATES, 
  CITIES_BY_STATE, 
  UNIVERSITIES_LIST, 
  COLLEGES_DATA,
  CollegeItem,
  UniversityItem
} from '../constants/indianEducationData';
import { 
  BookOpen, 
  CheckCircle2, 
  UploadCloud, 
  MapPin, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Building, 
  IdCard, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react-native';

export const AuthOnboardingScreen: React.FC = () => {
  const { registerUser, navigateTo, userProfile } = useAppStore();

  const [name, setName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '');

  const [selectedState, setSelectedState] = useState(userProfile.state || 'Maharashtra');
  const [selectedCity, setSelectedCity] = useState(userProfile.city || 'Mumbai');
  const [selectedUniversity, setSelectedUniversity] = useState(userProfile.university || '');
  const [selectedCollege, setSelectedCollege] = useState(userProfile.college || '');
  const [collegeAddress, setCollegeAddress] = useState(userProfile.collegeAddress || '');
  const [rollNumber, setRollNumber] = useState(userProfile.rollNumber || '');

  const [idCardFront, setIdCardFront] = useState<string | null>(userProfile.idCardFront || null);
  const [idCardBack, setIdCardBack] = useState<string | null>(userProfile.idCardBack || null);

  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showUnivPicker, setShowUnivPicker] = useState(false);
  const [showCollegePicker, setShowCollegePicker] = useState(false);

  const [collegeSearch, setCollegeSearch] = useState('');
  const [univSearch, setUnivSearch] = useState('');

  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);

  // Filter available cities by state ONLY
  const availableCities = CITIES_BY_STATE[selectedState] || [];

  const handleSelectState = (st: string) => {
    setSelectedState(st);
    const cities = CITIES_BY_STATE[st] || [];
    setSelectedCity(cities[0] || '');
    setSelectedCollege('');
    setCollegeAddress('');
    setSelectedUniversity('');
    setShowStatePicker(false);
  };

  const handleSelectCity = (ct: string) => {
    setSelectedCity(ct);
    setSelectedCollege('');
    setCollegeAddress('');
    setSelectedUniversity('');
    setShowCityPicker(false);
  };

  // Filter available universities
  const availableUniversities = UNIVERSITIES_LIST.filter((u) => {
    if (!univSearch) return true;
    return (
      u.name.toLowerCase().includes(univSearch.toLowerCase()) ||
      u.shortName.toLowerCase().includes(univSearch.toLowerCase())
    );
  });

  // Filter available colleges strictly by state AND city
  const availableColleges = COLLEGES_DATA.filter((c) => {
    const matchesCity = c.state === selectedState && c.city.toLowerCase() === selectedCity.toLowerCase();
    if (!matchesCity) return false;
    if (!collegeSearch) return true;
    return (
      c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      c.shortName.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      c.address.toLowerCase().includes(collegeSearch.toLowerCase())
    );
  });

  const handleSelectCollege = (col: CollegeItem) => {
    setSelectedCollege(col.name);
    setCollegeAddress(`${col.address}, ${col.pincode}`);
    if (col.university) {
      setSelectedUniversity(col.university);
    }
    setShowCollegePicker(false);
  };

  const handleSelectUniversity = (univ: UniversityItem) => {
    setSelectedUniversity(univ.name);
    setShowUnivPicker(false);
  };

  const handleFrontUpload = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setIdCardFront(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackUpload = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setIdCardBack(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill in your name, email ID, and phone number.');
      return;
    }
    if (!selectedCollege.trim() || !rollNumber.trim()) {
      alert('Please select your college and enter your roll number.');
      return;
    }

    registerUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      state: selectedState,
      city: selectedCity,
      college: selectedCollege,
      collegeAddress: collegeAddress,
      university: selectedUniversity,
      rollNumber: rollNumber.trim(),
      idCardFront,
      idCardBack,
      isRegistered: true,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Hidden file inputs for web */}
      {Platform.OS === 'web' && (
        <>
          <input
            type="file"
            ref={frontInputRef as any}
            style={{ display: 'none' }}
            accept="image/*,.pdf"
            onChange={handleFrontUpload}
          />
          <input
            type="file"
            ref={backInputRef as any}
            style={{ display: 'none' }}
            accept="image/*,.pdf"
            onChange={handleBackUpload}
          />
        </>
      )}

      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.logoBadge}>
          <BookOpen size={24} color={COLORS.white} strokeWidth={2.4} />
        </View>
        <Text style={styles.bannerTitle}>PRINT BIZZ</Text>
        <Text style={styles.bannerSub}>Student Sign-In & Academic Verification</Text>
        <View style={styles.verifiedTag}>
          <ShieldCheck size={14} color="#15803D" />
          <Text style={styles.verifiedTagText}>Student Sign-In & Verification</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionHeading}>1. Student Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Legal Name (For Book Stamping)</Text>
          <View style={styles.inputWrapper}>
            <User size={16} color={COLORS.mutedText} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full legal name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>College Email ID</Text>
            <View style={styles.inputWrapper}>
              <Mail size={16} color={COLORS.mutedText} />
              <TextInput
                style={styles.textInput}
                placeholder="name@college.ac.in"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Mobile WhatsApp Number</Text>
            <View style={styles.inputWrapper}>
              <Phone size={16} color={COLORS.mutedText} />
              <TextInput
                style={styles.textInput}
                placeholder="+91 98765 43210"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { marginTop: 20 }]}>2. Location & Campus Selection</Text>

        {/* State Selection */}
        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>State</Text>
            <TouchableOpacity 
              style={styles.dropdownBtn}
              onPress={() => {
                setShowStatePicker(!showStatePicker);
                setShowCityPicker(false);
                setShowCollegePicker(false);
                setShowUnivPicker(false);
              }}
            >
              <Text style={styles.dropdownBtnText}>{selectedState}</Text>
              <MapPin size={14} color={COLORS.navy} />
            </TouchableOpacity>

            {showStatePicker && (
              <View style={styles.pickerBox}>
                <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                  {INDIAN_STATES.map((st) => (
                    <TouchableOpacity
                      key={st}
                      style={[styles.pickerItem, selectedState === st && styles.pickerItemActive]}
                      onPress={() => handleSelectState(st)}
                    >
                      <Text style={[styles.pickerItemText, selectedState === st && styles.pickerItemTextActive]}>
                        {st}
                      </Text>
                      {selectedState === st && <Check size={14} color={COLORS.darkOrange} />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* City Selection */}
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>City</Text>
            <TouchableOpacity 
              style={styles.dropdownBtn}
              onPress={() => {
                setShowCityPicker(!showCityPicker);
                setShowStatePicker(false);
                setShowCollegePicker(false);
                setShowUnivPicker(false);
              }}
            >
              <Text style={styles.dropdownBtnText}>{selectedCity}</Text>
              <Building size={14} color={COLORS.navy} />
            </TouchableOpacity>

            {showCityPicker && (
              <View style={styles.pickerBox}>
                <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                  {availableCities.map((ct) => (
                    <TouchableOpacity
                      key={ct}
                      style={[styles.pickerItem, selectedCity === ct && styles.pickerItemActive]}
                      onPress={() => handleSelectCity(ct)}
                    >
                      <Text style={[styles.pickerItemText, selectedCity === ct && styles.pickerItemTextActive]}>
                        {ct}
                      </Text>
                      {selectedCity === ct && <Check size={14} color={COLORS.darkOrange} />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        {/* University Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Affiliated University</Text>
          <TouchableOpacity 
            style={styles.dropdownBtn}
            onPress={() => {
              setShowUnivPicker(!showUnivPicker);
              setShowCollegePicker(false);
              setShowStatePicker(false);
              setShowCityPicker(false);
            }}
          >
            <Text style={styles.dropdownBtnText} numberOfLines={1}>{selectedUniversity || 'Select or Keep University'}</Text>
            <GraduationCap size={16} color={COLORS.navy} />
          </TouchableOpacity>

          {showUnivPicker && (
            <View style={styles.pickerBox}>
              <TextInput
                style={styles.pickerSearchInput}
                placeholder="Search university across India..."
                value={univSearch}
                onChangeText={setUnivSearch}
              />
              <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                {availableUniversities.map((u) => (
                  <TouchableOpacity
                    key={u.id}
                    style={[styles.pickerItem, selectedUniversity === u.name && styles.pickerItemActive]}
                    onPress={() => handleSelectUniversity(u)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.pickerItemText, selectedUniversity === u.name && styles.pickerItemTextActive]}>
                        {u.name}
                      </Text>
                      <Text style={styles.pickerItemSub}>{u.shortName} • {u.state}</Text>
                    </View>
                    {selectedUniversity === u.name && <Check size={14} color={COLORS.darkOrange} />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* College Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Select Your College in {selectedCity}</Text>
          <TouchableOpacity 
            style={styles.dropdownBtn}
            onPress={() => {
              setShowCollegePicker(!showCollegePicker);
              setShowUnivPicker(false);
              setShowStatePicker(false);
              setShowCityPicker(false);
            }}
          >
            <Text style={styles.dropdownBtnText} numberOfLines={1}>{selectedCollege || `Select College in ${selectedCity}`}</Text>
            <Building size={16} color={COLORS.navy} />
          </TouchableOpacity>

          {showCollegePicker && (
            <View style={styles.pickerBox}>
              <TextInput
                style={styles.pickerSearchInput}
                placeholder={`Search colleges in ${selectedCity}...`}
                value={collegeSearch}
                onChangeText={setCollegeSearch}
              />
              <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
                {availableColleges.length > 0 ? (
                  availableColleges.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      style={[styles.pickerItem, selectedCollege === c.name && styles.pickerItemActive]}
                      onPress={() => handleSelectCollege(c)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.pickerItemText, selectedCollege === c.name && styles.pickerItemTextActive]}>
                          {c.name}
                        </Text>
                        <Text style={styles.pickerItemSub}>{c.address} • Affiliated to: {c.university}</Text>
                      </View>
                      {selectedCollege === c.name && <Check size={14} color={COLORS.darkOrange} />}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{ padding: 12 }}>
                    <Text style={{ fontSize: 12, color: COLORS.secondaryText, marginBottom: 8 }}>
                      No colleges pre-listed in {selectedCity}. You can type your college name:
                    </Text>
                    <TextInput
                      style={styles.pickerSearchInput}
                      placeholder="Type your college name..."
                      value={selectedCollege}
                      onChangeText={(val) => {
                        setSelectedCollege(val);
                        setCollegeAddress(`${val}, ${selectedCity}, ${selectedState}`);
                      }}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          {/* Auto-detected College Address Box */}
          {collegeAddress ? (
            <View style={styles.autoDetectedBox}>
              <View style={styles.autoDetectedHeader}>
                <MapPin size={13} color={COLORS.oceanBlue} />
                <Text style={styles.autoDetectedTitle}>Auto-Detected Campus Delivery Address:</Text>
              </View>
              <Text style={styles.autoDetectedAddress}>{collegeAddress}</Text>
            </View>
          ) : null}
        </View>

        {/* Roll Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Student Roll / Seat / PRN Number</Text>
          <View style={styles.inputWrapper}>
            <IdCard size={16} color={COLORS.mutedText} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 221080045"
              value={rollNumber}
              onChangeText={setRollNumber}
            />
          </View>
        </View>

        {/* 3. College ID Card Upload (Front & Back) */}
        <Text style={[styles.sectionHeading, { marginTop: 20 }]}>3. College ID Card Verification</Text>
        <Text style={styles.idCardNotice}>
          Upload photos of your student ID card (Front & Back) for university concession and proof of candidate enrollment.
        </Text>

        <View style={styles.idCardRow}>
          {/* Front ID Card */}
          <View style={styles.idCardCol}>
            <Text style={styles.idCardLabel}>ID Card (Front)</Text>
            <TouchableOpacity 
              style={[styles.idCardBox, idCardFront && styles.idCardBoxFilled]}
              onPress={() => {
                if (Platform.OS === 'web') frontInputRef.current?.click();
              }}
              activeOpacity={0.8}
            >
              {idCardFront ? (
                <View style={styles.idCardPreviewWrap}>
                  <Image source={{ uri: idCardFront }} style={styles.idCardImage} resizeMode="cover" />
                  <View style={styles.idCardCheckBadge}>
                    <CheckCircle2 size={16} color={COLORS.success} />
                  </View>
                  <Text style={styles.idCardChangeText}>Change Photo</Text>
                </View>
              ) : (
                <View style={styles.idCardPlaceholder}>
                  <UploadCloud size={24} color={COLORS.darkOrange} />
                  <Text style={styles.idCardPlaceholderText}>Upload Front Side</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Back ID Card */}
          <View style={styles.idCardCol}>
            <Text style={styles.idCardLabel}>ID Card (Back)</Text>
            <TouchableOpacity 
              style={[styles.idCardBox, idCardBack && styles.idCardBoxFilled]}
              onPress={() => {
                if (Platform.OS === 'web') backInputRef.current?.click();
              }}
              activeOpacity={0.8}
            >
              {idCardBack ? (
                <View style={styles.idCardPreviewWrap}>
                  <Image source={{ uri: idCardBack }} style={styles.idCardImage} resizeMode="cover" />
                  <View style={styles.idCardCheckBadge}>
                    <CheckCircle2 size={16} color={COLORS.success} />
                  </View>
                  <Text style={styles.idCardChangeText}>Change Photo</Text>
                </View>
              ) : (
                <View style={styles.idCardPlaceholder}>
                  <UploadCloud size={24} color={COLORS.darkOrange} />
                  <Text style={styles.idCardPlaceholderText}>Upload Back Side</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Action Button */}
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color={COLORS.white} />
          <Text style={styles.submitBtnText}>Verify & Launch Print Bizz App</Text>
          <ArrowRight size={18} color={COLORS.white} />
        </TouchableOpacity>

        {/* Demo Fast Track */}
        <TouchableOpacity 
          style={styles.demoTrackBtn}
          onPress={() => {
            handleSubmit();
            navigateTo('home');
          }}
        >
          <Text style={styles.demoTrackBtnText}>Quick Continue with Default Verified Profile →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.base,
    paddingBottom: 80,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  banner: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 1.5,
  },
  bannerSub: {
    fontSize: 14,
    color: COLORS.secondaryText,
    fontWeight: '600',
    marginTop: 4,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginTop: 10,
  },
  verifiedTagText: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#FED7AA',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
    letterSpacing: 0.3,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 12,
    height: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primaryText,
    fontWeight: '500',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 12,
    height: 44,
  },
  dropdownBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
    flex: 1,
  },
  pickerBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.navy,
    borderRadius: RADIUS.sm,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 100,
  },
  pickerSearchInput: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pickerItemActive: {
    backgroundColor: 'rgba(234, 88, 12, 0.08)',
  },
  pickerItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  pickerItemTextActive: {
    color: COLORS.darkOrange,
    fontWeight: '700',
  },
  pickerItemSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  autoDetectedBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: RADIUS.sm,
    padding: 10,
    marginTop: 8,
  },
  autoDetectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  autoDetectedTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.oceanBlue,
  },
  autoDetectedAddress: {
    fontSize: 12,
    color: COLORS.primaryText,
    fontWeight: '500',
  },
  idCardNotice: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginBottom: 12,
    lineHeight: 18,
  },
  idCardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: SPACING.lg,
  },
  idCardCol: {
    flex: 1,
  },
  idCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 6,
  },
  idCardBox: {
    height: 120,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  idCardBoxFilled: {
    borderStyle: 'solid',
    borderColor: COLORS.success,
  },
  idCardPlaceholder: {
    alignItems: 'center',
    gap: 6,
  },
  idCardPlaceholderText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  idCardPreviewWrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  idCardImage: {
    width: '100%',
    height: '100%',
  },
  idCardCheckBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
  },
  idCardChangeText: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    paddingVertical: 2,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    marginTop: 10,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  demoTrackBtn: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 6,
  },
  demoTrackBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkOrange,
  },
});
