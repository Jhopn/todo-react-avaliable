import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <Routes />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});
