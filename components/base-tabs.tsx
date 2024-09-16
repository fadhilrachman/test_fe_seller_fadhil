import React from 'react';
import { Icons } from './icons';

const BaseTab = ({
  data
}: {
  data: {
    name: string;
    label: string;
    icon: keyof typeof Icons;
    className?: string;
  }[];
}) => {
  return (
    <div className="rounded-lg  border-gray-200">
      <div className="bg-white">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-x-6">
            {data.map((val) => {
              const Icon = Icons[val.icon || 'arrowRight'];

              return (
                <div
                  className={`border-transparen flex ${val.className}  cursor-pointer items-center gap-x-2 border-b-2 border-b-primary px-1 py-2 text-center text-sm font-medium  hover:border-primary-foreground hover:opacity-90`}
                >
                  <Icon className={` size-5 flex-none  `} />

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

export default BaseTab;
