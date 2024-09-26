import { Icons } from '@/components/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const TabsApproval = ({
  data
}: {
  data: {
    name: string;
    label: string;
    icon: keyof typeof Icons;
    className?: string;
  }[];
}) => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tabs = searchParams.get('tabs') || 'waiting_approval';

  return (
    <div className="rounded-lg  border-gray-200">
      <div className="bg-white">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-x-4">
            {data.map((val, i) => {
              const Icon = Icons[val.icon || 'arrowRight'];
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
                    val.name == tabs &&
                    `bg-${
                      colorTab[val.name as keyof typeof colorTab]
                    }-500 text-white`
                  }  mb-2 cursor-pointer items-center gap-x-2 rounded-md px-2  py-2  text-center text-xs font-medium hover:border-primary-foreground   hover:opacity-80`}
                >
                  <Icon className={` size-4 flex-none  `} />

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

export default TabsApproval;
