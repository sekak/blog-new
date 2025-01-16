import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-[100vh]">
      <Loader className="h-[30px] w-[30px] animate-spin-slow" />
      <span className="text-xl font-bold leading-7">Med Blog</span>
    </div>
  );
}
