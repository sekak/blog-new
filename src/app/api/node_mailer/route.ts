import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const supabse = await createClient();

    const { data: user } = await supabse.auth.getUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized!", success: false });

    const {name, email, description } = await req.json();
    if (name === "" || email === "" || description === "")
      return NextResponse.json({ message: "Invalid input", success: false });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      }
    });
    try {
      const info = await transporter.sendMail({
        from: '"Med Blog 👻" <ahmadesekak@gmail.com>',
        to: email,
        subject: "Contact Us",
        text: description, 
        html: `<b>${description}</b>`,
      });
      console.log("nodemailer", info.messageId);
      return NextResponse.json({ message: "success", success: true });
    } catch (err) {
      console.log("nodemailer", err);
      return NextResponse.json({ message: "error", success: false });
    }
  }
}
