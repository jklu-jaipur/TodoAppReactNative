import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { handleSignIn, handleSignUp } from "../utils/firebaseUtils";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPass, setSignInPass] = useState("");
  return (
    <View style={styles.container}>
      {/* Sign Up */}
      <View>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.caption}>
          Enter your email and password below to create an Account.
        </Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPass(text)}
          placeholder="Password"
          secureTextEntry
          value={pass}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignUp(email, pass)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <Text>or</Text>
      </View>
      {/* Sign In */}
      <Text style={styles.title}>Sign In</Text>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={signInEmail}
          onChangeText={(text) => setSignInEmail(text)}
          placeholder="Email"
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={signInPass}
          onChangeText={(text) => setSignInPass(text)}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignIn(signInEmail, signInPass)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  caption: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    marginTop: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
  },
  input: {
    // borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
  divider: {
    alignSelf: "center",
    marginVertical: 10,
  },
});
