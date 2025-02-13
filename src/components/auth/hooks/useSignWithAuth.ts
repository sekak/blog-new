import { DataForm } from "@/types/global";
import useSWRMutation from "swr/mutation";

async function signupFetcher(url: string, { arg }: { arg: DataForm }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg), 
  });
  const data = await response.json();
  if (!response.ok) {
    return {message: data?.message, status: response.status}
  }

  return {data, status: 200}
}

function useSignUpWithAuth() {
  const { trigger, data, isMutating } = useSWRMutation(
    "/api/auth/signup",
    signupFetcher
  );
  return { signUpWithAuth: trigger, data, isLoading: isMutating };
}

export default useSignUpWithAuth;
