export default class CarritoDTO {
	constructor({ name, productos }) {
		this.id = id;
		this.name = name;
		this.productos = productos;
	}
}

export function asDtoCarr(carrito) {
	if (Array.isArray(carrito)) return carrito.map((p) => new ProductosDTO(c));
	else return new ProductosDTO(carrito);
}
