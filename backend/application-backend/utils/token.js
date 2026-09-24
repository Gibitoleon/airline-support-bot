import crypto from "crypto";
import bcrypt from "bcrypt";

const generateToken = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
};

const hashToken = async (token) => { 
    return await bcrypt.hash(token, 10);
};

 const verifyToken = async (token, tokenHash) => {
    return await bcrypt.compare(token, tokenHash);
};

export { generateToken, hashToken, verifyToken}