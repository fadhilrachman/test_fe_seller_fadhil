import React from 'react';
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
export interface DataFormType {
  // name:''
  label: string;
  type:
    | 'text'
    | 'select'
    | 'file'
    | 'password'
    | 'textarea'
    | 'email'
    | 'subtitle'
    | 'title'
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
  form: UseFormReturn;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  id: string;
}
const FormGenerator = ({ form, data, onSubmit, id }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
        className="mx-auto grid  grid-cols-3 gap-4 "
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
