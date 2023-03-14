import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewUser = ()=> {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [decodeToken, setDecodeToken] = useState([]);

    const submitNewUser = event => {
        event.preventDefault();
        const form = event.target.closest("form");
        const allInputs = form.querySelectorAll("input, select");
        
        const user = {};
        for(let i=0; i < allInputs.length; i++ ){
            const elem = allInputs[i];
            const key = elem.id;
            const value = elem.value;

            user[key] = value
        }
        fetch(config.API + "/admin/new/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(data=> {
            console.log(data);
            
            if(data.status == 1) {
                alert("Done");
                navigate("/dashboard")
                return;
            } else {
                alert(data.msg);
                return
            }
        })
    }
    return (
        <Form onSubmit={submitNewUser} >

        <Form.Group className="mb-3" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" id="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" id="name" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Access Level</Form.Label>
            <Form.Select id="accesslevel" aria-label="Default select example">
                <option value='admin'>Admin</option>
                <option value='hr'>hr</option>

            </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" >
            Submit
        </Button>
    </Form>
    )
}

export default NewUser;