import useSWRMutation from "swr/mutation";

function useLogWithProvider() {
  const fetcher = async (key: string, { arg }: { arg: string }) => {
    const res = await fetch(`${key}/${arg}?provider=${arg}`);
    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url; 
    }
    return data;
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/auth/",
    fetcher
  );

  return { logWithProvider: (provider: string) => trigger(provider), data, error, isLoading: isMutating };
}

export default useLogWithProvider;
