import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const secretkey = process.env.secret;


export function createTokenForUser(user) {
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secretkey , { expiresIn: "1h" });
    return token;
}
