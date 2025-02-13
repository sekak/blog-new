'use client'
import { Pagination } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import Cards from '../post/cards'
import SkeletonCard from '../skeleton/skeleton'
import { useGetPosts } from './hooks/useGetPosts'

export default function Posts() {
  const [countPage, setCountPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const { isLoading, data } = useGetPosts(countPage);

  useEffect(() => {
    if (data?.count && data.count >= 2) {
      if (count !== data.count) setCount(data.count);
    }
  }, [data?.count, count]);

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {isLoading ? <SkeletonCard count={3} /> : <Cards posts={data?.posts || []} />}
      </div>
      {count > 0 && (
        <Pagination
          showControls
          initialPage={countPage}
          total={Math.max(1, Math.ceil(count / 3))}
          onChange={(page) => setCountPage(page)}
        />
      )}
    </>
  );
}
