import * as z from 'zod';

export interface TimeOffType {
  id: string;
  code: string;
  start_date: Date;
  end_date: Date;
  status: 'approved' | 'rejected';
  type: 'yearly' | 'give_birth' | 'death' | 'hajj_pilgrimage';
  description: string;
  user: {
    id: string;
    email: string;
    job_title: string;
    name: string;
  };
}
export const CreateTimeOffType = z.object({
  user_id: z.string().min(1, { message: 'This field is required' }),
  start_date: z.string().min(1, { message: 'This field is required' }),
  end_date: z.string().min(1, { message: 'This field is required' }),
  type: z.string().min(1, { message: 'This field is required' }),
  description: z.string().nullable()
});
