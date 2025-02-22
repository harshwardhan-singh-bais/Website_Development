import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secretkey = process.env.secret;
dotenv.config(); // Load environment variables

export function createTokenForUser(user) {
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secretkey , { expiresIn: "1h" });
    return token;
}
