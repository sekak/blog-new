import { createClient } from "@/utils/supabase/server";
import { ZodSchemaLogin } from "@/utils/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {

    const {data, success} = ZodSchemaLogin.safeParse(await req.json());

    if (!success) {
      return NextResponse.json({ message: "invalid inputs" }, { status: 400 });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful!" }, { status: 200 });
  } catch (err) {
    console.error("Login Error:", err);

    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
