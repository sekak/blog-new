import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/types/auth";
import UserCard from "./content/user";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

export default function Cards({ posts }: { posts: PostProps[] | null }) {

  return (
    <>
      {posts?.map((post) => (
        <Card key={post.id} className="bg-background overflow-hidden max-w-[390px] max-h-[450px]" isPressable>
          <Link href={`/post/${post.id}`} className="w-full">
            <div className="relative h-48">
              <Image
                src={post.image}
                alt="Med Blog"
                className="object-cover"
                fill
              />
            </div>
            <div className="flex flex-col h-[250px] w-full p-4">
              <CardHeader className="flex-1 border-none">
                <h3 className="text-xl font-semibold">{post.title}</h3>
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
