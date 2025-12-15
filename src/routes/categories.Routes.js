import {Router} from 'express';

import {getAll, getById, create, remove, updateCategory} from '../controllers/categoriesControllers.js';
import { adminOnly, verifyToken } from '../middlewares/authMiddleware.js';



const router = Router();


// Rutas para categorías

router.get('/', getAll);
router.post('/',verifyToken,adminOnly, create);
router.get('/:id', getById);
router.delete('/:id',verifyToken,adminOnly, remove);
router.put('/:id',verifyToken,adminOnly, updateCategory);


export default router;