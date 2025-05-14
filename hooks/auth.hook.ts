import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { LoginType, RegisterType } from '@/types/auth.type';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const usePostRegister = () => {
  const { toast } = useToast();
  const mutation = useMutation<
    any,
    AxiosError<{ message: string }>,
    RegisterType
  >({
    mutationFn: async (body) => {
      const result = await fetcher.post('/auth/register', body);

      return result.data;
    },
    onSuccess: () => {
      toast({
        title: 'Success register',
        variant: 'success'
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed register',
        description: error?.response?.data?.message,
        variant: 'destructive'
      });
    }
  });

  return mutation;
};

export const usePostLogin = () => {
  const { toast } = useToast();
  const mutation = useMutation<any, AxiosError<{ message: string }>, LoginType>(
    {
      mutationFn: async (body) => {
        const result = await fetcher.post('/auth/login', body);

        console.log({ token: result?.data?.result?.token });

        Cookies.set(
          process.env.COOKIE_NAME as string,
          result?.data?.result?.token
        );

        return result.data;
      },
      onSuccess: () => {
        toast({
          title: 'Success login',
          variant: 'success'
        });
      },
      onError: (error) => {
        toast({
          title: 'Failed login',
          description: error?.response?.data?.message,

          variant: 'destructive'
        });
      }
    }
  );

  return mutation;
};
