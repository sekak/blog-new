"use client";
import { createContext, useContext } from "react";
import { ProviderProps } from "@/types/context";
import useSWR from "swr";
import { fetcher } from "@/utils/utils";
import { User } from "@supabase/supabase-js";

export interface PropsSessionContext {
  loading: boolean;
  user: User | null;
}


export const SessionContext = createContext<PropsSessionContext | null>(null);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("Please use Context Theme inside layout.");
  return context;
};

export const SessionProvider = ({ children }: ProviderProps) => {
  // Move useSWR inside the component
  const { data: user, isLoading } = useSWR('/api/users', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return (
    <SessionContext.Provider value={{ loading: isLoading, user }}>
      {children}
    </SessionContext.Provider>
  );
};
