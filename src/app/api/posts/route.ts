import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const params = new URL(req.url).searchParams;
  const page = parseInt(params.get("page") ?? "1");
  const user_id = params.get("user_id");
  const type = params.get("type") ?? "all";
  const limit = 10;
  const start = limit * (page - 1);
  console.log(
    "page",
    page,
    "user_id",
    user_id,
    "type",
    type,
    "limit",
    limit,
    "start",
    start
  )
  try {
    const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .range(start, start + limit - 1)
    .limit(limit)
    .order("created_at", { ascending: false });

    let postsData

    if(type === "saved"){
      postsData = posts?.filter(post=>{
        console.log("saved")
        return post?.saved_by_users?.includes(user_id)
      })
    }else if(type === "all"){
      postsData = posts?.filter(post=>{
        return !post?.saved_by_users?.includes(user_id)
      })
    }

    if (error)
      return NextResponse.json(
        { error: "Internal server error", success: false },
        { status: 500 }
      );

    if (postsData && postsData.length === 0) {
      return NextResponse.json(
        { error: "No posts found", success: true, empty: true },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { posts: postsData, success: true, empty: false },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error)
    const error_message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { message: error_message, success: false },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  const supabase = await createClient();
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .range(start, start + limit - 1)
      .limit(limit)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json(
        { error: "Internal server error", success: false },
        { status: 500 }
      );

    if (posts.length === 0) {
      return NextResponse.json(
        { error: "No posts found", success: true, empty: true },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { posts, success: true, empty: false },
      { status: 200 }
    );
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { message: error_message, success: false },
      { status: 500 }
    );
  }
}