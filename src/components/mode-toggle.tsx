"use client";
import { Button } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleClick = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <div className="mx-4">

      <Button
        onClick={handleClick}
        size={"3"}
        variant="ghost"
        color="gray"
        className="p-2 rounded-full"
      >
        <Sun className="dark:flex hidden h-5 w-5" />
        <Moon className="dark:hidden h-5 w-5" />
      </Button>
    </div>
  );
}
