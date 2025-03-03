import { Skeleton } from '@heroui/react';
import React from 'react';

interface SkeletonProps {
  count: number;
  className?: string;
}

interface SkeletonCommentProps {
  className?: string;
}

const SkeletonComment: React.FC<SkeletonCommentProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      <Skeleton className="rounded-full min-w-20 min-h-20" />
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full rounded-xl h-8" />
        <Skeleton className="w-24 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export default function SkeletonComments({ count, className }: SkeletonProps) {
  // Handle edge cases: if count is 0 or negative, return null or a single skeleton
  if (count <= 0) return null; // Or return <SkeletonComment className={className} /> if you prefer one by default
  if (count === 1) return <SkeletonComment className={className} />;

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonComment key={index} className={className} />
      ))}
    </>
  );
}