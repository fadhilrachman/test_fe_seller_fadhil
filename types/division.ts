import * as z from 'zod';

export const CreateDivisionSchema = z.object({
  name: z.string().min(3, { message: 'This field is required' }),
  latitude: z.string().min(3, { message: 'This field is required' }),
  longitude: z.string().min(3, { message: 'This field is required' }),
  entry_time: z.string().min(1, { message: 'This field is required' }),
  leave_time: z.string().min(1, { message: 'This field is required' })
});

export interface DivisionType {
  id: string;
  name: string;
  location: string;
  entry_time: string;
  leave_time: string;
  code: string;
}

export interface formDataDivision {
  name: string;
  latitude: string;
  longitude: string;
  entry_time: string;
  leave_time: string;
}
