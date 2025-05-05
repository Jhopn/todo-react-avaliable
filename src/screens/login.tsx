import { useNavigation } from '@react-navigation/native';
import { Button, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View, StyleSheet } from "react-native";
import { StackRoutes } from "../routes";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { ChangeEvent } from "react";

const Login = () => {
  const { navigate } = useNavigation<StackRoutes>()
  const { handleLogin, token } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(event.nativeEvent.text);
  };

  const handlePasswordChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(event.nativeEvent.text);
  };

  if(token){
    navigate("home")
  }

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.paragraph}>Faça seu login abaixo!</Text>
      <View style={styles.content}>

      <TextInput style={styles.input} placeholder="Digite seu email..." onChange={handleEmailChange}/>
      <TextInput style={styles.input} placeholder="Digite sua senha..." onChange={handlePasswordChange}/>
     
      <View style={styles.button}>
        <Button title="Entrar" onPress={() => handleLogin(email, password)} />
      </View>

      <View style={styles.button}>
        <Button color={'#9C9BA0'} title="Não tem conta? Clique aqui!" onPress={() => navigate('register')} />
      </View>
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F1F0F8'
  },
  title:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  paragraph:{
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    margin: 5,
  },
  input:{
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: '#E2E1E8',
    borderRadius: 5,
    padding: 10,
    borderColor: '#000',
  },
  content:{
    padding: 50,
  },
  button:{
    margin: 10,
  }
})
 
export default Login;