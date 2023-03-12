import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";


const Login = props=> {
    const navigate = useNavigate();

    const [ emailValue, setemailValue ] = useState();
    const [ passwordValue, setPasswordValue ] = useState();

    const loginHandler = async event=>{
        event.preventDefault();
        const result = await fetch(config.API + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });

        const response = await result.json();
        if(response.status === 1) {
            window.localStorage.setItem("token", response.data.accessToken);
            window.localStorage.setItem("refreshToken", response.data.refreshToken);
            navigate("/dashboard");
        } else {
            alert("Email or password is incorrect");
        }
    }

    const emailHandler = event=> {
        setemailValue(event.target.value);
    }

    const passwordHandler = event=> {
        setPasswordValue(event.target.value);
    }

    return (
        <>
            <div className="loginWrapper">
                <h1>Login</h1>
                <form className="login-form" onSubmit={loginHandler}>
                    <label htmlFor="#email">Email</label>
                    <input type="text" id="email" onChange={emailHandler} name="email"/>

                    <label htmlFor="#password">Password</label>
                    <input type="password" onChange={passwordHandler} name="password" />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;