import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Title = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <Button
        variant={'ghost'}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft size={20} />
      </Button>
      <h3 className="font-xl text-lg text-slate-900">{title}</h3>
    </div>
  );
};

export default Title;
