"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import useGetPostById from "./hook/useGetPostById";
import Comments from "@/components/comments/comments";
import SkeletonPost from "@/components/skeleton/post";
import Header from "./header";
import PostTitle from "@/components/post/post_title";
import PostImage from "@/components/post/post_img";
import PostDescription from "@/components/post/post_description";

export default function Post() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const user_id = pathname.split("/")[2];
  const post_id = searchParams.get("id");

  const { getPostById, data, isLoading, error } = useGetPostById();

  useEffect(() => {
    if (post_id && user_id) {
      getPostById({ post_id, user_id });
    }
  }, [post_id, user_id, getPostById]);

  const post = React.useMemo(() => {
    if (data) {
      return { ...data, save: data.save ?? false };
    }
    return null;
  }, [data]);

  if (!post_id || !user_id) {
    return <div className="text-red-500">Invalid post ID or user ID</div>;
  }

  return (
    <div className="space-y-10">
      {isLoading ? (
        <SkeletonPost />
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : post && (
        <>
          <Header post={post} />
          <PostTitle post={post} user_id={user_id} />
          <PostImage post={post} />
          <PostDescription post={post} />
          <Comments user_id={user_id} post_id={post_id} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}