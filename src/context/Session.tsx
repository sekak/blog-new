'use client'
// import { createClient } from "@/utils/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"
import { ProviderProps } from "@/types/context";
import { createClient } from "@/utils/supabase/client";


interface PropsSessionContext {
    loading: boolean
    setUser: React.Dispatch<React.SetStateAction<boolean>>
    user: any
}

export const SessionContext = createContext<PropsSessionContext | null>(null)

export const useSessionContext = () => {
    const context = useContext(SessionContext)
    if (!context) throw new Error("Please use Context Theme inside layout.");

    return context
}


export const SessionProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false);

    const supabase = createClient();
    useEffect(() => {
        const GetUser = async () => {
            setLoading(true)
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error)
                setUser(null)
            setUser(user)
            setLoading(false)
        }
        GetUser()
    }, [])
    
    return <SessionContext.Provider value={{ loading, user ,setUser}}>
        {children}
    </SessionContext.Provider>
}