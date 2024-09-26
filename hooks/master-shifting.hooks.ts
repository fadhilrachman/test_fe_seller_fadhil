import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import {
  CreateMasterShiftingType,
  MasterShiftingType
} from '@/types/master-shifting.type';
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

type formData = z.infer<typeof CreateMasterShiftingType>;
// type formDataUpdateMasterShifting= z.infer<typeof CreateEmployeSchema>;

export const useCreateMasterShifting = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.post('/operator/master-shifting', body);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_MASTER_SHIFTING'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Sukses',
        description: 'Sukses tambah divisi'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;
      toast({
        title: 'Login Error',
        variant: 'destructive',
        description: messageError || 'Internal Server Error'
      });

      //   enqueueSnackbar({
      //     message: messageError?.[0]?.[0] || "Internal Server Error",
      //     variant: "error",
      //   });
    }
  }, [mutation.status]);

  return mutation;
};

export const useListMasterShifting = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseListDto<MasterShiftingType>>({
    queryKey: ['LIST_MASTER_SHIFTING'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/master-shifting', { params });
      return result.data;
    }
  });

  return query;
};

export const useUpdateMasterShifting = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.put('/operator/master-shifting', body);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      //   enqueueSnackbar({ message: "Success Update MASTER_SHIFTING", variant: "success" });
      navigate.push('/master-data/master-shifting');
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

export const useDeleteMasterShifting = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation<any, Error, number>({
    mutationFn: async (id: number) => {
      const result = await fetcher.delete(`/operator/master-shifting/${id}`);
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
