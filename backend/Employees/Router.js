const express = require("express");

const Router = express.Router();
const employeeControl = require("./Controllers");

Router.post("/create", employeeControl.createEmployee);
Router.post("/actlist", employeeControl.activedemployeeList);
Router.post("/inActlist", employeeControl.inActivedemployeeList);
Router.post("/update", employeeControl.updateEmployee);
Router.post("/actEmp", employeeControl.activedEmployee);
Router.post("/delete", employeeControl.deleteEmployee);

module.exports = Router;
