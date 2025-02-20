import Link from "next/link";
import UserCard from "@/components/post/utils/user";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Post } from "@/types/global";
import Picture from "@/components/post/utils/image";

export default function Cards({ posts }: { posts: Post[]}) {
  if(!posts) return <h1>No Posts</h1>
  return (
    <>
      {posts?.map((post) => (
        <Card key={post.id} className="bg-background overflow-hidden lg:max-w-[390px] max-h-[450px]" isPressable>
          <Link href={`/post/${post.id}`} className="w-full">
            <div className="relative h-48">
              <Picture src={post.image} />
            </div>
            <div className="flex flex-col h-[250px] w-full p-4">
              <CardHeader className="flex-1 border-none">
                <h3 className="text-xl font-semibold line-clamp-1 text-start min-w-[350px]">{post.title}</h3>
              </CardHeader>
              <CardBody className="flex-2">
                <p className="text-base text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </CardBody>
              <CardFooter className="flex-1 text-sm text-muted-foreground border-none flex items-center justify-between">
                <UserCard user_id={post?.user_id} />
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))
      }
    </>
  );
}
