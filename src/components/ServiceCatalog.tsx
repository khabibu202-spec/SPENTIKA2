import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  FileCheck,
  FileText,
  SendHorizontal,
  UserCheck,
  Users,
  Shield,
  BookOpen,
  GraduationCap,
  Send,
  Package,
  ExternalLink,
  Search,
  Clock
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCatalogProps {
  services: ServiceItem[];
  isDark: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Mail,
  FileCheck,
  FileText,
  SendHorizontal,
  UserCheck,
  Users,
  Shield,
  BookOpen,
  GraduationCap,
  Send,
  Package
};

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  isDark
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter only by search query (categories completely removed)
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }, [services, searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Quick Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <span>KATALOG TATA USAHA</span>
            <span aria-hidden="true">·</span>
            <span>{services.length} LAYANAN TERPADU</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Semua Layanan Administrasi Sekolah
          </h2>
        </div>

        {/* Search Input: compact */}
        <div className="w-full sm:w-64 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari layanan cepat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-xs'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Unified Compact Grid: 4 columns on desktop, 3 on tablet, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {filteredServices.map((service, idx) => {
          const IconComponent = iconMap[service.iconName] || FileText;

          return (
            <motion.a
              key={service.id}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.003, duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-150 ease-out flex flex-col justify-between relative hover:-translate-y-0.5 active:scale-[0.98] min-h-[130px] sm:min-h-[148px] ${
                isDark
                  ? 'bg-slate-900/75 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-950/40'
                  : 'bg-white border-slate-200/90 hover:border-cyan-400 hover:shadow-md'
              }`}
            >
              <div>
                {/* Top Row: Icon + Badge + Arrow */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 ${
                    isDark
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                      : 'bg-cyan-50 border border-cyan-100 text-cyan-600'
                  }`}>
                    <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-500 transition-colors">
                    <span className="text-[10px] font-mono font-medium hidden sm:inline truncate max-w-[80px]">
                      {service.badge}
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-tight sm:leading-snug line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Bottom SLA Info */}
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                <span className="truncate">{service.badge}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <Clock className="w-2.5 h-2.5 text-cyan-500" />
                  <span>{service.sla}</span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-6 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-xs text-slate-500">Tidak ada layanan yang sesuai dengan kata kunci pencarian Anda.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-1 text-xs font-bold text-cyan-500 hover:underline min-h-[36px] px-2 inline-flex items-center"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
