const db = require("../dbConnection");

const cmgpd = async (req, res) => {
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
        return res.json({ status: true, message: [{ code: "1002", description: "data retrieve successfully" }], lookUp: response, encypt: "AES" }).status(200)
    } catch (error) {
        return res.json({ status: false, message: [{ code: "error", description: "Internal Server Problem" }] }).status(500)
    }
}

module.exports = cmgpd;