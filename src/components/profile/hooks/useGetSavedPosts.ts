import useSWRMutation from "swr/mutation";

export default function useFetchSavedPosts() {
  const fetcher = async (url: string, { arg }: { arg: {id: string, page: number} }) => {
    try {
      const response = await fetch(`${url}?id=${arg.id}&page=${arg.page}`);
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/saved_posts",
    fetcher
  );
  return { getSavedPosts: trigger, data, error, isLoading: isMutating };
}