import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import "./Employee.css";

const Employee = ({ emp }) => {
    return (
        <>
            {
                Object.keys(emp).map((value) => {
                    if(value !== "leftdate" && value !== "_id") {
                        return <td>{emp[value]}</td>
                    }
                    return <></>
                })
            }
        </>

    )
}

export default Employee;