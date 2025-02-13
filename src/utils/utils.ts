import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long", 
    day: "2-digit",
    month: "long",  // Adds full month name (e.g., February)
    year: "numeric",
  });
}