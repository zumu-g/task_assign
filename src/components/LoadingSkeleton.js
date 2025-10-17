import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="flow-card loading-shimmer">
      <div className="animate-pulse">
        <div className="flex justify-between items-start mb-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="flow-card loading-shimmer">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtonSkeleton = () => (
    <div className="loading-shimmer rounded-lg">
      <div className="h-11 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className="loading-shimmer">
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'list':
        return renderListSkeleton();
      case 'button':
        return renderButtonSkeleton();
      case 'text':
        return renderTextSkeleton();
      case 'card':
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;