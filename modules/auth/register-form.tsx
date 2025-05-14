'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FormGenerator, {
  DataFormType
} from '@/components/shared/form-generator';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePostRegister } from '@/hooks/auth.hook';
import { RegisterType } from '@/types/auth.type';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({});
  const { mutateAsync, status } = usePostRegister();
  const handleRegister = async (val: RegisterType) => {
    try {
      await mutateAsync(val);
      router.push('/login');
    } catch (error) {
      console.log({ error });
    }
  };

  const dataForm: DataFormType[] = [
    {
      name: 'user_name',
      type: 'text',
      placeholder: 'Input username',
      label: 'Username',
      validation: {
        required: {
          value: true,
          message: 'Please enter username'
        }
      }
    },

    {
      name: 'password',
      type: 'text',
      label: 'Password',
      placeholder: 'Input password',
      validation: {
        required: {
          value: true,
          message: 'Please enter password'
        }
      }
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      placeholder: 'Input role',
      options: [
        {
          id: 'user',
          label: 'User'
        },
        {
          id: 'admin',
          label: 'Admin'
        }
      ],
      validation: {
        required: {
          value: true,
          message: 'Please enter role'
        }
      }
    }
  ];
  return (
    <div className="flex h-[100vh] items-center justify-center">
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
                disabled={status == 'pending'}
                id="formRegister"
                data={dataForm}
                onSubmit={handleRegister}
              />
              <Button
                loading={status == 'pending'}
                className="w-full"
                type="submit"
                form="formRegister"
              >
                Register
              </Button>
              <p className="text-center">
                Already have an account?{' '}
                <Link href={'/login'}>
                  <span className="cursor-pointer text-blue-500">Login</span>
                </Link>
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default RegisterForm;
