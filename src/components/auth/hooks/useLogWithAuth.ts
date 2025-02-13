import { DataForm } from "@/types/global";
import useSWRMutation from "swr/mutation";

async function loginFetcher(url: string, { arg }: { arg: DataForm }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await response.json();
  if (!response.ok) {
    return { message: data?.message, status: response.status };
  }

  return { data, status: 200 };
}

function useLogWithAuth() {
  const { trigger, data, isMutating } = useSWRMutation(
    "/api/auth/login",
    loginFetcher
  );
  return { logWithAuth: trigger, data, isLoading: isMutating };
}

export default useLogWithAuth;
