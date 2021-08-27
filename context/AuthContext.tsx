import { createContext } from "react";

type SignCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: SignCredentials): Promise<void>;
    isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextData )

