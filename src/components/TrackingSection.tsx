import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle2, Clock, AlertCircle, FileCheck2, QrCode, ExternalLink, Printer, ShieldCheck, ArrowRight } from 'lucide-react';
import { TrackingRecord } from '../types';

interface TrackingSectionProps {
  trackingData: Record<string, TrackingRecord>;
  searchedResi?: string;
  isDark: boolean;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  trackingData,
  searchedResi = '',
  isDark
}) => {
  const [searchInput, setSearchInput] = useState(searchedResi || 'REQ-2025-0892');
  const [activeRecord, setActiveRecord] = useState<TrackingRecord | null>(() => {
    return trackingData[searchedResi] || trackingData['REQ-2025-0892'] || null;
  });
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchInput).trim().toUpperCase();
    if (!query) return;

    let found = trackingData[query];
    if (!found) {
      found = (Object.values(trackingData) as TrackingRecord[]).find(
        (r) => r.applicantId.toUpperCase() === query || r.applicantName.toUpperCase().includes(query)
      )!;
    }

    setActiveRecord(found || null);
    setHasSearched(true);
    if (codeToSearch) {
      setSearchInput(codeToSearch);
    }
  };

  const steps = [
    { num: 1, label: 'Pengajuan Daring', desc: 'Registrasi sistem' },
    { num: 2, label: 'Verifikasi Berkas', desc: 'Pemeriksaan TU' },
    { num: 3, label: 'Pengesahan Pimpinan', desc: 'Validasi & e-sign' },
    { num: 4, label: 'Penerbitan Dokumen', desc: 'Siap unduh/ambil' }
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Search Header Banner */}
      <div className={`p-4 sm:p-10 rounded-2xl sm:rounded-3xl border relative overflow-hidden transition-all ${
        isDark
          ? 'bg-slate-900/90 border-cyan-500/30 shadow-xl shadow-cyan-950/40'
          : 'bg-white border-slate-200/90 shadow-md shadow-slate-900/5'
      }`}>
        <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>Pusat Pelacakan Berkas Terintegrasi</span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Lacak Status Permohonan Administrasi
          </h2>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Pantau transparansi tahapan pemrosesan surat dan dokumen Anda secara presisi dengan memasukkan Nomor Resi atau NISN.
          </p>

          {/* Search bar: Full width stacked on mobile */}
          <div className="pt-1 sm:pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nomor Resi / NISN..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 rounded-xl sm:rounded-2xl border font-mono text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs sm:text-base shadow-md shadow-cyan-500/25 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Lacak Berkas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Test Codes */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs">
              <span className="text-slate-400 font-medium">Contoh:</span>
              {['REQ-2025-0892', 'DISP-2025-014', 'MUT-2025-007', 'TRANS-2025-042'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSearch(code)}
                  className={`px-2 py-0.5 rounded-lg border font-mono text-[10px] sm:text-xs transition-all min-h-[30px] flex items-center ${
                    searchInput === code
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-300 font-bold'
                      : isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Container */}
      <AnimatePresence mode="wait">
        {activeRecord ? (
          <motion.div
            key={activeRecord.resiNumber}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 sm:p-10 rounded-2xl sm:rounded-3xl border ${
              isDark
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mb-0.5">
                  <span className="font-mono">NO. RESI: {activeRecord.resiNumber}</span>
                  <span>·</span>
                  <span className="truncate">{activeRecord.submissionDate}</span>
                </div>
                <h3 className="text-base sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {activeRecord.serviceType}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                  Pemohon: {activeRecord.applicantName} ({activeRecord.applicantId})
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
                <div className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${
                  activeRecord.status === 'selesai'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                }`}>
                  {activeRecord.status === 'selesai' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selesai</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Diproses</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowPrintModal(true)}
                  className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                  title="Cetak Bukti Resi Pelacakan"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stepper Timeline: 2x2 grid on mobile */}
            <div className="py-4 sm:py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 relative">
                {steps.map((st) => {
                  const isPassed = activeRecord.currentStep >= st.num;
                  const isCurrent = activeRecord.currentStep === st.num;

                  return (
                    <div
                      key={st.num}
                      className={`relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                        isCurrent
                          ? isDark
                            ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950/50'
                            : 'bg-cyan-50/80 border-cyan-300 shadow-xs'
                          : isPassed
                          ? isDark
                            ? 'bg-slate-950/60 border-emerald-500/40 text-slate-200'
                            : 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : isDark
                          ? 'bg-slate-950/30 border-slate-800 text-slate-500'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] sm:text-xs font-mono font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                          isPassed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {st.num}
                        </span>
                        {isPassed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold tracking-tight mb-0.5 leading-tight">
                        {st.label}
                      </h4>
                      <p className="text-[10px] sm:text-xs opacity-75 leading-tight truncate">
                        {st.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audit Details */}
            <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Petugas Pemroses
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {activeRecord.officer}
                </p>
              </div>

              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Estimasi Penyelesaian
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {activeRecord.estimatedCompletion}
                </p>
              </div>

              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Token Verifikasi Digital
                </span>
                <p className="text-[11px] sm:text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate">{activeRecord.qrToken}</span>
                </p>
              </div>

              <div className="md:col-span-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Catatan Pelayanan: </span>
                <span className="text-slate-600 dark:text-slate-400">{activeRecord.notes}</span>
              </div>
            </div>
          </motion.div>
        ) : hasSearched ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-6 sm:p-10 rounded-2xl sm:rounded-3xl border text-center space-y-3 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                Dokumen Tidak Ditemukan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                Nomor resi atau NISN yang Anda masukkan belum terdaftar dalam sistem. Silakan periksa kembali atau hubungi petugas loket TU.
              </p>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20TU%20SMPN%203%20Kras%20saya%20ingin%20menanyakan%20status%20berkas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs sm:text-sm min-h-[44px]"
            >
              <span>Hubungi Petugas Loket TU</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Print / Proof Modal: Mobile bottom sheet or modal */}
      <AnimatePresence>
        {showPrintModal && activeRecord && (
          <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-white text-slate-900 rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" />
              <button
                onClick={() => setShowPrintModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
              
              <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-600">Dinas Pendidikan Kab. Kediri</h4>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase">SMP NEGERI 3 KRAS</h3>
                <p className="text-[10px] sm:text-xs text-slate-500">Resi Bukti Pelacakan Administrasi Digital</p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">No. Resi</span>
                  <span className="font-mono font-bold text-slate-900">{activeRecord.resiNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Nama Pemohon</span>
                  <span className="font-semibold">{activeRecord.applicantName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">NISN / Identitas</span>
                  <span className="font-mono">{activeRecord.applicantId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Layanan Dokumen</span>
                  <span className="font-semibold text-right max-w-xs">{activeRecord.serviceType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Status Validasi</span>
                  <span className="font-bold text-emerald-600 uppercase">{activeRecord.status}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Token Keamanan</span>
                  <span className="font-mono text-[10px] sm:text-xs">{activeRecord.qrToken}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  <p className="font-semibold text-slate-700">Tanda Terima Sah Elektronik</p>
                  <p>Divalidasi TU SPENTIKA</p>
                </div>
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>

              <div className="mt-5 flex gap-2 justify-end">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 min-h-[44px]"
                >
                  Tutup
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 flex items-center gap-1.5 min-h-[44px]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
