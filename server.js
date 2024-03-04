import "dotenv/config.js"
import express from 'express'
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import {engine} from 'express-handlebars';
import dbConnection from "./src/utils/db.js"
import router from './src/routers/index.router.js'
import errorHandler from "./src/middlewares/ErrorH.js";
import pathHandler from "./src/middlewares/HandlePath.js";
import __dirname from "./utils.js";
import socketUtils from "./src/utils/sockets.utils.js"
import initialize from "./auth/passport-config.js";
import passport from 'passport';


const server=express()
const PORT=8080
const ready = ()=>{
    dbConnection()
    console.log(`Server ready on port ${PORT}`)
}
const httpServer=createServer(server)   
const socketServer=new Server(httpServer)
httpServer.listen(PORT,ready)

socketServer.on("connection", socketUtils)

server.engine("handlebars",engine())
server.set("view engine","handlebars")
server.set("views",__dirname+"/src/views")

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev")) 

server.use(session({
    secret: process.env.SESSION_SECRET || 'uuidv4()',
    resave: false,
    saveUninitialized: false,
}));


initialize(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
);

server.use(passport.initialize());
server.use(passport.session());

server.use("/",router)
server.use(errorHandler)
server.use(pathHandler)

export {socketServer}