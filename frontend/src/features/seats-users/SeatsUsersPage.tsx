import React from 'react';
import { Armchair } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const SeatsUsersPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Seats & Users — Under Development"
      subtitle="Granular seat catalog, physical sensor assignments, and patron allocation management."
      icon={Armchair}
      targetPhase="Scheduled: Catalog & Allocations Phase"
      scheduledFeatures={[
        "Searchable and filterable seat inventory table (by floor, zone, power outlet, and hardware mapping).",
        "Student ID / badge binding for study reservations and no-show desk release automation.",
        "Dynamic sensor pin mapping: Bind physical microswitch channels without firmware recompilation.",
        "Manual librarian maintenance holds and out-of-order desk status controls.",
        "Historical seat usage dwell time and turnover analysis."
      ]}
    />
  );
};
