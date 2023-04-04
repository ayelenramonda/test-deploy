import express from 'express';
import rutaPrincipal from './routes/index.js';
import MongoStore from 'connect-mongo';
import config from './config/index.js';
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './services/auth.js';
import { initDb } from './db/database.js';
import cluster from 'cluster';
import os from 'os';
import { args } from './config/index.js';
import { infoLogger, warnLogger, errorLogger } from './logs/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import { saveMsgController, getAllControllerMsg } from './controller/mensajes.js';
import { saveMsg } from './persistencia/daos/factory.js';
import { info } from './docs/info.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const specs = swaggerJSDoc(info);

const httpServer = http.createServer(app);
const io = new IOServer(httpServer);

app.set('socketio', io);

io.on('connection', async (socket) => {
	console.log('Usuario con id: ', socket.id, ' se ha conectado');

	socket.emit('messages', await getAllControllerMsg());

	socket.on('new-message', async (msg) => {
		let response = await saveMsg(msg);
		return response;
	});
});

app.get('/', async (req, res, next) => {
	try {
		let fileData = await getAllControllerMsg();
		//console.log(fileData);
		res.render('./index', { fileData });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

const viewsFolderPath = path.resolve(__dirname, './views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

app.post('/', saveMsgController);

// tiempo de sesion
const ttlSeconds = 600;

const StoreOptions = {
	store: MongoStore.create({
		mongoUrl: config.MONGO_ATLAS,
		autoRemove: 'Interval',
		autoRemoveInterval: 600, // tiempo que se borra la sesion
		crypto: {
			secret: config.CRYPTO_SECRET //las info queda encriptada en la base
		}
	}),
	secret: config.SECRET_STRING,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: ttlSeconds * 1000
	}
};

//const PORT = 8080;

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.static('public'));

app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rutaPrincipal);

const numsCPUs = os.cpus().length;
const { puerto, modo } = args;

if (modo === 'cluster' && cluster.isPrimary) {
	infoLogger.info(`Cantidad de nucleos del sistema: ${numsCPUs}`);
	infoLogger.info(`PID MASTER: ${process.pid}`);
	warnLogger.warn(`PID MASTER: ${process.pid}`);
	errorLogger.error(`PID MASTER: ${process.pid}`);
	for (let i = 0; i < numsCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code) => {
		infoLogger.info(`Worker ${worker.process.pid} with code ${code}`);
		cluster.fork();
	});
} else {
	initDb();
	infoLogger.info('conenctado a la db');

	httpServer.listen(puerto, () => {
		infoLogger.info(
			` PID WORKER ${process.pid} Servidor express escuchando en el puerto ${puerto}`
		);
	});

	app.use((err, req, res, next) => {
		const status = err.status || 500;
		const message = err.message || 'Internal Server Error';

		res.status(status).json({
			message
		});
	});
}
