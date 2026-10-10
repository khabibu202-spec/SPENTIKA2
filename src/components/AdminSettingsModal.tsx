import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  X, 
  Lock, 
  Unlock, 
  Image as ImageIcon, 
  Palette, 
  Type, 
  Megaphone, 
  KeyRound, 
  Save, 
  Check, 
  Moon, 
  Sun,
  ShieldAlert
} from 'lucide-react';
import { ThemeName, ColorMode } from '../types';

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminPin: string;
  onUpdatePin: (newPin: string) => void;
  appLogo: string | null;
  setAppLogo: (logo: string | null) => void;
  announcement: string;
  setAnnouncement: (text: string) => void;
  appName: string;
  setAppName: (name: string) => void;
  appSubtitle: string;
  setAppSubtitle: (subtitle: string) => void;
  appSlogan: string;
  setAppSlogan: (slogan: string) => void;
  currentTheme: ThemeName;
  onSelectTheme: (theme: ThemeName) => void;
  colorMode: ColorMode;
  onToggleColorMode: () => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  adminPin,
  onUpdatePin,
  appLogo,
  setAppLogo,
  announcement,
  setAnnouncement,
  appName,
  setAppName,
  appSubtitle,
  setAppSubtitle,
  appSlogan,
  setAppSlogan,
  currentTheme,
  onSelectTheme,
  colorMode,
  onToggleColorMode
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Ubah PIN states
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setEnteredPin('');
      setPinError(false);
      setNewPin('');
      setConfirmPin('');
      setPinChangeMsg(null);
    }
  }, [isOpen]);

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setEnteredPin('');
    }
  };

  const handleUpdatePin = () => {
    if (newPin.length !== 4) {
      setPinChangeMsg({ type: 'error', text: 'PIN baru wajib 4 digit angka.' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeMsg({ type: 'error', text: 'Konfirmasi PIN tidak cocok.' });
      return;
    }
    onUpdatePin(newPin);
    setPinChangeMsg({ type: 'success', text: 'PIN admin berhasil diperbarui!' });
    setNewPin('');
    setConfirmPin('');
  };

  if (!isOpen) return null;

  const isDark = colorMode === 'dark';

  const themeList: { id: ThemeName; name: string; primaryClass: string; desc: string }[] = [
    {
      id: 'cyber-navy',
      name: 'Cyber Azure',
      primaryClass: 'from-cyan-500 to-blue-600',
      desc: 'Obsidian & Azure'
    },
    {
      id: 'emerald-tech',
      name: 'Emerald Matrix',
      primaryClass: 'from-emerald-500 to-teal-600',
      desc: 'Eco Tech'
    },
    {
      id: 'titanium-obsidian',
      name: 'Titanium',
      primaryClass: 'from-slate-400 to-slate-600',
      desc: 'Precision Steel'
    },
    {
      id: 'royal-violet',
      name: 'Royal Violet',
      primaryClass: 'from-violet-500 to-indigo-600',
      desc: 'Amethyst'
    }
  ];

  return (
    <div className="fixed inset-0 z-[140] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className={`w-full max-w-2xl rounded-t-[2rem] sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className={`px-5 py-3.5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
          isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-100 bg-slate-50/70'
        }`}>
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shrink-0">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Konsol Pengaturan TU</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Identitas, Tema & Keamanan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              <motion.div
                key="pin-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 sm:py-8 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">Akses Administrator</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mt-1">
                    Masukkan 4-digit PIN verifikasi keamanan untuk membuka pengaturan sistem.
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-3 pt-1">
                  <div>
                    <input
                      type="password"
                      maxLength={4}
                      autoFocus
                      placeholder="••••"
                      value={enteredPin}
                      onChange={(e) => {
                        setEnteredPin(e.target.value.replace(/\D/g, ''));
                        setPinError(false);
                      }}
                      className={`w-full text-center text-2xl sm:text-3xl tracking-[0.6em] font-mono py-3 rounded-2xl border-2 focus:outline-none transition-all ${
                        pinError
                          ? 'border-red-500 bg-red-500/10 text-red-500'
                          : isDark
                          ? 'border-slate-700 bg-slate-950 text-white focus:border-cyan-500'
                          : 'border-slate-300 bg-slate-50 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                    {pinError && (
                      <p className="text-xs text-red-500 mt-2 font-medium flex items-center justify-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        PIN tidak cocok. Silakan coba lagi.
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={enteredPin.length < 4}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>Buka Kunci Akses</span>
                    <Unlock className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-slate-400">PIN bawaan standar: <span className="font-mono font-bold">1234</span></p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="settings-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* 1. Theme and Color Mode Section */}
                <section className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-cyan-500" />
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Palet Tema</h3>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleColorMode}
                      className={`px-3 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 min-h-[36px] transition-all ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-yellow-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                      <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {themeList.map((th) => {
                      const isSelected = currentTheme === th.id;
                      return (
                        <button
                          key={th.id}
                          onClick={() => onSelectTheme(th.id)}
                          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                            isSelected
                              ? isDark
                                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50'
                                : 'bg-cyan-50 border-cyan-500 shadow-xs'
                              : isDark
                              ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-full h-6 sm:h-8 rounded-lg bg-gradient-to-r ${th.primaryClass} mb-1.5 shadow-xs`} />
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-bold leading-tight">{th.name}</span>
                            {isSelected && <Check className="w-3 h-3 text-cyan-500 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* 2. Logo Upload Section */}
                <section className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-1.5 border-b pb-2 border-slate-200 dark:border-slate-800">
                    <ImageIcon className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Logo Sekolah</h3>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-slate-50/50 dark:bg-slate-950/50 dark:border-slate-800">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border p-2 flex items-center justify-center shrink-0">
                      <img
                        src={appLogo || '/logo-sekolah.png'}
                        alt="Logo Sekolah"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo-sekolah.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        Format disarankan PNG/SVG dengan latar transparan.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <label className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer transition-colors min-h-[38px] inline-flex items-center">
                          <span>Unggah File Baru</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  if (ev.target?.result) {
                                    setAppLogo(ev.target.result as string);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {appLogo && appLogo !== '/logo-sekolah.png' && (
                          <button
                            type="button"
                            onClick={() => setAppLogo('/logo-sekolah.png')}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[38px]"
                          >
                            Reset Default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Copywriting Section */}
                <section className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-1.5 border-b pb-2 border-slate-200 dark:border-slate-800">
                    <Type className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Identitas Portal</h3>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Nama Aplikasi</label>
                      <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sub-judul / Sekolah</label>
                      <input
                        type="text"
                        value={appSubtitle}
                        onChange={(e) => setAppSubtitle(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Slogan Beranda</label>
                      <textarea
                        rows={2}
                        value={appSlogan}
                        onChange={(e) => setAppSlogan(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                          isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </div>
                </section>

                {/* 4. Marquee Announcement */}
                <section className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-1.5 border-b pb-2 border-slate-200 dark:border-slate-800">
                    <Megaphone className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Pengumuman (Marquee)</h3>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Pemberitahuan penting tata usaha..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>
                </section>

                {/* 5. Change PIN */}
                <section className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-1.5 border-b pb-2 border-slate-200 dark:border-slate-800">
                    <KeyRound className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Keamanan & Ubah PIN</h3>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border space-y-2.5 bg-slate-50/50 dark:bg-slate-950/50 dark:border-slate-800">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] sm:text-xs font-semibold text-slate-500 mb-1">PIN Baru (4 Digit)</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                          className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-xs font-semibold text-slate-500 mb-1">Konfirmasi PIN</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                          className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200'
                          }`}
                        />
                      </div>
                    </div>

                    {pinChangeMsg && (
                      <p className={`text-xs font-medium ${
                        pinChangeMsg.type === 'error' ? 'text-red-500' : 'text-emerald-500'
                      }`}>
                        {pinChangeMsg.text}
                      </p>
                    )}

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleUpdatePin}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-colors min-h-[38px]"
                      >
                        Simpan PIN Baru
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className={`p-3.5 sm:p-5 border-t flex justify-end gap-2.5 shrink-0 ${
            isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-100 bg-slate-50/70'
          }`}>
            <button
              onClick={() => setIsAuthenticated(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors min-h-[44px] ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
              }`}
            >
              Kunci
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 min-h-[44px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan & Selesai</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
