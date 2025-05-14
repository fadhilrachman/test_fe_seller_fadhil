'use client';

import { Button } from '@/components/ui/button';
import { FileSearch, RefreshCw } from 'lucide-react';

interface DataNotFoundProps {
  title?: string;
  description?: string;
}

const DataNotFound = ({
  title = 'No Data Found',
  description = "We couldn't find any articles matching your criteria."
}: DataNotFoundProps) => {
  return (
    <div className=" flex w-full flex-col items-center  justify-center  px-4 py-16">
      <div className="mb-6 rounded-full bg-white p-4 shadow-sm">
        <FileSearch className="h-12 w-12 text-blue-500" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>

      <p className="mb-6 max-w-md text-center text-gray-600">{description}</p>
    </div>
  );
};

export default DataNotFound;
