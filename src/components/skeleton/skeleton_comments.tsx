import { Skeleton } from '@heroui/react'
import React from 'react'

export default function SkeletonComments() {
    return (
        <div className='mt-12'>
            <Skeleton className='w-20 h-6 rounded-lg' />
            <Skeleton className='w-full rounded-lg h-14 mt-4' />
            <div className='mt-4'>
                <Skeleton className='w-[90%] h-6 rounded-lg mt-2' />
                <Skeleton className='w-[70%] h-6 rounded-lg mt-2' />
                <Skeleton className='w-[40%] h-6 rounded-lg mt-2' />
            </div>
        </div>
    )
}
