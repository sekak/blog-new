import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const post_id = url.searchParams.get("post_id");

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
      return NextResponse.json(
        { error: "Comments not found" },
        { status: 404 }
      );
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
    const url = new URL(req.url);
    const post_id = url.searchParams.get("post_id");
    const { content, author, created_at, user_id } = await req.json();

    if (!post_id) {
      return NextResponse.json(
        { error: "Missing post_id parameter" },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: "Missing content parameter" },
        { status: 400 }
      );
    }

    if (!author) {
      return NextResponse.json(
        { error: "Missing author parameter" },
        { status: 400 }
      );
    }

    if (!created_at) {
      return NextResponse.json(
        { error: "Missing created_at parameter" },
        { status: 400 }
      );
    }

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert([{ content, author, created_at, post_id, user_id }]);

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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
