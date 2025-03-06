"use client";

import { Heart } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { useSaveUnSave } from "./hooks/useSaveUnSave";
import { useSessionContext } from "@/context/Session";

interface SaveIconProps {
  isSaved?: boolean;
  className?: string;
  onClick?: () => void;
  fill?: string;
  color?: string;
  post_id: string;
}

export default function SaveIcon({
  isSaved = false,
  className = "",
  onClick,
  fill = "red",
  color = "currentColor",
  post_id,
}: SaveIconProps) {
  const [saved, setSaved] = useState(isSaved);
  const { user } = useSessionContext();
  const { saveUnsave, isLoading } = useSaveUnSave();

  // Sync local state with prop changes
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  // Memoize the click handler
  const handleClick = useCallback(() => {
    if (!user) {
      console.warn("User not authenticated. Save action aborted.");
      return;
    }
    if (isLoading) return; // Prevent multiple clicks during loading

    saveUnsave({ post_id, user_id: user.id });
    setSaved((prev) => !prev); // Optimistic update
    onClick?.(); // Call optional onClick prop
  }, [user, post_id, saveUnsave, isLoading, onClick]);

  return (
    <Heart
      className={`w-6 h-6 cursor-pointer ${className} ${
        isLoading && "cursor-not-allowed opacity-15"
      }`}
      onClick={handleClick}
      fill={saved ? fill : "none"}
      stroke={color}
      aria-label={saved ? "Unsave post" : "Save post"}
    />
  );
}