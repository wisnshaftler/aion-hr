import express from "express";
import dbconnection from "../core/dbconnection.js";
import auth from "../middleware/auth.js";
import validation from "../core/validation.js";
import crypto from "crypto";
import config from "../config/config.js";
import employee from "../core/employee.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/employee", auth.authenticateToken, async (req, res)=>{
    const user = req.user;

    const array = ["admin", "hr"];
    if(!array.includes(user.role)) return res.status(401).send({ status:0, msg: "unauthorized", data: {} });

    const result = await employee.find();
    return res.status(200).send({ status:1, msg: "Done", data: result });
});

dashboardRoute.get

export default dashboardRoute;