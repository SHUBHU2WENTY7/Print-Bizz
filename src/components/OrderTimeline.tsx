import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackingStage } from '../types';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  MapPin 
} from 'lucide-react-native';

interface OrderTimelineProps {
  stages: TrackingStage[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ stages }) => {
  const getIcon = (id: string, status: TrackingStage['status']) => {
    if (status === 'completed') {
      return <CheckCircle2 size={18} color={COLORS.success} />;
    }
    if (status === 'current') {
      return <CircleDot size={18} color={COLORS.darkOrange} />;
    }
    return <Clock size={16} color={COLORS.mutedText} />;
  };

  return (
    <View style={styles.container}>
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        const isCurrent = stage.status === 'current';
        const isCompleted = stage.status === 'completed';

        return (
          <View key={stage.id} style={styles.timelineRow}>
            {/* Left Column: Icon and connecting vertical line */}
            <View style={styles.indicatorCol}>
              <View 
                style={[
                  styles.iconBubble, 
                  isCompleted && styles.iconBubbleCompleted,
                  isCurrent && styles.iconBubbleCurrent,
                ]}
              >
                {getIcon(stage.id, stage.status)}
              </View>
              {!isLast && (
                <View 
                  style={[
                    styles.connectorLine,
                    isCompleted && styles.connectorLineCompleted,
                  ]} 
                />
              )}
            </View>

            {/* Right Column: Stage info */}
            <View style={[styles.contentCol, isCurrent && styles.contentColCurrent]}>
              <View style={styles.titleRow}>
                <Text 
                  style={[
                    styles.stageTitle,
                    isCompleted && styles.stageTitleCompleted,
                    isCurrent && styles.stageTitleCurrent,
                  ]}
                >
                  {index + 1}. {stage.title}
                </Text>
                {stage.timestamp && (
                  <Text style={styles.timestamp}>{stage.timestamp}</Text>
                )}
              </View>

              <View style={styles.locationRow}>
                <MapPin size={12} color={isCurrent ? COLORS.oceanBlue : COLORS.secondaryText} />
                <Text style={[styles.locationText, isCurrent && { color: COLORS.oceanBlue }]}>
                  {stage.location}
                </Text>
                {isCurrent && (
                  <View style={styles.livePulse}>
                    <Text style={styles.livePulseText}>LIVE STATUS</Text>
                  </View>
                )}
              </View>

              <Text style={styles.description}>{stage.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    width: '100%',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 64,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 32,
    marginRight: SPACING.md,
  },
  iconBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    zIndex: 2,
  },
  iconBubbleCompleted: {
    backgroundColor: COLORS.successBg,
    borderColor: COLORS.success,
  },
  iconBubbleCurrent: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.darkOrange,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 2,
    zIndex: 1,
  },
  connectorLineCompleted: {
    backgroundColor: COLORS.success,
  },
  contentCol: {
    flex: 1,
    paddingBottom: SPACING.md,
  },
  contentColCurrent: {
    backgroundColor: COLORS.lightBlue,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.oceanBlue,
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  stageTitleCompleted: {
    color: COLORS.navy,
  },
  stageTitleCurrent: {
    color: COLORS.navy,
    fontWeight: '800',
    fontSize: 15,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  livePulse: {
    backgroundColor: COLORS.darkOrange,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.full,
    marginLeft: 6,
  },
  livePulseText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },
});
