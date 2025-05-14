'use client';
import React, { ReactNode, useRef } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { usePostUploadFile } from '@/hooks/upload.hook';
import { Spinner } from '../ui/spinner';
import { Image } from 'lucide-react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false
  // loading
});
import 'react-quill-new/dist/quill.snow.css';

export interface DataFormType {
  label?: string | ReactNode;
  type: 'text' | 'select' | 'file' | 'password' | 'email' | 'reactQuill';
  name: string;
  validation?: RegisterOptions;
  placeholder?: string;
  helperText?: string;
  loading?: boolean;
  grid?: keyof typeof listColSpan;
  options?: { id: string; label: string }[];
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  id: string;
  grid?: number;
  className?: string;
  disabled?: boolean;
}
const listColSpan = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12'
};

const FormGenerator = ({
  form,
  data,
  onSubmit,
  id,
  className,
  disabled
}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
        key={id}
        className={`${className} grid  grid-cols-12 gap-4`}
      >
        {data.map((val) => {
          if (val.type === 'text' || val.type === 'email') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  rules={val?.validation}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={disabled}
                          type={val.type}
                          placeholder={val.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          if (val.type === 'reactQuill') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  rules={val?.validation}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <div className="custom-quill-container">
                          <ReactQuill
                            {...field}
                            readOnly={disabled}
                            value={field.value}
                            onChange={field.onChange}
                            theme="snow"
                            placeholder="Type a content..."
                            modules={{
                              toolbar: [
                                [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                ['clean']
                              ]
                            }}
                            formats={[
                              'header',
                              'bold',
                              'italic',
                              'underline',
                              'list',
                              'bullet',
                              'link',
                              'image'
                            ]}
                          />
                          <div className="word-count">
                            {field.value
                              ? field.value.replace(/<[^>]*>/g, '').trim()
                                  .length
                              : 0}{' '}
                            Words
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }
          if (val.type == 'select') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  rules={val?.validation}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <Select
                        disabled={disabled}
                        // disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder={val.placeholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {val.options.map((valOpt) => (
                            <SelectItem key={valOpt.id} value={valOpt.id}>
                              {valOpt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }
          if (val.type == 'file') {
            const inputRef = useRef<HTMLInputElement | null>(null);
            const { mutateAsync, status, data } = usePostUploadFile();

            const handleUploadFile = async (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              form.setValue(val.name, '');

              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onload = async () => {
                const base64String = reader.result as string;

                const result = await mutateAsync({
                  file: base64String,
                  file_name: file.name,
                  file_type: file.type
                });
                form.clearErrors(val.name);
                form.setValue(val.name, result.response);
              };

              reader.onerror = (error) => {
                console.error('Error reading file:', error);
              };
            };
            return (
              <div
                key={val.name}
                className={`${
                  listColSpan[(val.grid as keyof typeof listColSpan) || 12]
                } space-y-2`}
              >
                <p className="text-[14px] font-medium text-black">
                  {val.label}
                </p>

                <Input
                  {...form.register(val.name, val.validation)}
                  id={`input-${val.name}`}
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/png"
                  ref={inputRef}
                  onChange={handleUploadFile}
                />

                {!form.watch(val.name) ? (
                  <label
                    htmlFor={`input-${val.name}`}
                    className="flex h-[163px] w-[223px] cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center text-slate-500"
                  >
                    {status === 'pending' ? (
                      <Spinner />
                    ) : (
                      <>
                        <Image className="h-[20px] w-[20px]" />
                        <div className="space-y-0 text-xs">
                          <span className="underline">
                            Click to select files
                          </span>
                          <span>Support File Type : jpg or png</span>
                        </div>
                      </>
                    )}
                  </label>
                ) : (
                  <div className="w-max items-center justify-between space-y-2 rounded-md border px-4 py-2">
                    <a
                      target="_blank"
                      href={form.watch(val.name)}
                      className="flex items-center space-x-1 text-blue-500"
                    >
                      <img
                        src={form.watch(val.name)}
                        alt="File uploaded"
                        className="max-w-[199px]"
                      />
                    </a>

                    <Button
                      type="button"
                      className="underline"
                      variant="link"
                      onClick={() => inputRef.current?.click()} // ✅ Sekarang berfungsi
                    >
                      Changes
                    </Button>
                    <Button
                      type="button"
                      className="text-red-500 underline"
                      onClick={() => {
                        form.setError(val.name, {
                          message: 'Please enter picture'
                        });
                        form.setValue(val.name, '');
                      }}
                      variant="link"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {form.formState.errors?.[val?.name] && (
                  <p className="text-[0.8rem] font-medium text-red-400">
                    {form.formState.errors?.[val?.name]?.message as string}
                  </p>
                )}
              </div>
            );
          }
        })}
      </form>
    </Form>
  );
};

export default FormGenerator;
