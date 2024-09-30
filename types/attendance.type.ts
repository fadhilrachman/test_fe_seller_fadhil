export interface HistoryAttendanceType {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    job_title: string;
    division: {
      id: string;
      name: string;
      entry_time: string;
      leave_time: string;
    };
  };
  is_absent_from_operator: boolean;

  entry_time: Date;
  entry_location: string;
  entry_status: 'late' | 'on_time' | 'sick' | 'time_off';
  entry_img?: string;

  leave_time: Date;
  leave_location: string;
  leave_status: 'too_fast' | 'on_time' | 'sick' | 'time_off';
  leave_img?: string;

  shifting?: {
    id: string;
    master_shifting: {
      id: string;
      name: string;
      entry_time: string;
      leave_time: string;
    };
  };

  time_off?: {
    id: true;
    type: 'yearly' | 'give_birth' | 'death' | 'hajj_pilgrimage';
  };
}
