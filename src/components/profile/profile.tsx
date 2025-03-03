'use client'
import UserCard from '@/components/post/utils/user'
import { Button, Tab, Tabs } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSessionContext } from '@/context/Session';
import Saved from '@/components/profile/components/saved';
import Created from '@/components/profile/created';
import ListPosts from '../reusable/posts';

export default function Profile() {
  const Router = useRouter()
  const { user } = useSessionContext()

  const handleNavigation = (tab: React.Key) => {
    const path = window.location.pathname
    Router.push(`${path}#${tab}`)
  }

  return (
    <>
      <div className='pt-10 flex flex-col items-center'>
        <UserCard isProfile={true} user_id={user?.id || ''} />
        <span className='p-2'>0 following</span>
        <div className='space-x-2 p-2'>
          <Button variant="faded">
            Share
          </Button>
          <Button variant="faded">
            Edit Profile
          </Button>
        </div>
      </div>
      <div className='flex flex-col w-full items-center mt-10'>
        <Tabs variant="underlined" onSelectionChange={(tab: React.Key) => handleNavigation(tab)}>
          <Tab className='w-full' key="_saved" title="Saved" >
            <ListPosts filter="saved"/>
          </Tab>
          <Tab key="_created" title="Created" >
            <Created />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
