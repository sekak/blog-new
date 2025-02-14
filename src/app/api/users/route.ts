import { createClient } from "@/utils/supabase/server";
import { adminAuthClient } from "@/utils/supabase/server_admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const data = {
        id: user?.user?.id,
        email: user?.user?.email,
        full_name: user?.user?.user_metadata?.full_name,
        avatar_url: user?.user?.user_metadata?.avatar_url,
        picture: user?.user?.user_metadata?.picture,
        name: user?.user?.user_metadata?.name,
        created_at: user?.user?.created_at,
      };
      return NextResponse.json(data, { status: 200 });
    }

    const { data: user, error } = await adminAuthClient.getUserById(userId);

    if (error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
      id: user?.user?.id,
      email: user?.user?.email,
      full_name: user?.user?.user_metadata?.full_name,
      avatar_url: user?.user?.user_metadata?.avatar_url,
      picture: user?.user?.user_metadata?.picture,
      name: user?.user?.user_metadata?.name,
      created_at: user?.user?.created_at,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
