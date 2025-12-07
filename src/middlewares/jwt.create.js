import jwt from 'jsonwebtoken';


// Función para generar un token JWT

export const generateToken = (user) => {
  return jwt.sign(
    {
      id      : user._id,
      
      name    : user.name,
      email   : user.email,
        role    : user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

