import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/user.js';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { infoLogger, warnLogger, errorLogger } from '../logs/index.js';

dotenv.config();

export let actualUser = {};

const strategyOptions = {
	usernameField: 'username',
	passwordField: 'password',
	nameField: 'name',
	phoneField: 'phone',
	addressField: 'address',
	ageField: 'age',
	avatarField: 'avatar',
	passReqToCallback: true
};

const signup = async (req, username, password, done) => {
	console.log('SIGNUP!');
	try {
		const query = { username: username };
		const user = await UserModel.findOne(query);
		if (user) {
			return done(null, false, { message: 'usuario registrado' });
		}
		const username = req.body.username;
		const password = req.body.password;
		const name = req.body.name;
		const phone = req.body.phone;
		const address = req.body.address;
		const age = req.body.age;
		const avatar = req.body.avatar;

		const newUser = await UserModel.create({
			username,
			password,
			name,
			phone,
			address,
			age,
			avatar
		});
		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();
		console.log(newUser);

		sendMailUser(newUser);
		return done(null, newUser);
	} catch (error) {
		errorLogger.error(error);
		return done(null, false, { message: 'Los datos no pudieron ser procesados' });
	}
};

const login = async (req, username, password, done) => {
	infoLogger.info('LOGIN');
	const query = { username: username };
	const user = await UserModel.findOne(query);
	actualUser = user;

	if (!user || !user.isValidPassword(password)) {
		return done(null, false, { message: 'Invalid Username/Password' });
	}
	infoLogger.info('SALIO TODO BIEN');
	return done(null, user);
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
	const user = await UserModel.findById(userId);
	return done(null, user);
});

async function sendMailUser(user) {
	try {
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: '¡Nuevo registro!',
			html: `<h1>Hola</h1><p><strong>${user.name}</strong> se registró correctamente<br>sus datos son:</p><ul><li>Usuario: ${user.username}</li><li>Teléfono: ${user.phone}</li><li>Dirección: ${user.address}</li><li>Edad: ${user.age}</li></ul>`
		});
	} catch (err) {
		console.log(err);
	}
}
// MANDAR MAIL AL CREAR USUARIO NUEVO

const transporter = createTransport({
	service: 'gmail',
	port: process.env.PORT_GMAIL,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});
