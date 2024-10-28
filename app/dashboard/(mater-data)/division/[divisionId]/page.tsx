'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import DetailDivision from '@/features/dashboard/(master-data)/division/detail-division';
import { useDivisionById } from '@/hooks/useDivision';
import { useParams } from 'next/navigation';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Divisi', link: '/dashboard/division' },
  { title: 'Detail Divisi', link: '/dashboard/division', current: true }
];

export default function Page() {
  const { divisionId } = useParams();
  const { data, isFetching } = useDivisionById(divisionId as string);

  return (
    <div>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title={data?.data.name as string} description="" />
        <DetailDivision
          data={data}
          isFetching={isFetching}
          divisionId={divisionId as string}
        />
      </div>
    </div>
  );
}
