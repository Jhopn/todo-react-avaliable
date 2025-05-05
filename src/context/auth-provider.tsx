import { createContext, useState } from "react";
import { StackRoutes } from "../routes";

interface authProps{
  handleLogin: (email: string, password: string) => void;
  verifyToken: (token: string) => void;
  handleRegister: (name: string, email: string, password: string) => void;
  token: string;
}

export const AuthContext = createContext<authProps>(
  {} as authProps
);

export function AuthProvider({children}: {children: React.ReactNode}){
  const [token, setToken ] = useState('')

  const verifyToken = () => {
    if(token){
      
    }
  }

  const handleLogin = (email: string, password: string) => {
    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        expiresInMins: 30, 
      }),
    })
    .then(res => res.json())
    .then((data) => {
      setToken(data.accessToken); 
    })
  }

  const handleRegister = (name: string, email: string, password: string) => {
    fetch('http://localhost:3333/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        expiresInMins: 30, 
      }),
    })
    .then(res => res.json())
    .then((data) => {
      if(data) return true;
    })
  }

  return(
    <AuthContext.Provider value={{handleLogin, verifyToken, token, handleRegister}}>
      {children}
    </AuthContext.Provider>
  )
}