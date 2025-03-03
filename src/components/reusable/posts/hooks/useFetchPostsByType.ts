import { PostResponse } from "@/types/global";
import useSWRMutation from "swr/mutation";

interface PostProps {
  page: number;
  user_id: string;
  type: string;
}

export default function useFetchPostsByType() {
  const fetcher = async (url: string, {arg}:{arg:PostProps}): Promise<PostResponse> => {
    try {
      const response = await fetch(`${url}?page=${arg.page}&user_id=${arg.user_id}&type=${arg.type}`);
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/posts",
    fetcher
  );

  return { getPosts: trigger, data, error, isLoading: isMutating };
}
