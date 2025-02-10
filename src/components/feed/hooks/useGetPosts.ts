import { PostResponse } from "@/types/global";
import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }:{arg:number}): Promise<PostResponse> => {
  if (arg == null) throw new Error("Invalid argument: 'arg' is required");

  const urlWithParams = `${url}?index=${encodeURIComponent(arg)}`;

  const res = await fetch(urlWithParams);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch posts");
  }

  return data;
};

export function useGetPosts() {
  const { trigger, data, error, isMutating } = useSWRMutation<PostResponse, Error>(
    "/api/posts",
    fetcher
  );

  return { getPosts: trigger, data, error, isLoading: isMutating };
}
