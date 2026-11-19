import React from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Cpu, Wifi, CheckCircle2 } from 'lucide-react';
import { DataOriginBadge } from '../../components/common/DataOriginBadge';

export const SensorConnectivityCard: React.FC = () => {
  const { devices, isEsp32Online } = useLibraryStore();
  const esp32 = devices[0];

  return (
    <div className="bg-white border border-surface-border rounded p-3.5 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-forest" />
          <h3 className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
            IoT Hardware & Sensor Telemetry
          </h3>
        </div>
        <DataOriginBadge origin="HARDWARE" size="sm" />
      </div>

      {esp32 ? (
        <div className="space-y-3 text-xs">
          {/* Device Profile */}
          <div className="p-2.5 rounded bg-surface-grey/50 border border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isEsp32Online ? 'bg-status-available animate-pulse' : 'bg-status-occupied'}`} />
              <div>
                <span className="font-bold text-surface-charcoal block leading-tight">
                  {esp32.deviceCode}
                </span>
                <span className="text-[10px] text-surface-charcoal/60 font-mono">
                  MAC: {esp32.macAddress} · IP: {esp32.ipAddress}
                </span>
              </div>
            </div>

            <div className="text-right font-mono text-[11px]">
              <span className="text-forest font-semibold flex items-center gap-1 justify-end">
                <Wifi className="w-3 h-3" /> {esp32.wifiRssiDbm} dBm
              </span>
              <span className="text-[10px] text-surface-charcoal/60">
                Heap: {Math.round(esp32.freeHeapBytes / 1024)} KB
              </span>
            </div>
          </div>

          {/* Assigned Sensor Pin Matrix */}
          <div>
            <span className="text-[10px] font-bold text-surface-charcoal/60 uppercase tracking-wider block mb-1.5">
              Assigned Physical Sensor Pins (ESP32 DevKit V1)
            </span>
            <div className="space-y-1">
              {esp32.assignedSensors.map((sensor, idx) => (
                <div 
                  key={idx}
                  className="p-1.5 rounded bg-surface-grey/30 border border-surface-border flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-forest font-semibold bg-white px-1.5 py-0.2 rounded border border-surface-border text-[10px]">
                      {sensor.pinOrChannel}
                    </span>
                    <span className="text-surface-charcoal truncate font-medium">
                      {sensor.targetDescription}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-status-available" />
                    <span className="text-[10px] font-semibold text-status-available uppercase">
                      Healthy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-surface-charcoal/60">
          No hardware devices registered.
        </div>
      )}

    </div>
  );
};
