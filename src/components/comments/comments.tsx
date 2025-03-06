"use client";
import React, { useEffect } from "react";
import { CommentsProps } from "@/types/global";
import FormComment from "./form_comment";
import ListComment from "./list_comment";
import useGetComments from "./hooks/useGetComments";


interface PropsComment {
  user_id: string;
  post_id: string;
  isLoading: boolean;
}

export default function Comments(props: PropsComment) {

  const { data, isLoading, getComments } = useGetComments();
  const [comment, setComment] = React.useState<CommentsProps>();
  const [comments, setComments] = React.useState<CommentsProps[]>([]);

  useEffect(() => {
    if (data && data.length > 0)
      setComments(data)

    if (comment)
      setComments([comment, ...comments])

  }, [data, comment])

  useEffect(() => {
    getComments(Number(props?.post_id))
  }, [])

  return (
    <div className="space-y-14">
      {!props.isLoading && <FormComment count={comments?.length ?? 0} user_id={props?.user_id} post_id={props.post_id} setComment={setComment} />}
      <ListComment comments={comments ?? []} isLoading={isLoading} />
    </div>
  );
}
