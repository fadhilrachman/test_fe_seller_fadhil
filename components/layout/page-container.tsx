import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)] ">
          <div className="m-4  h-full rounded-md bg-white md:px-8">
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className="m-8 h-full    rounded-md bg-white pt-6 md:px-8">
          {children}
        </div>
      )}
    </>
  );
}
