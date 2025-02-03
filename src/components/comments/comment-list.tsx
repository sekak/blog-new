import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CommentsProps } from "@/types/global";
import UserCard from "../posts/content/user";

const CommentList = ({ comments }: { comments: CommentsProps[] }) => {

  if (!comments) return <div>
    <Loader2 className="animate-spin h-8 w-8" />
  </div>
  if (comments && comments.length === 0)
    return <p>Not found any comments!</p>

  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <UserCard user_id={comment?.user_id} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
