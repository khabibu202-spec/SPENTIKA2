import React from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck2, 
  Search, 
  PenTool, 
  Download, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

interface SopSectionProps {
  isDark: boolean;
}

export const SopSection: React.FC<SopSectionProps> = ({ isDark }) => {
  const steps = [
    {
      step: '01',
      title: 'Pilih Layanan Resmi',
      desc: 'Pemohon memilih layanan administrasi melalui katalog resmi TU SPENTIKA sesuai kebutuhan.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Verifikasi Berkas',
      desc: 'Petugas Tata Usaha memvalidasi keaslian data pada pangkalan Dapodik sekolah dalam waktu maksimal 1 hari kerja.',
      icon: Search
    },
    {
      step: '03',
      title: 'Pengesahan Pimpinan',
      desc: 'Dokumen diparaf dan ditandatangani secara elektronik oleh Kepala Sekolah dengan segel verifikasi digital.',
      icon: PenTool
    },
    {
      step: '04',
      title: 'Penerbitan Berkas',
      desc: 'Dokumen ber-QR sah dapat diunduh langsung dalam format PDF atau diambil salinan fisiknya di loket TU.',
      icon: Download
    }
  ];

  const standards = [
    { label: 'Biaya Layanan', value: 'Rp 0,- (Gratis)' },
    { label: 'Waktu Penyelesaian', value: '1 - 2 Hari Kerja' },
    { label: 'Dasar Hukum', value: 'Permendikbudristek No. 47' },
    { label: 'Jaminan Layanan', value: 'Transparan & Akuntabel' }
  ];

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <span>STANDAR OPERASIONAL PROSEDUR (SOP)</span>
          <span aria-hidden="true">·</span>
          <span>BIROKRASI BERSIH</span>
        </div>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Alur Pelayanan Administrasi Sekolah
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400">
          Pedoman proses tata persuratan yang terstandarisasi, transparan, dan bebas biaya di SMP Negeri 3 Kras.
        </p>
      </div>

      {/* 4-Step Cards: 1 column on mobile, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {steps.map((st, idx) => (
          <motion.div
            key={st.step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.004, duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <span className="text-xl sm:text-2xl font-black font-mono text-cyan-500 opacity-60">
                  {st.step}
                </span>
                <div className={`p-2 sm:p-2.5 rounded-xl ${
                  isDark ? 'bg-slate-800 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
                }`}>
                  <st.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Standards Summary */}
      <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border ${
        isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <h3 className="text-sm sm:text-base font-bold tracking-tight mb-4 text-center">
          Maklumat Standar Pelayanan Tata Usaha
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {standards.map((std, i) => (
            <div
              key={i}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {std.label}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                {std.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
