import { Post } from "@/types/global";
import useSWRMutation from "swr/mutation";

export default function useGetPostById() {
  const fetcher = async (url: string, {arg}:{arg:number}): Promise<Post> => {
    try {
      const response = await fetch(`${url}?post_id=${arg}`);
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/post",
    fetcher
  );
  return { getPostById: trigger, data, error, isLoading: isMutating };
}
