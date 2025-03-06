import { Post } from "@/types/global";
import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }: { arg: Post }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }
  return response.json();
};

const useCreatePost = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/post",
    fetcher
  );

  return { createPost:(arg: Post) => trigger(arg), data, error: error as Error | null, isLoading: isMutating };
};

export default useCreatePost;
