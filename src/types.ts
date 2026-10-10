export type View = 'beranda' | 'layanan' | 'pelacakan' | 'sop' | 'kontak';

export type ThemeName = 'cyber-navy' | 'emerald-tech' | 'titanium-obsidian' | 'royal-violet';

export type ColorMode = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  category: 'siswa' | 'guru' | 'legalisir' | 'sarpras';
  href: string;
  badge: string;
  sla: string;
}

export interface TrackingRecord {
  resiNumber: string;
  applicantName: string;
  applicantId: string; // NISN or NIP
  serviceType: string;
  submissionDate: string;
  estimatedCompletion: string;
  currentStep: number; // 1 to 4
  status: 'proses' | 'verifikasi' | 'selesai' | 'ditolak';
  officer: string;
  notes: string;
  qrToken: string;
}
