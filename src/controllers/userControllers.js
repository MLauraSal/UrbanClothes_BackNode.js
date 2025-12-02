
import {

  getAllUsers,
  getUserById, 
  createUser,
  deleteUser
 
} from "../models/user.model.js";



export const getUsers = async (req, res) => {
  try {
     
    const users = await getAllUsers();
    res.status(200).json(users);
    console.log(users);
  } catch (err) {
    console.error("Error obteniendo usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error obteniendo usuario:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

export const addUser = async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Controlador para actualizar un usuario por ID

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    await updateUser(id, req.body);
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    console.error("Error actualizando usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Controlador para eliminar un usuario por ID

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error("Error eliminando usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
