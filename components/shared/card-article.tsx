'use client';
import React from 'react';
import BaseImage from './base-image';
import { useRouter } from 'next/navigation';

const CardArticle = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/article/1`);
      }}
      className="cursor-pointer space-y-4 rounded-xl p-4 text-slate-600 transition-all hover:bg-slate-50"
    >
      <BaseImage
        src={'/content1.jpg'}
        alt="cuman"
        className="rounded-xl"
        width={346}
        height={240}
      />
      <div className="space-y-2">
        <small>April 13, 2025</small>
        <h3 className="text-lg font-semibold text-slate-900">
          Cybersecurity Essentials Every Developer Should Know
        </h3>
        <p className="">
          How tech companies are optimizing remote collaboration with smarter
          tools and processes
        </p>
        <div className="text-blue-900">
          <div className="w-max rounded-full bg-blue-200  px-3 py-1">cuy</div>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
