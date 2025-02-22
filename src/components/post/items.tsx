import React from 'react'
import UserCard from './utils/user'
import { Heart, Share2 } from 'lucide-react'

export default function items({ id }: { id: string }) {

  return (
    <div className="flex items-center justify-between mb-4">
      <UserCard user_id={id} />
      <div className="flex items-center space-x-4">
        <Heart className='cursor-pointer' fill='white' />
        <Share2 className='cursor-pointer' />
      </div>
    </div>
  )
}
