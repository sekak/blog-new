'use client'
import Image from "next/image";
import useSWR from "swr";
import SkeletonCard from "../skeleton/skeleton";
import Comments from "../comments/comments";
import Error from "next/error";
import SkeletonComments from "../skeleton/skeleton_comments";
import { Card, CardBody, CardHeader } from "@heroui/react";
import UserCard from "./content/user";


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
      <Card className="overflow-hidden w-full bg-background">
          <div className="relative overflow-hidden  h-[400px]">
            <Image
              src={data?.image ? data?.image : `https://avatar.vercel.sh/John%20Doe`}
              alt="Med Blog"
              className="object-cover transition-all hover:scale-110"
              fill
              />
          </div>
          <CardHeader className="mt-4">
            <h3 className="text-3xl font-semibold">
              {data?.title}
            </h3>
          </CardHeader>
          <CardBody className="">
            <p className="text-base text-foreground mb-6">{data?.description}</p>
            <UserCard user_id={data.user_id} />
          </CardBody>
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
