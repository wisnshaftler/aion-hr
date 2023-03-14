import dbconnection from "../core/dbconnection.js";
import config from "../config/config.js";
import validation from "../core/validation.js";
import crypto from "crypto";

class administrator {

    async getAllUsers() {
        const result = await dbconnection.findWithProjection("user", {}, { projection: {
            _id:0,
            email: 1,
            name: 1,
            username: 1,
            accesslevel: 1,
            status: 1
        } });
        return result;
    }

    async regNewUser(email, password, name, accesslevel ) {
        await dbconnection.insertOne("user", { email, password, name, accesslevel, status:"active" });
        return true;
    }
}

export default administrator = new administrator();