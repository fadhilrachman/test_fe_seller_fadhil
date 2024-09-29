import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import {
  CreateAnnouncementType,
  ListAnnouncementType
} from '@/types/announcement.type';
import { CreateTimeOffType, TimeOffType } from '@/types/time-off.type';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as z from 'zod';

type formData = z.infer<typeof CreateTimeOffType>;
// type formDataUpdateAnnouncement= z.infer<typeof CreateEmployeSchema>;

export const useCreateTimeOff = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.post('/operator/announcement', body);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_TIME_OFF'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Berhasil',
        description: 'Berhasil membuat cuti'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal membuat cuti';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useListTimeOff = (params: {
  page: number;
  per_page: number;
  search?: string;
  status?: 'approved' | 'rejected';
  type?: 'yearly' | 'give_birth' | 'death' | 'hajj_pilgrimage';
}) => {
  const query = useQuery<BaseResponseListDto<TimeOffType>>({
    queryKey: ['LIST_TIME_OFF'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/time-off', { params });
      return result.data;
    }
  });

  return query;
};

export const useUpdateAnnouncement = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.put(`/operator/announcement/${id}`, body);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_ANNOUNCMENT'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Berhasil',
        description: 'Berhasil edit pengumuman'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal edit pengumuman';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteAnnouncement = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation<any, Error, number>({
    mutationFn: async (id: number) => {
      const result = await fetcher.delete(`/operator/announcement/${id}`);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;
      console.log({ data });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;

      //   enqueueSnackbar({
      //     message: messageError?.[0]?.[0] || "Internal Server Error",
      //     variant: "error",
      //   });
    }
  }, [mutation.status]);

  return mutation;
};
