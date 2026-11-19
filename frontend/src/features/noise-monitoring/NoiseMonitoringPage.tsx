import React from 'react';
import { Volume2 } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const NoiseMonitoringPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Noise Monitoring & Hotspot Identification — Under Development"
      subtitle="Real-time sound pressure level telemetry (dB SPL), rolling Leq computation, and alert dispatching."
      icon={Volume2}
      targetPhase="Scheduled: Acoustic Pipeline Phase"
      scheduledFeatures={[
        "Real-time audio frequency and sound pressure level (dB SPL) telemetry stream from INMP441 I2S mic.",
        "Rolling continuous equivalent sound level (LAeq) computation across 10s, 60s, and 5-minute sliding windows.",
        "Automated acoustic hotspot detection and localized zone threshold escalation rules.",
        "Actuator triggers: Dispatch audible alerts to physical ESP32 buzzer upon sustained violations.",
        "OLED display integration: Push quiet study reminders directly to physical in-library screen modules.",
        "Historical noise trend curves correlated with facility headcount and time of day."
      ]}
    />
  );
};
