import MensajesRepository from '../persistencia/repository/mensjes.repository.js';

const mensajesRepository = new MensajesRepository();

export async function saveMensajeSer(data) {
	const msg = await mensajesRepository.saveMsg(data);
	return msg;
}

export async function getAllMensajes() {
	const message = await mensajesRepository.getAllMsg();
	//console.log(message);
	return message;
}

export const getByIdMsg = async (id) => {
	const mensaje = await mensajesRepository.getByIdMsg(id);
	return mensaje;
};
