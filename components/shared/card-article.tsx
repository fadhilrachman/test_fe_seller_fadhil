'use client';
import React from 'react';
import BaseImage from './base-image';
import { useRouter } from 'next/navigation';
import { ArticleType } from '@/types/article.type';
import moment from 'moment';
import parse from 'html-react-parser';

interface Props {
  data: ArticleType;
}
const CardArticle = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/article/${data?.id}`);
      }}
      className="cursor-pointer space-y-4 rounded-xl p-4 text-slate-600 transition-all hover:bg-slate-50"
    >
      <img
        src={data?.thumbnail || '/content1.jpg'}
        alt="cuman"
        className="w-full rounded-xl"
      />
      <div className="space-y-2">
        <small>{moment(data?.created_at).format('MMMM D, YYYY')}</small>
        <h3 className="text-lg font-semibold text-slate-900">{data?.title}</h3>
        <p className="line-clamp-2">{parse(data?.content) || ''}</p>
        <div className="text-blue-900">
          <div className="w-max rounded-full bg-blue-200 px-3 py-1  text-xs md:text-sm">
            {data?.category?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
