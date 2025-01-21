import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/types/auth";

export default function PostCard({ posts }: { posts: PostProps[] | null }) {
  return (
    <>
      {posts?.map((post) => (
        <Card key={post.id} className="overflow-hidden w-full">
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
            {/* <span>{post.name}</span> */}
            <time>{new Date().toLocaleDateString()}</time>
          </CardFooter>
        </Card>
      ))
      }
    </>
  );
}
