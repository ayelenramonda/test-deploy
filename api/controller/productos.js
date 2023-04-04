import {
	newProduct,
	getAllProducts,
	getById,
	deleteOneProduct
} from '../services/productos.services.js';

export const saveController = async (req, res) => {
	const { body } = req;
	try {
		const product = await newProduct(body);
		res.send(product);
	} catch (error) {
		console.log(error);
	}
};

export const getAllController = async (req, res) => {
	try {
		const products = await getAllProducts();
		//console.log(products + 'controller');
		res.json(products);
	} catch (error) {
		console.log(error);
	}
};

export const getByIdC = async (req, res) => {
	try {
		const { id } = req.params;
		let product = await getById(id);
		console.log(product);
		return res.status(200).json({
			data: product
		});
	} catch (error) {
		console.log(error);
	}
};

export async function deleteProductController(req, res) {
	try {
		const { id } = req.params;
		let product = await deleteOneProduct(id);
		return res.status(200).json({
			data: product
		});
	} catch (error) {
		console.log(error);
	}
}
