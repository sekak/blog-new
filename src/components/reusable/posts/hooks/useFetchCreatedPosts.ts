import { PostResponse } from "@/types/global";
import useSWRMutation from "swr/mutation";

interface Props {
  page: number;
  user_id: string;
  type: string;
}

interface FetchError extends Error {
    info: {
      error?: string;
      status?: number;
      message?: string;
      empty?: boolean
      success?: boolean
    };
    status: number;
}

export default function useFetchCreatedPosts() {
  const fetcher = async ( url: string, { arg }: { arg: Props }): Promise<PostResponse> => {
    
    const response = await fetch(`${url}?page=${arg.page}&user_id=${arg.user_id}&type=${arg.type}`);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error("Something went wrong! Reload page.") as FetchError;
      error.info = data;
      error.status = data.status;
      throw error;
    }

    return data;
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/posts",
    fetcher,{
      revalidate:false
    }
  );

  return { getCreatedPosts: trigger, data, error, isLoading: isMutating };
}
