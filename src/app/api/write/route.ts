import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { ApiError, handleApiError } from "@/utils/errorHandler";
import { PropsError } from "@/types/global";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const post = await req.json();

    if(post.title === '')
      throw new ApiError(400, "The title filed is required");
    if(post.content === '' || post.content?.length <= 100)
      throw new ApiError(400, "The content filed is required and accept 100 charactere at least.");
    if(post.image === '')
      throw new ApiError(400, "The image filed is required and accept 60 charactere at least.");

    const { error } = await supabase.from("posts").insert([post]);

    if (error) throw new ApiError(500, error.message);

    return NextResponse.json(
      { message: "Post created successfully!", success: true},
      { status: 201 }
    );
  } catch (err) {
    console.log("Api error:", err);
    return handleApiError(err as Error | PropsError);
  }
}
