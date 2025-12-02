import express from 'express';
import { configDotenvPort } from './src/config/configDotenvPort.js';
import cors from 'cors';
import productsRoutes from './src/routes/products.Routes.js';
import userRoutes from './src/routes/user.Routes.js';
import authRoutes from './src/routes/auth.Routes.js';

const app = express();

// Middlewares

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);


const {port} = configDotenvPort ();


app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
  