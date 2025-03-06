'use client'
import { UserProps } from '@/types/global';
import { fetcher } from '@/utils/utils';
import { Skeleton, User } from '@heroui/react';
import useSWR from 'swr';

export default function UserCard(props: UserProps) {

    const { data, isLoading } = useSWR(`/api/users?id=${props.user_id}`, fetcher);
    switch (props.isProfile) {
        case true:
            return (
                <div>
                    {!isLoading ?
                        <User
                            className='flex flex-col text-2xl'
                            avatarProps={{
                                src: data?.avatar_url
                                    ? data?.avatar_url
                                    : `https://avatar.vercel.sh/${data?.full_name}`,
                                className: "w-28 h-28"
                            }}
                            name={
                                <span className='text-2xl font-bold'>{data?.name}</span>
                            }

                        />
                        :
                        <div className='flex flex-col items-center justify-center space-y-2'>
                            <Skeleton className='rounded-full w-24 h-24' />
                            <div className='flex flex-col items-center justify-center space-y-2'>
                                <Skeleton className='w-24 h-4 rounded-md' />
                                <Skeleton className='w-12 h-3 rounded-md' />
                            </div>
                        </div>
                    }
                </div>
            )
        case false:
        default:
            return (
                <div className='flex items-center space-x-2'>
                    {!isLoading ?
                        <User

                            avatarProps={{
                                src: data?.avatar_url
                                    ? data?.avatar_url
                                    : `https://avatar.vercel.sh/${data?.full_name}`,
                                className: "w-8 h-8"
                            }}
                            description={
                                <span className='text-[11px]'>
                                    {data?.email}
                                </span>
                            }
                            name={data?.name}
                        />
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
}
