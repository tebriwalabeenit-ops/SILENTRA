import React from 'react';
import { FileText } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const ReportsPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Compliance & Operational Facility Reports"
      subtitle="Generate audit-ready utilization summaries, fire-safety compliance logs, and acoustic records."
      icon={FileText}
      targetPhase="Phase 6: Reporting & Export Suite"
      actionLabel="Generate Report"
      metricsPreview={[
        { label: "Available Templates", value: "6 Formats" },
        { label: "Scheduled Dispatch", value: "Weekly (Mondays)" },
        { label: "Export Formats", value: "CSV / PDF" },
        { label: "Audit Compliance", value: "ISO 14001 / Safety" },
      ]}
      scheduledFeatures={[
        "Automated weekly library utilization reports for university administration and campus planning.",
        "Acoustic threshold compliance certification reporting for quiet study environments.",
        "Fire-safety building capacity compliance logs showing peak simultaneous occupant headcounts.",
        "One-click CSV/Excel export of granular seat occupancy intervals and turnstile logs.",
        "Scheduled email distribution to facilities managers and chief librarians.",
        "Incident audit trail documenting acknowledged noise alerts and sensor fault resolutions."
      ]}
    />
  );
};
