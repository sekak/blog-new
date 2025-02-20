'use client'

import { createClient } from "@/utils/supabase/client";

const useLogWithProvider = () => {
  const logWithProvider = async (provider: "google" | "github") => {
    const supabase = createClient();
     const {error} = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });
    console.log(error)
  };

  return { logWithProvider };
};

export default useLogWithProvider;
