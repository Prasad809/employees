const { decryptRequest } = require("./lookUpDecrypt");
const db = require("../dbConnection");
require('dotenv').config();
const encyptTy = process.env.ENCTYPE;

const decryptMiddleware = async (req, res, next) => {
    const [rows] = await db.query("SELECT * FROM cmgpd");
    const response = rows?.map(item => {
        if (item.status === "Y") {
            return {
                key: item.id,
                value: item.value
            };
        }
        return null;
    }).filter(Boolean);

    try {
        const encType = encyptTy|| "";
        const lookUp = response || []

        if (encType && req.body) {
            req.body = decryptRequest(req.body, encType, lookUp);
        }

        next();
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: [{ description: "Failed to decrypt request." }]
        });
    }
};

module.exports = decryptMiddleware;