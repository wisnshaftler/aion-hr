import express from "express";
import dbconnection from "../core/dbconnection.js";
import auth from "../middleware/auth.js";
import validation from "../core/validation.js";
import crypto from "crypto";
import config from "../config/config.js";
import employee from "../core/employee.js";
import jobs from "../core/jobs.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/employee", auth.authenticateToken, async (req, res) => {
    const user = req.user;

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    const result = await employee.find();
    return res.status(200).send({ status: 1, msg: "Done", data: result });
});

dashboardRoute.get("/department", auth.authenticateToken, async (req, res) => {
    const user = req.user;

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    const result = await dbconnection.aggregate("department")
    res.status(200).send({ status: 1, msg: "done", data: result });
    return;
});

dashboardRoute.get("/search/employee/name/:name", auth.authenticateToken, async (req, res) => {
    const user = req.user;
    const name = req.params.name;

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    const result = await employee.find( { fname: new RegExp(name, 'g') } );
    return res.status(201).send({ status:1, msg:"done", result: result })
});

dashboardRoute.get("/search/employee/empid/:empid", auth.authenticateToken, async (req, res) => {
    const user = req.user;
    const empid = req.params.empid;

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    const result = await employee.find( { empid: empid } );
    return res.status(201).send({ status:1, msg:"done", result: result })
});

dashboardRoute.get("/jobs", auth.authenticateToken, async(req, res)=>{
    const user = req.user;

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    const result = await jobs.allJobs();
    return res.status(200).send( { status:1, msg: "done", result: result });
});

dashboardRoute.post("/new/employee", auth.authenticateToken, async(req,res)=>{
    const user = req.user;

    //empid, fname, lname, dob, joindate, leftdate, status, departmentid, jobtitleid, contactno, address
    const fname = req.body?.fname?.trim();
    const lname = req.body?.lname?.trim();
    const empid = req.body?.empid?.trim();
    const dob = req.body?.dob?.trim();
    const joindate = req.body?.joindate?.trim();
    const departmentid = req.body?.departmentid?.trim();
    const jobtitleid = req.body?.jobtitleid?.trim();
    const contactno = req.body?.contactno;
    const address = req.body?.address?.trim();

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    //check employee number already use
    const isUsedEmp = await employee.find({ empid });
    if(isUsedEmp.length > 0 ) {
        return res.status(200).send({ status:0, validData:"EMP number already use", data:[] });
    }

    //validate user data
    const validData = validation.newUserValidate(fname, lname, empid, dob, joindate, departmentid, jobtitleid, contactno, address);
    if(!validData[0]) {
        return res.status(200).send({ status:0, msg: validData[1], data: {} });
    }

    //add new emp to db
    const result = await employee.regEmployee(empid, fname, lname, dob, joindate, "active", departmentid, jobtitleid,
    contactno, address);

    return res.send({ status: 1, msg: "Success", data: [] });
});

dashboardRoute.put("/update/employee", auth.authenticateToken, async(req, res)=>{
    const user = req.user;
    //empid, fname, lname, dob, joindate, leftdate, status, departmentid, jobtitleid, contactno, address
    const fname = req.body?.fname?.trim();
    const lname = req.body?.lname?.trim();
    const empid = req.body?.empid?.trim();
    const dob = req.body?.dob?.trim();
    const joindate = req.body?.joindate?.trim();
    const departmentid = req.body?.departmentid?.trim();
    const jobtitleid = req.body?.jobtitleid?.trim();
    const contactno = req.body?.contactno;
    const address = req.body?.address?.trim();
    const status = req.body?.status?.trim();

    const array = ["admin", "hr"];
    if (!array.includes(user.role)) return res.status(401).send({ status: 0, msg: "unauthorized", data: {} });

    //validate user data
    const validData = validation.newUserValidate(fname, lname, empid, dob, joindate, departmentid, jobtitleid, contactno, address);
    if(!validData[0]) {
        return res.status(200).send({ status:0, msg: validData[1], data: {} });
    }

    let userData = {};
    let today = "";

    const dateObj = new Date();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    today = year+"-"+month+"-"+day;

    if(status == "resign" ){
        userData = {
            empid, fname, lname, dob, joindate, status:"resign", departmentid, jobtitleid, contactno, address,
            leftdate:today
        }
    }
    if(status == "delete") {
        userData = {
            empid, fname, lname, dob, joindate, status:"delete", departmentid, jobtitleid, contactno, address,
            leftdate:""
        }
    }

    if(status == "active") {
        userData = {
            empid, fname, lname, dob, joindate, status:"active", departmentid, jobtitleid, contactno, address,
            leftdate:""
        }
    }

    if(!["resign", "delete", "active"].includes(status)) {
        return res.status(200).send({ status:0, msg: "User data is invalid", data: {} });
    }
    
    employee.updateEmployee(empid, userData);
    return res.send({ status:1, msg:"success", data:[] });
});



export default dashboardRoute;