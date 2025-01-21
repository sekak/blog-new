import Avatar from "@/components/avatar";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";


export default async function PostComment({params}:{ id:bigint}) {
  const {id} = await params
  const supabase = await createClient();
  const { data: post, error } = await supabase.from("posts").select('').eq('id',id);
  if(!post)
    return <p>Not found</p>

  return (
      <Card className="overflow-hidden w-full">
        <div className="relative h-[400px]">
          <Image
            src={post[0].image}
            alt="Med Blog"
            className="object-cover"
            fill
          />
        </div>
        <CardHeader className="border-none">
          <Link href="/">
            <h3 className="text-3xl font-semibold">
              {post[0].title}
            </h3>
          </Link>
        </CardHeader>
        <Avatar src="https://avatar.vercel.sh/John%20Doe" alt="" className="px-6" name="John Deo" date="10/12/24"/>
        <CardContent className="mt-6">
          <p className="text-base text-foreground">{post[0].description}</p>
        </CardContent>
      </Card>
  )
}
