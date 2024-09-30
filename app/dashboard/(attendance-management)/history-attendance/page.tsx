'use client';
import React from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ListHistoryAttendance from '@/features/dashboard/(attendance-management)/history-attendance/list-history-attendance';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'History Presensi', link: '/dashboard/history-attendance' }
];
const page = () => {
  return (
    <div className="space-y-4">
      {' '}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`History Presensi`} description="Manage Divisi" />
      </div>
      <Separator />
      <ListHistoryAttendance />
    </div>
  );
};

export default page;
