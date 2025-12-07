import jwt from "jsonwebtoken";
import "dotenv/config";



// Middleware para autenticar y verificar el token JWT

export const verifyToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar datos del usuario al request

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware para verificar si el usuario es administrador
export const adminOnly = (req, res, next) => {

  // Verificar si el usuario es administrador
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Administrators only." });
  }
  next();
};
