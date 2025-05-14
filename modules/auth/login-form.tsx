'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import FormGenerator, {
  DataFormType
} from '@/components/shared/form-generator';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePostLogin } from '@/hooks/auth.hook';
import { LoginType } from '@/types/auth.type';
const LoginForm = () => {
  const form = useForm({});
  const { mutateAsync, status } = usePostLogin();
  const handleLogin = async (val: LoginType) => {
    try {
      const result = await mutateAsync(val);
      console.log({ result });

      if (result?.result?.role == 'admin') {
        window.location.href = '/admin/article';
      } else {
        window.location.href = '/article';
      }
      // router.push('/login');
    } catch (error) {
      console.log({ error });
    }
  };

  const dataForm: DataFormType[] = [
    {
      name: 'user_name',
      type: 'text',
      placeholder: 'Input username',
      label: 'Username'
    },

    {
      name: 'password',
      type: 'text',
      label: 'Password',
      placeholder: 'Input password'
    }
  ];
  return (
    <div className="mx-5 flex h-[100vh] items-center justify-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardContent className="space-y-6 px-0">
            <div className="flex justify-center">
              {' '}
              <img src={'/logo-auth.svg'} alt="asdasd" />
            </div>
            <div className="space-y-6">
              <FormGenerator
                form={form}
                id="formLogin"
                disabled={status == 'pending'}
                data={dataForm}
                onSubmit={handleLogin}
              />
              <Button
                type="submit"
                form="formLogin"
                loading={status == 'pending'}
                className="w-full"
              >
                Login
              </Button>
              <p className="text-center">
                Already have an account?{' '}
                <Link href={'/register'}>
                  <span className="cursor-pointer text-blue-500">Register</span>
                </Link>
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoginForm;
