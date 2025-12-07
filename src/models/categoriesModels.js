import {collection, getDocs, getDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import {db} from "../services/firebaseService.js";


// Referencia a la colección de categorías

const categoryCollection = collection(db, 'category');

// Obtener todas las categorías

export const getAllCategories = async () => {
    const snapshot = await getDocs(categoryCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener una categoría por ID

export const getCategoryById = async (id) => {
    try {
        const categoryRef = doc(categoryCollection, id);
        const snapshot = await getDoc(categoryRef);
        if (!snapshot.exists()) return null;
        return { id: snapshot.id, ...snapshot.data() };
      } catch (error) {
        console.error("Error getting product by ID:", error);
        return null;
        
      }
};

// Crear una nueva categoría

export const createCategory = async (data) => {
    try {
        const categoryRef = await addDoc(categoryCollection, data);
        return { id: categoryRef.id, ...data };
       } catch (error) {
        console.error("Error creating product:", error);
        
       }
};


// Eliminar una categoría por ID

export const deleteCategory = async (id) => {
    try {
        const categoryRef = doc(categoryCollection, id);
        const snapshot = await getDoc(categoryRef);
        if (!snapshot.exists()) return null;

        await deleteDoc(categoryRef);
        return { id: snapshot.id, ...snapshot.data() };
       } catch (error) {
        console.error("Error deleting product:", error);
        
       }
};




