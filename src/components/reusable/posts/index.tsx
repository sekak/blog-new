'use client'
import React from 'react'
import { Heart, Loader2 } from 'lucide-react'
import Masonry from 'react-masonry-css'
import Picture from '@/components/post/utils/image'
import Link from 'next/link'
import { breakpointCols } from '@/utils/utils'
import { useGetData } from './hooks/useGetData'

export default function ListPosts({filter}: {filter: string}) {

  const { isLoading,
    posts,
    ref,
    appearContent,
    setAppearContent,
    user,
  } = useGetData(filter);

  return (
    <div className='max-w-[1200px] mx-auto mt-20'>
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {
          posts?.map((post, index: number) => (
            <div key={post.id || index} className="relative w-full mb-4 break-inside-auto transition-all min-w-[200px]"
              onMouseEnter={() => setAppearContent(index)}
              onMouseLeave={() => setAppearContent(-1)}>
              <Picture src={post?.image} />
              {appearContent === index && (
                <div className="absolute w-full h-full top-0 left-0">
                  <div className="flex flex-col justify-between h-full rounded-2xl bg-black bg-opacity-20">
                    <div className="flex-2 flex justify-end items-start p-4">
                      <Heart />
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

