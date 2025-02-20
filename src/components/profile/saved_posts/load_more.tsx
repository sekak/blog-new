import { useSessionContext } from '@/context/Session'
import { Heart } from 'lucide-react'
import React, { useEffect, useState, useCallback } from 'react'
import useFetchSavedPosts from '../hooks/useGetSavedPosts'
import ListSkeleton from '../list_skeleton'

export default function LoadMore({ inView }: { inView: boolean }) {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState(2)  // Move page to state
    const { getSavedPosts, data, isLoading } = useFetchSavedPosts()
    const { user } = useSessionContext()
    const [appearContent, setAppearContent] = useState<number>(-1)

    const fetchMorePosts = useCallback(() => {
        if (user?.id && !data?.empty && !isLoading && inView) {
            getSavedPosts({ id: user?.id, page })
            setPage(prev => prev + 1)
        }
    }, [user?.id, data?.empty, isLoading, inView, getSavedPosts, page])

    useEffect(() => {
        fetchMorePosts()
    }, [fetchMorePosts])

    useEffect(() => {
        if (data?.data && data?.data.length > 0) {
            setPosts(prev => {
                // Prevent duplicates by filtering out existing post IDs
                const newPosts = data.data.filter(
                    (newPost: any) => !prev.some(p => p.id === newPost.id)
                )
                return [...prev, ...newPosts]
            })
        }
    }, [data])

    return (
        <>
            {posts?.map((post, index) => (
                <div
                    key={post.id || index}
                    className="relative w-full mb-4 break-inside-auto transition-all"
                    onMouseEnter={() => setAppearContent(index)}
                    onMouseLeave={() => setAppearContent(-1)}
                >
                    <img
                        className="rounded-2xl object-cover h-auto w-full max-h-[500px]"
                        src={post?.post?.image}
                        alt={post?.post?.title || 'placeholder'}
                    />
                    {appearContent === index && (
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="flex flex-col justify-between h-full rounded-2xl bg-black bg-opacity-20">
                                <div className="flex-2 flex justify-end items-start p-4">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <div className="bg-gradient-to-t from-black to-transparent z-10 rounded-2xl flex-1 p-4 flex flex-col justify-end">
                                    <h3 className="line-clamp-4 font-medium underline italic text-white">
                                        {post?.post?.title || 'Discover the latest in nextjs'}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            <ListSkeleton isLoading={true} count={12}/>
        </>
    )
}