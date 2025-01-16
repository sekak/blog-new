'use client'
import { Button } from '@radix-ui/themes'
import { BookOpen, Home, LogIn, LogOut, Pen, UserPlus2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import ModeToggle from './mode-toggle'
import { createClient } from '@/utils/supabase/client'
import { logout } from '@/app/api/auth/action'
import ErrorMessage from './errorMessage'

function Navbar() {

  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      setUser(session?.user)
    }
    if (!session) {
      setUser(null)
    }
  })

  return (
    <nav className="border-b">
      <ErrorMessage context='login'/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between">
          <Link href="/" className="flex items-center text-xl font-bold gap-2">
            <BookOpen />
            Med Blog
          </Link>
          <div className="flex items-center space-x-10">
            {user && (
              <>
                <Link href="/">
                  <Button
                    size={"4"}
                    variant="ghost"
                    color="gray"
                    className="btn-nav p-3"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link href="/write">
                  <Button
                    size={"4"}
                    variant="ghost"
                    color="gray"
                    className="btn-nav p-3"
                  >
                    <Pen className="h-4 w-4" />
                    Write
                  </Button>
                </Link>
                <Link href='/'>
                  <Button
                    onClick={logout}
                    size={"4"}
                    variant="ghost"
                    color="gray"
                    className="btn-nav p-3"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link href="/login">
                  <Button
                    size={"4"}
                    variant="ghost"
                    color="gray"
                    className="btn-nav p-3"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size={"4"}
                    variant="ghost"
                    color="gray"
                    className="btn-nav p-3"
                  >
                    <UserPlus2 className="h-4 w-4" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
