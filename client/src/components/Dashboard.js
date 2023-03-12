import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Employee from "./Employee";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Dashboard = (props) => {
    const navigate = useNavigate();
    const [empList, setEmpList] = useState([]);
    const [deptList, setDepartment] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

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
                console.log(data.data);
                setEmpList(data.data);
            });

        response = fetch(config.API + "/dashboard/department", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        }).then(response => response.json())
        .then(data=> {
            setDepartment(data);
        })

    }, [])

    return (
        <div className="container" key={Math.random().toString()}>
            <Tabs
                defaultActiveKey="employees"
                id="dashboard-tab"
                className="mb-3"
            >
                <Tab eventKey="employees" title="Employee">
                    <h3 key={Math.random().toString()}>Employees</h3>
                    {
                        empList.map(function (employee) {
                            return <>
                            <Employee emp={employee} />
                            
                            </>
                        })
                    }
                </Tab>

            </Tabs>
        </div>
    )
}
export default Dashboard;