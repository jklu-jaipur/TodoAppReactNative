// Functional component to display individual ToDos.
import React from "react";
import { Text, View, Button } from "react-native";

function Card({ todo, renderStatus, deleteTodo }) {
  return (
    <View className="todoCard">
      <Text>{todo.todo}</Text>
      {renderStatus}
      <Button title="Delete" color="red" onPress={deleteTodo} />
      {/* <button onClick={deleteTodo}>Delete</button> */}
    </View>
  );
}

export default Card;
