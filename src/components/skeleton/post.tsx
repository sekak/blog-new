import { Skeleton } from '@heroui/react'
import React from 'react'

export default function SkeletonPost() {
    return (
        <div>

            <div className="flex w-full justify-between my-4">
                <Skeleton className='h-[24px] w-[24px] rounded-full' />
                <div className="flex gap-5">
                    <>
                        <Skeleton className='h-[24px] w-[24px] rounded-full' />
                        <Skeleton className='h-[24px] w-[24px] rounded-full' />
                    </>
                </div>
            </div>
            <div className='space-y-6 py-4 border-b w-full pb-8'>
                <Skeleton className='h-[36px] w-full rounded-full' />
                <Skeleton className='h-[32px] w-[80%] rounded-full' />
            </div>
            <div className='relative mt-8'>
                <Skeleton className='h-[500px] w-full rounded-2xl' />
            </div>
            <div className='space-y-4 mt-8'>
                <Skeleton className='h-[24px] w-full rounded-full' />
                <Skeleton className='h-[24px] w-[80%] rounded-full' />
                <Skeleton className='h-[24px] w-[70%] rounded-full' />
                <Skeleton className='h-[24px] w-[50%] rounded-full' />
            </div>
            
        </div>
    )
}
