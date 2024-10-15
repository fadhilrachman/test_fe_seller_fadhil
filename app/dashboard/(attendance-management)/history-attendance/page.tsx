'use client';
import React from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import ListHistoryAttendance from '@/features/dashboard/(attendance-management)/history-attendance/list-history-attendance';
import TabsAttendance from '@/features/dashboard/(attendance-management)/history-attendance/tabs-attendance';
import { useSearchParams } from 'next/navigation';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'History Presensi', link: '/dashboard/history-attendance' }
];
const listPage = {
  history_attendance: <ListHistoryAttendance />,
  edit_attendance: <p>cuy</p>
};
const page = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('tabs') || 'history_attendance';

  return (
    <div className="space-y-4">
      {' '}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Presensi`} description="Manage Divisi" />
      </div>
      <TabsAttendance
        data={[
          {
            label: 'Riwayat Presensi',
            name: 'history_attendance',
            className: 'text-primary'
          },
          {
            label: 'Edit Presensi',
            name: 'edit_attendance'
            // className: 'text-green-500'
          }
        ]}
      />
      {listPage[page as keyof typeof listPage]}
    </div>
  );
};

export default page;
