import { Loader2 } from "lucide-react";
import { CommentsProps } from "@/types/global";
import UserCard from "@/components/post/utils/user";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { formatDate } from "@/utils/utils";

interface PropsComment{
  comments: CommentsProps[];
  isLoading: boolean;
}

const CommentList = (props:PropsComment) => {

  if (props.isLoading) return <div>
    <Loader2 className="animate-spin h-8 w-8" />
  </div>
  if (props.comments && props.comments.length === 0)
    return <p>Not found any comments!</p>

  return (
    <div className="space-y-6 mt-10">
      {props.comments?.map((comment) => (
        <Card key={comment.id} className="bg-background border-b  rounded-none shadow-none">
          <CardHeader className="pb-2"> 
            <div className="flex justify-between w-full items-start space-x-3">
              <UserCard user_id={comment?.user_id} />
              <span className="min-w-max flex items-end text-gray-400 text-[13px]">{formatDate(comment?.created_at)}</span>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-sm">{comment.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
