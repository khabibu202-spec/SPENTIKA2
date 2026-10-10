import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Search, ShieldCheck, Users, FileCheck, Clock, Award } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToTracking: () => void;
  onNavigateToServices: () => void;
  isDark: boolean;
  appName: string;
  appSubtitle: string;
  appSlogan: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTracking,
  onNavigateToServices,
  isDark,
  appName,
  appSubtitle,
  appSlogan
}) => {
  const kpis = [
    { label: 'Siswa & PTK Terintegrasi', value: '850+', icon: Users, detail: 'Dapodik terverifikasi' },
    { label: 'Layanan Berkas Tuntas', value: '12.8k+', icon: FileCheck, detail: 'Terenkripsi digital' },
    { label: 'Waktu Penyelesaian Rata-rata', value: '1.4 Hari', icon: Clock, detail: 'Sesuai SOP dinas' },
    { label: 'Biaya Administrasi Resmi', value: 'Rp 0,-', icon: Award, detail: 'Gratis & transparan' }
  ];

  return (
    <div className="space-y-6 sm:space-y-10 max-w-4xl mx-auto text-center py-2 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Clean Unboxed Metadata */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <span>PORTAL RESMI TATA USAHA</span>
          <span aria-hidden="true">·</span>
          <span>SPENTIKA DIGITAL</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">KEDIRI</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white max-w-3xl mx-auto">
          Layanan Administrasi Digital Terpadu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500">
            {appSubtitle}
          </span>
        </h1>

        {/* Subtitle / Slogan */}
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          {appSlogan || 'Portal resmi layanan administrasi dan tata usaha SMP Negeri 3 Kras. Kemudahan akses berbagai layanan surat-menyurat, dispensasi, legalisir, dan informasi sekolah dalam satu genggaman.'}
        </p>

        {/* Clean, Simple CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToServices}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group min-h-[48px]"
          >
            <span>Katalog Layanan Sekolah</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onNavigateToTracking}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl border font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 min-h-[48px] ${
              isDark
                ? 'border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-slate-200'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
            }`}
          >
            <Search className="w-4 h-4 text-cyan-500" />
            <span>Lacak Status Berkas</span>
          </button>
        </div>

        {/* Trust Banner */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Sistem Pelayanan Terbuka · Standar SOP Dinas Pendidikan</span>
        </div>
      </motion.div>

      {/* Full-width 4-Column KPI Strip (2x2 on mobile, 4 columns on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 text-left">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className={`text-lg sm:text-2xl font-extrabold font-mono tabular-nums tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {kpi.value}
              </span>
              <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
                isDark ? 'bg-slate-800 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
              }`}>
                <kpi.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
              {kpi.label}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
              {kpi.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
