import Router from 'express';
import ProductosRouter from './productos.js';
import CarritoRouter from './carrito.js';
import UserRouter from './user.js';

const routes = Router();
routes.use('/productos', ProductosRouter);
routes.use('/carrito', CarritoRouter);
routes.use('/user', UserRouter);

export default routes;
