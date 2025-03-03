'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useSessionContext } from '@/context/Session'
import { Heart, Loader2 } from 'lucide-react'
import Masonry from 'react-masonry-css'
import { useInView } from 'react-intersection-observer'
import { PostProps } from '@/types/global'
import useFetchPosts from '@/components/posts/hooks/useGetPosts'
import Picture from '@/components/post/utils/image'
import Link from 'next/link'
import { breakpointCols } from '@/utils/utils'
import ListPosts from '../reusable/posts'

export default function Posts() {


  return <ListPosts filter="all"/>

}