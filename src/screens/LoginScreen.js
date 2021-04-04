import React from "react";
import { View, Text, Button } from "react-native";
import { handleSignIn } from "../utils/firebaseUtils";

export default function LoginScreen() {
  return (
    <View>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
