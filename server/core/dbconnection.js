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

    async findWithProjection(collectionName, query, projection) {
        const result = await this.dbconn.collection(collectionName).find(query, projection).toArray();
        return result
    }
    async aggregate(collectionName, query) {
        const result = await this.dbconn.collection(collectionName).aggregate(query).toArray()
        return result
    }

    async insertOne(collectionName, query) {
        const result = await this.dbconn.collection(collectionName).insertOne(query);
        return true;
    }

    async updateOne(collectionName, searchQuery, updateQuery) {
        const result = await this.dbconn.collection(collectionName).updateOne(searchQuery,updateQuery);
        return true
    }
}

export default dbconnection = new dbconnection();