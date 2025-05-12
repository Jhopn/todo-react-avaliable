import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import { AuthProvider } from "../context/auth-provider";

type StackRoutesProps = {
  login: undefined;
  home: undefined;
  register: undefined;
}

const {Navigator, Screen} = createNativeStackNavigator<StackRoutesProps>();

export type StackRoutes = NativeStackNavigationProp<StackRoutesProps>

const Routes = () => {
  return ( 
    <NavigationContainer>
      <AuthProvider>
      <Navigator
       screenOptions={{
        headerShown: false
       }}>
        <Screen name="register" component={Register} />
        <Screen name="login" component={Login} />
        <Screen name="home" component={Home} />
      </Navigator>
    </AuthProvider>
    </NavigationContainer>
   );
}
 
export default Routes;