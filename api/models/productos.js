import mongoose from 'mongoose';

export const productosCollectionName = 'producto';

const productosSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
	thumbnail: {type: String, required: true},
    stock: {type: Number, required: true}
    
});

export const ProductosModel = mongoose.model(
    productosCollectionName,
    productosSchema
);