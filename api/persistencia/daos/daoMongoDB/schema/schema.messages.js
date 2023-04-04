import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	author: { type: String, require: true },
	timestamp: { type: String },
	text: { type: String }
});

export const MessageModel = mongoose.model('mensajes', Schema);
