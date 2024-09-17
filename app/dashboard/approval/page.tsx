'use client';
import BaseTab from '@/components/base-tabs';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ListApproval from '@/features/dashboard/approval/list-approval';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';
import TabsApproval from './tabs-approval';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Approval', link: '/dashboard/approval' }
];
const page = () => {
  const [tab, setTab] = useState<string>('');
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Approval`}
          description=" Kelola dan tinjau semua permintaan yang membutuhkan persetujuan dari admin, seperti cuti, absen, atau permintaan lainnya."
        />
      </div>

      <TabsApproval
        data={[
          {
            label: 'Menunggu Persetujuan',
            name: 'waiting_approval',
            icon: 'waitingApproval',
            className: 'text-primary'
          },
          {
            label: 'Disetujui',
            name: 'approved',
            icon: 'check'
            // className: 'text-green-500'
          },
          {
            label: 'Ditolak',
            name: 'rejected',
            // className: 'text-red-500',
            icon: 'close'
          }
        ]}
      />
      <ListApproval />
    </div>
  );
};

export default page;
