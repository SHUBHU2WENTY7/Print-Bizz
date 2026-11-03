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
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  FileQuestion,
  ShieldCheck
} from 'lucide-react-native';

export const SupportScreen: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const faqs = [
    {
      q: 'What are the standard black book formatting requirements?',
      a: 'Most universities (Mumbai University, SPPU, VTU, etc.) require standard A4 paper, a minimum 1.25" to 1.5" left margin clearance for hardcover binding, 80 GSM bond paper, and double-sided printing. The front cover and spine must feature gold thermal foil stamping with college name, project title, student name, and year.',
    },
    {
      q: 'How does the Virtual Black Book preview work?',
      a: 'When you upload your genuine PDF or Word document in Step 2 of the customizer, our preflight engine parses the pages and renders a 3D hardcover virtual book preview. You can turn pages, verify margins, and inspect the gold foil lettering before finalizing your order.',
    },
    {
      q: 'What paper GSM should I choose?',
      a: 'We offer 75 GSM Standard (budget option), 80 GSM Bond (official university standard with zero show-through), and 100 GSM Executive (heavyweight archival quality for PhD dissertations and MBA capstones).',
    },
    {
      q: 'How long does production and doorstep delivery take?',
      a: 'Standard academic book crafting and doorstep courier delivery takes 3 to 5 business days. Express priority courier takes 1 to 2 business days. Real-time tracking is provided from printing to doorstep.',
    },
    {
      q: 'Can I order multiple copies for my guide and external examiners?',
      a: 'Yes! You can choose any number of copies in Step 5 of customization. Volume discounts of 5% to 15% are applied automatically when ordering 2 or more copies.',
    },
    {
      q: 'Are certificates, CD sleeves, and butter paper included?',
      a: 'You can easily add translucent butter paper tissue inserts, peel-and-stick CD/DVD pockets, and corner brass protective tabs in the optional add-ons section.',
    },
  ];

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      alert('Please fill in both subject and message.');
      return;
    }
    const tid = 'TKT-PB-' + Math.floor(10000 + Math.random() * 90000);
    setTicketId(tid);
    setTicketSubmitted(true);
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrap}>
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Help & Support Centre</Text>
          <Text style={styles.pageSub}>
            Everything you need to know about academic black books, thesis binding, and order tracking
          </Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactCardsRow}>
          <View style={styles.contactCard}>
            <View style={styles.contactIconCircle}>
              <Mail size={20} color={COLORS.navy} />
            </View>
            <Text style={styles.contactCardTitle}>Email Support</Text>
            <Text style={styles.contactCardVal}>support@printbizz.in</Text>
            <Text style={styles.contactCardSub}>Guaranteed reply within 4 hours</Text>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactIconCircle}>
              <Phone size={20} color={COLORS.navy} />
            </View>
            <Text style={styles.contactCardTitle}>Student Helpline</Text>
            <Text style={styles.contactCardVal}>+91 (022) 2894-4421</Text>
            <Text style={styles.contactCardSub}>Mon - Sat: 9 AM to 8 PM</Text>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactIconCircle}>
              <MessageSquare size={20} color={COLORS.navy} />
            </View>
            <Text style={styles.contactCardTitle}>WhatsApp Desk</Text>
            <Text style={styles.contactCardVal}>+91 98201 44521</Text>
            <Text style={styles.contactCardSub}>Instant formatting guidance</Text>
          </View>
        </View>

        {/* FAQs Accordion */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <View key={idx} style={styles.faqCard}>
                  <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => setExpandedFaq(isOpen ? null : idx)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.faqQuestion}>{faq.q}</Text>
                    {isOpen ? (
                      <ChevronUp size={18} color={COLORS.navy} />
                    ) : (
                      <ChevronDown size={18} color={COLORS.secondaryText} />
                    )}
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={styles.faqBody}>
                      <Text style={styles.faqAnswer}>{faq.a}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Submit a Support Ticket */}
        <View style={styles.ticketSection}>
          <Text style={styles.sectionTitle}>Need Assistance with Your Project?</Text>
          <Text style={styles.sectionSubtitle}>
            Submit your formatting query or order inquiry and our academic desk will resolve it promptly.
          </Text>

          {ticketSubmitted ? (
            <View style={styles.ticketSuccessBox}>
              <CheckCircle2 size={36} color={COLORS.success} />
              <Text style={styles.ticketSuccessTitle}>Ticket Generated: {ticketId}</Text>
              <Text style={styles.ticketSuccessSub}>
                We have received your request. An academic formatting executive will reply to your registered email shortly.
              </Text>
              <TouchableOpacity 
                style={styles.newTicketBtn}
                onPress={() => setTicketSubmitted(false)}
              >
                <Text style={styles.newTicketBtnText}>Submit Another Query</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ticketForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Subject / Inquiry Category</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Question regarding Mumbai University margin clearances"
                  value={ticketSubject}
                  onChangeText={setTicketSubject}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Detailed Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Explain your requirements or project submission deadline..."
                  value={ticketMessage}
                  onChangeText={setTicketMessage}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity 
                style={styles.submitTicketBtn}
                onPress={handleSubmitTicket}
                activeOpacity={0.85}
              >
                <Send size={15} color={COLORS.white} />
                <Text style={styles.submitTicketBtnText}>Submit Support Ticket</Text>
              </TouchableOpacity>
            </View>
          )}
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
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    padding: SPACING.base,
  },
  headerSection: {
    marginBottom: SPACING.xl,
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
  contactCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  contactCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  contactCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.mutedText,
    textTransform: 'uppercase',
  },
  contactCardVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
    marginVertical: 4,
  },
  contactCardSub: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },
  faqSection: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: SPACING.md,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: SPACING.lg,
  },
  faqList: {
    gap: SPACING.sm,
  },
  faqCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
    flex: 1,
    marginRight: 8,
  },
  faqBody: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.sm,
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 18,
  },
  ticketSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  ticketForm: {
    gap: SPACING.md,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    fontSize: 13,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.xl,
    marginTop: 4,
  },
  submitTicketBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  ticketSuccessBox: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  ticketSuccessTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    marginTop: SPACING.md,
    marginBottom: 4,
  },
  ticketSuccessSub: {
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 440,
    marginBottom: SPACING.lg,
  },
  newTicketBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 9,
    borderRadius: RADIUS.xs,
  },
  newTicketBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
