import { Clock, Loader2 } from "lucide-react";
import { CommentsProps } from "@/types/global";
import UserCard from "../post/utils/user";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Hint from "../ui/hint";
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
    <div className="space-y-4">
      {props.comments?.map((comment) => (
        <Card key={comment.id} className="bg-background">
          <CardHeader className="pb-2">
            <div className="flex justify-between w-full items-center space-x-3">
              <UserCard user_id={comment?.user_id} />
              <Hint content={formatDate(comment?.created_at)} placement="top"><Clock className="text-sm text-gray-600 cursor-pointer" /></Hint>
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
