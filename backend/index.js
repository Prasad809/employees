require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./Users/Router");
const employeeRouter = require("./Employees/Router");
const auth = require("./AuthJwt/Auth");
const cmgpd = require("./AuthJwt/serverCmgpd");
const decryptMiddleware = require("./EncrptDecrypt/DecryptMiddleware");

const PORT = process.env.PORT || 8082;

const app = express();
app.use(express.json());
app.use(decryptMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    exposedHeaders: ["rt", "bt", "bt-exp", "rt-exp"]
}));

app.use("/user", userRouter);
app.use("/employee", auth.authMiddleWare, employeeRouter);
app.use('/cmgpd',cmgpd);

app.use('/tokens', auth.generateRtToken);

app.use('/', (req, res) => {
    res.send("<h1>Employee Management API is running</h1>");
});

app.listen(PORT, () => {
    console.log("Server Running At ", PORT);
});
