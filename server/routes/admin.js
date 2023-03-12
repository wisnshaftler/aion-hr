import express from "express";
import auth from "../middleware/auth";

const adminRouter = express.Router();

adminRouter.get("/employees", auth.authenticateToken, async (req, res)=> {
    return res.send("im here")
});