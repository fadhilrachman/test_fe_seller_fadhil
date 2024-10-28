import { Icons } from '@/components/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const TabsAttendance = ({
  data
}: {
  data: {
    name: string;
    label: string;
    className?: string;
  }[];
}) => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tabs = searchParams.get('tabs') || 'history_attendance';

  return (
    <div className="rounded-lg  border-gray-200">
      <div className="bg-white">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-x-4">
            {data.map((val, i) => {
              const colorTab = {
                waiting_approval: 'yellow',
                approved: 'green',
                rejected: 'red'
              };
              return (
                <div
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('tabs', val.name);
                    replace(`${pathName}?${params.toString()}`);
                  }}
                  className={`border-transparen flex ${val.className} ${
                    val.name == tabs && `bg-primary text-white`
                  }  mb-2 cursor-pointer items-center gap-x-2 rounded-md px-2  py-2  text-center text-xs font-medium hover:border-primary-foreground   hover:opacity-80`}
                >
                  <span>{val.label}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabsAttendance;
