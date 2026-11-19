import React from 'react';
import { Volume2 } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const NoiseMonitoringPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Acoustic Noise Intelligence & Hotspot Identification"
      subtitle="Real-time sound pressure level telemetry (dB SPL), rolling Leq computation, and alert dispatching."
      icon={Volume2}
      targetPhase="Phase 5: Noise Monitoring & Alert Pipeline"
      actionLabel="Calibrate Microphones"
      metricsPreview={[
        { label: "Hardware Microphone", value: "INMP441 (I2S DMA)" },
        { label: "Current dB Reading", value: "52.4 dB SPL" },
        { label: "Rolling Window", value: "2.0s Leq Interval" },
        { label: "Threshold Violations", value: "0 Active" },
      ]}
      scheduledFeatures={[
        "Real-time audio frequency and sound pressure level (dB SPL) telemetry stream from INMP441 I2S mic.",
        "Rolling continuous equivalent sound level (LAeq) calculation across 10s, 60s, and 5-minute windows.",
        "Automated acoustic hotspot triangulation and localized zone escalation rules.",
        "Triggering audible warnings on the physical ESP32 piezo buzzer for persistent violations.",
        "Pushing silent visual alerts to the physical SSD1306 OLED display for library patron self-regulation.",
        "Historical noise trend curves correlated with facility headcount and time of day."
      ]}
    />
  );
};
