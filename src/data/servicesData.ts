import { ServiceItem, TrackingRecord } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'surat-keterangan-siswa',
    iconName: 'FileText',
    title: 'Surat Keterangan Siswa',
    description: 'Permohonan surat keterangan siswa aktif, NISN, dan kelakuan baik secara daring.',
    category: 'siswa',
    href: 'https://script.google.com/a/macros/admin.smp.belajar.id/s/AKfycbwk9p4PP9d3QawDF5r9KLXGSJ9bTc4IkRAJM7eu3i5kLINdhUxXN5id4ftnWvV2Y0fy/exec',
    badge: 'Cloud Script',
    sla: '1 Hari Kerja'
  },
  {
    id: 'legalisir-dokumen',
    iconName: 'Shield',
    title: 'Layanan Legalisir',
    description: 'Pengesahan autentik fotokopi ijazah, SKHUN, dan buku rapor kelulusan secara online.',
    category: 'legalisir',
    href: 'https://script.google.com/a/macros/admin.smp.belajar.id/s/AKfycbwu8I6w0e8NK0ISx0Cmsv13ghpd82Zjx_VoePMSAi7hw-ax4NzD7zLHEAHKEgNjCzjMAg/exec',
    badge: 'Cloud Script',
    sla: '1-2 Hari Kerja'
  },
  {
    id: 'surat-dispensasi',
    iconName: 'FileCheck',
    title: 'Surat Dispensasi Siswa',
    description: 'Permohonan izin dispensasi lomba kejuaraan sains, seni, olahraga, dan dinas sekolah.',
    category: 'siswa',
    href: 'https://script.google.com/a/macros/admin.smp.belajar.id/s/AKfycbytEErhUfcOQgtr0mk8DtFotBHOcJubuKg1OOMKSZtgK6FM747eH4WxzG3fSI8PozmFnA/exec',
    badge: 'Cloud Script',
    sla: '1 Hari Kerja'
  },
  {
    id: 'mutasi-siswa',
    iconName: 'Users',
    title: 'Layanan Mutasi Siswa',
    description: 'Administrasi proses mutasi masuk maupun mutasi keluar siswa sesuai regulasi dinas.',
    category: 'legalisir',
    href: 'https://dosis-spega-rosy.vercel.app/',
    badge: 'DOSIS Portal',
    sla: '2-3 Hari Kerja'
  },
  {
    id: 'pengajuan-surat',
    iconName: 'Mail',
    title: 'Pengajuan Surat Mandiri',
    description: 'Pengajuan aneka permohonan persuratan mandiri siswa daring melalui SPEGA Mail.',
    category: 'siswa',
    href: 'https://spega-mail.vercel.app/',
    badge: 'SPEGA Mail',
    sla: '1-2 Hari Kerja'
  },
  {
    id: 'surat-tugas',
    iconName: 'FileCheck',
    title: 'Surat Tugas PTK & Guru',
    description: 'Penerbitan surat tugas kedinasan, bimbingan teknis, dan pelatihan bagi dewan guru/PTK.',
    category: 'guru',
    href: 'https://script.google.com/a/macros/admin.smp.belajar.id/s/AKfycbxvcqSk5MyN9njpXahqinVtBu3Gtl3W_pZxbPn2TkIJ6VdOfVuItKz-mTLSMx5Qv05w/exec',
    badge: 'Cloud Script',
    sla: '1 Hari Kerja'
  },
  {
    id: 'surat-pengantar',
    iconName: 'SendHorizontal',
    title: 'Surat Pengantar Dinas',
    description: 'Penerbitan surat pengantar resmi ke Dinas Pendidikan, instansi kedinasan, atau instansi terkait.',
    category: 'guru',
    href: 'https://script.google.com/a/macros/admin.smp.belajar.id/s/AKfycbwsh78aGExFoL5mXAZ0iVM89bJwXLcFDGM9gdv_n59TG-ZoRMrGgYWyg56DDdrBCKs/exec',
    badge: 'Cloud Script',
    sla: '1 Hari Kerja'
  },
  {
    id: 'pengaduan-saran',
    iconName: 'Send',
    title: 'Aspirasi & Hotline TU',
    description: 'Saluran pengaduan, kritik, konsultasi, dan evaluasi pelayanan publik tata usaha.',
    category: 'siswa',
    href: 'https://wa.me/6281234567890?text=Halo%20TU%20SMPN%203%20Kras%20saya%20ingin%20menyampaikan%20aspirasi%20layanan',
    badge: 'WhatsApp TU',
    sla: 'Respons Cepat'
  }
];

export const INITIAL_TRACKING_DATA: Record<string, TrackingRecord> = {
  'REQ-2025-0892': {
    resiNumber: 'REQ-2025-0892',
    applicantName: 'Ahmad Faiz Ramadhan',
    applicantId: '0089234120',
    serviceType: 'Surat Keterangan Siswa Aktif (Kelas 9A)',
    submissionDate: '08 Oktober 2026, 09:15 WIB',
    estimatedCompletion: '09 Oktober 2026, 14:00 WIB',
    currentStep: 4,
    status: 'selesai',
    officer: 'Bpk. Sugeng Wibowo, S.Pd (Staf TU)',
    notes: 'Dokumen telah ditandatangani secara elektronik oleh Kepala Sekolah dan siap diunduh.',
    qrToken: 'SPNTK-VERIFIED-892-F9A'
  },
  'DISP-2025-014': {
    resiNumber: 'DISP-2025-014',
    applicantName: 'Nadia Putri Maharani',
    applicantId: '0091245678',
    serviceType: 'Surat Dispensasi Olimpiade Sains Nasional (OSN)',
    submissionDate: '09 Oktober 2026, 08:30 WIB',
    estimatedCompletion: '10 Oktober 2026, 12:00 WIB',
    currentStep: 3,
    status: 'proses',
    officer: 'Ibu Rina Astuti, S.AP (Petugas Arsip)',
    notes: 'Berkas verifikasi lolos kualifikasi. Sedang proses penerbitan e-signature pimpinan.',
    qrToken: 'SPNTK-VERIFIED-014-OSN'
  },
  'MUT-2025-007': {
    resiNumber: 'MUT-2025-007',
    applicantName: 'Dimas Satria Wicaksono',
    applicantId: '0078129034',
    serviceType: 'Mutasi Masuk dari SMPN 1 Pare',
    submissionDate: '07 Oktober 2026, 10:20 WIB',
    estimatedCompletion: '11 Oktober 2026, 15:00 WIB',
    currentStep: 2,
    status: 'verifikasi',
    officer: 'Bpk. Bambang Irawan (Subag Tata Usaha)',
    notes: 'Sedang dilakukan validasi daya tampung kelas dan berkas Dapodik dari dinas pendidikan.',
    qrToken: 'SPNTK-VERIFIED-007-MUT'
  },
  'TRANS-2025-042': {
    resiNumber: 'TRANS-2025-042',
    applicantName: 'Dewi Anjani',
    applicantId: '0069451122',
    serviceType: 'Legalisir Ijazah & Rekap Rapor (Alumni 2024)',
    submissionDate: '09 Oktober 2026, 11:00 WIB',
    estimatedCompletion: '10 Oktober 2026, 15:00 WIB',
    currentStep: 4,
    status: 'selesai',
    officer: 'Ibu Rina Astuti, S.AP (Petugas Arsip)',
    notes: '5 Rangkap ijazah dan rapor telah dilegalisir basah dan cap dinas. Siap diambil di loket TU.',
    qrToken: 'SPNTK-VERIFIED-042-LEG'
  }
};
