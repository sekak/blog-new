import { createClient } from "@/utils/supabase/server";
import { ZodSchemaMail } from "@/utils/zod";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const supabse = await createClient();

    const { data: user } = await supabse.auth.getUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized!", success: false });

    const { data, success } = ZodSchemaMail.safeParse(await req.json());

    if (!success)
      return NextResponse.json({ message: "Invalid inputs", success: false }, { status: 400 });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    try {
      const info = await transporter.sendMail({
        from: '"Med Blog 👻" <ahmadesekak@gmail.com>',
        to: data.email,
        subject: "Contact Us",
        text: data.description,
        html: `<b>${data.description}</b>`,
      });

      return NextResponse.json({ message: "Email sent", success: true }, { status: 200 });
    } catch (err) {
      console.log("nodemailer", err);
      return NextResponse.json({ message: "Failed to send email", success: false }, { status: 500 });
    }
  }
}
