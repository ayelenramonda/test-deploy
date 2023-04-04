import { Router } from 'express';
const router = Router();
import { saveMsgController, getAllControllerMsg } from '../controller/mensajes.js';

router.get('/', getAllControllerMsg);
router.post('/', saveMsgController);

module.exports = router;
