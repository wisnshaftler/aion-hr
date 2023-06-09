import dbconnection from "../core/dbconnection.js";
import config from "../config/config.js";
import validation from "../core/validation.js";
import crypto from "crypto";

class department {

    async allDepWithHead() {
        const result = await dbconnection.aggregate("department", [
            { $lookup: { from: "employee", localField: "depheadid", foreignField: "empid", as: "dephead" } }, 
            
            { $project: {
                _id: 1,
                fname: {$first:'$dephead.fname'},
                lname: {$first: '$dephead.lname'},
                empid: {$first: '$dephead.empid'},
                name: 1
            } }
        ])
        return result;
    } 

    async newDepartment(name, depheadid) {
        const departmentJSON = {
            name, depheadid
        }
        const result =  await dbconnection.insertOne("department", departmentJSON );
        return true;
    }

    async getOneDep(name) {
        const result = await dbconnection.find("department", { name });
        return result;
    }
}

export default department = new department();