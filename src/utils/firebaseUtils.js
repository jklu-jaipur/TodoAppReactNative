import { Alert, ToastAndroid } from "react-native";
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
        // Get the user uid from the result
        const userId = result.user.uid;
        // Add new user at sign in.
        addNewUser(userId).then(() => {
          ToastAndroid.show("Welcome Aboard!", ToastAndroid.SHORT);
        });
      },
      (error) => {
        console.log(error);
      }
    );
}

// Function to handle sign in with email and password
export async function handleSignIn(email, pass) {
  await auth()
    .signInWithEmailAndPassword(email, pass)
    .then(
      () => {
        // Toast
        ToastAndroid.show("Signed In", ToastAndroid.SHORT);
      },
      (error) => {
        Alert.alert("Invalid Credentials", error.message);
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
export async function handleSignOut() {
  await auth().signOut();
  ToastAndroid.show("Signed Out", ToastAndroid.SHORT);
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
      () => ToastAndroid.show("Todo Added", ToastAndroid.SHORT),
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
  await userDataRef
    .doc(uid)
    .collection("TODO")
    .doc(todoId)
    .delete()
    .then(() => {
      ToastAndroid.show("Todo Deleted", ToastAndroid.SHORT);
    });
}

// Update the started value in our todos.
export async function handleUpdateStart(todoId, uid) {
  await userDataRef
    .doc(uid)
    .collection("TODO")
    .doc(todoId)
    .update({
      started: true,
    })
    .then(() => {
      ToastAndroid.show("Status Updated", ToastAndroid.SHORT);
    });
}

// Update the finished value in our todos.
export async function handleUpdateFinished(todoId, uid) {
  await userDataRef
    .doc(uid)
    .collection("TODO")
    .doc(todoId)
    .update({
      finished: true,
    })
    .then(() => {
      ToastAndroid.show("Status Updated", ToastAndroid.SHORT);
    });
}
