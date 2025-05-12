import { createContext, useEffect, useState } from "react";
import { StackRoutes } from "../routes";
import { api } from "../service/api";
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

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
  handleLogout: () => void;
  token: string;
}

export const AuthContext = createContext<authProps>(
  {} as authProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('')
  const { navigate } = useNavigation<StackRoutes>();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
    Toast.show({
      type: 'success',
      text1: 'Logout realizado com sucesso!',
    });
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
        AsyncStorage.setItem('token', response.data.token);
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
        navigate("login");
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
    <AuthContext.Provider value={{ handleLogin, verifyToken, token, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}