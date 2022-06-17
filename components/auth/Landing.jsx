import React from "react";
import { Text, View, Button } from "react-native";

export const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text />
      <Button
        title="Register"
        onPress={() => navigation.naviage("Register")}
      />

      <Button
        title="Login"
        onPress={() => navigation.naviage("Login")}
      />
    </View>
  );
};
