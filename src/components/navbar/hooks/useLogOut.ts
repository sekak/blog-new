import useSWRMutation from "swr/mutation";
import { fetcher } from "@/utils/utils";

export function useLogOut() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/auth/logout",
    fetcher
  );

  const logout = async () => {
    try {
      await trigger(); // Calls the logout API
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to log out");
      } else {
        throw new Error("Failed to log out");
      }
    }
  };

  return { logout, isLoading: isMutating, error, data };
}
