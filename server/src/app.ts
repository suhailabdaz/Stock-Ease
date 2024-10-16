import { Application } from "express";
import connectDB from "./config/mongoDB";
import express from "express";
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from "helmet";
import logger from 'morgan'
import { limiter } from './utils/rateLimitter'
import { config } from "./config/config";
import authRouter from "./app/routes/authRoute";
import inventRouter from "./app/routes/inventRoute";

class App{
    public app:Application;
    public corsOptions = {
        origin: config.NODE_ENV === 'DEV' ? config.DEV_CORS_URI : config.DEV_CORS_URI,
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
        this.app.use('/auth',authRouter)
        this.app.use('/inventory',inventRouter)
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