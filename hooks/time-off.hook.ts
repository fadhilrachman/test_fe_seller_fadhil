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
      const result = await fetcher.post('/operator/time-off', body);
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
        description: 'Berhasil tambah cuti'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = error?.response?.data?.errors?.[0]
        ? Object.values(error.response.data.errors[0])[0]
        : 'Internal Server Error';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError as any
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useListTimeOff = (params: {
  page: number;
  per_page: number;
  search?: string;
  division_id?: string;
  enabled?: boolean;
  status?: 'approved' | 'rejected';
  type?: 'yearly' | 'give_birth' | 'death' | 'hajj_pilgrimage';
}) => {
  const query = useQuery<BaseResponseListDto<TimeOffType>>({
    queryKey: ['LIST_TIME_OFF'],
    enabled: params.enabled == undefined ? true : params.enabled,
    queryFn: async () => {
      const result = await fetcher.get('/operator/time-off', { params });
      return result.data;
    }
  });

  return query;
};

export const useUpdateTimeOff = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.put(`/operator/time-off/${id}`, body);
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
        description: 'Berhasil edit cuti'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = error?.response?.data?.errors?.[0]
        ? Object.values(error.response.data.errors[0])[0]
        : 'Internal Server Error';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError as any
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteTimeOff = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const result = await fetcher.delete(`/operator/time-off/${id}`);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Berhasil',
        description: 'Berhasil hapus cuti'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = error?.response?.data?.errors?.[0]
        ? Object.values(error.response.data.errors[0])[0]
        : 'Internal Server Error';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError as any
      });
    }
  }, [mutation.status]);

  return mutation;
};
