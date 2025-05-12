import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';
import { BaseResponseList } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { CategoryType, CreateCategoryType } from '@/types/category.type';

export const usePostCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, CreateCategoryType>({
    mutationFn: async (body) => {
      const result = await fetcher.post('/admin/category', body);

      return result.data;
    },
    onSuccess: () => {
      toast({
        title: 'Success create category',
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['LIST_CATEGORY'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
    onError: () => {
      toast({
        title: 'Failed create category',
        description: 'There was a problem with your request.',
        variant: 'destructive'
      });
    }
  });

  return mutation;
};

export const useGetCategory = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<CategoryType>>({
    queryKey: ['LIST_CATEGORY'],
    queryFn: async () => {
      const result = await fetcher.get('/admin/category', { params });

      return result.data;
    }
  });

  return query;
};

export const usePutEditCategory = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, CreateCategoryType>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/admin/category/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_CATEGORY'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  return mutation;
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.delete(`/category/${id}`);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_CATEGORY'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  return mutation;
};
