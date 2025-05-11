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
import FormGenerator from '@/components/shared/form-generator';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RegisterForm = () => {
  const form = useForm({});
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
                id="formLogin"
                data={[
                  {
                    name: 'username',
                    type: 'text',
                    placeholder: 'Input username',
                    label: 'Username'
                  },

                  {
                    name: 'password',
                    type: 'text',
                    label: 'Password',
                    placeholder: 'Input password'
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
                    ]
                  }
                ]}
                onSubmit={(val) => {
                  console.log({ val });
                }}
              />
              <Button className="w-full">Register</Button>
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
