import React from 'react';

const Content1 = () => {
  return (
    <div className="relative mx-4 hidden h-full  flex-col rounded-md bg-muted bg-[url('/auth/carousel/content1.jpg')] bg-cover bg-center p-10  text-white dark:border-r lg:flex">
      <div className="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Logo
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Solusi HRIS Terintegrasi untuk Tim yang Lebih Solid.&rdquo;
          </p>
          {/* <footer className="text-sm">Sofia Davis</footer> */}
        </blockquote>
      </div>
    </div>
  );
};

export default Content1;
