export interface ApprovalType {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  status: 'waiting_approval' | 'approved' | 'rejected';
  approval_type: 'attendance' | 'shifting' | 'time_off';
  supporting_document?: string;
  start_date: Date;
  end_date: Date;
  description?: string;
  created_at: string;
}
