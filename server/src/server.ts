import App from "./app";
import 'dotenv/config';
import { config } from "./config/config";


const port=Number(config.PORT)

const app=new App()

app.startServer(port)