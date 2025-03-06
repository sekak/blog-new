import { useSessionContext } from "@/context/Session";
import { PostProps } from "@/types/global";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useFetchPostsByType from "./useFetchPostsByType";

export const useGetData = (filter: string) => {
  const { isLoading, data, getPosts, error } = useFetchPostsByType();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(1);
  const { inView, ref } = useInView();
  const [appearContent, setAppearContent] = useState<number>(-1);
  const { user } = useSessionContext();

  useEffect(() => {
    if (data?.posts && data?.posts.length > 0) {
      setPosts((prev) => {
        const newPosts = data?.posts?.filter(
          (newPost: PostProps) => !prev.some((p) => p.id === newPost.id)
        );
        const updatedPosts = [...prev, ...newPosts];
        return updatedPosts;
      });
    }
  }, [data, page]);

  useEffect(() => {
    if (user?.id) getPosts({ page: page, user_id: user?.id, type: filter });
  }, [user?.id]);

  const fetchMorePosts = useCallback(() => {
    if (user?.id && inView && !isLoading) {
      const nextPage = page + 1;
      if (data?.empty) return;
      getPosts({ page: nextPage, user_id: user?.id, type: filter });
      setPage(nextPage);
    }
  }, [inView]);

  useEffect(() => {
    fetchMorePosts();
  }, [fetchMorePosts]);

  return {
    isLoading,
    data,
    getPosts,
    posts,
    setPosts,
    page,
    setPage,
    inView,
    ref,
    appearContent,
    setAppearContent,
    user,
    fetchMorePosts,
    error,
  };
};
