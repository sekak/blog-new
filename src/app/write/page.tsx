import * as Form from "@radix-ui/react-form";
import { Send } from "lucide-react";

export default function page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="border rounded-lg flex flex-col gap-10 p-6">
        <div>
          <h1 className="font-semibold text-xl">Create a New Post</h1>
          <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
        </div>

        <Form.Root className="flex flex-col gap-6">
          <Form.Field name="title" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Title</Form.Label>
            <Form.Control type="text" placeholder="Enter your post title" className="border bg-transparent text-sm p-[10px] rounded-lg"/>
            <Form.Message match="valueMissing">
              Please enter your title
            </Form.Message>
          </Form.Field>
          <Form.Field name="coverImage" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Cover Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/image.ipg"
              className="border bg-transparent text-sm p-[10px] rounded-lg"
            />
            <Form.Message match="valueMissing">
              Please enter your cover image
            </Form.Message>
          </Form.Field>
          <Form.Field name="content" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Content</Form.Label>
            <textarea className="border bg-transparent text-sm p-[10px] rounded-lg h-64" placeholder="Write your content here..."/>
            <Form.Message match="valueMissing">
              Please enter your content
            </Form.Message>
          </Form.Field>
          <Form.Submit className="flex text-sm justify-center items-center p-3 rounded-lg gap-2 bg-black dark:bg-white dark:text-black text-white">
            <Send className="h-4 w-4" />
            Publish Post
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
