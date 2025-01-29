"use server";
import { createClient } from "@/utils/supabase/server";

let users = null; // Default to null to clearly indicate uninitialized state
let user = null;

export async function getUsers() {
  const supabase = await createClient();
  if (!users) {
    // Check if users is null
    const { data, error } = await supabase.auth.getUserIdentities();

    if (error) {
      console.error("Error fetching users:", error);
      users = []; // or you can throw an error depending on your error handling strategy
    } else if (data) {
      users = data.identities || []; // Safely access identities or return an empty array
    }
  }
  return users;
}

export async function getUser(id: string) {
  const users = await getUsers();
  if (users) {
    console.log(users.find((user) => user.id === id));
    return users.find((user) => user.id === id);
  }
  return null;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  if (!user) {
    // Check if user is null
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      user = null; // or handle it the way you prefer
    } else if (data) {
      user = data.user || null; // Safely access user or set null
    }
  }
  return user;
}
