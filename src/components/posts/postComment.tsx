'use client'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import useSWR from "swr";
import SkeletonCard from "../skeleton/skeleton";
import PostCard from "./content/post_card";
import Error from "next/error";
import Comments from "../comments/comments";
import SkeletonComments from "../skeleton/skeleton_comments";


export default function PostComment({ id }: { id: string }) {

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
  const { data, error, isLoading } = useSWR(`/api/post?post_id=${id}`, fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })


  if(error && error.status != 200)
    return <Error statusCode={error?.status}/>

  return (
    <>
    {!isLoading ?
      <>
      <Card className="overflow-hidden w-full">
          <div className="relative h-[400px]">
            <Image
              src={data?.image ? data?.image : `https://avatar.vercel.sh/John%20Doe`}
              alt="Med Blog"
              className="object-cover"
              fill
              />
          </div>
          <CardHeader>
            <h3 className="text-3xl font-semibold">
              {data?.title}
            </h3>
          </CardHeader>
          <CardContent className="mt-6">
            <PostCard user_id={data.user_id} />
            <p className="text-base text-foreground mt-2">{data?.description}</p>
          </CardContent>
          </Card>
          <Comments id={id}/>
        </>
        :
        <>
        <SkeletonCard count={1} />
        <SkeletonComments/>
        </>
      }
      </>
  )
}
