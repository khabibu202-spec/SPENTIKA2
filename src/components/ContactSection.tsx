import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const contactCards = [
    {
      icon: MapPin,
      title: 'Lokasi Sekolah',
      subtitle: 'Gedung Tata Usaha Utama',
      detail: 'Jl. Raya Kras - Kediri, Kec. Kras, Kab. Kediri, Jawa Timur 64172',
      actionText: 'Buka Petunjuk Arah',
      actionUrl: 'https://maps.google.com/?q=SMP+Negeri+3+Kras+Kediri'
    },
    {
      icon: Phone,
      title: 'Saluran Telepon',
      subtitle: 'Layanan Hari Kerja',
      detail: '(0354) 479123 / Hotline TU: 0812-3456-7890',
      actionText: 'Hubungi via WhatsApp',
      actionUrl: 'https://wa.me/6281234567890?text=Halo%20TU%20SMPN%203%20Kras'
    },
    {
      icon: Mail,
      title: 'Email Kedinasan',
      subtitle: 'Korespondensi Elektronik',
      detail: 'tu@smpn3kras.sch.id / spentika.kras@gmail.com',
      actionText: 'Kirim Email',
      actionUrl: 'mailto:tu@smpn3kras.sch.id'
    },
    {
      icon: Clock,
      title: 'Jam Pelayanan Loket',
      subtitle: 'Waktu Indonesia Barat (WIB)',
      detail: 'Senin - Kamis: 07.00 - 15.00 WIB\nJumat: 07.00 - 11.30 & 13.00 - 14.30 WIB',
      actionText: 'Kirim Pesan WhatsApp',
      actionUrl: 'https://wa.me/6281234567890?text=Halo%20TU%20SMPN%203%20Kras%20saya%20ingin%20konsultasi%20pelayanan'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <span>PUSAT KOMUNIKASI & BANTUAN</span>
          <span aria-hidden="true">·</span>
          <span>RESPONS CEPAT</span>
        </div>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hubungi Loket Tata Usaha
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400">
          Staf administrasi kami siap mendampingi kebutuhan informasi, verifikasi data induk, dan persuratan resmi sekolah.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {contactCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.004, duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between transition-all ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                : 'bg-white border-slate-200 hover:border-cyan-300 shadow-xs'
            }`}
          >
            <div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 ${
                isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
              }`}>
                <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-0.5">
                {card.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1.5">
                {card.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line leading-relaxed mb-4 sm:mb-6">
                {card.detail}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800">
              <a
                href={card.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 min-h-[44px] w-full"
              >
                <span>{card.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
