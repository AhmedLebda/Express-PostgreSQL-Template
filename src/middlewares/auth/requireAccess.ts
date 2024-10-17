import AuthHelper from "../../utils/helpers/auth_helpers";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import {
    InactiveAccountError,
    JwtError,
    UserNotFoundError,
} from "../../utils/custom-errors";

/* 
* => Gives access to:
---------------------
* - Valid access token
* - Active account
*/
const requireAccessToken = asyncHandler(async (req, _res, next) => {
    const token = AuthHelper.getBearerToken(req);
    const decodedToken = AuthHelper.verifyAccessToken(token);

    if (typeof decodedToken === "string" || !decodedToken.id)
        throw new JwtError("invalid token");

    const currentUser = await User.findByPk(decodedToken.id);

    if (!currentUser) throw new UserNotFoundError("user not found");

    const isActive = currentUser.active;

    if (!isActive) throw new InactiveAccountError();

    req.user = currentUser;

    next();
});

export default requireAccessToken;
