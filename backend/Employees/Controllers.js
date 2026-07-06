const db = require("../dbConnection");

const createEmployee = async (req, res) => {
    try {
        const { name, email, department, role, salary } = req.body;

        if (!name || !email || !department || !role || !salary) {
            return res.status(400).json({ status: false, message: [{ description: "Something went wrong, Bad Request" }] });
        }

        const [existing] = await db.query("SELECT id FROM employees WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(200).json({ status: false, message: [{ description: "An employee with this email already exists" }] });
        }

        const [result] = await db.query(
            "INSERT INTO employees (name, email, department, role, salary, isActive) VALUES (?,?,?,?,?,?)",
            [name, email, department, role, salary, "Y"]
        );

        return res.status(200).json({
            status: true,
            message: [{ description: "Employee Created Successfully." }],
            employeeId: result.insertId
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const activedemployeeList = async (req, res) => {    
    try {
        const [employees] = await db.query(
            "SELECT id, name, email, department, role, salary FROM employees WHERE isActive = 'Y' ORDER BY id DESC"
        );
        return res.status(200).json({
            status: true,
            totalEmployees: employees.length,
            employees: employees
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};
const inActivedemployeeList = async (req, res) => {
    try {
        const [employees] = await db.query(
            "SELECT id, name, email, department, role, salary FROM employees WHERE isActive = 'N' ORDER BY id DESC"
        );
        return res.status(200).json({
            status: true,
            totalEmployees: employees.length,
            employees: employees
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id, name, email, department, role, salary } = req.body;

        if (!id) {
            return res.status(400).json({ status: false, message: [{ description: "Employee ID is required" }] });
        }

        const [result] = await db.query(
            "UPDATE employees SET name = ?, email = ?, department = ?, role = ?, salary = ? WHERE id = ?",
            [name, email, department, role, salary, id]
        );

        if (result.affectedRows === 0) {
            return res.status(200).json({ status: false, message: [{ description: "Employee not found" }] });
        }

        return res.status(200).json({ status: true, message: [{ description: "Employee updated successfully." }] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: false, message: [{ description: "Employee ID is required" }] });
        }

        // Soft delete, consistent with isActive flag convention
        const [result] = await db.query("UPDATE employees SET isActive = 'N' WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(200).json({ status: false, message: [{ description: "Employee not found" }] });
        }

        return res.status(200).json({ status: true, message: [{ description: "Employee deleted successfully." }] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

const activedEmployee = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: false, message: [{ description: "Employee ID is required" }] });
        }

        const [result] = await db.query(
            "UPDATE employees SET isActive = ? WHERE id = ?",
            ["Y", id]
        );

        if (result.affectedRows === 0) {
            return res.status(200).json({ status: false, message: [{ description: "Employee not found" }] });
        }

        return res.status(200).json({ status: true, message: [{ description: "Employee Actived successfully." }] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: [{ description: "Internal Server Problem" }] });
    }
};

module.exports = { createEmployee, activedemployeeList,inActivedemployeeList, updateEmployee, deleteEmployee,activedEmployee };
