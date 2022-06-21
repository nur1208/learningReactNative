import React from "react";
import { Text, View, Button } from "react-native";

export const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />

      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
