import React from 'react';
import { Armchair } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const SeatsUsersPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Seats Catalog & Student Allocations"
      subtitle="Manage granular seat inventories, hardware sensor bindings, and student study reservations."
      icon={Armchair}
      targetPhase="Phase 2: Data Models & Catalog"
      actionLabel="Export Inventory"
      metricsPreview={[
        { label: "Hardware Monitored", value: "2 Seats (ESP32)" },
        { label: "Virtual Sim Desks", value: "46 Seats" },
        { label: "With Power Outlets", value: "40 Seats (83%)" },
        { label: "Active Allocations", value: "1 Student" },
      ]}
      scheduledFeatures={[
        "Searchable and filterable seat inventory table (by floor, zone, power outlet, and hardware mapping).",
        "Student ID / RFID card binding for automatic attendance verification and no-show desk releasing.",
        "Pin remapping interface: Bind chair microswitch GPIO pins dynamically without firmware re-flashing.",
        "Manual librarian override for maintenance, disinfection, or VIP reservation holds.",
        "Seat usage dwell time statistics and historical turnover analytics.",
        "Bulk seat provisioning wizard with automatic Cartesian coordinate grid placement."
      ]}
    />
  );
};
