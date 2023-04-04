import { Router } from 'express';

import {
	crearcarritoController,
	getByIdC,
	listarProd,
	listarAll,
	guardarProductoEncarr,
	BorrarCarritoController,
	borrarOneProducto,
	finalizarCompra
} from '../controller/carrito.js';

const routes = Router();
routes.get('/:id', getByIdC);
routes.get('/', listarAll);
routes.get('/:id/productos', listarProd);
routes.get('/compra/:id', finalizarCompra);
routes.post('/', crearcarritoController);
routes.post('/:id/productos/:idPrd', guardarProductoEncarr);
routes.delete('/:id', BorrarCarritoController);
routes.delete('/:id/productos/:idPrd', borrarOneProducto);

export default routes;
