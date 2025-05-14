import React, { useState } from 'react';
import SckeletonArticle from './sckeleton-article';
import CardArticle from '@/components/shared/card-article';
import { useGetArticleUser } from '@/hooks/article.hook';
import DataNotFound from '@/components/shared/data-not-found';
import ErrorComponent from '@/components/shared/error-component';
import { useParams } from 'next/navigation';

const OtherArticle = ({ idCategory }: { idCategory: string }) => {
  const { article_id } = useParams();
  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    category_id: idCategory,
    article_id_exception: article_id
  });

  const { data, isFetching, status, refetch } = useGetArticleUser(params);
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
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Other Articles</h3>
      {dataRender[
        isFetching
          ? 'pending'
          : data?.result.length == 0
          ? 'notFound'
          : (status as 'pending' | 'success' | 'error')
      ] ?? 'Loading...'}
    </div>
  );
};

export default OtherArticle;
