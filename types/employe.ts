import * as z from 'zod';

export const CreateEmployeSchema = z.object({
  name: z.string().min(3, { message: 'This field is required' }),
  email: z.string().min(3, { message: 'This field is required' }),
  nik: z.string().min(16, { message: 'Minimum 16 Karakter' }),
  avatar: z.string().min(10, { message: 'This field is required' }),
  address: z.string().min(30, { message: 'This field is required' }),
  phone: z.string().min(10, { message: 'This field is required' }),
  dob: z.string().min(3, { message: 'This field is required' }),
  pob: z.string().min(3, { message: 'This field is required' }),
  job_title: z.string().min(3, { message: 'This field is required' }),
  region: z.string().min(3, { message: 'This field is required' })
});

export interface EmployeDtoType {
  id: string;
  name: string;
  nik: string;
  email: string;
  avatar: string;
  code: string;
  job_title: string;
  division: {
    id: string;
    name: string;
  };
}
