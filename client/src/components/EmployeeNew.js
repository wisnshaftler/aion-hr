import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EmployeeNew = ({ dep, jobs }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(window.localStorage.getItem("token"));


    const newEmpHandler = (event) => {
        event.preventDefault();

        const closestForm = event.target.closest("form");
        const allInputs = closestForm.querySelectorAll("input, select")

        const newEmp = {}
        for(let i = 0; i < allInputs.length; i++) {
            const elem = allInputs[i];
            const name = elem.id;
            const value = elem.value?.trim();

            if (value === "" || !value) {
                return alert("Please fill all the inputs");
            }

            if(name == "contactno") {
                newEmp[name] = value.split(",");
                continue;
            }
            newEmp[name] = value;
            console.log(newEmp)
        }

        fetch(config.API + "/dashboard/new/employee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            },
            body: JSON.stringify(newEmp)
        }).then(response => response.json())
        .then(data=> {
            if(data.status == 1) {
                alert("Done");
                navigate("/dashboard")
                return;
            } else {
                alert("something went wrong. Please try again");
                return
            }
        })
    }

    return (
        <Form onSubmit={newEmpHandler}>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>EMP id</Form.Label>
                <Form.Control type="text" id="empid" placeholder="Emp id" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" id="fname" placeholder="First name" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" id="lname" placeholder="Last name" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>DOB</Form.Label>
                <Form.Control type="text" id="dob" placeholder="DOB" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Join Date</Form.Label>
                <Form.Control type="text" id="joindate" placeholder="Join Date" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Status</Form.Label>
                <Form.Select id="status" aria-label="Default select example">
                    <option value="active">active</option>
                    <option value="delete">delete</option>
                    <option value="resign">resign</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Department Id</Form.Label>
                <Form.Select id="departmentid" aria-label="Default select example">
                    {dep.map(data => {
                        return (
                            <option value={data._id}>{data.name}</option>
                        )
                    })}

                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Job Title Id</Form.Label>
                <Form.Select id="jobtitleid" aria-label="Default select example">
                    {jobs.map(data => {
                        return (
                            <option value={data._id}>{data.jobtitle}</option>
                        )
                    })}

                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>contact no</Form.Label>
                <Form.Control type="text" id="contactno" placeholder="Contact no" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" id="address" placeholder="Address" />
            </Form.Group>

            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    )
}

export default EmployeeNew;