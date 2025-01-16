"use client";
import React from "react";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { CommentListProps } from "@/types/global";

export default function Comments() {
  const [comments, setComments] = React.useState<CommentListProps[]>([
    {
      id: "1",
      author: "Alice Johnson",
      content: "Great article! Very informative.",
      date: "2024-03-21",
    },
    {
      id: "2",
      author: "Bob Smith",
      content: "Thanks for sharing this knowledge.",
      date: "2024-03-20",
    },
  ]);

  const handleAddComment = async (comment: string) => {
    const newComment = {
      content: comment,
      author: "Anonymous",
      date: new Date().toISOString(),
      id: Math.random().toString(),
    };

    await setComments([newComment, ...comments]);
  };
  return (
    <div className="mt-8 space-y-8">
      <CommentForm handleAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}
