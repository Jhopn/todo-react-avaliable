import { useNavigation } from "@react-navigation/native";
import {
  Button,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
  StyleSheet,
} from "react-native";
import { StackRoutes } from "../routes";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { ChangeEvent } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const { navigate } = useNavigation<StackRoutes>();
  const { handleRegister, token } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setName(event.nativeEvent.text);
  };

  const handleEmailPassword = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setEmail(event.nativeEvent.text);
  };

  const handlePasswordChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setPassword(event.nativeEvent.text);
  };

  if (token) {
    navigate("home");
  }

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.paragraph}>Faça seu cadastro abaixo!</Text>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            onChange={handleNameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            onChange={handleEmailPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha..."
            onChange={handlePasswordChange}
          />
          <View style={styles.button}>
            <Button
              title="Cadastrar"
              onPress={() => handleRegister(name, email, password)}
            />
          </View>

          <View style={styles.button}>
            <Button
              color={"#9C9BA0"}
              title="Já tem conta? Clique aqui!"
              onPress={() => navigate("login")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#9C9BA0",
  },
  container: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    justifyContent: "center",
    backgroundColor: "#F1F0F8",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  paragraph: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    margin: 5,
  },
  input: {
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: "#E2E1E8",
    borderRadius: 5,
    padding: 10,
    borderColor: "#000",
  },
  content: {
    padding: 50,
  },
  button: {
    margin: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});

export default Register;
