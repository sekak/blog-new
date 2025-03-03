import useSWRMutation from "swr/mutation";

interface SavePostProps {
    post_id: string;
    user_id: string;
    post: {
        title: string;
        image: string;
    };

}

export const useSavePost = () => {

    const fetcher = async (key: string, { arg }: { arg: SavePostProps }) => {
        try {
            const response = await fetch(key, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: arg.user_id,
                    post_id: arg.post_id,
                    post: arg.post
                })
            });
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }

    const { trigger, data, error, isMutating } = useSWRMutation(
        "/api/saved_posts",
        fetcher
    )

    return { savePost: trigger, data, error, isLoading: isMutating }
}