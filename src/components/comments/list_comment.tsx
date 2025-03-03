import React from 'react'
import { TruncatedText } from '../ui/truncated-text'
import UserCard from '../post/utils/user'
import { CommentsProps } from '@/types/global';
import SkeletonComments from '../skeleton/comments';

interface ListCommentProps {
    comments: CommentsProps[]
    isLoading: boolean
}

function ListComment(props: ListCommentProps) {

    if (props.isLoading && props.comments.length === 0) {
        return (
            <SkeletonComments count={5} />
        )
    }

    if (props.comments.length === 0) {
        return (
            <div className="flex justify-center items-center h-40">
                No comments yet
            </div>
        )
    }
    return (
        <div className="mt-10">
            {props.comments?.map((comment) => (
                <div key={comment.id} className="flex flex-col border-y py-6">
                    <UserCard user_id={comment.user_id} />
                    <div className='flex flex-col gap-2 mt-4'>
                        <TruncatedText charLimit={150} content={comment?.content} />
                        <p className="text-sm text-gray-500">
                            {Math.floor((Date.now() - new Date(comment.created_at!).getTime()) / (1000 * 60 * 60 * 24))} days ago
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListComment
