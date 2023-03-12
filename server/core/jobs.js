import dbconnection from "../core/dbconnection.js";
import config from "../config/config.js";
import validation from "../core/validation.js";
import crypto from "crypto";

class jobs {

    async allJobs() {
        const result = await dbconnection.find("job", {});
        return result;
    }
}

export default jobs = new jobs();