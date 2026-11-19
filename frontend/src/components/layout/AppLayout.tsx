import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { HorizontalNav } from './HorizontalNav';
import { useLibraryStore } from '../../store/useLibraryStore';

export const AppLayout: React.FC = () => {
  const { appMode } = useLibraryStore();

  return (
    <div className="min-h-screen bg-surface-warm flex flex-col font-sans text-surface-charcoal">
      {/* 1. COMPACT HEADER */}
      <Header />

      {/* 2. HORIZONTAL NAVIGATION TABS */}
      <HorizontalNav />

      {/* 3. MAIN WORKSPACE CONTENT */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 py-4">
        <Outlet />
      </main>

      {/* 4. RESTRAINED ENTERPRISE FOOTER */}
      <footer className="bg-white border-t border-surface-border py-2 px-4 mt-auto">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] text-surface-charcoal/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-forest">SILENTRA</span>
            <span>· Smart Library Intelligence and Monitoring System</span>
            <span className="text-surface-border">|</span>
            <span>ESP32 DevKit V1 Prototype Monitored</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-available" />
              Runtime: <strong className="font-mono text-surface-charcoal">{appMode}</strong>
            </span>
            <span className="text-surface-border">|</span>
            <span>Strict Zero-Contamination Telemetry Partitioning</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
