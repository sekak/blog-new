import { CommentsProps } from "@/types/global";
import useSWRMutation from "swr/mutation";

export default function useGetComments() {

    const fetcher = async (url: string, { arg }: { arg: number }): Promise<CommentsProps[]> => {
        try {
            const response = await fetch(`${url}?post_id=${arg}`);
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const { trigger, data, error, isMutating } = useSWRMutation(
        "/api/comments",
        fetcher
    );

    return { getComments: trigger, data, error, isLoading: isMutating };
}