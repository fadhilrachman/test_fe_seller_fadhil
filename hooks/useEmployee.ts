import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto, BaseResponseShowDto } from '@/types';
import {
  CreateEmployeSchema,
  EmployeDtoType,
  EmployeeType
} from '@/types/employe';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as z from 'zod';

type formData = z.infer<typeof CreateEmployeSchema>;
type formDataUpdateEmployee = z.infer<typeof CreateEmployeSchema>;

export const useCreateEmployee = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const mutation = useMutation<any, Error, formData>({
    mutationFn: async (body: formData) => {
      const result = await fetcher.post('/operator/employee', body);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        description: 'Success',
        variant: 'success'
      });

      //   enqueueSnackbar({ message: "Success create employee", variant: "success" });
      navigate.push('/employee');
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

export const useListEmployee = (params: any) => {
  const query = useQuery<BaseResponseListDto<EmployeDtoType>>({
    queryKey: ['LIST_EMPLOYEE'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/employee', { params });
      return result.data;
    }
  });

  return query;
};

export const useEmployeeById = (employeeId: any) => {
  const query = useQuery<BaseResponseShowDto<EmployeeType>>({
    queryKey: ['EMPLOYEE_BY_ID'],
    queryFn: async () => {
      const result = await fetcher.get(`/operator/employee/${employeeId}`);
      return result.data;
    }
  });

  return query;
};

export const useUpdateEmployee = (employeeId: string) => {
  const { toast } = useToast();
  const navigate = useRouter();
  const mutation = useMutation<any, Error, formDataUpdateEmployee>({
    mutationFn: async (body: formDataUpdateEmployee) => {
      const result = await fetcher.put(
        `/operator/employee/${employeeId}`,
        body
      );
      return result.data;
    },
    onSuccess: () => {
      navigate.push('/dashboard/employees');
      toast({
        title: 'Success',
        description: 'Success update employee',
        variant: 'success'
      });
    }
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;

      toast({
        title: 'Error',
        variant: 'destructive',
        description: messageError?.[0]?.[0] || 'Internal Server Error'
      });
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
