import { UserAttributes } from "../types";

declare global {
    namespace Express {
        interface Request {
            user?: UserAttributes;
        }
    }
}
