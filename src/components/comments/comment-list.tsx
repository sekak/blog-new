import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentList= ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={!comment.image ? `https://avatar.vercel.sh/${comment.author}` : comment.image}
                />
                <AvatarFallback>{comment.author}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{comment.author}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
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
