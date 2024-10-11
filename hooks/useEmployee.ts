import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';
import { CreateEmployeSchema, EmployeDtoType } from '@/types/employe';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as z from 'zod';

type formData = z.infer<typeof CreateEmployeSchema>;
type formDataUpdateEmployee = z.infer<typeof CreateEmployeSchema>;

export const useCreateEmployee = () => {
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
      //   enqueueSnackbar({ message: "Success Create Employee", variant: "success" });
      navigate.push('/master-data/employee');
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

export const useListEmployee = (params: { page: number; per_page: number }) => {
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

export const useUpdateEmployee = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const mutation = useMutation<any, Error, formDataUpdateEmployee>({
    mutationFn: async (body: formDataUpdateEmployee) => {
      const result = await fetcher.put('/operator/employee', body);
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      //   enqueueSnackbar({ message: "Success Update Employee", variant: "success" });
      navigate.push('/master-data/employee');
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
