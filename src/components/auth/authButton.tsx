"use client";
import { Button } from "@radix-ui/themes";
import { GithubIcon, Loader, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const [loader, setLoader] = useState("");
  const handleClick = (auth: string) => {
    console.log(auth)
    setLoader(auth);
    signIn(auth, { callbackUrl: "/" });
  };
  return (
    <>
      <Button
        variant="surface"
        className="flex-1 text-foreground"
        color="gray"
        size={"3"}
        onClick={() => handleClick("github")}
      >
        {!loader ? (
          <GithubIcon className="h-4 w-4" />
        ) : (
          <Loader className="h-4 w-4 animate-spin-slow" />
        )}
        GitHub
      </Button>
      <Button
        className="flex-1 text-foreground"
        variant="surface"
        color="gray"
        size={"3"}
        onClick={() => handleClick("google")}
      >
        <LogIn className="h-4 w-4" />
        Google
      </Button>
    </>
  );
}
