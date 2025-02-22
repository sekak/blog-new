import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = 12;
   const start = limit * (page - 1);

  try {
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("save_posts")
      .select("*")
      .eq("user_id", id)
      .range(start, limit + start - 1).limit(limit)
      .order("saved_at", { ascending: false });
      
    if (error)
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    
    if(data.length === 0)
      return NextResponse.json({ data, empty: true, success: true }, { status: 200 });

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { message: error_message, success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { id, post_id, post } = await req.json();
  try {
    if (!id || !post_id) {
      return NextResponse.json(
        { message: "User ID and Post ID are required", success: false },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.from("save_posts").insert([
      { user_id: id, post_id, post },
    ]);
    if (error)
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { message: error_message, success: false },
      { status: 500 }
    );
  }

}
