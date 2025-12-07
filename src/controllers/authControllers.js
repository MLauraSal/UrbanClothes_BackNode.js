import bcrypt from "bcrypt";

import {
  createUser,
  getUserByEmail,
 
} from "../models/userModels.js";
import { generateToken } from "../middlewares/jwt.create.js";

// Controlador para registrar un nuevo usuario

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fill in all fields." });
    }
    const newEmail = email.toLowerCase();
    const emailExists = await getUserByEmail(newEmail);
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.trim().length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await createUser({
      name,
      email: newEmail,
      password: hashedPassword,
      role,
      createdAt: Date.now()
    });

    const token = generateToken(newUser);

    res.status(201).json({ message: "User created successfully", user: { id: newUser.id, name, email, role } ,
    token });
  } catch (err) {
   
    res.status(500).json({ error: "User registration failed" });
  }
};

// Controlador para iniciar sesión de un usuario existente

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await getUserByEmail(email);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, userFound.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(userFound);

    res.json({ message: "Login successful",user: {
         id: userFound.id,
          name: userFound.name,
          email: userFound.email,
         
          role: userFound.role
        }, token });
  } catch (err) {
    
    res.status(500).json({message: "Login failed, please check your credentials." });
  }
};
