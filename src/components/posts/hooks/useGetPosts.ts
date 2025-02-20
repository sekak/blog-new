import useSWR from "swr";
import { PostResponse } from "@/types/global";

const fetcher = async (url: string): Promise<PostResponse> => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch posts");
  }

  return data;
};

export function useGetPosts(index?: number) {
  const { data, error, isLoading } = useSWR(`/api/posts?index=${index}`, fetcher);

  return { data, error, isLoading };
}
