import {
  Cloud,
  CreditCard,
  Filter,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  X
} from 'lucide-react';

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

interface Obj {
  id: string;
  label: string;
}
export interface DataFormTypeFilter {
  name: string;
  placeholder?: string;
  label: string;
  helperText?: string;
  type: 'select' | 'autcomplete';
  options: {
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

export function FilterApproval({
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

  console.log({ isFilter });

  return (
    <div
      className={`relative ${
        isFilter.length != 0 && 'mb-8'
      } flex flex-col items-start space-y-2`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'default'} className="w-[100px]">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]" align="start">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="mb-2 space-y-4">
            {dataFormFilter.map((val, i) => {
              return (
                <>
                  <div className="px-2">
                    <div className="flex items-center justify-between">
                      <p className="mb-2 items-center text-sm">{val.label}</p>{' '}
                      <Button
                        variant={'link'}
                        size={'sm'}
                        onClick={() => {
                          handleResetOneFilter(val.name);
                        }}
                        className="mb-2 text-xs text-primary "
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
                            label: val.options.find((res) => res.id == value)
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
                          {val.options.map((valOpt, keyOpt) => {
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
                  <DropdownMenuSeparator />
                </>
              );
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
