'use client';

import CardArticle from '@/components/shared/card-article';
import React from 'react';
import SckeletonArticle from './sckeleton-article';
import BaseInputSearch from '@/components/shared/base-input-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const ListArticle = () => {
  return (
    <div className="space-y-10">
      <div className="flex min-h-[500px] items-center justify-center  bg-primary text-white">
        <div className=" space-y-10">
          <div className="mx-auto max-w-[900px] space-y-3 text-center">
            <h4 className="font-bold">Blog genzet</h4>
            <h1 className="text-5xl font-bold">
              The Journal : Design Resources, Interviews, and Industry News
            </h1>
            <p className="text-2xl font-normal">
              Your daily dose of design insights!
            </p>
          </div>
          <div className="mx-auto flex max-w-[608px] gap-5 rounded-[12px] bg-blue-500 p-3">
            <Select>
              <SelectTrigger className="h-[40px] w-max min-w-[180px] bg-white text-black">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <BaseInputSearch
              placeholder="Search articles"
              onChange={() => {}}
              className="h-[40px] w-full "
            />
          </div>
        </div>
      </div>
      <div className="mx-[100px] space-y-6">
        <p>Showing : 20 of 240 articles</p>
        <div className=" grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {false
            ? [1, 2, 3].map((val, key) => {
                return <SckeletonArticle key={key} />;
              })
            : [1, 2, 3].map((val, key) => {
                return <CardArticle key={key} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default ListArticle;
