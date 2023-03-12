import express from "express";
import dbconnection from "../core/dbconnection.js";
import auth from "../middleware/auth.js";
import validation from "../core/validation.js";
import crypto from "crypto";
import config from "../config/config.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res)=> {
    const email = req.body?.email;
    const password = req.body?.password;

    const isValid = validation.credentialCheck(email, password);
    if(!isValid) return res.status(401).send({ status:0, msg: "Email or password is incorrect", data: {} });
    
    const passHash = crypto.createHash("sha256").update(config.SALT+password).digest("hex");

    const dbResult = await dbconnection.find("user", { email:email, password: passHash, status: "active" } );
    if(dbResult.length != 1) {
        return res.status(200).send({ status:0, msg:"Username or password is incorrect", data: {} });
    } 

    //token generate and sent to client
    const accessToken = auth.generateAccessToken({ email, role: dbResult[0].accesslevel, name: dbResult[0].name });
    const refreshToken = auth.generateRefreshToken({ email, role: dbResult[0].accesslevel, name: dbResult[0].name });

    return res.status(200).send({ status:1, msg:"Success", data: {
        accessToken: accessToken[1],
        refreshToken: refreshToken[1]
    } });
});


export default authRouter;