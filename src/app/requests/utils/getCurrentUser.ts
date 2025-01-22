import { createClient } from '@/utils/supabase/server';

let cachedUser: any = null;

export const getCurrentUser = async () => {
  if (cachedUser) {
    return cachedUser;
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  console.log(user, error)
  if (error) {
    throw new Error(error.message);
  }

  cachedUser = user;
  return user;
};