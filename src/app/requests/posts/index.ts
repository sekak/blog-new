import { createClient } from "@/utils/supabase/server";

export async function CreatePost() {
    const supabase =  createClient();
    const { data, error } = await supabase.from("posts").insert([
        {
        title: "My first post",
        content: "Hello world!",
        },
    ]);
    if (error) {
        throw new Error(error.message);
    }
    return data;

}
