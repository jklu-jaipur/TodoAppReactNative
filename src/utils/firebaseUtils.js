import { Alert } from "react-native";
import { auth, firestore } from "./firebase";

/*
collection      documents       subcollection       documents
USERS ->        userId      ->  TODOS   ->          todoId      -> fields: createdAt, todo, todoId, started, finished
                                fields: {
                                displayName: 'Name'
                                
                                }
*/

// Firestore database ref
const userDataRef = firestore().collection("USERS");

// Sign up function
export async function handleSignUp(email, pass) {
  await auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(
      (result) => {
        const userId = result.user.uid;
        // Add new user at sign in.
        addNewUser(userId);
      },
      (error) => {
        console.log(error);
      }
    );
}

// Function to handle sign in with email and password
export async function handleSignIn(email, pass) {
  await auth()
    .signInWithEmailAndPassword("rbindal1233@gmail.com", "rohitbindal")
    .then(
      (result) => {
        console.log("Signed In");
        const userId = result.user.uid;
        // Add new user at sign in.
        addNewUser(userId);
      },
      (error) => {
        console.log(error);
      }
    );
}

// Function to add new user data to firestore when the user sign's in.
export async function addNewUser(id) {
  // Add the todos to firebase
  await userDataRef
    .doc(id)
    .set(
      {
        id,
      },
      { merge: true }
    )
    .then(
      () => console.log("User data added"),
      (error) => console.log(error.message)
    );
}

// Function to handle Sign out
export function handleSignOut() {
  return auth().signOut();
}

// function to add todo
export async function addTodo(todo, uid) {
  const todoDoc = userDataRef.doc(uid).collection("TODO").doc();

  // Todo id
  const todoId = todoDoc.id;
  // Server timestamp
  const SERVER_TIMESTAMP = firestore.FieldValue.serverTimestamp();
  // Add todo
  await todoDoc
    .set({
      ...todo,
      todoId,
      createdAt: SERVER_TIMESTAMP,
    })
    .then(
      () => Alert.alert("Success", "Todo Added"),
      (error) => Alert.alert(error.message)
    );
}

// Get the user id of currently signed in User
export function getUserID() {
  if (auth().currentUser) {
    return auth().currentUser.uid;
  }
}

// Delete a todo
export async function deleteTodo(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).delete();
}

// Update the started value in our todos.
export async function handleUpdateStart(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    started: true,
  });
}

// Update the finished value in our todos.
export async function handleUpdateFinished(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    finished: true,
  });
}
