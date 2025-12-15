import {Router} from 'express';
import { getAllProducts, getProductById, searchProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers.js';
import upload from '../middlewares/uploadMiddleware.js';
import { adminOnly, verifyToken } from '../middlewares/authMiddleware.js';  


const router = Router();

// Rutas para productos

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.post('/', verifyToken, adminOnly, upload.single('image'), createProduct);
router.get('/:id', getProductById);
router.put('/:id', verifyToken,adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', verifyToken,adminOnly, deleteProduct);




export default router;