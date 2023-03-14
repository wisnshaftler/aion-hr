import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Employee from "./Employee";


const EmployeeSearch = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [empList, setEmpList] = useState([]);

    const searchUserByEmpId = event => {
        event.preventDefault();

        const form = event.target.closest("form");
        const empid = form.querySelector("#searchempid").value;

        fetch(config.API + "/dashboard/search/employee/empid/" + empid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setEmpList(data.result);
            })

    }

    const searchUserByName = event => {
        event.preventDefault();

        const form = event.target.closest("form");
        const empname = form.querySelector("#searchempname").value;

        fetch(config.API + "/dashboard/search/employee/name/" + empname, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setEmpList(data.result);
            })

    }

    return (
        <>
            <Form onSubmit={searchUserByEmpId}>
                <Form.Group className="mb-3" >
                    <Form.Label>Enter Emp id</Form.Label>
                    <Form.Control type="text" id="searchempid" placeholder="empid" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

            <Form onSubmit={searchUserByName}>
                <Form.Group className="mb-3" >
                    <Form.Label>Enter Emp Name</Form.Label>
                    <Form.Control type="text" id="searchempname" placeholder="empid" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

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

                    </tr>
                </thead>
                <tbody>
                    {
                        empList.map(function (employee) {
                            return (
                                <tr>
                                    <Employee emp={employee} />

                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default EmployeeSearch;