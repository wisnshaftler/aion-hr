import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";

const Admin = (props) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
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

        fetch(config.API + "/admin/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "barier " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data.data);
            })

    }, []);


    return (
        <>
            <h3>Users</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Access Level</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return <>
                                <tr>
                                    <td> {user.email} </td>
                                    <td> {user.status} </td>
                                    <td> {user.accesslevel} </td>
                                    <td> {user.name} </td>
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </Table>
            
        </>
    );

}

export default Admin;