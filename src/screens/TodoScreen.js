import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import {
  addTodo,
  deleteTodo,
  getUserID,
  handleSignOut,
  handleUpdateFinished,
  handleUpdateStart,
} from "../utils/firebaseUtils";
import { firestore } from "../utils/firebase";
import Card from "../components/Card";

export default function TodoScreen() {
  // State to hold the new todo input.
  const [input, setInput] = useState("");
  // State to hold all the todos.
  const [todos, setTodos] = useState([]);

  // Constant to hold user id
  const uid = getUserID();

  useEffect(() => {
    getTodoData();
  });

  // Get todo data from firestore
  async function getTodoData() {
    const todoRef = await firestore()
      .collection("USERS")
      .doc(uid)
      .collection("TODO")
      .orderBy("createdAt", "desc")
      .get();
    // Temporary list to store data
    let TODO = [];
    todoRef.docs.map((doc) => {
      TODO.push(doc.data());
    });
    // Add all the todos to our todo state.
    setTodos(TODO);
  }

  // Function to handle input submit
  const handleSubmit = () => {
    // New todo object
    const newTodo = {
      todo: input,
      started: false,
      finished: false,
    };
    // Add the todo to firestore
    addTodo(newTodo, uid);
    // Clear the input container
    setInput("");
  };

  // function to render the status of Todo.
  const renderStatus = (hasStarted, hasFinished, todoId) => {
    // If the user has finished the task
    if (hasFinished) {
      return <Text>Finished</Text>;
    }
    // if the user has started the task but not finshed yet
    else if (hasStarted && !hasFinished) {
      return (
        <View>
          <Text>In Progress</Text>
          <Button
            onPress={() => handleUpdateFinished(todoId, uid)}
            title="Finished"
          />
        </View>
      );
    }
    // If the user has neither finshed the task nor started it.
    else {
      return (
        <View>
          <Text>Not yet Started</Text>
          <Button
            onPress={() => handleUpdateStart(todoId, uid)}
            title="Start"
          />
        </View>
      );
    }
  };

  // Function to map the todos state to card component
  const mapTodos = () => {
    return todos.map((value, index) => (
      <Card
        todo={value}
        key={index}
        index={index}
        renderStatus={renderStatus(value.started, value.finished, value.todoId)}
        deleteTodo={() => deleteTodo(value.todoId, uid)}
      />
    ));
  };

  return (
    <View>
      <Text>Todo Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <TextInput
        placeholder="Add Todo ..."
        onChangeText={(text) => setInput(text)}
      />
      <Button title="Add Todo" onPress={handleSubmit} />
      {mapTodos()}
    </View>
  );
}
