import express from "express";
import auth from "../middleware/auth.js";
import administrator from "../core/administrator.js";

const adminRouter = express.Router();

adminRouter.get("/users", auth.authenticateToken, async (req, res)=> {
    if(req.user.role !="admin") {
        return res.send({ status:0, msg: "unauthorized", data:[] })
    }

    //get all users from DB
    const result = await administrator.getAllUsers();

    res.send({ status:1, msg:"done", data: result})
});

export default adminRouter;