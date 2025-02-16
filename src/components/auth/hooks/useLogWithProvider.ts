import { createClient } from "@/utils/supabase/client";


const useLogWithProvider = () => {
  const logWithProvider = async (provider: "google" | "github") => {
    const supabase = createClient();
     await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });
  };

  return { logWithProvider };
};

export default useLogWithProvider;
