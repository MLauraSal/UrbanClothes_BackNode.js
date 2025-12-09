import express from 'express';
import { configDotenvPort } from './src/config/configDotenvPort.js';
import cors from 'cors';
import productsRoutes from './src/routes/products.Routes.js';
import userRoutes from './src/routes/user.Routes.js';
import authRoutes from './src/routes/auth.Routes.js';
import categoriesRoutes from './src/routes/categories.Routes.js';

const app = express();

// Middlewares

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5501', 
  credentials: true,
}));




// Routes




app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);


app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
const {port} = configDotenvPort ();


app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
  