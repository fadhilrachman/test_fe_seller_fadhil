'use client';

import CardArticle from '@/components/shared/card-article';
import React, { useEffect, useState } from 'react';
import SckeletonArticle from './sckeleton-article';
import BaseInputSearch from '@/components/shared/base-input-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useGetArticleUser } from '@/hooks/article.hook';
import DataNotFound from '@/components/shared/data-not-found';
import NavbarArticle from './navbar-article';
import BasePagination from '@/components/shared/base-pagination';
import { useGetCategoryUser } from '@/hooks/category.hook';
import ErrorComponent from '@/components/shared/error-component';
const ListArticle = () => {
  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 9,
    category_id: ''
  });
  const { data, isFetching, refetch, status = '' } = useGetArticleUser(params);
  const { data: dataCategory } = useGetCategoryUser({
    page: 1,
    per_page: 1000
  });
  const dataRender = {
    pending: (
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((val, key) => {
          return <SckeletonArticle key={key} />;
        })}
      </div>
    ),
    error: <ErrorComponent onRetry={refetch} />,
    success: (
      <div className=" grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data?.result.map((val, key) => {
          return <CardArticle key={key} data={val} />;
        })}
      </div>
    ),
    notFound: <DataNotFound />
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="space-y-10">
      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/background.jpg"
            alt="Background"
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 w-full">
          <NavbarArticle />
          <div className="space-y-10 pb-[63px] pt-[117px]">
            <div className="mx-auto max-w-[900px] space-y-3 text-center">
              <h4 className="font-bold">Blog genzet</h4>
              <h1 className="text-4xl font-medium md:text-5xl md:font-bold">
                The Journal : Design Resources, Interviews, and Industry News
              </h1>
              <p className="text-xl font-normal md:text-2xl">
                Your daily dose of design insights!
              </p>
            </div>
            <div className="mx-5 flex max-w-[608px] flex-col gap-5 rounded-[12px] bg-blue-500 p-3 sm:mx-auto md:flex-row">
              <Select
                onValueChange={(e) => {
                  setParams((p) => ({ ...p, category_id: e }));
                }}
              >
                <SelectTrigger className="h-[40px] w-full min-w-[180px] bg-white text-black md:w-max">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {dataCategory?.result?.map((val, key) => (
                    <SelectItem value={val.id} key={key}>
                      {val.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <BaseInputSearch
                placeholder="Search articles"
                onChange={(e) => {
                  setParams((p) => ({ ...p, search: e }));
                }}
                className="h-[40px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 space-y-6 md:mx-[100px]">
        <p>
          Showing : {data?.result.length} of {data?.pagination?.total_data}{' '}
          articles
        </p>

        {dataRender[
          isFetching
            ? 'pending'
            : data?.result.length == 0
            ? 'notFound'
            : (status as 'pending' | 'success' | 'error')
        ] ?? ''}
        <BasePagination
          currentPage={params.page}
          totalPages={data?.pagination.total_page as number}
          onPageChange={(page) => setParams((p) => ({ ...p, page }))}
          totalItems={data?.pagination.total_data as number}
        />
      </div>
    </div>
  );
};

export default ListArticle;
