export const TIME_OFF = {
  yearly: 'Tahunan',
  give_birth: 'Melahirkan',
  death: 'Kematian',
  hajj_pilgrimage: 'Haji'
};
export const STATUS = {
  waiting_approval: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak'
};
export const STATUS_COLOR = {
  waiting_approval: 'waiting',
  approved: 'approved',
  rejected: 'destructive'
};

export const ENTRY_STATUS_ATTENDANCE = {
  late: {
    label: 'Telat',
    variant_badge: 'destructive'
  },
  on_time: {
    label: 'Tepat Waktu',
    variant_badge: 'approved'
  },
  sick: {
    label: 'Sakit',
    variant_badge: 'secondary'
  },
  time_off: {
    label: 'Cuti',
    variant_badge: 'waiting'
  }
};

export const LEAVE_STATUS_ATTENDANCE = {
  too_fast: {
    label: 'Terlalu Cepat',
    variant_badge: 'destructive'
  },
  on_time: {
    label: 'Tepat Waktu',
    variant_badge: 'approved'
  },
  sick: {
    label: 'Sakit',
    variant_badge: 'secondary'
  },
  time_off: {
    label: 'Cuti',
    variant_badge: 'waiting'
  }
};
