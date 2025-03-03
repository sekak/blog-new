import { Button, Form, Textarea } from '@heroui/react'
import React, { useEffect } from 'react'
import { usePostComments } from './hooks/usePostComments';
import { CommentsProps } from '@/types/global';

interface Props {
    count: number
    user_id: string
    post_id: string
    setComment: React.Dispatch<React.SetStateAction<CommentsProps | undefined>>
}

export default function FormComment(props: Props) {

    const [comment, setComment] = React.useState<string>('')
    const { data: newComment ,isLoading, postComments } = usePostComments();

    useEffect(() => {
        props.setComment(newComment)
    }, [newComment])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            content: comment,
            author: props.user_id,
            post_id: props.post_id,
            user_id: props.user_id,
            created_at: new Date().toISOString()
        }
        if (comment.trim()) {
            postComments(data)
            setComment('')
        }
    }

    return (
        <div className="space-y-6 mt-10">
            <div className="border-t pt-6 max-w-[300px] mx-auto" />
            <h2 className="text-2xl font-bold">Responses ({props?.count})</h2>
            <Form
                validationBehavior="native"
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
            >
                <Textarea
                    value={comment}
                    name='comment'
                    onChange={(e) => setComment(e.target.value)}
                    errorMessage={({ validationDetails }) =>
                        validationDetails.valueMissing ? 'Please enter a comment!' : ''
                    }
                    isRequired
                    radius="sm"
                    placeholder="Write your comment..."
                    className="w-full"
                />
                <Button
                    type="submit"
                    color="success"
                    isDisabled={!comment.trim()}
                    className="self-end text-white"
                    radius="lg"
                    isLoading={isLoading}
                >
                    Respond
                </Button>
            </Form>
        </div>
    )
}
