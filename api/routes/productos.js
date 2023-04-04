import { Router } from 'express';
import {
	saveController,
	getAllController,
	getByIdC,
	deleteProductController
} from '../controller/productos.js';

const router = Router();

router.post('/add', saveController);
router.get('/list', getAllController);
router.get('/:id', getByIdC);
router.delete('/:id', deleteProductController);

export default router;
