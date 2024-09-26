import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import * as z from 'zod';
import { fetcher } from '@/lib/fetcher';
import { ResponseSigninDto } from '@/types/auth';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import * as Cookie from 'cookies-js';
import { useRouter } from 'next/navigation';
import { signinSchema } from '@/features/auth/signin-form';
import { useToast } from '@/components/ui/use-toast';
type FormData = z.infer<typeof signinSchema>;

export const useSignIn = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<ResponseSigninDto, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetcher.post('/operator/auth/sign-in', body);
      return response.data;
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

      //   enqueueSnackbar({ message: "Success sign in", variant: "success" });
      Cookie.set(process.env.COOKIE_NAME || '', data.data.access_token);
      navigate.push('/dashboard');
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;
      const messageError = Object.values(error.response?.data.errors[0]) as any;
      toast({
        title: 'Login Error',
        variant: 'destructive',
        description: messageError || 'Internal Server Error'
      });

      //   enqueueSnackbar({
      //     message: messageError[0][0] || "Internal Server Error",
      //     variant: "error",
      //   });
    }
  }, [mutation.status]);

  return mutation;
};
