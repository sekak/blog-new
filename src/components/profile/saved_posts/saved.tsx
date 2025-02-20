import React, { useEffect, useState } from 'react';
import { Heart, Loader, Loader2 } from 'lucide-react';
import LoadMore from './load_more';
import useFetchSavedPosts from '../hooks/useGetSavedPosts';
import { useSessionContext } from '@/context/Session';
import { useInView } from 'react-intersection-observer';
import ListSkeleton from '../list_skeleton';

export default function Saved() {
  const { user } = useSessionContext();
  const { getSavedPosts, data, isLoading } = useFetchSavedPosts();
  const [posts, setPosts] = useState<any[]>([]);
  const [appearContent, setAppearContent] = useState<number>(-1);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch initial posts
  useEffect(() => {
    if (user?.id) {
      getSavedPosts({ id: user?.id, page: 1 });
    }
  }, [user?.id, getSavedPosts]);

  // Update posts when new data arrives
  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      setPosts(prev => {
        const newPosts = data.data.filter(
          (newPost: any) => !prev.some(p => p.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [data]);
console.log(inView)
  return (
    <>
      <div className="w-[1400px] mx-auto my-10 columns-5 gap-4">
        {posts.map((post, index) => (
          <div
            key={post.id || index}
            className="relative w-full mb-4 break-inside-auto transition-all"
            onMouseEnter={() => setAppearContent(index)}
            onMouseLeave={() => setAppearContent(-1)}
          >
            <img
              className="rounded-2xl object-cover h-auto w-full"
              src={post?.post?.image || 'https://i.pinimg.com/736x/2d/68/90/2d6890190456fc614d2a9b0eb41e9739.jpg'}
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
        {/* <ListSkeleton isLoading={isLoading} count={12} /> */}
        <LoadMore inView={inView} />
      </div>
      <div className="flex justify-center items-center w-full py-4">
        <span className="w-10 h-10" ref={ref} />
        {inView && isLoading && <Loader2 className="w-6 h-6 animate-spin ml-2" />}
      </div>
    </>
  );
}