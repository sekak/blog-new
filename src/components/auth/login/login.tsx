'use client'
import React, { useEffect } from 'react'
import useLogWithAuth from '@/components/auth/hooks/useLogWithAuth';
import { toast } from 'react-toastify';
import FormAuth from '@/components/auth/form';


export default function Login() {
    const [password, setPassword] = React.useState("");
    const { logWithAuth, data, isLoading, } = useLogWithAuth()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as { email: string, password: string };
        if (formData)
            await logWithAuth(formData)
    }

    useEffect(() => {
        if (data?.status !== 200)
            toast.error(data?.message)
        else {
            toast.success(data?.message)
            window.location.reload()
        }
    }, [data])

    return (
        <FormAuth onSubmit={onSubmit} isLoading={isLoading} password={password} setPassword={setPassword} isLogin={true} />
    )
}
