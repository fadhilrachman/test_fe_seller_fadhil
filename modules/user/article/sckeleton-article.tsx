import React from 'react';

const SckeletonArticle = () => {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-xl border p-4">
      <div className="mb-4 h-48 w-full rounded-lg bg-gray-200" />
      <div className="mb-2 h-4 w-24 rounded bg-gray-200" /> {/* Date */}
      <div className="mb-2 h-6 w-3/4 rounded bg-gray-300" /> {/* Title */}
      <div className="mb-1 h-4 w-full rounded bg-gray-200" />
      <div className="mb-3 h-4 w-5/6 rounded bg-gray-200" /> {/* Description */}
      <div className="h-6 w-16 rounded-full bg-gray-200" /> {/* Badge */}
    </div>
  );
};

export default SckeletonArticle;
