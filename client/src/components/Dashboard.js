import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Employee from "./Employee";
import EmployeeNew from "./EmployeeNew";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Dashboard = (props) => {
    const navigate = useNavigate();
    const [empList, setEmpList] = useState([]);
    const [deptList, setDepartment] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    console.log(setToken)

    useEffect(() => {
        const localToken = window.localStorage.getItem("token");
        if (!localToken) {
            return navigate("/login");
        } else {
            setToken(localToken);
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
                setDepartment(data);
            })

    }, [])


    const updateEmployee = event => {
        console.log(event.target)
    }

    return (
        <div className="container" key={Math.random().toString()}>
            <Tabs
                defaultActiveKey="employees"
                id="dashboard-tab"
                className="mb-3"
            >
                <Tab eventKey="employees" title="Employee">
                    <h3 key={Math.random().toString()}>Employees</h3>
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
                    <EmployeeNew department={deptList} />
                </Tab>

            </Tabs>
        </div>
    )
}
export default Dashboard;