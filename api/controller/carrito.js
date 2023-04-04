import {
	newCarrito,
	listarAllCarritos,
	getByIdCarr,
	listarProducto,
	guardarOneProduct,
	borrar,
	borrarProd
} from '../services/carrito.services.js';
import { CarritoModel } from '../persistencia/daos/daoMongoDB/schema/schema.carrito.js';

import { actualUser } from '../services/auth.js';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let username;
let name;

export const crearcarritoController = async (req, res) => {
	const { body } = req;
	try {
		const carrito = await newCarrito(body);
		res.json(carrito);
	} catch (error) {
		console.log(error);
	}
};
export const getByIdC = async (req, res) => {
	try {
		const { id } = req.params;
		let product = await getByIdCarr(id);
		console.log(product);
		return res.status(200).json({
			data: product
		});
	} catch (error) {
		console.log(error);
	}
};

//Obtener un producto de un carrito
export const listarProd = async (req, res) => {
	try {
		const { id } = req.params;
		let carrito = await getByIdCarr(id);
		console.log(carrito.productos);
		return res.status(200).json({
			data: carrito.productos
		});
	} catch (error) {
		console.log(error);
	}
};

// Obtener todos los carritos
export const listarAll = async (req, res) => {
	try {
		let carrito = await listarAllCarritos();
		console.log(carrito);
		return res.json({
			data: carrito
		});
	} catch (error) {
		console.log(error);
	}
};
// Agrega un producto específico en un carrito específico

export const guardarProductoEncarr = async (req, res) => {
	try {
		const carrito = await guardarOneProduct(req.params.id, req.params.idPrd);
		res.json(carrito);
	} catch (error) {
		console.log(error);
	}
};

// Borra un carrito en específico
export const BorrarCarritoController = async (req, res) => {
	try {
		const id = req.params.id;
		let carrito = await borrar(id);
		return res.status(200).json({
			data: carrito
		});
	} catch (error) {
		console.log(error);
	}
};
// Borra un producto en específico de un carrito
export const borrarOneProducto = async (req, res) => {
	try {
		let product = await borrarProd(req.params.id, req.params.idPrd);
		res.json(product);
	} catch (error) {
		console.log(error);
	}
};

export const finalizarCompra = async (req, res) => {
	username = actualUser.username;
	name = actualUser.name;
	try {
		const carritoId = req.params.id;
		let carrito = await CarritoModel.findById(carritoId);
		console.log(carrito);

		if (!carrito) {
			return res.status(404).json({
				mensaje: 'Carrito no encontrado!'
			});
		}

		const compraFinal = await CarritoModel.findByIdAndUpdate(carrito._id, {
			id: carrito.id,
			timestamp: carrito.timestamp,
			productos: carrito.productos,
			username: carrito.username,
			name: carrito.name
		});

		await compraMail(username, carrito);
		console.log(actualUser);

		return res.status(200).json({
			mensaje: 'Tu compra fue precesada'
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
			stack: error.stack
		});
	}
};

async function compraMail(username, carrito) {
	try {
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `Nuevo pedido de ${username}`,
			html: `<h1>Detalles de la compra, ${username} </h1><p>${carrito}</p>`
		});
	} catch (err) {
		console.log(err);
	}
}
// MANDAR MAIL CON CARRITO

const transporter = createTransport({
	service: 'gmail',
	port: process.env.PORT_GMAIL,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});
