import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Employee from "./Employee";
import EmployeeNew from "./EmployeeNew";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";

import Form from 'react-bootstrap/Form';
import Department from "./Department";
import Job from "./Job";
import Admin from "./Admin";
import DepartmentNew from "./DepartmentNew";
import EmployeeSearch from "./EmployeeSearch";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [empList, setEmpList] = useState([]);
    const [deptList, setDepartment] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [decodeToken, setDecodeToken] = useState([]);

    useEffect(() => {
        const localToken = window.localStorage.getItem("token");
        if (!localToken) {
            return navigate("/login");
        } else {
            setToken(localToken);
            setDecodeToken(jwt_decode(window.localStorage.getItem("token")));
        }


        let response = fetch(config.API + "/dashboard/employee", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        }).then(response => response.json())
            .then(data => {
                if (data.status === 0) {
                    navigate("/login")
                }
                setEmpList(data.data);
            }).catch(reason => {
                console.log(reason)
            })

        response = fetch(config.API + "/dashboard/department", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        }).then(response => response.json())
            .then(data => {
                if (data.status === 0) {
                    navigate("/login")
                }
                console.log(data)
                setDepartment(data.data);
            })

        response = fetch(config.API + "/dashboard/jobs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        }).then(response => response.json())
            .then(data => {
                if (data.status === 0) {
                    navigate("/login")
                }
                console.log(data)
                setJobs(data.data);
            })

    }, [])


    const updateEmployee = event => {
        const empid = event.target.dataset.empid;
        
        //get all elements
        const allInputs = document.querySelectorAll(`[data-emp="${empid}"]`);
        const employee = {}
        for(let i = 0; i< allInputs.length; i++){
            const emp = allInputs[i];
            const key = emp.dataset.attrType;
            const value = emp.value;
            if(key == "contactno") {
                employee[key] = value.split(",")
                continue;
            }
            employee[key] = value
        }
        fetch(config.API + "/dashboard/update/employee", {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            },
            body:JSON.stringify(employee)
        })
        .then(resp=> resp.json())
        .then(data=>{
            alert("done");
            navigate("/dashboard")
        })
    }

    const logoutMe = event=> {
        
        event.preventDefault();
        window.localStorage.setItem("token", "");
        navigate("/login")
    }

    return (
        <div className="container" key={Math.random().toString()}>
            <Tabs
                defaultActiveKey="employees"
                id="dashboard-tab"
                className="mb-3">

                <Tab eventKey="employees" title="Employee">
                    <h3 key={Math.random().toString()}>Employees </h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>empid</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>DOB</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>department</th>
                                <th>Job title</th>
                                <th>contactno</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empList.map(function (employee) {
                                    return (
                                        <tr>
                                            <Employee emp={employee} />
                                            <td>
                                                <Button variant="primary" onClick={updateEmployee} data-empid={employee._id}>Update</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                    <hr />
                    <h3>New Employee</h3>
                    <EmployeeNew dep={deptList} jobs={jobs} />
                </Tab>

                <Tab eventKey="searchEmp" title="Search Employee">
                    <EmployeeSearch />
                </Tab>

                <Tab eventKey="department" title="Department">
                    <h3>Department</h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Department Id</th>
                                <th>Department Name</th>
                                <th>Department Head</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Department dep={deptList} />
                        </tbody>
                    </Table>
                    <DepartmentNew emp={empList} />
                </Tab>

                <Tab eventKey="jobs" title="Jobs">
                    <h3>Jobs</h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>JOB Id</th>
                                <th>Job Name</th>
                                <th>Job Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Job job={jobs} />
                        </tbody>
                    </Table>

                </Tab>



                {decodeToken.role === "admin" ? (
                    <Tab eventKey="admin" title="admin">
                        <Admin />
                    </Tab>
                ) : (
                    <></>
                )
                }

                <Tab eventKey="logout" title="Logout">
                    <button onClick={logoutMe}>Logout</button>
                </Tab>
            </Tabs>

        </div>
    )
}
export default Dashboard;