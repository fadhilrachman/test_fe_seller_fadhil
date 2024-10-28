'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import DetailDivision from '@/features/dashboard/(master-data)/division/detail-division';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Divisi', link: '/dashboard/division' },
  { title: 'Detail Divisi', link: '/dashboard/division', current: true }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  return (
    <div>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <DetailDivision />
      </div>
    </div>
  );
}
