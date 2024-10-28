'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ListReport from '@/features/dashboard/report/list-report';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Report', link: '/dashboard/report' }
];
const Page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Report`}
          description=" Kelola dan tinjau semua permintaan yang membutuhkan persetujuan dari admin, seperti cuti, absen, atau permintaan lainnya."
        />
      </div>
      {/* <Divider */}
      <Separator />
      <ListReport />
    </div>
  );
};

export default Page;
