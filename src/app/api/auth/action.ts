'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { DataForm } from '@/types/global'

export async function login(data:DataForm) {
  const supabase = await createClient()
  const form = {
    email: data.email,
    password: data.password
  }

  const { error } = await supabase.auth.signInWithPassword(form)
  if (error)
    throw new Error(error.code)
  
  revalidatePath('/', 'layout')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}
