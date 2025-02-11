import { Loader2 } from "lucide-react";
import { CommentsProps } from "@/types/global";
import UserCard from "../posts/utils/user";
import { Card, CardBody, CardHeader } from "@heroui/react";

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
            <div className="flex items-center space-x-3">
              <UserCard user_id={comment?.user_id} />
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
