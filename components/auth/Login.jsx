import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";
import firebase from "firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log({ result });
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log({ email, password });
  };
  return (
    <View>
      <TextInput
        placeholder="eamil"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />

      <Button title="Sign In" onPress={() => handleLogin()} />
    </View>
  );
};
