"use client";
import React, { useEffect } from "react";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import useSWR, { mutate } from "swr";
import Error from "next/error";
import { CommentsProps } from "@/types/global";

export default function Comments({ id }: { id: string }) {
  const postId = id

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || 'An error occurred while fetching the data.');
      (error as any).status = response.status;
      throw { error };
    }
    return data
  }
  const { data, error, isLoading } = useSWR(`/api/comments?post_id=${id}`, fetcher)
  const { data: user } = useSWR('/api/users?', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const sendData = async (url: string, { arg }: { arg: CommentsProps }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });
    return response.json();
  };


  const handleAddComment = async (comment: string) => {
    const newComment: CommentsProps = {
      content: comment,
      author: "Anonymous",
      created_at: new Date().toISOString(),
      post_id: postId,
      user_id: user.id
    };

    await sendData(`/api/comments?post_id=${postId}`, { arg: newComment });
    mutate(`/api/comments?post_id=${postId}`);
  };

  return (
    <div className="mt-8 space-y-8">
      <CommentForm handleAddComment={handleAddComment} />
      <CommentList comments={data} />
    </div>
  );
}
