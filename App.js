import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import firebase from "firebase";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
const firebaseConfig = {
  apiKey: "AIzaSyAn8z9VSLbADIxKXsZ4JACCXKNhXupkvn4",
  authDomain: "instagrem-b0e86.firebaseapp.com",
  projectId: "instagrem-b0e86",
  storageBucket: "instagrem-b0e86.appspot.com",
  messagingSenderId: "776917185168",
  appId: "1:776917185168:web:9c7640252c3312a7305e15",
  measurementId: "G-6L8008HF2D",
};

console.log({ firebase });

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Landing } from "./components/auth/Landing";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Main } from "./components/Main";
import { Add } from "./components/main/Add";
import { Save } from "./components/main/Save";

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
      setLoaded(true);
    });
  }, []);

  if (!loaded)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  if (!loggedIn)
    return (
      <NavigationContainer>
        <Stack.Navigator initailRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initailRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Save" component={Save} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
