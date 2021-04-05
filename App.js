import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { auth } from "./src/utils/firebase";
import LoginScreen from "./src/screens/LoginScreen";
import TodoScreen from "./src/screens/TodoScreen";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  // State to hold the login status
  const [user, setUser] = useState(null);

  // Use the effect hook to listen for changes in authentication
  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user);
    });
    // Cleanup
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {user ? <TodoScreen /> : <LoginScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 90,
  },
});
