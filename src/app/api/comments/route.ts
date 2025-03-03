import { createClient } from "@/utils/supabase/server";
import { ZodSchemaComment } from "@/utils/zod";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const post_id = parseInt(url.searchParams.get("post_id") ?? "0");

    if (!post_id) {
      return NextResponse.json(
        { error: "Missing comment_id parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching post:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {

  try {
    const { data: post, success } = ZodSchemaComment.safeParse(await req.json());

    if (!success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .insert(post)
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching post:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
