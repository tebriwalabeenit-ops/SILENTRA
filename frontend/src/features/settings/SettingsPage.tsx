import React from 'react';
import { Settings } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const SettingsPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="System Configuration & Hardware Parameters"
      subtitle="Configure operational modes, MQTT broker parameters, sensor calibration, and alert thresholds."
      icon={Settings}
      targetPhase="Phase 1 & Phase 4: System Configuration"
      actionLabel="Save Changes"
      metricsPreview={[
        { label: "Active Mode", value: "HYBRID (Real + Demo)" },
        { label: "Broker Endpoint", value: "localhost:1883" },
        { label: "Switch Debounce", value: "1500ms Press" },
        { label: "Noise Threshold", value: "55.0 dB SPL" },
      ]}
      scheduledFeatures={[
        "Operational Mode Switcher: Toggle between HYBRID, HARDWARE_ONLY, and SIMULATION_ONLY at runtime.",
        "Mosquitto MQTT broker connection settings: Host, Port, TLS certificates, and Keepalive intervals.",
        "Hardware debouncing parameters: Microswitch press debounce (1500ms) and release debounce (2000ms).",
        "INMP441 I2S microphone acoustic calibration offset and DMA sample buffer tuning.",
        "Role-Based Access Control (RBAC): Manage administrator, librarian, and student viewer accounts.",
        "WebSocket connection heartbeat intervals and automatic reconnection backoff strategies."
      ]}
    />
  );
};
