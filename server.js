import env from './src/utils/env.utils.js';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import dbConnection from './src/utils/db.js';
import __dirname from './utils.js';
import IndexRouter from './src/routers/index.router.js';
import errorHandler from './src/middlewares/errorHandler.js';
import pathHandler from './src/middlewares/pathHandler.js';
import { Server } from 'socket.io';
import socketUtils from './src/utils/sockets.utils.js';

import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import compression from 'express-compression';
import MongoStore from 'connect-mongo';

import cors from 'cors';
import winston from './src/middlewares/winston.js';
import logger from './src/utils/logger/index.js';

import swaggerOptions from './src/utils/swagger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

// Import Passport and strategies
import passport from './src/middlewares/passport.js';

// Initialize Express server
const server = express();
const PORT = env.PORT || 8080;

// Function to run when server is ready
const ready = () => {
  logger.INFO(`Server ready on port ${PORT}`);
};

// Create HTTP and Socket.io servers
const httpServer = createServer(server);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, ready);
socketServer.on('connection', socketUtils);

// Set up view engine
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/src/views');

// Middleware setup
server.use(cookieParser(env.SECRET_KEY));
server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.LINK_MONGO,
      ttl: 7 * 24 * 60 * 60, // 7 days
    }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  })
);

// Initialize Passport
server.use(passport.initialize());
server.use(passport.session());


server.use(cors({ origin: true, credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));
server.use(morgan('dev'));
server.use(winston);
server.use(
  compression({
    brotli: { enable: true, zlib: {} },
  })
);

// Swagger setup
const specs = swaggerJSDoc(swaggerOptions);
server.use('/api/docs', serve, setup(specs));

// Router setup
const router = new IndexRouter();
server.use('/', router.getRouter());

// Error handling middleware
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
