import { Post } from "@/types/global";
import useSWRMutation from "swr/mutation";

interface Props {
  post_id: string
  user_id: string
}

export default function useGetPostById() {
  const fetcher = async (url: string, {arg}:{arg:Props}): Promise<Post> => {
    try {
      const response = await fetch(`${url}?post_id=${arg.post_id}&user_id=${arg.user_id}`);
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
