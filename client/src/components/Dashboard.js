import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";

const Dashboard = props=> {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(()=> {
        const token = window.localStorage.getItem("token")?.trim();
        if(token !== "" || token) {
            setToken(token);
        }else {
            setToken(null);
        }
    });

    if(token === null) {
        navigate("/login");
    }

    return (
        <div className="container">
        
        </div>
    );
}

export default Dashboard;