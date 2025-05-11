import React from 'react';
import SckeletonArticle from './sckeleton-article';
import CardArticle from '@/components/shared/card-article';

const OtherArticle = () => {
  return (
    <div>
      <h3 className="text-xl font-bold">Other Articles</h3>
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
  );
};

export default OtherArticle;
