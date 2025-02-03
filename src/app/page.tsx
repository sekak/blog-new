'use client'
import Pagination from "@/components/pagination";
import PostsCard from "@/components/posts/cards";
import SkeletonCard from "@/components/skeleton/skeleton";
import { useEffect, useMemo, useState } from "react";
import useSWR from 'swr';
import Errors from "./errors/error";
import Error from 'next/error'


export default function Home() {

  const [countPage, setCountPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || 'An error occurred while fetching the data.');
      (error as any).status = response.status;
      throw { error };
    }

    return data;
  };
  const { data, error, isLoading } = useSWR(`/api/posts?index=${currentPage}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    if (data?.count) {
      setCountPage(data.count);
    }
  }, [data?.count]);


  const numberOfPages = useMemo(() => Math.ceil(countPage / 3), [countPage]);
  if (error?.error) {
    return <Error statusCode={error?.error?.status} />
  }
  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="flex items-center flex-col justify-center">
        <h1 className="text-4xl font-bold">Welcome to Med Blog</h1>
        <p className="mt-5 text-lg text-justify">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {isLoading ? <SkeletonCard count={3} /> : <PostsCard posts={data?.posts} />}
        </div>
        {numberOfPages > 1 && <Pagination countPage={countPage} numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}
