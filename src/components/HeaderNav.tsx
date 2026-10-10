import React from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import { View, ColorMode } from '../types';
import { PWAInstallButton } from '../PWAInstallButton';

interface HeaderNavProps {
  activeView: View;
  onNavigate: (view: View) => void;
  appName: string;
  appSubtitle: string;
  appLogo: string | null;
  colorMode: ColorMode;
  onToggleColorMode: () => void;
  onOpenSettings: () => void;
  isScrolled: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeView,
  onNavigate,
  appName,
  appSubtitle,
  appLogo,
  colorMode,
  onToggleColorMode,
  onOpenSettings,
  isScrolled
}) => {
  const isDark = colorMode === 'dark';

  const navItems: { id: View; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'pelacakan', label: 'Pelacakan' },
    { id: 'sop', label: 'Standar SOP' },
    { id: 'kontak', label: 'Kontak' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? isDark
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/20 py-2.5 sm:py-3.5'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5 py-2.5 sm:py-3.5'
        : 'bg-transparent py-3 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('beranda')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl p-1 flex items-center justify-center border transition-all duration-300 ${
              isDark
                ? 'bg-slate-900 border-cyan-500/40 shadow-sm shadow-cyan-500/30 group-hover:border-cyan-400'
                : 'bg-white border-slate-200 shadow-sm group-hover:border-blue-400'
            }`}>
              <img
                src={appLogo || '/logo-sekolah.png'}
                alt={appName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-sekolah.png';
                }}
              />
            </div>
            <div>
              <span className={`text-sm sm:text-lg font-black tracking-tight leading-none block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {appName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
                {appSubtitle}
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? isDark
                        ? 'text-cyan-400'
                        : 'text-blue-600'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Clean Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Color mode toggle */}
            <button
              onClick={onToggleColorMode}
              className={`w-9 h-9 sm:w-10 sm:h-10 min-h-[36px] min-w-[36px] rounded-xl border flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-yellow-300 hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Admin Settings Button */}
            <button
              onClick={onOpenSettings}
              className={`w-9 h-9 sm:w-10 sm:h-10 min-h-[36px] min-w-[36px] rounded-xl border flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
              title="Konsol Admin Tata Usaha"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
