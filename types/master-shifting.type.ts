import * as z from 'zod';

export interface MasterShiftingType {
  id: string;
  code: string;
  entry_hours: string;
  name: string;
  leave_hours: string;
  description?: string;
  user: {
    id: string;
    email: string;
    job_title: string;
    name: string;
  };
}

export const CreateMasterShiftingType = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  entry_hours: z.string().min(1, { message: 'This field is required' }),
  leave_hours: z.string().min(1, { message: 'This field is required' }),
  description: z.string().nullable()
});
