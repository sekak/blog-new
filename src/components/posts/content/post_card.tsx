import { Avatar, Skeleton } from '@heroui/react';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

export default function PostCard({ user_id }: { user_id: string }) {

    const fetcher = async (url: string) => fetch(url).then((res) => res.json());
    const { data, isLoading } = useSWR(`/api/users?id=${user_id}`, fetcher);

    return (
        <div className='flex items-center space-x-2'>
            {!isLoading ?
                <>
                    <Avatar
                        className="transition-transform border-none"
                        color="default"
                        size="sm"
                        src={data?.avatar_url
                            ? data?.avatar_url
                            : `https://avatar.vercel.sh/${data?.full_name
                            }`}
                    />
                    <div>
                        <p className="text-sm font-medium">{data?.name}</p>
                        <time className="text-xs text-muted-foreground">
                            {new Date(data?.created_at).toLocaleDateString()}
                        </time>
                    </div>
                </>
                :
                <div className='flex items-center space-x-2'>
                    <Skeleton className='rounded-full w-8 h-8' />
                    <div className='flex flex-col space-y-1'>
                        <Skeleton className='w-10 h-2 rounded-md' />
                        <Skeleton className='w-6 h-2 rounded-md' />
                    </div>
                </div>
            }
        </div>
    )
}
