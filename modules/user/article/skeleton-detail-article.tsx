import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonDetailArticle = () => {
  return (
    <div>
      <div className="fixed left-0 right-0 top-0 z-10 h-16 bg-white shadow">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-10 lg:px-[160px]">
          <Skeleton className="h-8 w-32" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      <div className="space-y-10 px-5 pt-[100px] sm:px-10 md:pt-[150px] lg:px-[160px]">
        <div className="space-y-4 sm:space-y-6 md:space-y-10">
          <div>
            <div className="mx-auto max-w-[642px] space-y-4 text-center">
              <Skeleton className="mx-auto h-4 w-48" />

              <Skeleton className="mx-auto h-8 w-full max-w-[500px]" />
              <Skeleton className="mx-auto h-8 w-full max-w-[400px]" />
            </div>
          </div>

          <Skeleton className="mx-auto h-[300px] w-full max-w-[800px] rounded-md sm:h-[400px]" />

          <div className="space-y-4 pb-7">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[92%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetailArticle;
