import React from 'react';
import { Settings } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const SettingsPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="System Settings & Hardware Parameters — Under Development"
      subtitle="Configure operational modes, MQTT broker parameters, sensor calibration, and alert thresholds."
      icon={Settings}
      targetPhase="Scheduled: System Settings Phase"
      scheduledFeatures={[
        "Operational Mode Switcher: Toggle between HYBRID, HARDWARE_ONLY, and SIMULATION_ONLY at runtime.",
        "Mosquitto MQTT broker connection settings: Host, Port, TLS certificates, and Keepalive intervals.",
        "Hardware debouncing parameters: Microswitch press debounce (1500ms) and release debounce (2000ms).",
        "INMP441 I2S microphone acoustic calibration offset and DMA sample buffer tuning.",
        "Role-Based Access Control (RBAC): Manage administrator, librarian, and student viewer accounts."
      ]}
    />
  );
};
