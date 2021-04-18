import { firebase } from "./firebase";

const db = firebase.firestore();
const taskCollection = "tareas";
const userCollection = "users";

function findAll() {
  return db.collection(taskCollection).get();
}

function save(tarea) {
  return db.collection(taskCollection).add(tarea);
}

function edit(tarea) {
  return db.collection(taskCollection).doc(tarea.id).update(tarea);
}

function remove(id) {
  return db.collection(taskCollection).doc(id).delete();
}

function saveUser(newUser) {
  return db.collection(userCollection).add(newUser);
}

function findUser({ emailAddress, password }) {
  const userRef = db.collection(userCollection);
  return userRef
    .where("emailAddress", "==", emailAddress)
    .where("password", "==", password)
    .get();
}

export const taskServices = {
  findAll,
  save,
  edit,
  remove,
};

export const userServices = {
  saveUser,
  findUser,
};
