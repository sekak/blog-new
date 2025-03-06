import useSWRMutation from "swr/mutation";

interface Props {
  post_id: string;
  user_id: string;
}

export const useSaveUnSave = () => {
  const fetcher = async (url: string, { arg }: { arg: Props }) => {
    try {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(arg),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/post",
    fetcher
  );

  return {
    saveUnsave: trigger,
    data,
    error,
    isLoading: isMutating,
  };
};
