import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { LoaderIcon, Send } from "lucide-react";

interface props {
  handleAddComment: (content: string) => void;
}

export default function CommentForm(props: props) {
  const [comment, setComment] = React.useState<string>("");
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const textareRef = React.useRef<HTMLTextAreaElement>(null);
  const handleClickSendComment = async () => {
    setIsSend(true);
    if (comment) {
      await props.handleAddComment(comment);
      setComment("");
      setError('');
    }
    else{
      textareRef.current?.focus();
      setError('Please write a comment');
    }
    setIsSend(false);
  };
  return (
    <div className="space-y-3">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <Textarea
          ref={textareRef}
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span className="text-red-600 text-[12px]">{error}</span>
      </div>
      <Button onClick={handleClickSendComment} className={`${error && '!border-red-600'}`}>
        {isSend ? (
          <>
            <LoaderIcon size={20} />
            Posting...
          </>
        ) : (
          <>
            <Send size={20} />
             Post Comment
          </>
        )}
      </Button>
    </div>
  );
}
