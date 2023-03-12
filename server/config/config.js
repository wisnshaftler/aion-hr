import * as dotenv from 'dotenv';
dotenv.config()

const config = {
    dbURL: process.env.DB,
    PORT: process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_REFRESH: process.env.JWT_REFRESH,
    JWT_REFRESH_TIMEOUT: process.env.JWT_REFRESH_TIMEOUT,
    JWT_TOKEN_TIMEOUT: process.env.JWT_TOKEN_TIMEOUT,
    USER_DATA_LIFETIME: process.env.USER_DATA_LIFETIME,
    SALT: process.env.SALT
}
export default config ;