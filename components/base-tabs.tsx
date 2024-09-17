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
          <nav className="-mb-px flex gap-x-4">
            {data.map((val, i) => {
              const Icon = Icons[val.icon || 'arrowRight'];

              return (
                <div
                  className={`border-transparen flex ${val.className} ${
                    i == 0 && 'bg-yellow-500 text-white'
                  }  mb-2 cursor-pointer items-center gap-x-2 rounded-md  px-2  py-2 text-center text-xs font-medium  hover:border-primary-foreground hover:opacity-90`}
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
