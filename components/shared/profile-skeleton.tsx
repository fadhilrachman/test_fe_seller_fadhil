'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader className="text-center">
        <Skeleton className="mx-auto h-7 w-32" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex rounded-md bg-gray-100 px-3 py-2">
              <div className="flex">
                <Skeleton className="h-5 w-[100px]" />
                <span className="mx-1">:</span>
              </div>
              <Skeleton className="mx-auto h-5 w-[150px]" />
            </div>
          ))}
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
