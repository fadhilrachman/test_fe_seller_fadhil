'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDivisionById } from '@/hooks/useDivision';
import { useParams } from 'next/navigation';

const DetailDivision = () => {
  const { divisionId } = useParams();

  const { data, isFetching } = useDivisionById(divisionId as string);

  const dataDetail = [
    {
      key: 'Code',
      value: data?.data.code
    },
    {
      key: 'Nama Divisi',
      value: data?.data.name
    },
    {
      key: 'Lokasi',
      value: data?.data.location
    },
    {
      key: 'Jam Masuk',
      value: data?.data.entry_time
    },
    {
      key: 'Jam Keluar',
      value: data?.data.leave_time
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        {/* <Heading title={`Fadhil Rahman`} description="CTO" /> */}
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Fadhil Rahman</h3>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
            <p className="text-xs text-muted">EMP-0138</p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="1" className="">
        <TabsList>
          <TabsTrigger value="1">Division Information</TabsTrigger>
          <TabsTrigger value="2">Presensi</TabsTrigger>
          <TabsTrigger value="3">Shifting</TabsTrigger>
          <TabsTrigger value="4">Cuti</TabsTrigger>
          <TabsTrigger value="5">Approval</TabsTrigger>
        </TabsList>
        <Separator className="my-2" />

        <TabsContent value="1">
          <div className="space-y-2 rounded-md border p-4">
            <h3 className="text-xl font-bold tracking-tight">
              Division Information
            </h3>
            <div>
              {dataDetail.map((item, index) => {
                return (
                  <div key={index} className="flex border-y py-2">
                    <p className="min-w-[400px]">{item.key}</p>
                    <p
                      className={`${
                        item.key === 'Code' ? 'text-blue-500' : ''
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="rounded-md border p-4">test</div>
        </TabsContent>
        <TabsContent value="3">3</TabsContent>
        <TabsContent value="4">4</TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailDivision;
