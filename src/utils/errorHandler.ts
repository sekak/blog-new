import { PropsError } from "@/types/global";
import { NextResponse } from "next/server";

// Custom Error Class
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Centralized Error Handler Function
export function handleApiError(error: PropsError | Error) {
  const message =
    error instanceof ApiError ? error?.message : "Internal Server Error.";
  const statusCode = error instanceof ApiError ? error?.statusCode : 500;

  return NextResponse.json({ success: false, message }, { status: statusCode });
}
