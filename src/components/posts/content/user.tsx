import { fetcher } from '@/utils/utils';
import { Link, Skeleton, User } from '@heroui/react';
import useSWR from 'swr';

export default function UserCard({ user_id }: { user_id: string }) {

    const { data, isLoading } = useSWR(`/api/users?id=${user_id}`, fetcher);

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
                        <Link isExternal href="https://x.com/jrgarciadev" className='text-[11px]'>
                            {data?.email}
                        </Link>
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
