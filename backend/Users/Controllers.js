const db = require("../dbConnection");
const bcrypt = require('bcryptjs');
const tokens = require("../AuthJwt/Auth");
require('dotenv').config();

const accessKey = process.env.ACCESS;
const refreshKey = process.env.REFRESH;

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: [{ description: "Something went wrong, Bad Request" }] });
        }
        const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

        if (existing.length > 0) {
            return res.status(200).json({ status: false, message: [{ description: "User already exists, try with another email" }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (name, email, password, isActive) VALUES (?,?,?,?)",
            [name, email, hashedPassword, "Y"]
        );
        return res.status(200).json({ status: true, message: [{ description: "User Register Successfully." }] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: [{ description: "Email and password are required" }]
            });
        }

        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = users[0];

        if (!user) {
            return res.status(200).json({
                status: false,
                message: [{ description: "User does not exist with these credentials" }]
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(200).json({ status: false, message: [{ description: "Invalid credentials" }] });
        }

        const rt = tokens.refreshToken({ email, id: user.id }, refreshKey);
        const bt = tokens.accessToken({ email, id: user.id }, accessKey);

        tokens.registerRefreshToken(rt.token);

        res.setHeader("bt", String(bt.token));
        res.setHeader("rt", String(rt.token));
        res.setHeader("bt-exp", bt.expiresAt);
        res.setHeader("rt-exp", rt.expiresAt);

        return res.status(200).json({
            status: true,
            message: [{ description: "User login successfully" }],
            userRefNum: user.id,
            userName: user.name,
            userEmail: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const logout = async (req, res) => {
    try {
        const rt = req.headers['rt'];
        if (rt) tokens.revokeRefreshToken(rt);
        return res.status(200).json({ status: true, message: [{ description: "Logged out successfully" }] });
    } catch (error) {
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

module.exports = { signUp, signIn, logout };
