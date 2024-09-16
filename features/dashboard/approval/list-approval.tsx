import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';

const ListApproval = () => {
  const IconX = Icons['close'];
  const IconCheckList = Icons['check'];
  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder={`Search Employee...`}
          className="w-full md:max-w-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              #97120398 <Badge>Absen</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className=" grid gap-x-6 text-sm lg:grid-cols-2">
            <div className="mb-4 flex items-center space-x-1">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-light ">Nama Karyawan</span>
                <p className="font-medium">Fadhil Rahman</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-light ">Status</p>
              <Badge>Menunggu</Badge>
            </div>
            <div className="mb-4">
              <p className="text-xs font-light ">Tanggal</p>
              <p className="font-medium ">27 Juni - 30 Juni</p>
            </div>
            <div>
              <p className="text-xs font-light ">Dokumen Pendukung</p>
              <p className="font-medium text-blue-500">27 Juni - 30 Juni</p>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs font-light ">Deskripsi</p>
              <p className="font-medium">Selama pagi bapak/ibu</p>
            </div>
          </CardContent>
          <CardFooter className="flex w-full gap-x-6">
            <Button className="w-full" variant={'destructive'} size={'sm'}>
              {/* {Icon}
               */}
              <IconX className=" mr-[4px] h-5" />
              Reject
            </Button>
            <Button className="w-full " variant="approved" size={'sm'}>
              <IconCheckList className=" mr-[4px] h-5" />
              Approve
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>cuy</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>cuy</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListApproval;
