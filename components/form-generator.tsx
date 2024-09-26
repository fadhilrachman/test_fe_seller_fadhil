'use client';
import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { TimePickerInput } from './ui/time-picker';
import moment from 'moment';

import { useDropzone } from 'react-dropzone';
import { FileIcon, Paperclip, X } from 'lucide-react';
import { useUploadFile } from '@/hooks/common.hook';
import { Spinner } from './ui/spinner';
export interface DataFormType {
  // name:''
  label: string | ReactNode;
  type:
    | 'text'
    | 'select'
    | 'file'
    | 'date'
    | 'password'
    | 'textarea'
    | 'email'
    | 'subtitle'
    | 'title'
    | 'timepicker'
    | 'upload'
    | 'fieldArray';
  name: string;
  placeholder?: string;
  helperText?: string;
  grid?: number;
  defaultValue?: any;
  options?: { id: string; label: string }[];
  // fieldArrayOptions?: {
  //   form: UseFieldArrayReturn;
  //   data: DataFormType[];
  // };
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  id: string;
  grid?: string;
}
const FormGenerator = ({ form, data, onSubmit, id, grid = '3' }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
        className={` grid  grid-cols-${grid} gap-4`}
      >
        {data.map((val) => {
          if (val.type == 'title') {
            return (
              <div className="col-span-3">
                <h3 className="text-2xl font-semibold">{val.label}</h3>
                <Separator className="w-full" />
              </div>
            );
          }
          if (val.type == 'text') {
            return (
              <div className={`col-span-${val.grid}`}>
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={val}
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

          if (val.type == 'date') {
            return (
              <div className={`col-span-${val.grid}`}>
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={val}
                          type="date"
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

          if (val.type == 'upload') {
            const { mutate, status, data } = useUploadFile();
            const onDrop = useCallback((acceptedFiles: File[]) => {
              mutate(acceptedFiles[0]);
            }, []);

            useEffect(() => {
              if (status == 'success') {
                form.setValue(val.name, data.data?.url);
              }
            }, [status]);
            const { getRootProps, getInputProps, isDragActive } = useDropzone({
              onDrop
            });
            return (
              <div className={`col-span-${val.grid} space-y-2`}>
                <p className="text-[14px]">{val.label}</p>
                {!form.watch(val.name) ? (
                  <div
                    {...getRootProps()}
                    className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6"
                  >
                    {status == 'pending' ? (
                      <Spinner />
                    ) : (
                      <>
                        {' '}
                        <Input
                          type="file"
                          className="hidden"
                          {...getInputProps()}
                        />
                        <FileIcon className="h-12 w-12" />
                        <span className="text-sm font-medium text-gray-500">
                          Drag and drop a file or click to browse
                        </span>
                        <span className="text-xs text-gray-500">
                          PDF, image, video, or audio
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between rounded-md border px-4 py-2">
                    <a
                      target="_blank"
                      href={form.watch(val.name)}
                      className="flex items-center space-x-1 text-blue-500"
                    >
                      <Paperclip className="h-4 w-4" /> <span>Lihat file</span>
                    </a>
                    <X
                      className="h-4 w-4 cursor-pointer text-red-500"
                      onClick={() => {
                        form.setValue(val.name, '');
                      }}
                    />
                  </div>
                )}

                {/* <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={val}
                          placeholder={val.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            );
          }

          if (val.type == 'timepicker') {
            const [date, setDate] = useState<any>();

            const minuteRef = React.useRef<HTMLInputElement>(null);
            const hourRef = React.useRef<HTMLInputElement>(null);

            useEffect(() => {
              form.setValue(
                val.name,
                !date ? '00:00' : moment(date).format('HH:mm')
              );
            }, [date]);

            return (
              <div className={`col-span-${val.grid}`}>
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <TimePickerInput
                            picker="hours"
                            date={date}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                            setDate={setDate}
                          />
                          <span>:</span>{' '}
                          <TimePickerInput
                            picker="minutes"
                            date={date}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            setDate={setDate}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          if (val.type == 'textarea') {
            return (
              <div className={`col-span-${val.grid}`}>
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Textarea
                          // disabled={val}
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
          if (val.type == 'select') {
            return (
              <div className={`col-span-${val.grid}`}>
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <Select
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
        })}
      </form>
    </Form>
  );
};

export default FormGenerator;
