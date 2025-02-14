'use client'
import React, { useEffect } from "react";
import { Button, Form, Input, Textarea } from "@heroui/react";
import useCreatePost from "@/components/write/hooks/useCreatePost";
import { Send } from "lucide-react";
import { useSessionContext } from "@/context/Session";
import { toast } from "react-toastify";
import { Post } from "@/types/global";

export default function Write() {
  const data_user = useSessionContext()
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const { createPost, isLoading, data, error } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!data_user?.user) return;
    let formData = Object.fromEntries(new FormData(e.currentTarget));
    formData = { ...formData, user_id: data_user?.user?.id }

    await createPost(formData as unknown as Post)
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message ?? "Something went wrong!");
    } else if (data) {
      toast.success("Post created successfully!");
      formRef.current?.reset();
    }
  }, [error, data])

  return (
    <Form className="flex flex-col gap-6" onSubmit={handleSubmit} ref={formRef}
      validationBehavior="native"
    >
      <Input
        isRequired
        radius="sm"
        variant="bordered"
        labelPlacement="outside"
        label="Title"
        placeholder="Enter your post title"
        type="text"
        name="title"
        errorMessage="Please enter your title"
      />
      <Input
        isRequired
        minLength={60}
        radius="sm"
        variant="bordered"
        labelPlacement="outside"
        label="Cover Image URL"
        placeholder="https://example.com/image.jpg"
        type="text"
        name="image"
        errorMessage={({ validationDetails }) => {
          if (validationDetails.tooShort)
            return "Minimum characters is 60"
          return "Please enter your cover image"
        }}
      />
      <Textarea
        isRequired
        minLength={100}
        radius="sm"
        variant="bordered"
        labelPlacement="outside"
        label="Content"
        placeholder="Write your content here..."
        name="description"
        errorMessage={({ validationDetails }) => {
          if (validationDetails.tooShort)
            return "Minimum characters is 100"
          return "Please enter your content"
        }}
        disableAnimation
        disableAutosize
        classNames={{
          input: "resize-y min-h-[180px]",
        }}
        description="Enter a concise description of your post."
      />
      <Button className="w-full" type="submit" color="primary" radius="sm" isLoading={isLoading}>
        {!isLoading && <Send size={16} />}
        <span>Create Post</span>
      </Button>
    </Form>
  )
}
