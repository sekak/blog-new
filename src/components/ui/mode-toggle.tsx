"use client";
import { Button } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  isLogged?: boolean;
}

export default function ModeToggle(props: Props) {
  const { theme, setTheme } = useTheme();
  const handleClick = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  
  return (
      <Button
        onClick={handleClick}
        size={"3"}
        variant={!props.isLogged ? "ghost" : undefined}
        color={!props.isLogged ? "gray" : undefined}
        className={`p-2 rounded-full ${props.isLogged && 'w-full flex justify-start'}`}
      >
        <Sun className="dark:flex hidden h-5 w-5" />
        <Moon className="dark:hidden h-5 w-5" />
        {props.isLogged && <p className="ml-2">Toggle Mode</p>}
      </Button>
  );
}
