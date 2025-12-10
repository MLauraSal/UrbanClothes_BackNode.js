import {Router} from 'express';

import {getAll, getById, create, remove} from '../controllers/categoriesControllers.js';
import { adminOnly, verifyToken } from '../middlewares/authMiddleware.js';



const router = Router();


// Rutas para categorías

router.get('/',verifyToken, getAll);
router.post('/',verifyToken,adminOnly, create);
router.get('/:id',verifyToken,adminOnly, getById);
router.delete('/:id',verifyToken,adminOnly, remove);


export default router;