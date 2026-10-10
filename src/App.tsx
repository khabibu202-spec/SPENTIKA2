import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  LayoutGrid, 
  Search, 
  FileText, 
  Phone, 
  Megaphone, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

import { View, ThemeName, ColorMode, TrackingRecord } from './types';
import { INITIAL_SERVICES, INITIAL_TRACKING_DATA } from './data/servicesData';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { ServiceCatalog } from './components/ServiceCatalog';
import { TrackingSection } from './components/TrackingSection';
import { SopSection } from './components/SopSection';
import { ContactSection } from './components/ContactSection';
import { AdminSettingsModal } from './components/AdminSettingsModal';

export default function App() {
  // Theme & Mode states
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    return (localStorage.getItem('spentika_theme') as ThemeName) || 'cyber-navy';
  });
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    return (localStorage.getItem('spentika_colormode') as ColorMode) || 'dark';
  });

  // Navigation state
  const [activeView, setActiveView] = useState<View>('beranda');
  const [isScrolled, setIsScrolled] = useState(false);

  // Identity & Customization states
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('tu_admin_pin') || '1234');
  const [appLogo, setAppLogo] = useState<string | null>(() => localStorage.getItem('tu_app_logo') || '/logo-sekolah.png');
  const [announcement, setAnnouncement] = useState(() => {
    return localStorage.getItem('tu_announcement') || 'Pelayanan Daring Aktif: Seluruh pengajuan surat dan legalisir diproses 1-2 hari kerja via portal resmi SPENTIKA.';
  });
  const [appName, setAppName] = useState(() => localStorage.getItem('tu_app_name') || 'TU SPENTIKA');
  const [appSubtitle, setAppSubtitle] = useState(() => localStorage.getItem('tu_app_sub') || 'SMP Negeri 3 Kras');
  const [appSlogan, setAppSlogan] = useState(() => {
    return localStorage.getItem('tu_app_slogan') || 
      'Portal resmi layanan administrasi dan tata usaha SMP Negeri 3 Kras. Kemudahan akses berbagai layanan surat-menyurat dan informasi sekolah dalam satu genggaman.';
  });

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Tracking Database state
  const [trackingData] = useState<Record<string, TrackingRecord>>(() => {
    const saved = localStorage.getItem('spentika_tracking_db');
    if (saved) {
      try {
        return { ...INITIAL_TRACKING_DATA, ...JSON.parse(saved) };
      } catch {
        return INITIAL_TRACKING_DATA;
      }
    }
    return INITIAL_TRACKING_DATA;
  });
  const [searchedResi] = useState('REQ-2025-0892');

  // Real-time Clock state (WIB)
  const [currentTime, setCurrentTime] = useState('');

  // Persist settings
  useEffect(() => {
    localStorage.setItem('spentika_theme', themeName);
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem('spentika_colormode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('tu_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    if (appLogo) localStorage.setItem('tu_app_logo', appLogo);
  }, [appLogo]);

  useEffect(() => {
    localStorage.setItem('tu_announcement', announcement);
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem('tu_app_name', appName);
  }, [appName]);

  useEffect(() => {
    localStorage.setItem('tu_app_sub', appSubtitle);
  }, [appSubtitle]);

  useEffect(() => {
    localStorage.setItem('tu_app_slogan', appSlogan);
  }, [appSlogan]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clock interval
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = colorMode === 'dark';

  // Dynamic Theme Background Classes
  const getThemeBackground = () => {
    if (!isDark) {
      if (themeName === 'emerald-tech') return 'bg-[#F4F9F6] text-slate-900';
      if (themeName === 'titanium-obsidian') return 'bg-[#F8F9FA] text-slate-900';
      if (themeName === 'royal-violet') return 'bg-[#F9F7FD] text-slate-900';
      return 'bg-[#F8FAFC] text-slate-900';
    }
    if (themeName === 'emerald-tech') return 'bg-[#051410] text-slate-100';
    if (themeName === 'titanium-obsidian') return 'bg-[#0B0E14] text-slate-100';
    if (themeName === 'royal-violet') return 'bg-[#0E0A1E] text-slate-100';
    return 'bg-[#080E1A] text-slate-100';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-cyan-500/30 selection:text-cyan-200 ${getThemeBackground()} relative overflow-x-hidden`}>
      
      {/* Ambient Cyber Luminous Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark ? (
          <>
            <motion.div
              animate={{ x: [0, 20, -15, 0], y: [0, -20, 15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] opacity-25 ${
                themeName === 'emerald-tech' ? 'bg-emerald-500' :
                themeName === 'royal-violet' ? 'bg-violet-600' :
                themeName === 'titanium-obsidian' ? 'bg-cyan-700' :
                'bg-cyan-500'
              }`}
            />
            <motion.div
              animate={{ x: [0, -20, 15, 0], y: [0, 20, -15, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute top-1/3 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] opacity-20 ${
                themeName === 'emerald-tech' ? 'bg-teal-500' :
                themeName === 'royal-violet' ? 'bg-indigo-600' :
                themeName === 'titanium-obsidian' ? 'bg-slate-500' :
                'bg-blue-600'
              }`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </>
        ) : (
          <>
            <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[90px] sm:blur-[120px] bg-cyan-200/35" />
            <div className="absolute top-1/3 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[90px] sm:blur-[120px] bg-blue-200/30" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </>
        )}
      </div>

      {/* Top Header Navigation */}
      <HeaderNav
        activeView={activeView}
        onNavigate={navigateTo}
        appName={appName}
        appSubtitle={appSubtitle}
        appLogo={appLogo}
        colorMode={colorMode}
        onToggleColorMode={() => setColorMode(isDark ? 'light' : 'dark')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Main View Area */}
      <main className="relative z-10 flex-grow pt-16 sm:pt-24 pb-24 lg:pb-16 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8">
        
        {/* Operational Status Ribbon */}
        <div className={`mb-3.5 sm:mb-6 px-3 py-2 sm:p-3 rounded-xl sm:rounded-2xl border text-[11px] sm:text-xs flex items-center justify-between gap-2 ${
          isDark
            ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
            : 'bg-white/70 border-slate-200/80 text-slate-700 shadow-xs'
        }`}>
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">Loket Digital Aktif</span>
            <span aria-hidden="true" className="text-slate-400 hidden sm:inline">·</span>
            <span className="hidden md:inline text-slate-500 dark:text-slate-400">Senin - Jumat 07.00 - 15.00 WIB</span>
          </div>

          <div className="flex items-center gap-2 font-mono tabular-nums text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs shrink-0">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-500" />
              <span>{currentTime || 'WIB'}</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold hidden sm:inline">SPENTIKA OS</span>
          </div>
        </div>

        {/* Marquee Announcement */}
        {announcement.trim() !== '' && (
          <div className={`mb-5 sm:mb-8 rounded-xl sm:rounded-2xl border overflow-hidden flex items-center shadow-xs ${
            isDark
              ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200'
              : 'bg-cyan-50/80 border-cyan-200 text-cyan-900'
          }`}>
            <div className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center shrink-0 border-r ${
              isDark ? 'bg-cyan-900/50 border-cyan-500/30 text-cyan-300' : 'bg-cyan-200/60 border-cyan-200 text-cyan-950'
            }`}>
              <Megaphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 text-cyan-500 animate-bounce" />
              <span className="hidden sm:inline">PENGUMUMAN TU</span>
              <span className="sm:hidden">INFO</span>
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium">
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="inline-block whitespace-nowrap"
              >
                {announcement}
              </motion.div>
            </div>
          </div>
        )}

        {/* View Switcher */}
        <AnimatePresence mode="wait">
          {activeView === 'beranda' && (
            <motion.section
              key="beranda"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-10"
            >
              <HeroSection
                onNavigateToTracking={() => navigateTo('pelacakan')}
                onNavigateToServices={() => navigateTo('layanan')}
                isDark={isDark}
                appName={appName}
                appSubtitle={appSubtitle}
                appSlogan={appSlogan}
              />

              {/* Unified Compact Services Catalog */}
              <div className="pt-2">
                <ServiceCatalog
                  services={INITIAL_SERVICES}
                  isDark={isDark}
                />
              </div>
            </motion.section>
          )}

          {activeView === 'layanan' && (
            <motion.section
              key="layanan"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCatalog
                services={INITIAL_SERVICES}
                isDark={isDark}
              />
            </motion.section>
          )}

          {activeView === 'pelacakan' && (
            <motion.section
              key="pelacakan"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <TrackingSection
                trackingData={trackingData}
                searchedResi={searchedResi}
                isDark={isDark}
              />
            </motion.section>
          )}

          {activeView === 'sop' && (
            <motion.section
              key="sop"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <SopSection
                isDark={isDark}
              />
            </motion.section>
          )}

          {activeView === 'kontak' && (
            <motion.section
              key="kontak"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactSection
                isDark={isDark}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Navigasi Bawah Ponsel" 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl transition-all duration-300 pb-[env(safe-area-inset-bottom)] shadow-lg ${
          isDark
            ? 'bg-slate-950/92 border-slate-800/90 text-slate-400'
            : 'bg-white/95 border-slate-200/90 text-slate-500 shadow-slate-900/10'
        }`}
      >
        <div className="grid grid-cols-5 items-center h-15 sm:h-16 max-w-lg mx-auto px-1">
          {[
            { id: 'beranda', icon: Home, label: 'Beranda' },
            { id: 'layanan', icon: LayoutGrid, label: 'Layanan' },
            { id: 'pelacakan', icon: Search, label: 'Lacak' },
            { id: 'sop', icon: FileText, label: 'SOP' },
            { id: 'kontak', icon: Phone, label: 'Kontak' }
          ].map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as View)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative min-h-[48px] w-full ${
                  isActive
                    ? isDark
                      ? 'text-cyan-400 font-bold'
                      : 'text-blue-600 font-bold'
                    : 'hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] tracking-tight leading-none">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-cyan-500 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Global Institutional Footer */}
      <footer className={`border-t relative z-10 mt-auto transition-colors ${
        isDark
          ? 'bg-slate-950 border-slate-800/80 text-slate-400'
          : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24 lg:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
            <div className="md:col-span-2 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={appLogo || '/logo-sekolah.png'}
                  alt={appName}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo-sekolah.png';
                  }}
                />
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {appName} · {appSubtitle}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm text-xs">
                Sistem transformasi digital tata usaha SMP Negeri 3 Kras, Kecamatan Kras, Kabupaten Kediri. Mengutamakan transparansi, kecepatan, dan akuntabilitas pelayanan publik.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-slate-900 dark:text-white">Navigasi Utama</h4>
              <ul className="space-y-1 text-slate-500 dark:text-slate-400 text-xs">
                <li><button onClick={() => navigateTo('beranda')} className="hover:underline">Beranda Portal</button></li>
                <li><button onClick={() => navigateTo('layanan')} className="hover:underline">Katalog Layanan Surat</button></li>
                <li><button onClick={() => navigateTo('pelacakan')} className="hover:underline">Lacak Status Berkas</button></li>
                <li><button onClick={() => navigateTo('sop')} className="hover:underline">Standar Mutu & SOP</button></li>
              </ul>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-slate-900 dark:text-white">Integrasi Portal</h4>
              <ul className="space-y-1 text-slate-500 dark:text-slate-400 text-xs">
                <li><a href="https://spega-mail.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">SPEGA Mail Online</a></li>
                <li><a href="https://dosis-spega-rosy.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">DOSIS Data Siswa</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-slate-400">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Tata Usaha SMP Negeri 3 Kras. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-3">
              <span>Keamanan SHA-256</span>
              <span>·</span>
              <span>Dapodik Kemendikbud</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Settings Modal */}
      <AdminSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        adminPin={adminPin}
        onUpdatePin={setAdminPin}
        appLogo={appLogo}
        setAppLogo={setAppLogo}
        announcement={announcement}
        setAnnouncement={setAnnouncement}
        appName={appName}
        setAppName={setAppName}
        appSubtitle={appSubtitle}
        setAppSubtitle={setAppSubtitle}
        appSlogan={appSlogan}
        setAppSlogan={setAppSlogan}
        currentTheme={themeName}
        onSelectTheme={setThemeName}
        colorMode={colorMode}
        onToggleColorMode={() => setColorMode(isDark ? 'light' : 'dark')}
      />
    </div>
  );
}
