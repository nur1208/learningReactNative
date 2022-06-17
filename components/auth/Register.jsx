import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const handleSignUP = () => {};
  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        placeholder="eamil"
        onChangeText={(eamil) => setEmail(eamil)}
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
