"use client";
import React, { useEffect } from "react";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from 'next/navigation'

export default function Comments() {
  const path = usePathname()
  const postId = path.split('/')[2]
  const supabase = createClient();
  const [comments, setComments] = React.useState<any>();
  useEffect(() => {
    const fetchComments = async () => {
      const { data: comments, error } = await supabase.from("comment").select("*").eq("post_id", postId);
      if (error) {
        console.log("Error fetching comments", error);
        setComments([]);
      }
      setComments(comments);
    };
    fetchComments()
  }, []);
    
  const handleAddComment = async (comment: string) => {
    const newComment = {
      content: comment,
      author: "Anonymous",
      created_at: new Date().toISOString(),
      post_id: postId,
      // user_id: 
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
