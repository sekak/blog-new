'use client'
import React, { useEffect } from 'react'
import FormAuth from '../form'
import useSignUpWithAuth from '../hooks/useSignWithAuth';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const [password, setPassword] = React.useState("");
  const [sendEmail, setSendEmail] = React.useState(false);
  const { signUpWithAuth, data, isLoading, } = useSignUpWithAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as { email: string, password: string };
    if (formData)
      await signUpWithAuth(formData)
  }

  useEffect(() => {
    if (data?.status !== 200)
      toast.error(data?.data?.message)
    else {
      toast.success(data?.data?.message);
      setSendEmail(true)
    }
  }, [data])

  return (
    <div>
      <Modal hideCloseButton={true} backdrop="opaque" isOpen={sendEmail} title="Check your email">
        <ModalContent>
          <ModalHeader className='flex flex-col items-center justify-center space-x-2'><Mail className='w-10 h-10 mb-2' /> <span>Email confirmation</span></ModalHeader>
          <ModalBody className='mb-3'>
            <p className='text-center'>We have sent email to <span className='opacity-25'>ahmedsekak@gmail.com</span> to confirm the validity of our email address.</p>
            <Link href='/login'>
              <Button className='w-full mt-3' variant='bordered'>Go to login</Button>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>

      <FormAuth onSubmit={onSubmit} isLoading={isLoading} password={password} setPassword={setPassword} isLogin={false} />
    </div>
  )
}
