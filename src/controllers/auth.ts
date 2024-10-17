// Utils
import AuthHelpers from "../utils/helpers/auth_helpers";
import asyncHandler from "express-async-handler";
import config from "../utils/config";
import User from "../models/user";
import { JwtError, UserNotFoundError } from "../utils/custom-errors";

const refCookieOptions = {
    httpOnly: true,
    maxAge: config.REFRESH_TOKEN_EXPIRY * 1000,
};

// @Desc: login
// @Route: POST /api/auth
// @Access: Public
export const login = asyncHandler(async (req, res) => {
    const { username, password } = AuthHelpers.validateCredentials(req.body);

    const user = await AuthHelpers.login(username, password);

    const accessToken = AuthHelpers.createAccessToken({
        id: user.id,
    });

    const refreshToken = AuthHelpers.createRefreshToken({
        id: user.id,
    });

    res.cookie("ref_jwt", refreshToken, refCookieOptions);

    res.json({
        access_token: accessToken,
        username: user.username,
        role: user.role,
        active: user.active,
        id: user.id,
    });
});

// @Desc: sends back an access token if refresh token is valid
// @Route: GET /api/auth/refresh
// @Access: Public
export const refresh = asyncHandler(async (req, res) => {
    // Get refresh token from cookies
    const { ref_jwt } = req.cookies;

    // Throw error if cookies doesn't contain refresh token
    if (!ref_jwt || typeof ref_jwt !== "string")
        throw new JwtError("Invalid token");

    // Verify that it is valid
    const decoded = AuthHelpers.verifyRefreshToken(ref_jwt);

    // Throw error if token is invalid
    if (typeof decoded === "string" || !decoded.id)
        throw new JwtError("invalid token");

    // Create a new access token
    const accessToken = AuthHelpers.createAccessToken({
        id: decoded.id,
    });

    // Get target user
    const user = await User.findByPk(decoded.id);

    if (!user) throw new UserNotFoundError();

    // Send a successful response with the new access token
    res.status(200).json({
        access_token: accessToken,
        id: decoded.id,
        username: user.username,
        role: user.role,
        active: user.active,
    });
});

// @Desc: logs user out
// @Route: POST /api/auth/logout
// @Access: Public
export const logout = asyncHandler(async (_req, res) => {
    res.clearCookie("ref_jwt");
    res.status(200).json({ message: "Cookies cleared!" });
});

// @Desc: signup
// @Route: POST /api/auth/signup
// @Access: Public
export const signup = asyncHandler(async (req, res) => {
    const { username, password } = AuthHelpers.validateCredentials(req.body);

    const hashedPassword = await AuthHelpers.generateHashedPassword(password);

    const userObj = { username, password: hashedPassword };

    const createdUser = await User.create(userObj);

    // Send response with user data
    res.status(201).json({
        id: createdUser.id,
        username: createdUser.username,
        active: createdUser.active,
        role: createdUser.role,
    });
});
