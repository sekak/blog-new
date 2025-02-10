'use client'
import { Pagination } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import Cards from '../posts/cards'
import useSWR from 'swr';
import SkeletonCard from '../skeleton/skeleton';
import { useGetPosts } from './hooks/useGetPosts';

export default function Feed() {
  const [countPage, setCountPage] = useState<number>(1);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const fetcher = async (url: string) => {
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   if (!response.ok) {
  //     const error = new Error(data.error || 'An error occurred while fetching the data.');
  //     (error as any).status = response.status;
  //     throw { error };
  //   }

  //   return data;
  // };
  // const { data, error, isLoading } = useSWR(`/api/posts?index=${currentPage}`, fetcher, {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false
  // });

  // useEffect(() => {
  //   if (data?.count) {
  //     setCountPage(data.count);
  //   }
  // }, [data?.count]);

  // if (error?.error) {
  //   return <Error statusCode={error?.error?.status} />
  // }
  const {isLoading, getPosts, data,error} = useGetPosts()
  console.log(data?.count,error)
  useEffect(()=>{
    getPosts(countPage)
  },[countPage])

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {isLoading ? <SkeletonCard count={3} /> :
           <Cards posts={data?.posts} />}
        </div>
        {data?.count && data?.count >=2 && <Pagination showControls initialPage={1} total={(data?.count/3)%3 === 0 ? data?.count/3 : (data?.count/3) +1} onChange={(page)=>setCountPage(page)}/>}
    </>
  )
}
