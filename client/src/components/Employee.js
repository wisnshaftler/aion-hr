import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import EmployeeAttr from "./EmployeeAttr";
import "./Employee.css";

const Employee = ({ emp }) => {
    return (

        <div className="employee" key={emp._id}>
            <div className="emp-details">
                {Object.keys(emp).map((value, index) => {
                    return <>
                        <EmployeeAttr id={emp._id + index} name={value} value={emp[value]} />
                    </>
                })}
            </div>
            <div className="emp-action">action</div>
        </div>

    );
}

export default Employee;