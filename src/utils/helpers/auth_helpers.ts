import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../../models/user";
import { Request } from "express";
import {
    AssociatedDataError,
    JwtError,
    MissingConfigError,
    UserNotFoundError,
} from "../custom-errors";
import { CreateUserRequest, UserAttributes } from "../../types/types";

interface Payload {
    id: number;
}

const generateHashedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const createAccessToken = (payload: Payload): string => {
    if (!config.ACCESS_TOKEN_SECRET)
        throw new MissingConfigError("ACCESS_TOKEN_SECRET");

    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
    });
};

const createRefreshToken = (payload: Payload): string => {
    if (!config.REFRESH_TOKEN_SECRET)
        throw new MissingConfigError("REFRESH_TOKEN_SECRET");

    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRY,
    });
};

const verifyAccessToken = (token: string) => {
    if (!config.ACCESS_TOKEN_SECRET)
        throw new MissingConfigError("ACCESS_TOKEN_SECRET");
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token: string) => {
    if (!config.REFRESH_TOKEN_SECRET)
        throw new MissingConfigError("REFRESH_TOKEN_SECRET");
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
};

// Log user with username and password and if credentials are valid it returns the user from db
const login = async (
    username: string,
    password: string
): Promise<UserAttributes> => {
    const user = await User.findOne({ where: { username } });

    if (!user) throw new UserNotFoundError("invalid username or password");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
        throw new UserNotFoundError("invalid username or password");

    return user;
};

// Only returns the token without the 'Bearer' word if there is a token otherwise it returns null
const getBearerToken = (req: Request) => {
    const authorization = req.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new JwtError("No token provided");
    }
    return authorization.replace("Bearer ", "");
};

const validateCredentials = (body: unknown): CreateUserRequest => {
    if (!body || typeof body !== "object")
        throw new AssociatedDataError("invalid username or password");

    const { username, password } = body as CreateUserRequest;

    if (typeof username !== "string" || username.trim() === "") {
        throw new AssociatedDataError("invalid username or password");
    }
    if (typeof password !== "string" || password.length < 6) {
        throw new AssociatedDataError("invalid username or password");
    }

    return {
        username,
        password,
    };
};

const AuthHelpers = {
    generateHashedPassword,
    createAccessToken,
    verifyAccessToken,
    login,
    getBearerToken,
    createRefreshToken,
    verifyRefreshToken,
    validateCredentials,
};

export default AuthHelpers;
