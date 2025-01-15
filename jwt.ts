import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Use a strong secret key from environment variables.

export function generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" }); // Token valid for 1 day
}

export function verifyToken(token: string): any {
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
        // console.log("Decoded inside verifyToken:", decoded); // Log the result
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error("Invalid or expired token");
    }
}
