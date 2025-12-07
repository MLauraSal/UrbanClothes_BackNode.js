import {db} from "../services/firebaseService.js";

import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";


const usersCollection = collection(db, "users");

export const getAllUsers = async () => {
 try {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
 } catch (error) {
  console.error("Error getting users:", error);
  
 }
};

export const getUserById = async (id) => {
  try {
    
  const userRef = doc(usersCollection, id);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    
  }
};

export const createUser = async (userData) => {
  const docRef = await addDoc(usersCollection, userData);
  return { id: docRef.id, ...userData };
}

export const getUserByEmail = async (email) => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error getting user by email:", error);
    
  }
};

export const deleteUser = async (id) => {
  try {
    
    await deleteDoc(doc(usersCollection, id));
  } catch (error) {
    console.error("Error deleting user:", error);
    
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const userRef = doc(usersCollection, id);
    await updateDoc(userRef, updateData);
    const updatedUser = await getUserById(id);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    
  }
};