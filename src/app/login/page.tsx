'use client'
import * as Form from '@radix-ui/react-form';
import { Button } from '@radix-ui/themes';
import { login } from '../api/auth/action';
import { Github, Loader, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { DataForm } from '@/types/global';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function Page() {
  const [form, setForm] = useState<DataForm>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState({
    name: '',
    state: false
  });

  const handleClickLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting || loading.state) return;
    setIsSubmitting(true);
    try {
      await login(form);
      toast.success('Login successful!', { hideProgressBar: true });
      window.location.reload()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.error(errorMessage || 'An unexpected error occurred.', { hideProgressBar: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithGitHub = async () => {
    if (loading.state) return;
    setLoading({ name: 'github', state: true })
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    })
    if (error)
      toast.error(error.message, { hideProgressBar: true })
    else
    redirect('/')
  }
  
  const signInWithGoogle = async () => {
    if (loading.state) return;
    setLoading({ name: 'google', state: true })
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    })
    if (error)
      toast.error(error.message, { hideProgressBar: true })
  }
  

  return <div className="relative mx-auto max-w-md py-28 px-3">
    <div className="border rounded-lg flex flex-col p-8 relative overflow-hidden">
      <div className="mb-5">
        <h1 className="font-bold text-2xl mb-1">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password to access your account
        </p>
      </div>
      <div className="w-full flex justify-center itemspn-center gap-4">
        <Button
          variant="surface"
          className={`flex-1 text-foreground ${loading.state && 'cursor-not-allowed'}`}
          color="gray"
          size={"3"}
          onClick={signInWithGitHub}
        >
          {loading.name === 'github' && loading.state ? <Loader className='h-4 w-4 animate-spin' /> : <Github className="h-4 w-4" />}
          {loading.name === 'github' && loading.state ? 'SignIn...' : 'GitHub'}
        </Button>
        <Button
          className={`flex-1 text-foreground ${loading.state && 'cursor-not-allowed'}`}
          variant="surface"
          color="gray"
          size={"3"}
          onClick={signInWithGoogle}
        >
          {loading.name === 'google' && loading.state ? <Loader className='h-4 w-4 animate-spin' /> : <LogIn className="h-4 w-4" />}
          {loading.name === 'google' && loading.state ? 'SignIn...' : 'Google'}
        </Button>
      </div>
      <div className="relative max-h-4 flex items-center justify-center my-5">
        <div className="border-b-[.5px] w-full z-0 absolute inset " />
        <span className="text-muted-foreground bg-background z-10 text-[12px] text-center px-2">
          OR SIGN UP WITH EMAIL
        </span>
      </div>
      <Form.Root className="flex flex-col gap-6" onSubmit={handleClickLogin} name="fileinfo" id="fileinfo">
        <Form.Field name="fullname" className="flex flex-col gap-3">
          <Form.Label className="text-sm">Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            className="border bg-transparent text-sm p-[10px] rounded-lg"
          />
          <Form.Message match="valueMissing">
            Please enter your full name
          </Form.Message>
        </Form.Field>
        <Form.Field name="email" className="flex flex-col gap-3">
          <Form.Label className="text-sm">Email</Form.Label>
          <Form.Control
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
            type="text"
            placeholder="med@example.com"
            className="border bg-transparent text-sm p-[10px] rounded-lg"
          />
          <Form.Message match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message match="typeMismatch">
            Please enter a valid email
          </Form.Message>
        </Form.Field>
        <Form.Field name="coverImage" className="flex flex-col gap-3">
          <Form.Label className="text-sm">Password</Form.Label>
          <Form.Control
            onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}

            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="border bg-transparent text-sm p-[10px] rounded-lg"
          />
          <Form.Message match="valueMissing">
            Please enter your password
          </Form.Message>
        </Form.Field>
        <Form.Submit formAction={handleClickLogin} className={`flex text-sm justify-center items-center p-3 rounded-lg gap-2 bg-black dark:bg-white dark:text-black text-white ${loading.state && 'opacity-10 cursor-not-allowed'}`}>
          {!isSubmitting ?
            <>
              <LogIn className="h-4 w-4" />
              Login
            </>
            :
            <Loader className='h-4 w-4 animate-spin' />
          }
        </Form.Submit>
      </Form.Root>
      <div className="mt-4 flex justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{"  "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
}