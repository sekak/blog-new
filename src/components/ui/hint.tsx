import { Popover, PopoverTrigger ,PopoverContent } from '@heroui/react'
import React from 'react'

interface PropsHint{
  children: React.ReactNode
  content: string
  placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
}

export default function Hint(props: PropsHint) {
  return (
    <div>
      <Popover placement={props.placement ?? "bottom-start"}>
      <PopoverTrigger>
        {props?.children}
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          {props.content}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
