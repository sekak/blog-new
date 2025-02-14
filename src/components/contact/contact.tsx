'use client'
import { Alert, Button, Form, Input, Textarea } from '@heroui/react'
import { Send } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useSendEmail } from '@/components/contact/hooks/useSendEmail'
import { PropsForm } from '@/types/global'

export default function Contact() {

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { sendEmail } = useSendEmail()
    const ref = useRef<HTMLFormElement>(null)

    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        setIsLoading(true)
        const data = await sendEmail(formData as unknown as PropsForm)
        if (data.success) {
            setIsVisible(true)
            if(ref.current)
                ref.current.reset()
        }
        setIsLoading(false)
    }

    return (
        <Form className="flex flex-col gap-6"
            validationBehavior="native"
            onSubmit={handleSendEmail}
            ref={ref}
        >
            <Input
                isRequired
                labelPlacement='outside'
                placeholder='Enter your name...'
                radius="sm"
                variant="bordered"
                label="Name"
                type="text"
                name="name"
                errorMessage="Please enter your name"
            />
            <Input
                isRequired
                labelPlacement='outside'
                placeholder='Enter your email'
                minLength={10}
                radius="sm"
                variant="bordered"
                label="Email"
                type="email"
                name="email"
            />
            <Textarea
                isRequired
                labelPlacement='outside'
                placeholder='Enter your description...'
                minLength={10}
                radius="sm"
                variant="bordered"
                label="Content"
                name="description"
                disableAnimation
                disableAutosize
                classNames={{
                    input: "resize-y min-h-[180px]",
                }}
            />
            <Button className="w-full" type="submit" color="primary" radius="sm" isLoading={isLoading}>
                {!isLoading && <Send size={16} />}
                <span>Send Message</span>
            </Button>
            {isVisible && (
                <Alert
                    hideIcon
                    color="success"
                    title="Message sent. Thank you for contacting us!"
                    variant="faded"
                    onClose={() => setIsVisible(false)}
                />
            )}
        </Form>
    )
}
