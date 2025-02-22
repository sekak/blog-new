import React, { useCallback, useEffect, useState } from 'react'
import useFetchSavedPosts from '@/components/profile/hooks/useGetSavedPosts'
import { useSessionContext } from '@/context/Session'
import { Heart, Loader2 } from 'lucide-react'
import Masonry from 'react-masonry-css'
import { useInView } from 'react-intersection-observer'
import { PropsSavedPosts } from '@/types/global'
import Picture from '@/components/post/utils/image'



export default function saved() {

  const { getSavedPosts, data, isLoading } = useFetchSavedPosts()
  const { user } = useSessionContext()
  const [posts, setPosts] = useState<PropsSavedPosts[]>([])
  const [page, setPage] = useState(1)
  const { inView, ref } = useInView()
  const [appearContent, setAppearContent] = useState<number>(-1)

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      setPosts((prev) => {
        const newPosts = data?.data?.filter(
          (newPost: PropsSavedPosts) => !prev.some((p) => p.id === newPost.id)
        );
        const updatedPosts = [...prev, ...newPosts];
        return updatedPosts;
      })
    }
  }, [data, page])

  // fetch frst four items
  useEffect(() => {
    if (user?.id)
      getSavedPosts({ id: user?.id, page })
  }, [user?.id])

  // fetch more items
  const fetchMorePosts = useCallback(() => {
    if (user?.id && inView && !isLoading) {
      if (data?.empty && data?.empty) return
      const nextPage = page + 1
      getSavedPosts({ id: user?.id, page: page + 1 })
      setPage(nextPage)
    }
  }, [inView])

  useEffect(() => {
    fetchMorePosts()
  }, [fetchMorePosts])

  const breakpointCols = {
    default: 5,
    1100: 4,
    900: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className='max-w-[1200px] mx-auto'>
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {
          posts?.map((post: any, index: number) => (
            <div key={post.id || index} className="relative w-full mb-4 break-inside-auto transition-all"
              onMouseEnter={() => setAppearContent(index)}
              onMouseLeave={() => setAppearContent(-1)}>
              <Picture src={post?.post?.image} />
              {appearContent === index && (
                <div className="absolute w-full h-full top-0 left-0">
                  <div className="flex flex-col justify-between h-full rounded-2xl bg-black bg-opacity-20">
                    <div className="flex-2 flex justify-end items-start p-4">
                      <Heart className="w-8 h-8 text-white cursor-pointer" />
                    </div>
                    <div className="bg-gradient-to-t from-black to-transparent z-10 rounded-2xl flex-1 p-4 flex flex-col justify-end">
                      <h3 className="line-clamp-4 font-medium underline italic text-white cursor-pointer">
                        {post?.post?.title || 'Discover the latest in nextjs'}
                      </h3>
                    </div>
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
