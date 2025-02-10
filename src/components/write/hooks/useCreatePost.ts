import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }: { arg: any }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API request failed");
  }
  return response.json();
};

const useCreatePost = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/write",
    fetcher
  );

  return { createPost: trigger, data, error: error as Error | null, isLoading: isMutating };
};

export default useCreatePost;
