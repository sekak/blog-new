import React from 'react'
import { Avatar as AvatarRoot, AvatarFallback, AvatarImage,  } from '@/components/ui/avatar'
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  name?: string;
  date?: string;
  className?: string;
}

export default function Avatar(props:AvatarProps) {
  return (
    <div className={cn('flex space-x-4',props.className)}>
      <AvatarRoot className='w-10 h-10 flex items-center'>
        <AvatarImage
          src={props.src ?? 'https://avatar.vercel.sh/John%20Doe'}
          alt={props.alt}
          className=''
        />
        <AvatarFallback>
            {props.name}
        </AvatarFallback>
      </AvatarRoot>
      <div>
        <h3 className='text-sm font-semibold'>{props.name}</h3>
        <p className='text-[12px] text-muted-foreground'>{props.date}</p>
      </div>
    </div>
  )
}
