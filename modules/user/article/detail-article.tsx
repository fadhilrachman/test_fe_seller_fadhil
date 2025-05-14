'use client';
import Navbar from '@/components/shared/navbar';
import React from 'react';
import OtherArticle from './other-article';
import { useGetArticleDetail } from '@/hooks/article.hook';
import { useParams } from 'next/navigation';
import moment from 'moment';
import parse from 'html-react-parser';
import SkeletonDetailArticle from './skeleton-detail-article';

const DetailArticle = () => {
  const { article_id } = useParams();
  const { data, isFetching, status } = useGetArticleDetail(
    article_id as string
  );

  return (
    <div>
      <Navbar />

      <div className="space-y-10 px-5 sm:px-10  lg:px-[160px]">
        {isFetching ? (
          <SkeletonDetailArticle />
        ) : (
          <div className=" pt-10 ">
            <div className="space-y-4 sm:space-y-6 md:space-y-10">
              <div>
                <div className=" mx-auto max-w-[642px] space-y-4 text-center">
                  <p className="text-sm text-slate-600">
                    {moment(data?.result?.created_at).format('MMMM D, YYYY')},
                    Created by Admin
                  </p>
                  <h3 className="text-2xl font-semibold md:text-3xl">
                    {data?.result?.title}
                  </h3>
                </div>
              </div>
              <img
                src={data?.result?.thumbnail || '/content1.jpg'}
                alt=""
                className="mx-auto max-h-[480px]"
              />
              <p className="pb-7 text-slate-700">
                {parse(data?.result?.content || '')}
              </p>
            </div>
          </div>
        )}
        {status == 'success' && (
          <OtherArticle idCategory={data?.result?.category?.id || ''} />
        )}
      </div>
    </div>
  );
};

export default DetailArticle;
