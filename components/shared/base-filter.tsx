import { CalendarIcon, Cloud, CreditCard, Filter, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '../ui/input';
import moment from 'moment';
import { Calendar } from '../ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Obj {
  id: string;
  label: string;
}
export interface DataFormTypeFilter {
  name: string;
  placeholder?: string;
  label: string;
  helperText?: string;
  type: 'select' | 'autcomplete' | 'date' | 'rangedate';
  options?: {
    id: string;
    label: string;
  }[];
}
interface Props {
  title?: string;
  dataFormFilter: DataFormTypeFilter[];
  setParamsFilter: React.SetStateAction<any>;
  paramsFilter: {
    [key: string]: Obj;
  };
}

export function BaseFilter({
  dataFormFilter,
  paramsFilter,
  setParamsFilter,
  title
}: Props) {
  const [localParams, setLocalParams] = useState<{
    [key: string]: Obj;
  }>(paramsFilter);
  const isFilter = Object.keys(paramsFilter)
    .map((val) => paramsFilter[val].id)
    .filter((res) => res != '');
  const [date, setDate] = useState<Date>();
  const handleResetOneFilter = (paramsName: string) => {
    setLocalParams((item: any) => ({
      ...item,
      [paramsName]: {
        id: '',
        label: ''
      }
    }));
    setParamsFilter((item: any) => ({
      ...item,
      [paramsName]: {
        id: '',
        label: ''
      }
    }));
  };

  const handleResetAllFilter = () => {
    setLocalParams(paramsFilter);
    setParamsFilter(paramsFilter);
  };

  console.log({ cuy: Object.keys(paramsFilter), paramsFilter });

  return (
    <div
      className={`relative ${
        isFilter.length != 0 && 'mb-8'
      } flex flex-col items-start space-y-2`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'default'} className="w-[120px] space-x-2">
            <div className="flex items-center">
              <Filter className="mr-1 h-4 w-4" /> Filter
            </div>{' '}
            {Object.keys(paramsFilter).length != 0 && (
              <div
                className={` flex h-4 w-4 items-center justify-center rounded-md bg-white text-xs text-black`}
              >
                1
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]" align="start">
          <DropdownMenuLabel>Filter </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="mb-2 ">
            {dataFormFilter.map((val, i) => {
              if (val.type == 'rangedate') {
                return (
                  <>
                    <div className="px-2" key={val.name}>
                      <div className="flex items-center justify-between">
                        <p className="mb-1 items-center text-sm">{val.label}</p>{' '}
                        <Button
                          variant={'link'}
                          size={'sm'}
                          onClick={() => {
                            handleResetOneFilter(val.name);
                          }}
                          className="mb-1 text-xs text-primary "
                        >
                          Hapus
                        </Button>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              ' w-full justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              moment(date).format('PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <DropdownMenuSeparator className="my-2" />
                  </>
                );
              }
              if (val.type == 'date') {
                return (
                  <>
                    <div className="px-2" key={val.name}>
                      <div className="flex items-center justify-between">
                        <p className="mb-1 items-center text-sm">{val.label}</p>{' '}
                        <Button
                          variant={'link'}
                          size={'sm'}
                          onClick={() => {
                            handleResetOneFilter(val.name);
                          }}
                          className="mb-1 text-xs text-primary "
                        >
                          Hapus
                        </Button>
                      </div>
                      <Input
                        type="date"
                        value={localParams[val.name].id}
                        onChange={(e) => {
                          setLocalParams((item: any) => ({
                            ...item,
                            [val.name]: {
                              id: e.target.value,
                              label: moment(e.target.value).format(
                                'DD MMMM YYYY'
                              )
                            }
                          }));
                        }}
                      />
                    </div>
                    <DropdownMenuSeparator className="my-2" />
                  </>
                );
              }
              if (val.type == 'select') {
                return (
                  <>
                    <div className="px-2" key={val.name}>
                      <div className="flex items-center justify-between">
                        <p className="mb-1 items-center text-sm">{val.label}</p>{' '}
                        <Button
                          variant={'link'}
                          size={'sm'}
                          onClick={() => {
                            handleResetOneFilter(val.name);
                          }}
                          className="mb-1 text-xs text-primary "
                        >
                          Hapus
                        </Button>
                      </div>
                      <Select
                        value={localParams[val.name].id}
                        //   onOpenChange={()}
                        onValueChange={(value) => {
                          setLocalParams((item: any) => ({
                            ...item,
                            [val.name]: {
                              id: value,
                              label: val.options?.find((res) => res.id == value)
                                ?.label
                            }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          {localParams[val.name].label == '' ? (
                            val.placeholder
                          ) : (
                            <SelectValue />
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {val.options?.map((valOpt, keyOpt) => {
                              return (
                                <SelectItem value={valOpt.id} key={keyOpt}>
                                  {valOpt.label}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <DropdownMenuSeparator className="my-2" />
                  </>
                );
              }
            })}
          </div>

          <div className="flex justify-between  px-2">
            <Button size={'sm'} variant={'link'}>
              {' '}
              Hapus Filter
            </Button>
            <DropdownMenuItem>
              <Button
                size={'sm'}
                onClick={() => {
                  setParamsFilter(localParams);
                }}
              >
                Terapkan
              </Button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="absolute top-10 flex w-[500px] space-x-2 ">
        {Object.keys(paramsFilter).map((val, i) => {
          return paramsFilter[val].label != '' ? (
            <Badge variant={'outline'}>
              {paramsFilter[val].label}
              <button
                className="ml-2 flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 "
                onClick={() => {
                  console.log('cuyyyy');

                  handleResetOneFilter(val);
                }}
              >
                <X className="h-2.5 w-2.5 text-primary" />
              </button>
            </Badge>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
}

{
  /* <button className="ml-2 flex h-3 w-3 items-center justify-center rounded-full bg-gray-500 ">
                <X className="h-2.5 w-2.5 !text-black" />
              </button> */
}

{
  /* <div className=" w-max rounded-md border border-dashed p-2  font-medium">
            <span>Divisi :</span> <Badge>IT Management</Badge>
          </div>
          <div className="w-max rounded-md border border-dashed p-2  font-medium">
            Divisi : <Badge>IT Management</Badge>
          </div> */
}
