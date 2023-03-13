import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import config from "../config/config.js";

const secret = config.JWT_SECRET;
const refresh = config.JWT_REFRESH;
const refreshTimeout = config.JWT_REFRESH_TIMEOUT;
const tokenTimeout = config.JWT_TOKEN_TIMEOUT;

function generateAccessToken(user) {
    try {
        const token = jwt.sign(user, secret, { expiresIn: tokenTimeout });
        return [true, token];
    } catch (e) {
        return [false, e.message];
    }
}

function generateRefreshToken(user) {
    try {
        const token = jwt.sign(user, refresh, { expiresIn: refreshTimeout });
        return [true, token];
    } catch (error) {
        return [false, error.message];
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(200).send({ status:0, msg:"unauthorized", data: {} } );

    return jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(200).send({ status:0, msg:"unauthorized", data: {} } );
        req.user = user;
        next();
    })
}

function authenticateCookie(req, res, next) {
    const authCookie = "" +req.cookies["barrier-token"]?.trim();
    
    if(authCookie == "") return res.status(301).redirect("/auth/unauthorized");
    
    return jwt.verify(authCookie, secret, (err, user) => {
        if(err) return res.status(301).redirect("/auth/unauthorized");
        req.user = user;
        next();
    });
}

function validateRefreshToken(token) {
    if (token == null || token.trim() == "") {
        return [false, "token expired"];
    }

    return jwt.verify(token, refresh, (err, user ) => {
        if(err) return [false, err];
        return [true, user];
    })
}


export default { generateAccessToken, authenticateToken, generateRefreshToken, validateRefreshToken, authenticateCookie }