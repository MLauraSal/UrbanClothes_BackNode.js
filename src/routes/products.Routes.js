import {Router} from 'express';
import { getAllProducts, getProductById, getProductsByName, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers.js';
import upload from '../middlewares/uploadMiddleware.js';
import { adminOnly, verifyToken } from '../middlewares/authMiddleware.js';  


const router = Router();


router.get('/', getAllProducts);
router.get('/search', getProductsByName);
router.post('/', verifyToken, adminOnly, upload.single('image'), createProduct);
router.get('/:id', getProductById);
router.put('/:id', verifyToken,adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', verifyToken,adminOnly, deleteProduct);




export default router;