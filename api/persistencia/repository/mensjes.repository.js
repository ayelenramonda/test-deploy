import { asDto } from '../dto/mensajes.dto.js';
import { getDaoMsg } from '../daos/factory.js';

export default class MensajesRepository {
	constructor() {
		this.dao = getDaoMsg();
	}

	async getAllMsg() {
		try {
			const mensajes = await this.dao.getAllMsg();
			//const dtoMsg = asDto(mensajes);
			return mensajes;
		} catch (err) {
			console.log(err);
		}
	}

	async saveMsg(msg) {
		try {
			const newMessage = await this.dao.saveMsg(msg);
			console.log(newMessage);
			return newMessage;
		} catch (err) {
			console.log(err);
			return { error: 'No se pudo ingresar el mensaje' };
		}
	}

	async getByIdMsg(id) {
		const getMsg = await this.dao.getByIdMsg(id);
		return getMsg;
	}
}
