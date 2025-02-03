import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const { email, password, name} = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email field is required!" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password field is required!" },
        { status: 400 }
      );
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login Error:", err);

    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}





