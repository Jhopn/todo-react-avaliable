import { useContext } from "react";
import { AuthContext } from "../context/auth-provider";

export function useAuth(){
  const context = useContext(AuthContext)
  return context;
}