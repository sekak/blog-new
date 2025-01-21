'use client'
import Pagination from "@/components/pagination";
import PostCard from "@/components/post-card";
import SkeletonCard from "@/components/skeleton";
import { PostProps } from "@/types/auth";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";


export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [countPage, setCountPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const supabase = createClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        let { data, count, error } = await supabase.from("posts")
        .select('*', { count: 'exact' })
        .limit(3)
        .range((currentPage - 1) * 3, currentPage * 3 - 1);

        if (error) throw error;
        else if (data) {
          setPosts(data);
          setCountPage(count!);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const numberOfPages = useMemo(() => Math.ceil(countPage / 3), [countPage]);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 p-6">
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-4xl font-bold">Welcome to Med Blog</h1>
          <p className="mt-5 text-lg text-justify">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            {loading ? <SkeletonCard count={3} /> : <PostCard posts={posts} />}
          </div>
          {numberOfPages > 1 && <Pagination countPage={countPage} numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
      </div>
    </>
  );
}
