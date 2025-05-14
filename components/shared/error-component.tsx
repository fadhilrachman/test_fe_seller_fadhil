'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export default function ErrorComponent({
  title = 'Something went wrong',
  message = "We couldn't load your data. Please try again.",
  onRetry
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-4">
      <div className="der mx-auto w-full max-w-md rounded-lg   p-6 ">
        <div className="pb-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-red-600">{title}</h2>
        </div>

        <div className="py-2">
          <p className="text-center text-gray-600">{message}</p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size={'sm'}
            onClick={onRetry}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
