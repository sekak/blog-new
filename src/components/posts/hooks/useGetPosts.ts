import { PostResponse } from "@/types/global";
import useSWRMutation from "swr/mutation";

export default function useFetchPosts() {
  const fetcher = async (url: string, {arg}:{arg:number}): Promise<PostResponse> => {
    try {
      const response = await fetch(`${url}?page=${arg}`);
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
