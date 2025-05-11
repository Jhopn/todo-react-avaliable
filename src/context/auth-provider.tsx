import { createContext, useState } from "react";
import { StackRoutes } from "../routes";
import { api } from "../service/api";
import { AxiosResponse } from 'axios';
import Toast from "react-native-toast-message";

interface SessionResponse {
  token: string
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

interface authProps {
  handleLogin: (email: string, password: string) => void;
  verifyToken: (token: string) => void;
  handleRegister: (name: string, email: string, password: string) => void;
  token: string;
}

export const AuthContext = createContext<authProps>(
  {} as authProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('')

  const verifyToken = () => {
    if (token) {

    }
  }

  const handleLogin = (email: string, password: string) => {
    api.post<SessionResponse>('session', {
      email,
      password,
      expiresInMins: 30,
    })
      .then((response: AxiosResponse<SessionResponse>) => {
        console.log(response.data);
        setToken(response.data.token);
        Toast.show({
          type: 'success',
          text1: 'Login foi efetuado com sucesso!',
        });
      })
      .catch(error => {
        console.error("Axios error:", error);
        Toast.show({
          type: 'error',
          text1: 'Credenciais inválidas',
          text2: 'Verifique sua seu Email e Senha ou tente novamente.',
        });
      });
  }

  const handleRegister = (name: string, email: string, password: string) => {
    api.post<RegisterResponse>('user', {
      name,
      email,
      password,
      expiresInMins: 30,
    })
      .then((response: AxiosResponse<RegisterResponse>) => {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Usuário criado com sucesso!',
          text2: 'Faça login.',
        });
      })
      .catch(error => {
        console.error("Axios error:", error);
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão',
          text2: 'Verifique sua rede ou tente novamente.',
        });
      });
  }

  return (
    <AuthContext.Provider value={{ handleLogin, verifyToken, token, handleRegister }}>
      {children}
    </AuthContext.Provider>
  )
}