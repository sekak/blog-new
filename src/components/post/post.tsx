'use client'
import Image from "next/image";
import Comments from "@/components/comments/comments";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import { formatDate } from "@/utils/utils";
import { useSearchParams } from "next/navigation";

export default function Post() {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const image = searchParams.get('image');
  const user_id = searchParams.get('user_id');
  const description = searchParams.get('description');
  const created_at = searchParams.get('created_at');
  const [img, setImg] = useState<string | null>(null);

  return (
    <>
      <Card className="overflow-hidden w-full bg-background mb-10">
        <div className="relative overflow-hidden  h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 hover:to-black/10"></div>
          {
            image ? <Image
              src={img || image}
              alt="Med Blog"
              className="object-cover"
              fill
              onError={() => setImg(`https://avatar.vercel.sh/${id}`)}
            /> :
              <Image
                src={`https://avatar.vercel.sh/${id}`}
                alt="Med Blog"
                className="object-cover"
                fill
              />
          }
          <CardHeader className="absolute bottom-2">
            <h3 className="text-3xl font-semibold text-white line-clamp-1 max-w-[80%]">
              {title}
            </h3>
          </CardHeader>
        </div>
        <CardBody>
          <p className="text-base text-foreground pt-2 pb-6">{description}</p>
          <span className="text-[12px] text-zinc-500 text-end">{formatDate(created_at!)}</span>
        </CardBody>
      </Card>
      <Comments id={id!} />
    </>
  )
}
