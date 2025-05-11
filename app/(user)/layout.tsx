import Footer from '@/components/shared/footer';
import React from 'react';

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-16 md:space-y-[100px]">
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutUser;
