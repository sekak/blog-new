import { redirect } from "next/navigation";
import useSWRMutation from "swr/mutation";

function useLogWithProvider() {
  const fetcher = async (key: string, { arg }: { arg: string }) => {
    console.log("`${key}/${arg}?provider=${arg}`", `${key}/${arg}?provider=${arg}`);
    const res = await fetch(`${key}/${arg}?provider=${arg}`);
    const data = await res.json();                    
    if(res.ok)
      redirect(data.url);

    return data;
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/auth/",
    fetcher
  );

  return { logWithProvider: (provider: string) => trigger(provider), data, error, isLoading: isMutating };
}

export default useLogWithProvider;
