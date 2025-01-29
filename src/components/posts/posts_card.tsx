import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/types/auth";
import PostCard from "./content/post_card";

export default function PostsCard({ posts }: { posts: PostProps[] | null }) {

  return (
    <>
      {posts?.map((post) => (
        <Card key={post.id} className="overflow-hidden w-full flex flex-col justify-between">
          <div className="relative h-48">
            <Image
              src={post.image}
              alt="Med Blog"
              className="object-cover"
              fill
            />
          </div>
          <CardHeader className="px-6 py-6 border-none">
            <Link href={`/post/${post.id}`}>
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </Link>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <p className="text-base text-muted-foreground line-clamp-3">
              {post.description}
            </p>
          </CardContent>
          <CardFooter className="text-sm px-6 pb-6 text-muted-foreground border-none flex items-center justify-between">
            <PostCard user_id={post?.user_id} />
          </CardFooter>
        </Card>
      ))
      }
    </>
  );
}
