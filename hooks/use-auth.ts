import { AuthProps } from "@/lib/types/auth-types";
import { loginApi } from "@/services/auth-apis";
import { useState } from "react";

export const useAuth = () =>{
    const [isloading, setIsloading] = useState(false);

    const login = async ({email, password}:AuthProps) =>{
        try {
            setIsloading(true)
            const res = await loginApi(email, password);
            return res;
        } catch (error) {
            console.log("login error ->",error)
            throw error;
        }
        finally{
            setIsloading(false);
        }
    }

    return {
        isloading,
        login,
    }
}