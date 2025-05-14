import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseDetail, BaseResponseList } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { CategoryType, CreateCategoryType } from '@/types/category.type';
import { ArticleType, CreateArticleType } from '@/types/article.type';

export const usePostCreateArticle = () => {
  const { toast } = useToast();
  const mutation = useMutation<any, Error, CreateArticleType>({
    mutationFn: async (body) => {
      const result = await fetcher.post('/admin/article', body);

      return result.data;
    },
    onSuccess: () => {
      toast({
        title: 'Success create article',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: 'Failed edit article',
        description: 'There was a problem with your request.',
        variant: 'destructive'
      });
    }
  });

  return mutation;
};

export const usePutEditArticle = (id: string) => {
  const { toast } = useToast();
  const mutation = useMutation<any, Error, CreateArticleType>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/admin/article/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      toast({
        title: 'Success edit article',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: 'Failed edit article',
        description: 'There was a problem with your request.',
        variant: 'destructive'
      });
    }
  });

  return mutation;
};

export const useGetArticleUser = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<ArticleType>>({
    queryKey: ['LIST_ARTICLE_USER'],
    queryFn: async () => {
      const result = await fetcher.get('/user/article', { params });

      return result.data;
    }
  });

  return query;
};
export const useGetArticle = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<ArticleType>>({
    queryKey: ['LIST_ARTICLE_ADMIN'],
    queryFn: async () => {
      const result = await fetcher.get('/admin/article', { params });

      return result.data;
    }
  });

  return query;
};

export const useGetArticleDetail = (id: string) => {
  const query = useQuery<BaseResponseDetail<ArticleType>>({
    queryKey: ['DETAIL_ARTICLE_ADMIN'],
    queryFn: async () => {
      const result = await fetcher.get(`/admin/article/${id}`);

      return result.data;
    }
  });

  return query;
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, { id: string }>({
    mutationFn: async (body) => {
      const result = await fetcher.delete(`/admin/article/${body.id}`);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_ARTICLE_ADMIN'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  return mutation;
};
