import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto, BaseResponseShowDto } from '@/types';
import {
  CreateEmployeSchema,
  EmployeDtoType,
  EmployeeType
} from '@/types/employe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      navigate.push('/dashboard/employees');
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

export const useListEmployee = (params: {
  page: number;
  per_page: number;
  division_id?: string;
}) => {
  const query = useQuery<BaseResponseListDto<EmployeDtoType>>({
    queryKey: ['LIST_EMPLOYEE'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/employee', { params });
      return result.data;
    }
  });
  const options = query.data?.data.map((val) => ({
    id: val.id,
    label: val.name
  }));
  return { ...query, options };
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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const result = await fetcher.delete(`/operator/employee/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_EMPLOYEE'] });
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status === 'success') {
      toast({
        title: 'Berhasil',
        description: 'Anda Berhasil Menghapus Karyawan',
        variant: 'success'
      });
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
