import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import { CreateShiftingType, ShiftingType } from '@/types/shifting.type';
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

type formData = z.infer<typeof CreateShiftingType>;
// type formDataUpdateShifting= z.infer<typeof CreateEmployeSchema>;

export const useCreateShifting = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.post('/operator/shifting', body);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_SHIFTING'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Sukses',
        variant: 'success',
        description: 'Sukses tambah shifting'
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

export const useListShifting = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseListDto<ShiftingType>>({
    queryKey: ['LIST_SHIFTING'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/shifting', { params });
      return result.data;
    }
  });

  return query;
};

// export const useUpdateShifting = () => {
//   //   const { enqueueSnackbar } = useSnackbar();
//   const navigate = useRouter();
//   const mutation = useMutation<any, Error, formData>({
//     mutationFn: async (body: formData) => {
//       const result = await fetcher.put('/operator/shifting', body);
//       return result.data;
//     }
//   });

//   useEffect(() => {
//     const status = mutation.status;
//     if (status == 'success') {
//       //   enqueueSnackbar({ message: "Success Update _SHIFTING", variant: "success" });
//       navigate.push('/-data/-shifting');
//     }

//     if (status == 'error') {
//       const error = mutation.error as AxiosError<any>;

//       const messageError = Object.values(
//         error.response?.data.errors?.[0] || {}
//       ) as any;

//       //   enqueueSnackbar({
//       //     message: messageError?.[0]?.[0] || "Internal Server Error",
//       //     variant: "error",
//       //   });
//     }
//   }, [mutation.status]);

//   return mutation;
// };

// export const useDeleteShifting = () => {
//   //   const { enqueueSnackbar } = useSnackbar();
//   const mutation = useMutation<any, Error, number>({
//     mutationFn: async (id: number) => {
//       const result = await fetcher.delete(`/operator/-shifting/${id}`);
//       return result.data;
//     }
//   });

//   useEffect(() => {
//     const status = mutation.status;
//     if (status == 'success') {
//       const { data } = mutation;
//       console.log({ data });
//     }

//     if (status == 'error') {
//       const error = mutation.error as AxiosError<any>;

//       const messageError = Object.values(
//         error.response?.data.errors?.[0] || {}
//       ) as any;

//       //   enqueueSnackbar({
//       //     message: messageError?.[0]?.[0] || "Internal Server Error",
//       //     variant: "error",
//       //   });
//     }
//   }, [mutation.status]);

//   return mutation;
// };
