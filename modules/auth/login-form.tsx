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
const LoginForm = () => {
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
                  }
                ]}
                onSubmit={(val) => {
                  console.log({ val });
                }}
              />
              <Button className="w-full">Login</Button>
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
