import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const postId = url.searchParams.get("post_id");

        if (!postId) {
            return NextResponse.json({ error: "Missing post_id parameter" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data, error } = await supabase.from("posts").select("*").eq("id", postId);

        if (error) {
            console.error("Error fetching post:", error.message);
            return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(data[0], { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}