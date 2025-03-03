import { CommentsProps } from "@/types/global";
import useSWRMutation from "swr/mutation";

export const usePostComments = () => {
    const sendData = async (url: string, { arg }: { arg: CommentsProps }) => {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg),
        });
        return response.json();
    };

    const { trigger, data, error, isMutating } = useSWRMutation(
        "/api/comments",
        sendData
    );
    return { postComments: trigger, data, error, isLoading: isMutating };
}


