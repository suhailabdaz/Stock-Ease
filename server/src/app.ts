import { Application } from "express";
import connectDB from "./config/mongoDB";
import express from "express";
import route from "./app/routes/routes";
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from "helmet";
import logger from 'morgan'
import { limiter } from './utils/rateLimitter'
import { config } from "./config/config";

class App{
    public app:Application;
    public corsOptions = {
        origin: config.NODE_ENV === 'PROD' ? config.CORS_URL_1 : config.CORS_URL_2,
        credentials: true
    };
    server:http.Server<typeof http.IncomingMessage,typeof http.ServerResponse>

    constructor(){
        this.app=express()
        this.server=http.createServer(this.app)
        this.applyMiddleware()
        this.routes()
        connectDB()
    }
    
    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors(this.corsOptions));

        this.app.use(helmet());
        this.app.use(logger("dev")); 
        this.app.use(cookieParser());
        this.app.use('/api/v1/',route)
        this.app.use(limiter)
    }

    private routes():void{
        this.app.use(( req, res, next) => {
            res.status(500).send('Something broke!');
        });
        
        
    }

    public startServer(PORT:number):void{
        this.server.listen(PORT,()=>{
            console.log(`server is running  http://localhost:${PORT}`);
            
        })
    }

}
export default App