import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const UserPassword = ({ users }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const updateUser = event => {
        event.preventDefault();

        const form = event.target.closest("form");
        const allInputs = form.querySelectorAll("input, select");

        const status = {};
        for (let i = 0; i < allInputs.length; i++) {
            const elem = allInputs[i];
            const key = elem.id;
            const value = elem.value;

            status[key] = value
        }
        fetch(config.API + "/admin/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            },
            body: JSON.stringify(status)
        }).then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.status == 1) {
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
        <Form onSubmit={updateUser}>
            <Form.Group className="mb-3" >
                <Form.Label>User list</Form.Label>
                <Form.Select id="email" aria-label="Default select example">
                    {users.map(user => {
                        return (
                            <option value={user.email}>{user.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Passowrd</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    )
}

export default UserPassword;