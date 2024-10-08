import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { Fragment } from 'react';

type BreadcrumbItemProps = {
  title: string;
  link: string;
  current?: boolean; // Tambahkan properti current untuk menandakan item yang di-disable
};

export function Breadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.title}>
            {index !== items.length - 1 ? (
              <BreadcrumbItem>
                {/* Jika item `current`, tampilkan teks biasa */}
                {item.current ? (
                  <span className="cursor-default text-gray-500">
                    {item.title}
                  </span>
                ) : (
                  <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ) : (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
            {/* Tampilkan separator jika bukan item terakhir */}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
