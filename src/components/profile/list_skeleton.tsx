import { Skeleton } from '@heroui/react';
import React from 'react'

interface PropsLoading {
    count: number
    isLoading: boolean
}

export default function ListSkeleton(props: PropsLoading) {
    return (
        <div className="relative w-full mb-4 break-inside-auto transition-all" >
            {props.isLoading && Array.from({ length: props.count }).map((_, index) => (
                <Skeleton key={index} className='rounded-2xl h-full w-full' />
            ))}
        </div>
    )
}
