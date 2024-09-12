import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import { CreateDivisionSchema } from '@/types/division';
import { CreateEmployeSchema, EmployeDtoType } from '@/types/employe';
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

type formData = z.infer<typeof CreateDivisionSchema>;
// type formDataUpdateDivision = z.infer<typeof CreateEmployeSchema>;

export const useCreateDivision = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const { name, entry_time, leave_time, latitude, longitude } = body;
      const finalyPayload = {
        name,
        entry_time,
        leave_time,
        location: `${latitude}, ${longitude}`
      };
      const result = await fetcher.post('/operator/division', finalyPayload);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_DIVISION'] }); // Menggunakan invalidateQueries untuk memicu ulang query
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

export const useListDivision = (params: any) => {
  const query = useQuery<BaseResponseListDto<EmployeDtoType>>({
    queryKey: ['LIST_DIVISION'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/division', { params });
      return result.data;
    }
  });

  return query;
};

export const useUpdateDivision = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const { name, entry_time, leave_time, latitude, longitude } = body;
      const finalyPayload = {
        name,
        entry_time,
        leave_time,
        location: `${latitude}, ${longitude}`
      };
      const result = await fetcher.put('/operator/division', finalyPayload);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      //   enqueueSnackbar({ message: "Success Update Division", variant: "success" });
      navigate.push('/master-data/division');
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

export const useDeleteDivision = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation<any, Error, number>({
    mutationFn: async (id: number) => {
      const result = await fetcher.delete(`/operator/division/${id}`);
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
