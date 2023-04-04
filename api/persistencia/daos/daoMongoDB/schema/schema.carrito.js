import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	timestamp: { type: String },
	productos: { type: Array },
	username: { type: String },
	name: { type: String }
});

export const CarritoModel = mongoose.model('carrito', Schema);
