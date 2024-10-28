'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Separator } from '@/components/ui/separator';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';

const dataDetail = [
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
  const { employeeId } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Karyawan', link: '/dashboard/employees' },
    {
      title: 'Detail Karyawan',
      link: `/dashboard/employees/${employeeId} /detail-employee`
    }
  ];
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

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
              <h3 className="text-2xl font-bold tracking-tight">
                Fadhil Rahman
              </h3>
              <p className="text-sm text-muted-foreground">
                Frontend Developer
              </p>
              <p className="text-xs text-muted">EMP-0138</p>
            </div>
          </div>
        </div>
        <Tabs defaultValue="1" className="">
          <TabsList>
            <TabsTrigger value="1">Profile Information</TabsTrigger>
            <TabsTrigger value="2">Attendance</TabsTrigger>
            <TabsTrigger value="3">Shifting</TabsTrigger>
            <TabsTrigger value="4">Time Off</TabsTrigger>
          </TabsList>
          <Separator className="my-2" />

          <TabsContent value="1">
            <div className="space-y-2 rounded-md border p-4">
              <h3 className="text-xl font-bold tracking-tight">
                Personal Information
              </h3>
              <div>
                {dataDetail.map((val, index) => {
                  return (
                    <div className="flex border-y py-2" key={index}>
                      <p className="min-w-[400px]">{val.key}</p>
                      <p>: {val.value}</p>
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
    </PageContainer>
  );
}
