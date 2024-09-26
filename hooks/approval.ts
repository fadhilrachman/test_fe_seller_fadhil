import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import { ApprovalActionType, ApprovalType } from '@/types/approval';
import { CreateEmployeSchema, EmployeDtoType } from '@/types/employe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as z from 'zod';

export const useListApproval = (params: {
  status?: string;
  search?: string;
  approval_type?: string;
  division_id?: string;
}) => {
  const query = useQuery<BaseResponseListDto<ApprovalType>>({
    queryKey: ['LIST_APPROVAL'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/approval', { params });

      return result.data;
    }
  });

  return query;
};

export const useApproval = (id: string) => {
  //   const { enqueueSnackbar } = useSnackbar();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, ApprovalActionType>({
    mutationFn: async (body: ApprovalActionType) => {
      const result = await fetcher.patch(`/operator/approval/${id}`, body);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_APPROVAL'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        description: 'Success'
        // variant:''
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;
      const messageError =
        (Object.values(error?.response?.data?.errors[0]) as any) ||
        'Internal Server Error';
      toast({
        title: 'Approval Error',
        variant: 'destructive',
        description: messageError
      });

      //   enqueueSnackbar({
      //     message: messageError[0][0] || "Internal Server Error",
      //     variant: "error",
      //   });
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteEmployee = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation<any, Error, number>({
    mutationFn: async (id: number) => {
      const result = await fetcher.delete(`/operator/employee/${id}`);
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
