import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";
import firebase from "firebase";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUP = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
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
        placeholder="name"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        placeholder="eamil"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />

      <Button title="Sign Up" onPress={() => handleSignUP()} />
    </View>
  );
};
