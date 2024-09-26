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

export const useUploadFile = () => {
  const { toast } = useToast();

  const mutation = useMutation<any, Error, any>({
    mutationFn: async (acceptedFiles: File) => {
      const formData = new FormData();
      formData.append('file', acceptedFiles);
      const result = await fetcher.post('/operator/common/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*'
        }
      });
      return result.data;
    }
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Sukses',
        variant: 'success',
        description: 'Sukses upload'
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
