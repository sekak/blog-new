import { createClient } from "@/utils/supabase/server";
import { ZodSchemaSignup } from "@/utils/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  try {

    const { data , success } = ZodSchemaSignup.safeParse(await req.json());
    if (!success) {
      return NextResponse.json({ message: "Invalid inputs!" }, { status: 400 });
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (error)
      return NextResponse.json(
        { message: error.code, status: error.status },
        { status: error.status }
      );

    return NextResponse.json(
      { message: "Signup successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Signup: ", err);
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
