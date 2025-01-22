'use client'
import { createClient } from "@/utils/supabase/client";
import * as Form from "@radix-ui/react-form";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const supabase = createClient();
  const [user_id, setUserId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);  // Reference f or form to reset it
  console.log(formRef.current);
  useEffect(() => {
    // Check if user is authenticated
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null); // Store user id once fetched
    };
    fetchUser();
  }, [supabase]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const title = form.get('title') as string;
    const image = form.get('image') as string;
    const description = form.get('description') as string;

    // Check if all fields are filled out
    if (!title || !image || !description || !user_id) {
      toast.error('Please fill out all fields',{ hideProgressBar: true });
      return;
    }

    const post = { title, image, description };
    
    try {
      const { data, error } = await supabase.from('posts').insert([
        {
          title: post.title,
          image: post.image,
          description: post.description,
          user_id: user_id
        }
      ]).select()
      
      if (error) {
        toast.error('Error creating post: ' + error.message);
        return;
      }
      toast.success('Post created successfully');
      if(formRef.current) formRef.current.reset(); // Reset form
    } catch (error: any) {
      toast.error('Unexpected error: ' + error.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">

      <div className="border rounded-lg flex flex-col gap-10 p-6">
        <div>
          <h1 className="font-semibold text-xl">Create a New Post</h1>
          <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
        </div>

        <Form.Root className="flex flex-col gap-6" onSubmit={handleSubmit} ref={formRef}>
          <Form.Field name="title" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Title</Form.Label>
            <Form.Control type="text" placeholder="Enter your post title" className="border bg-transparent text-sm p-[10px] rounded-lg" />
            <Form.Message match="valueMissing">
              Please enter your title
            </Form.Message>
          </Form.Field>
          <Form.Field name="image" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Cover Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/image.jpg"
              className="border bg-transparent text-sm p-[10px] rounded-lg"
            />
            <Form.Message match="valueMissing">
              Please enter your cover image
            </Form.Message>
          </Form.Field>
          <Form.Field name="description" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Content</Form.Label>
            <textarea name="description" className="border bg-transparent text-sm p-[10px] rounded-lg h-64" placeholder="Write your content here..." />
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
