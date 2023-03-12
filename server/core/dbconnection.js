import { MongoClient } from "mongodb";
import config from "../config/config.js";

class dbconnection {
    dbconn;
    client;

    async initConnection() {
        try {
            this.client = await MongoClient.connect(config.dbURL, { useUnifiedTopology: true });
            this.dbconn = this.client.db("aionhr");
            return true;
        } catch (e) {
            return false;
        }
    }

    async find(collectionName, query) {
        const result = await this.dbconn.collection(collectionName).find(query).toArray();
        return result
    }
}

export default dbconnection = new dbconnection();