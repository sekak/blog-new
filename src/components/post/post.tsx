'use client'
import Image from "next/image";
import useSWR from "swr";
import SkeletonCard from "../skeleton/skeleton";
import Comments from "../comments/comments";
import Error from "next/error";
import SkeletonComments from "../skeleton/skeleton_comments";
import { Card, CardBody, CardHeader } from "@heroui/react";
import UserCard from "./utils/user";
import { PropsError } from "@/types/global";
import { useState } from "react";
import { Clock } from "lucide-react";
import Hint from "../ui/hint";
import { formatDate } from "@/utils/utils";


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
  console.log(data)

  if (error && error.status != 200)
    return <Error statusCode={error?.status} />

  return (
    <>
      {!isLoading ?
        <>
          <Card className="overflow-hidden w-full bg-background">
            <div className="relative overflow-hidden  h-[400px]">
              {
                data?.image ? <Image
                  src={img || data?.image}
                  alt="Med Blog"
                  className="object-cover transition-all hover:scale-110"
                  fill
                  onError={() => setImg(`https://avatar.vercel.sh/${data?.id}`)}
                /> :
                  <Image
                    src={`https://avatar.vercel.sh/${data?.id}`}
                    alt="Med Blog"
                    className="object-cover transition-all hover:scale-110"
                    fill
                  />
              }
              <CardHeader className="absolute bottom-2">
                <h3 className="text-3xl font-semibold">
                  {data?.title}
                </h3>
              </CardHeader>
            </div>
            <CardBody className="flex flex-row justify-between">
              <div className="mt-2">
                <p className="text-base text-foreground mb-6">{data?.description}</p>
                <UserCard user_id={data?.user_id} />
              </div>
              <span className="min-w-max flex items-end"><Hint content={formatDate(data?.created_at)} placement="top"><Clock className="text-sm text-gray-600 cursor-pointer" /></Hint></span>
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
