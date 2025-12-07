import { db } from "../services/firebaseService.js";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Referencia a la colección de productos

const productsCollection = collection(db, "products");


// Obtener todos los productos

export const modelGetAll = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc )=> ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products:", error);
  }
  };
  

  // Obtener un producto por ID

  export const modelGetById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return null;
    
  }
  };
  

  // Crear un nuevo producto

  export const modelCreate = async (data) => {
   try {
    const productRef = await addDoc(productsCollection, data);
    return { id: productRef.id, ...data };
   } catch (error) {
    console.error("Error creating product:", error);
    
   }
  };

  // Eliminar un producto por ID
  
  export const modelDelete = async (id) => {
   try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) return null;


    await deleteDoc(productRef);
    return { id: snapshot.id, ...snapshot.data() };
   } catch (error) {
    console.error("Error deleting product:", error);
    
   }

  };

  // Actualizar un producto por ID
  
  export const modelUpdate = async (id, data) => {
 try {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);
  if (!snapshot.exists()) return null;


  await updateDoc(productRef, data);
  return { id: snapshot.id, ...snapshot.data(), ...data };

 } catch (error) {
    console.error("Error updating product:", error);
  
 }

  };

