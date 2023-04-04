import config from '../config/index.js';
import { ProductosModel } from '../models/productos.js';

export const checkAdmin = (req, res, next) => {
	if (!config.administrador)
		return res.status(401).json({
			msg: 'No estás autorizado para realizar esta acción'
		});
	next();
};

export const checkBodyProduct = async (req, res, next) => {
	const { title, price, thumbnail } = req.body;

	if (!title || !price || !thumbnail)
		return res.status(400).json({
			msg: 'missing Body fields'
		});

	next();
};

export const isLoggedIn = (req, res, next) => {
	console.log(req.isAuthenticated());
	if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unauthorized' });
	next();
};
