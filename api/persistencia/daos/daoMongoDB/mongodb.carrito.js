import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CarritoModel } from './schema/schema.carrito.js';
import moment from 'moment/moment.js';
import DaoMongoDB from './mongodb.productos.js';
import { ProductosModel } from './schema/schema.productos.js';

dotenv.config();

export default class DaoMongoDBCart {
	static init() {
		mongoose.connect(process.env.MONGO_ATLAS, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Conectado a MongoDB!');
			}
		});
	}
	constructor() {
		this.producto = new DaoMongoDB();
	}

	async crearCarrito(carr) {
		try {
			const carritos = await this.listarAll();
			if (carritos.length === 0) {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			} else {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			}
		} catch (err) {
			console.log(err);
		}
	}
	async getByIdCarr(_id) {
		try {
			const carrito = await CarritoModel.findById(_id);
			return carrito;
		} catch (error) {
			console.log(error + 'mongo');
			return { error: 'Carrito no existe mongoDB' };
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id) {
		const carrProd = await listar(id);
		return carrProd.productos;
	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			const carr = await CarritoModel.find({});
			return carr;
		} catch (err) {
			return { error: 'No existen carritos' };
		}
	}

	// Agrega un producto específico en un carrito específico
	async guardarProductoEnCarrito(idCarrito, idProd) {
		const cart = await this.getByIdCarr(idCarrito);
		const prod = await this.producto.getById(idProd);
		console.log(prod);
		if (cart)
			return await CarritoModel.findByIdAndUpdate(
				{ _id: idCarrito },
				{ $push: { productos: prod } }
			);
	}

	// Borra un carrito en específico
	async borrar(_id) {
		try {
			return await CarritoModel.findByIdAndDelete(_id);
		} catch (err) {
			return { error: 'No se pudo eliminar el carrito' };
		}
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idCarrito, idProd) {
		try {
			const prod = await this.producto.getById(idProd);
			console.log(prod);
			return await CarritoModel.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
		} catch (err) {
			console.log(err);
			return { error: 'No se pudo eliminar el producto' };
		}
	}
}
