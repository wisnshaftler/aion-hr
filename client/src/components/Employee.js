import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import "./Employee.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Employee = ({ emp }) => {

    return (
        <>
            {
                Object.keys(emp).map((value) => {
                    if (value !== "leftdate" && value !== "_id") {
                        switch (value) {
                            case "departmentid":
                            case "jobtitleid":
                                return <td>
                                <Form.Control data-emp={emp._id} data-attr-type={value} type="text" readOnly defaultValue={emp[value]} />
                                </td>
                            case "status":
                                return <td>
                                <Form.Control type="text" data-emp={emp._id} data-attr-type={value} placeholder="active, delete, resign" defaultValue={emp[value]} />
                                </td>
                            default:
                                return <td>
                                <Form.Control type="text" data-emp={emp._id} data-attr-type={value}  defaultValue={emp[value]} />
                                </td>
                        }
                    }
                    return <></>
                })
            }
        </>

    )
}

export default Employee;