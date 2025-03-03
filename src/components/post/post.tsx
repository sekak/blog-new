'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import UserCard from './utils/user'
import { ArrowLeftIcon, Share } from 'lucide-react'
import useGetPostById from './hook/useGetPostById'
import Picture from './utils/image'
import Comments from '../comments/comments'
import { Post as PropsPost } from '@/types/global'
import SaveIcon from '../save_post'
import { TruncatedText } from '../ui/truncated-text'

export default function Post() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const user_id = pathname.split('/')[2]
  const id = searchParams.get('id')
  const [post, setPost] = React.useState<PropsPost | null>(null)

  const { getPostById, data } = useGetPostById()

  useEffect(()=>{
    if(data )
      setPost(data)
  }, [data,getPostById])

  React.useEffect(() => {
    getPostById(Number(id))
  }, [id])

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex w-full justify-between my-4">
        <ArrowLeftIcon className="cursor-pointer" color="gray" />
        <div className="flex gap-5">
          <SaveIcon />
          <Share className="cursor-pointer" color="gray" />
        </div>
      </div>

      {/* Post Title and User */}
      <div className="space-y-6 py-4 border-b w-full">
        <h1 className="font-bold text-4xl">
          {post?.title}
        </h1>
        <UserCard user_id={user_id} />
      </div>

      {/* Post Image */}
      <div className="relative">
        <Picture src={post?.image ?? ''} />
      </div>

      {/* Post Content */}
      <div className="space-y-4">
        <p className="text-xl italic leading-8 w-full break-words">
          <TruncatedText content={post?.description ?? ''} charLimit={300} />
        </p>
      </div>

      {/* Comment Form */}
      <Comments user_id={user_id} post_id={id!}/>
    </div>
  )
}