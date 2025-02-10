'use client'
import { Pagination } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import Cards from '../posts/cards'
import SkeletonCard from '../skeleton/skeleton';
import { useGetPosts } from './hooks/useGetPosts';

export default function Feed() {
  const [countPage, setCountPage] = useState<number>(1);

  const {isLoading, getPosts, data, error} = useGetPosts()

  useEffect(()=>{
    getPosts(countPage)
  },[countPage])

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {isLoading ? <SkeletonCard count={3} /> :
           <Cards posts={data?.posts || []} />}
        </div>
        {data?.count && data?.count >=2 && <Pagination showControls initialPage={1} total={(data?.count/3)%3 === 0 ? data?.count/3 : (data?.count/3) +1} onChange={(page)=>setCountPage(page)}/>}
    </>
  )
}
