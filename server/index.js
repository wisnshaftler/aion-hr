import express from "express";
import config from "./config/config.js";
import dbconnection from "./core/dbconnection.js";
import authRouter from "./routes/authentication.js";
import dashboardRoute from "./routes/dashboard.js";
import cors from "cors";
import adminRouter from "./routes/admin.js";

class server {
    PORT ;
    server;
    constructor() {
        this.PORT =config.PORT || 5000;
        this.server = express();
        this.server.use(cors());
        this.server.use(express.json())
    }

    async initServer () {
        console.log("Connecting to database");
        const dbConnected = await dbconnection.initConnection();
        if(!dbConnected) {
            console.log("Cant connect to database");
            return process.exit(1);
        }
        return this.startServer();
    }

    routes() {
        this.server.use("/auth", authRouter);
        this.server.use("/dashboard", dashboardRoute);
        this.server.use("/admin", adminRouter)
    }

    startServer() {
        this.routes();
        this.server.listen(this.PORT, function (){
            console.log(`Server is up and running in port ${this.PORT}`);
        }.bind(this));
    }
}

new server().initServer();