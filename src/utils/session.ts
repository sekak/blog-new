import { createClient } from "./supabase/client";

export const getSessionUser = async () => {
    const supabase = createClient();
         supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            console.log('User signed in successfully:', session?.user?.email);
        } else if (event === 'SIGNED_OUT') {
            console.log('User signed out.');
    }
    });

    // if (error) {
    //     console.error('Error getting session:', error.message);
    //     return null;
    // }
};