import React, { useEffect, useState } from "react";

const EmployeeAttr = ({ id, name, value }) => {
    return (
        <div className="emp-attr" key={id+ Math.random().toString()} >
            <span key={id + name + Math.random().toString()}>{name} :- </span>
            <span key={id + value + Math.random().toString()}>{value}</span>
        </div>
    );
}

export default EmployeeAttr;