import Avatar from "@/components/avatar";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function PostComment() {
  return (
      <Card className="overflow-hidden w-full">
        <div className="relative h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60"
            alt="Med Blog"
            className="object-cover"
            fill
          />
        </div>
        <CardHeader className="border-none">
          <Link href="/">
            <h3 className="text-3xl font-semibold">
              Getting started with blog
            </h3>
          </Link>
        </CardHeader>
        <Avatar src="https://avatar.vercel.sh/John%20Doe" alt="" className="px-6" name="John Deo" date="10/12/24"/>
        <CardContent className="mt-6">
          <p className="text-base text-foreground">Next.js is a powerful framework for building React applications. It provides features like server-side rendering, static site generation, and API routes out of the box...</p>
        </CardContent>
      </Card>
  )
}
