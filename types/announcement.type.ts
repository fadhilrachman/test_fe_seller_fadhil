import * as z from 'zod';

export const CreateAnnouncementType = z.object({
  description: z.string().min(1, { message: 'This field is required' }),
  expired_date: z.string(),
  image: z.string().nullable()
});

export interface ListAnnouncementType {
  id: string;
  created_at: Date;
  expired_date: Date;
  description: string;
  image?: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    job_title: string;
  };
}
