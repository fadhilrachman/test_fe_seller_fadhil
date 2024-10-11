import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { useSignIn } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().email().min(1, { message: 'Field ini harus diisi' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' })
});
type FormData = z.infer<typeof signinSchema>;

const SignInForm = () => {
  const { mutate, status } = useSignIn();
  const form = useForm({
    resolver: zodResolver(signinSchema)
  });
  return (
    <div className="space-y-4">
      <FormGenerator
        form={form}
        id="form"
        onSubmit={mutate}
        data={[
          {
            label: 'Email',
            name: 'email',
            type: 'text',
            placeholder: 'example@gmail.com',
            grid: 12
          },
          {
            label: 'Password',
            name: 'password',
            placeholder: '******',
            type: 'text',
            grid: 12
          }
        ]}
      />
      <Button
        className="w-full"
        form="form"
        type="submit"
        loading={status == 'pending'}
      >
        Masuk
      </Button>
    </div>
  );
};

export default SignInForm;
