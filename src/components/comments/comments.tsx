"use client";
import React from "react";
import CommentForm from "@/components/comments/comment-form";
import CommentList from "@/components/comments/comment-list";
import useSWR, { mutate } from "swr";
import Error from "next/error";
import { CommentsProps, PropsError } from "@/types/global";
import { useSessionContext } from "@/context/Session";

export default function Comments({ id }: { id: string }) {

  const [loading, setLoading] = React.useState(false);
  const data_user = useSessionContext()

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || 'An error occurred while fetching the data.');
      (error as unknown as PropsError).status = response.status;
      throw { error };
    }
    return data
  }

  const { data, isLoading } = useSWR(`/api/comments?post_id=${id}`, fetcher)

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
    setLoading(true);
    if (!data_user?.user) {
      setLoading(false);
      return;
    }
    const newComment: CommentsProps = {
      content: comment,
      author: "Anonymous",
      created_at: new Date().toISOString(),
      post_id: id,
      user_id: data_user?.user?.id
    };

    await sendData(`/api/comments?post_id=${id}`, { arg: newComment });
    setLoading(false);
    mutate(`/api/comments?post_id=${id}`);
  };

  return (
    <div className="space-y-14">
      <CommentForm handleAddComment={handleAddComment} loading={loading}/>
      <CommentList comments={data} isLoading={isLoading}/>
    </div>
  );
}
