import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = new URL(req.url);
  const provider = params.pathname.split("/")[3] as 'github' | 'google';

  if (!provider || !["github", "google"].includes(provider)) {
    return NextResponse.json({ message: "Invalid provider" }, { status: 400 });
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ url: data.url }, { status: 200 }); // Return the redirect URL
}
