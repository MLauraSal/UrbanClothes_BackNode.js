import {Router} from 'express';

import {getAll, getById, create, remove, update} from '../controllers/categoriesControllers.js';
import { adminOnly, verifyToken } from '../middlewares/authMiddleware.js';



const router = Router();


// Rutas para categorías

router.get('/', getAll);
router.post('/',verifyToken,adminOnly, create);
router.get('/:id', getById);
router.delete('/:id',verifyToken,adminOnly, remove);
router.put('/:id',verifyToken,adminOnly, update);


export default router;