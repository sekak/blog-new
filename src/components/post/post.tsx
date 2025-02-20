'use client'
import Image from "next/image";
import useSWR from "swr";
import SkeletonCard from "@/components/skeleton/skeleton";
import SkeletonComments from "@/components/skeleton/skeleton_comments";
import Comments from "@/components/comments/comments";
import UserCard from "@/components/post/utils/user";
import Error from "next/error";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { PropsError } from "@/types/global";
import { useState } from "react";
import { formatDate } from "@/utils/utils";
import Items from '@/components/post/items'

export default function Post() {

  const [img, setImg] = useState<string | null>(null);

  const local = window.location.href
  const id = local.split('/')[4]

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
  const { data, error, isLoading } = useSWR(`/api/post?post_id=${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  if (error && error.status != 200)
    return <Error statusCode={error?.status} />

  return (
    <>
      {!isLoading ?
        <>
          <Items id={data?.user_id}/>
          <Card className="overflow-hidden w-full bg-background mb-10">
            <div className="relative overflow-hidden  h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 hover:to-black/10"></div>
              {
                data?.image ? <Image
                  src={img || data?.image}
                  alt="Med Blog"
                  className="object-cover"
                  fill
                  onError={() => setImg(`https://avatar.vercel.sh/${data?.id}`)}
                /> :
                  <Image
                    src={`https://avatar.vercel.sh/${data?.id}`}
                    alt="Med Blog"
                    className="object-cover"
                    fill
                  />
              }
              <CardHeader className="absolute bottom-2">
                <h3 className="text-3xl font-semibold text-white line-clamp-1 max-w-[80%]">
                  {data?.title}
                </h3>
              </CardHeader>
            </div>
            <CardBody>
              <p className="text-base text-foreground pt-2 pb-6">{data?.description}</p>
              <span className="text-[12px] text-zinc-500 text-end">{formatDate(data?.created_at)}</span>
            </CardBody>
          </Card>
          <Comments id={id} />
        </>
        :
        <>
          <SkeletonCard count={1} />
          <SkeletonComments />
        </>
      }
    </>
  )
}
