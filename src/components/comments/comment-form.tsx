import React from "react";
import { Send } from "lucide-react";
import { Button, Form, Textarea } from "@heroui/react";

interface props {
  handleAddComment: (content: string) => void;
  loading: boolean
}

export default function CommentForm(props: props) {
  const [comment, setComment] = React.useState<string>("");
  const handleClickSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment) {
      props.handleAddComment(comment);
      setComment("");
    }
  };

  return (
    <div className="space-y-3">
      <Form onSubmit={handleClickSendComment}
        validationBehavior="native"
        className="w-full"
      >
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold">Comments</h2>
          <Textarea
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing)
                  return "Please enter comment!";
            }}
            isRequired
            variant="bordered"
            radius="sm"
          />
        </div>
        <Button type="submit" color="primary" radius="sm" isLoading={props.loading}>
          <Send size={20} className={`${props.loading && 'hidden'}`}/>
          Post Comment
        </Button>
      </Form>
    </div>
  );
}
