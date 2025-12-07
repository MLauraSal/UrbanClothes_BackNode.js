import {Router} from 'express';

import {getAll, getById, create, remove} from '../controllers/categoriesControllers.js';



const router = Router();

router.get('/', getAll);
router.post('/', create);

router.get('/:id', getById);
router.delete('/:id', remove);


export default router;