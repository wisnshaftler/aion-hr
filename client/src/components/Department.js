import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Department = ({ dep }) => {
    return (
        <>
            {
                dep.map(singleDep => {
                    return <tr>
                        <td> {singleDep._id} </td>
                        <td> {singleDep.name} </td>
                        <td> {singleDep.fname + " " + singleDep.lname} </td>
                    </tr>
                })
            }
        </>
    )
}

export default Department;