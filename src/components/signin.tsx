"use client";
import { createClient } from '@/utils/supabase/client'
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";
import { Github, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingAnimation from "./loadinganimation";
import { getError } from '@/utils/errorCache';

export default function FormLogin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const supabase = createClient();

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) console.error('Error:', error.message);
  };



  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        return router.push("/");
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    // const fullname = e.target.fullname.value;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setUser(user);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message); // tostify
      } else {
        console.error("An unknown error occurred");
      }
    }
  };



  if (loading) return <LoadingAnimation />;

  return (
    <div className="relative mx-auto max-w-md py-28 px-3">
      <div className="border rounded-lg flex flex-col p-8 relative overflow-hidden">
        <div className="mb-5">
          <h1 className="font-bold text-2xl mb-1">Login</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="w-full flex justify-center items-center gap-4">
          <Button
            variant="surface"
            className="flex-1 text-foreground"
            color="gray"
            size={"3"}
            onClick={signInWithGitHub}
          >
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button
            className="flex-1 text-foreground"
            variant="surface"
            color="gray"
            size={"3"}
          >
            <LogIn className="h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative max-h-4 flex items-center justify-center my-5">
          <div className="border-b-[.5px] w-full z-0 absolute inset " />
          <span className="text-muted-foreground bg-background z-10 text-[12px] text-center px-2">
            OR SIGN UP WITH EMAIL
          </span>
        </div>
        <Form.Root className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Form.Field name="fullname" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              className="border bg-transparent text-sm p-[10px] rounded-lg"
            />
            <Form.Message match="valueMissing">
              Please enter your full name
            </Form.Message>
          </Form.Field>
          <Form.Field name="email" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="med@example.com"
              className="border bg-transparent text-sm p-[10px] rounded-lg"
            />
            <Form.Message match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message match="typeMismatch">
              Please enter a valid email
            </Form.Message>
          </Form.Field>
          <Form.Field name="coverImage" className="flex flex-col gap-3">
            <Form.Label className="text-sm">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="border bg-transparent text-sm p-[10px] rounded-lg"
            />
            <Form.Message match="valueMissing">
              Please enter your password
            </Form.Message>
          </Form.Field>
          <Form.Submit className="flex text-sm justify-center items-center p-3 rounded-lg gap-2 bg-black dark:bg-white dark:text-black text-white">
            <LogIn className="h-4 w-4" />
            Login
          </Form.Submit>
        </Form.Root>
        <div className="mt-4 flex justify-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{"  "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
