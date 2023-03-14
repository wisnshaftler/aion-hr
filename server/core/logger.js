import dbconnection from "../core/dbconnection.js";

class logger {

    log(data) {
        const obj = {data:data}
        dbconnection.insertOne("log", obj)
    }
}

export default logger = new logger();