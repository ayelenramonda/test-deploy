export default class MensajesDTO {
	constructor({ id, author, text }) {
		this.id = id;
		this.author = author;
		this.text = text;
	}
}

export function asDto(msg) {
	if (Array.isArray(msg)) return msg.map((p) => new MensajesDTO(p));
	else return new MensajesDTO(msg);
}
