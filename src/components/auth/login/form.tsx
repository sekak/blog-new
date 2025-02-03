import React, { useEffect } from 'react'
import { Form, Input, Select, SelectItem, Checkbox, Button } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/svg/eyeSlashFilled";
import useLogWithAuth from '../hooks/useLogWithAuth';
import { toast } from 'react-toastify';
import Link from 'next/link';
import FormAuth from '../form';


export default function FormLogin() {
    const [password, setPassword] = React.useState("");


    const { logWithAuth, data, isLoading, } = useLogWithAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget));
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
