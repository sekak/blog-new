import { createClient } from "@/utils/supabase/server";
import { ZodSchemaPost, ZodSchemaPutPost } from "@/utils/zod";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("post_id");
    const userId = url.searchParams.get("user_id")

    if (!postId) {
      return NextResponse.json(
        { error: "Missing post_id parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single()

    let dataPost = data;
    
    if (data?.saved_by_users.includes(userId))
      dataPost = {...data, save: true}

    if (error) {
      console.error("Error fetching post:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: 500 }
      );
    }

    if (!dataPost || dataPost.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(dataPost, { status: 200 });
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
    const { data, success } = ZodSchemaPost.safeParse(await req.json());

    if (!success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("posts").insert(data);

    if (error) {
      console.error("Error creating post:", error.message);
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Post created successfully!", success: true },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(Request: Request) {
  try {
    const { data: req, success } = ZodSchemaPutPost.safeParse(await Request.json());

    if (!success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", req.post_id)
      .single();

    if (error) {
      console.error("Error fetching post:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: 500 }
      );
    }

    const update_Saved = data.saved_by_users?.includes(req.user_id)
      ? data.saved_by_users.filter((id:string) => id !== req.user_id)
      : [...(data.saved_by_users || []), req.user_id];

    const { error: updateError } = await supabase
      .from("posts")
      .update({ saved_by_users: update_Saved })
      .eq("id", req.post_id);

    if (updateError) {
      console.error("Error updating post:", updateError.message);
      return NextResponse.json(
        { error: "Failed to update post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Post updated successfully!", success: true },
      { status: 200 }
    );

  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
