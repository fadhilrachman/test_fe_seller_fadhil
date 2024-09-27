import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonApproval = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="rounded-md bg-[#F4F4F4] p-4">
        <div className="flex items-center space-x-4 ">
          <Skeleton className="h-12 w-12 rounded-full bg-[#E1E3E5]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[#E1E3E5] bg-[#E1E3E5]" />
            <Skeleton className="h-4 w-[200px] bg-[#E1E3E5]" />
          </div>
        </div>{' '}
        <div className="flex space-x-4">
          {' '}
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
        </div>
        <Skeleton className="mt-4 h-4 w-[100px] bg-[#E1E3E5]" />
        <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
      </div>
      <div className="rounded-md bg-[#F4F4F4] p-4">
        <div className="flex items-center space-x-4 ">
          <Skeleton className="h-12 w-12 rounded-full bg-[#E1E3E5]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[#E1E3E5] bg-[#E1E3E5]" />
            <Skeleton className="h-4 w-[200px] bg-[#E1E3E5]" />
          </div>
        </div>{' '}
        <div className="flex space-x-4">
          {' '}
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
        </div>
        <Skeleton className="mt-4 h-4 w-[100px] bg-[#E1E3E5]" />
        <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
      </div>
      <div className="rounded-md bg-[#F4F4F4] p-4">
        <div className="flex items-center space-x-4 ">
          <Skeleton className="h-12 w-12 rounded-full bg-[#E1E3E5]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[#E1E3E5] bg-[#E1E3E5]" />
            <Skeleton className="h-4 w-[200px] bg-[#E1E3E5]" />
          </div>
        </div>{' '}
        <div className="flex space-x-4">
          {' '}
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
          <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
        </div>
        <Skeleton className="mt-4 h-4 w-[100px] bg-[#E1E3E5]" />
        <Skeleton className="mt-4 h-4 w-full bg-[#E1E3E5]" />
      </div>
    </div>
  );
};

export default SkeletonApproval;
