import React, { useState, useEffect } from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { 
  Building2, 
  Activity, 
  Clock, 
  RefreshCw, 
  Wifi
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    isBrokerConnected, 
    isEsp32Online, 
    appMode, 
    refreshData 
  } = useLibraryStore();

  const [currentTime, setCurrentTime] = useState<string>(() => {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-[1720px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
        
        {/* LEFT: Brand & Product Descriptor */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded bg-forest flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Building2 className="w-4 h-4 text-surface-warm" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-forest-dark font-sans">
                SILENTRA
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.2 rounded bg-forest/10 text-forest border border-forest/20">
                v0.1.0
              </span>
            </div>
            <span className="text-[11px] text-surface-charcoal/70 font-medium hidden sm:inline">
              Smart Library Intelligence & Monitoring System
            </span>
          </div>
        </div>

        {/* CENTER: Connectivity Indicators & Operation Mode */}
        <div className="hidden lg:flex items-center gap-2 border-x border-surface-border px-4 py-1">
          {/* MQTT Broker Status */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${isBrokerConnected ? 'bg-status-available animate-pulse' : 'bg-status-occupied'}`} />
            <span className="font-medium text-surface-charcoal/80">Broker:</span>
            <span className="text-surface-charcoal font-semibold">
              {isBrokerConnected ? 'Mosquitto 2.0 (Active)' : 'Disconnected'}
            </span>
          </div>

          <span className="text-surface-border text-sm">|</span>

          {/* ESP32 Hardware Status */}
          <div className="flex items-center gap-1.5 text-xs">
            <Wifi className={`w-3.5 h-3.5 ${isEsp32Online ? 'text-forest' : 'text-status-occupied'}`} />
            <span className="font-medium text-surface-charcoal/80">Hardware:</span>
            <span className="text-surface-charcoal font-semibold">
              {isEsp32Online ? 'ESP32 DevKit V1 (Online)' : 'Offline'}
            </span>
          </div>

          <span className="text-surface-border text-sm">|</span>

          {/* Operational Mode Tag */}
          <div className="flex items-center gap-1.5 text-xs">
            <Activity className="w-3.5 h-3.5 text-forest" />
            <span className="font-medium text-surface-charcoal/80">Mode:</span>
            <span className="font-bold text-forest bg-forest/10 px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase border border-forest/20">
              {appMode} (2 Real · 46 Demo)
            </span>
          </div>
        </div>

        {/* RIGHT: Clock, Refresh Action, & Admin Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Refresh Data Button */}
          <button
            onClick={refreshData}
            title="Synchronize Live Telemetry"
            className="p-1.5 rounded hover:bg-surface-grey text-surface-charcoal/70 hover:text-forest transition-colors border border-surface-border"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Live Date / Time */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-surface-charcoal/80 bg-surface-grey/60 px-2.5 py-1 rounded border border-surface-border">
            <Clock className="w-3.5 h-3.5 text-surface-charcoal/50" />
            <span>{currentTime}</span>
          </div>

          {/* Administrator Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
            <div className="w-7 h-7 rounded bg-forest-dark text-white flex items-center justify-center text-xs font-semibold">
              SC
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-medium text-surface-charcoal leading-none">
                Dr. Sarah Chen
              </span>
              <span className="text-[10px] text-surface-charcoal/60 leading-tight">
                Chief Librarian · Admin
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
