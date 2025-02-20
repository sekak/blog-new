import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  
  const params = new URL(req.url).searchParams;
  const limit = parseInt(params.get("count") ?? "3");
  const index = parseInt(params.get("index") ?? "1");
  
  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .limit(limit)
    .range((index - 1) * limit, index * limit - 1);

  if (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } else if (!posts || posts.length === 0) {
    return NextResponse.json(
      { error: "No posts found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ posts, count }, { status: 200 });
}

