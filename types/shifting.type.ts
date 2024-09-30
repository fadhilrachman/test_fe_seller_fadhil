import * as z from 'zod';

export interface ShiftingType {
  id: string;
  code: string;
  shifting_date_start: Date;
  shifting_date_end: Date;
  description?: string;
  user: {
    id: string;
    email: string;
    job_title: string;
    name: string;
  };
  master_shifting: {
    id: string;
    code: string;
    entry_hours: string;
    name: string;
    leave_hours: string;
  };
}

export const CreateShiftingType = z.object({
  user_id: z.string().min(1, { message: 'This field is required' }),
  shifting_date_start: z.string().min(1, { message: 'This field is required' }),
  shifting_date_end: z.string().min(1, { message: 'This field is required' }),
  master_shifting_code: z.string().nullable()
});
