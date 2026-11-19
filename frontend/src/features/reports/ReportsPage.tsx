import React from 'react';
import { FileText } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const ReportsPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Operational & Compliance Reports — Under Development"
      subtitle="Generate audit-ready utilization summaries, fire-safety compliance logs, and acoustic records."
      icon={FileText}
      targetPhase="Scheduled: Reporting Phase"
      scheduledFeatures={[
        "Automated weekly library utilization summaries for university administration and campus planning.",
        "Acoustic threshold compliance certification reporting for quiet study zones.",
        "Fire-safety building capacity compliance logs showing peak simultaneous occupant headcounts.",
        "One-click CSV/Excel export of granular seat occupancy intervals and turnstile passage counts.",
        "Incident audit trail documenting acknowledged noise alerts and sensor fault resolutions."
      ]}
    />
  );
};
