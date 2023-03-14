import express from "express";
import auth from "../middleware/auth.js";
import administrator from "../core/administrator.js";
import validation from "../core/validation.js";
import dbconnection from "../core/dbconnection.js";
import config from "../config/config.js";
import crypto from "crypto";
import logger from "../core/logger.js";

const adminRouter = express.Router();

adminRouter.get("/users", auth.authenticateToken, async (req, res)=> {
    if(req.user.role !="admin") {
        return res.send({ status:0, msg: "unauthorized", data:[] })
    }

    //get all users from DB
    const result = await administrator.getAllUsers();

    res.send({ status:1, msg:"done", data: result})
});

adminRouter.post("/new/user", auth.authenticateToken, async(req, res)=> {
    if(req.user.role !="admin") {
        return res.send({ status:0, msg: "unauthorized", data:[] })
    }

    const email = req.body?.email?.trim()?.toString();
    const password = req.body?.password?.trim()?.toString();
    const accesslevel = req.body?.accesslevel?.trim()?.toString();
    const name = req.body?.name?.toString();

    //validate user data
    const validateresult = validation.newDashboardUserValidate(email, password, name, accesslevel);
    if(!validateresult[0]) return res.send({status:0, msg:validateresult[1], data: []})

    //check there is any used email
    const alreadyUsed = await dbconnection.find("user", { email });
    if(alreadyUsed.length > 0) return res.send({status:0, msg:"Email already in use", data: []});

    //create hashed password
    const passHash = crypto.createHash("sha256").update(config.SALT+password).digest("hex");

    try {
        logger.log(`user ${req.user.email} is created new user at ${Date.now()}. user mail is ${email}`);
    }catch(e) {

    }
    //add user to db
    administrator.regNewUser(email, passHash, name, accesslevel);
    return res.send({status:1, msg: "done", data:[]});
});

adminRouter.put("/user/update", auth.authenticateToken, async(req, res)=>{
    if(req.user.role !="admin") {
        return res.send({ status:0, msg: "unauthorized", data:[] })
    }

    const email = req.body?.email?.trim()?.toString();
    const status = req.body?.status?.trim()?.toString();
    const password = req?.body?.password;

    //update user if password update
    if(password) {
        const passHash = crypto.createHash("sha256").update(config.SALT+password).digest("hex");
        administrator.updateUser(email, {email, password:passHash});
        return res.send({status:1, msg: "done", data:[]});
    }

    try {
        logger.log(`user ${req.user.email} is update user at ${Date.now()}. user mail is ${email}`);
    }catch(e) {

    }

    //if user only status
    administrator.updateUser(email, {email, status});
    return res.send({status:1, msg: "done", data:[]});
    
})

export default adminRouter;