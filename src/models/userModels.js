import { collection, addDoc, getDocs,getDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../services/firebaseService.js";

const usersCollection = collection(db, "users");

export const createUser = async (userData) => {
  const docRef = await addDoc(usersCollection, userData);
  return { id: docRef.id, ...userData };
};

export const getUserById = async (id) => {
  
  const userRef = doc(usersCollection, id);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;
  return { id: userDoc.id, ...userDoc.data() };
};

export const getUserByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const user = snap.docs[0];
  return { id: user.id, ...user.data() };
};





export const deleteUser = async (id) => {
  await deleteDoc(doc(usersCollection, id));
};

export const updateUser = async (id, newData) => {
  await updateDoc(doc(usersCollection, id), newData);
};
