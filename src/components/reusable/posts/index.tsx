'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import Masonry from 'react-masonry-css'
import { breakpointCols } from '@/utils/utils'
import { useGetData } from './hooks/useGetData'
import Link from 'next/link'

export default function ListPosts({ filter }: { filter: string }) {

  const { isLoading,
    posts,
    ref,
    appearContent,
    setAppearContent,
    user,
    error
  } = useGetData(filter);

  if (error) return <div className='flex justify-center items-center h-[500px] text-lg font-light'>{error.info.error}</div>

  return (
    <div className='max-w-[1200px] mx-auto mt-20'>
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {
          posts?.map((post, index: number) => (
            <div key={post.id || index} className="relative w-full mb-4 break-inside-auto transition-all"
              onMouseEnter={() => setAppearContent(index)}
              onMouseLeave={() => setAppearContent(-1)}>
              <img
                src={post?.image || 'https://avatar.vercel.sh/5'}
                alt="Med Blog"
                className="rounded-2xl object-cover h-auto w-full"
              />
              {appearContent === index && (
                <div className="absolute w-full h-full top-0 left-0">
                  <div className="flex flex-col justify-between h-full rounded-2xl bg-black bg-opacity-20">
                    <div className="flex-2 flex justify-end items-start p-4 cursor-pointer">
                    </div>
                    <Link href={`/post/${user?.id}?id=${post.id}`}
                      className="bg-gradient-to-t from-black to-transparent z-10 rounded-2xl flex-1 p-4 flex flex-col justify-end">
                      <h3 className="line-clamp-4 font-medium underline italic text-white cursor-pointer">
                        {post?.title || 'Discover the latest in nextjs'}
                      </h3>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </Masonry>
      <div className='flex justify-center items-center'>
        <span ref={ref} className='flex justify-center items-center mt-8 mb-4'>
          {isLoading && <Loader2 className='animate-spin-slow' />}
        </span>
      </div>
    </div>
  )
}

