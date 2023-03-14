import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const DepartmentNew = ({ emp }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [decodeToken, setDecodeToken] = useState([]);

    const newDepartment = event=> {
        event.preventDefault();
        const form = event.target.closest("form");
        const allInputs = form.querySelectorAll("input, select");
        const newDep = {};

        for(let i = 0; i < allInputs.length; i++) {
            const dep = allInputs[i];
            const key = dep.id;
            const value = dep.value;

            newDep[key]=value;
        }
        
        fetch(config.API + "/dashboard/new/department", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            },
            body: JSON.stringify(newDep)
        })
        .then(resp=> {
            return resp.json();
        })
        .then(data=>{
            console.log(data)
            if(data.status == 0) {
                alert("Invalid inputs please check and try again");
                return;
            }
            alert("Done");
            navigate("/dashboard");
        })
    }

    return (<Form onSubmit={newDepartment}>


        <Form.Group className="mb-3" >
            <Form.Label>Department Name</Form.Label>
            <Form.Control type="text" id="name" placeholder="Department Name" />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Department Head</Form.Label>
            <Form.Select id="depheadid" aria-label="Default select example">
                {
                    emp.map( value=> {
                        return <option value={value.empid}>
                            {value.fname} {value.lname}
                        </option>
                    } )
                }
            </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" >
            Submit
        </Button>
    </Form>
    )
}

export default DepartmentNew;