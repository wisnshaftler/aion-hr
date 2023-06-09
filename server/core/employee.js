import dbconnection from "../core/dbconnection.js";
import config from "../config/config.js";
import validation from "../core/validation.js";
import crypto from "crypto";

class employee {

    /**
     * send any employee related data to find specific employee such as name or id
     * @param {Object} employee empty for all. {id: 123, name: "John"}
     * @returns {Array}
     */
    async find(employee = {}) {
        const result = await dbconnection.find("employee", employee);
        return result;
    }

    async regEmployee(empid, fname, lname, dob, joindate, status, departmentid, jobtitleid, contactno, address) {
        dbconnection.insertOne("employee", {
            empid, fname, lname, dob, joindate, status, departmentid, jobtitleid, contactno, address
        })
        return true;
    }

    async updateEmployee(empid, empData) {
        dbconnection.updateOne("employee", { empid }, {$set: empData},);
        return true;
    }
}

export default employee = new employee();