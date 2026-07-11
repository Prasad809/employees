import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpAct, createEmpAct, updateEmpAct, inActiveEmpAct } from "./Store/Actions";
import "./Employee.css";
import { Form, Formik } from "formik";
import { initialValues, validation } from "./validationSchema";
import AlertMsg from "../../libs/SoftAlert/AlertBox"
import Loader from "../../libs/Loader/Loader"

const departments = [
    { key: "HR", value: "Human Resources" },
    { key: "ENG", value: "Engineering" },
    { key: "FIN", value: "Finance" },
    { key: "MKT", value: "Marketing" },
    { key: "SALES", value: "Sales" },
    { key: "OPS", value: "Operations" },
    { key: "IT", value: "Information Technology" },
    { key: "ADMIN", value: "Administration" },
];

const roles = [
    { key: "MANAGER", value: "Manager" },
    { key: "TL", value: "Team Lead" },
    { key: "FE_DEV", value: "Front  end Developer" },
    { key: "BE_DEV", value: "Backend Developer" },
    { key: "FS_DEV", value: "Full Stack Developer" },
    { key: "QA", value: "QA Engineer" },
    { key: "HR_EXEC", value: "HR Executive" },
    { key: "ACCOUNTANT", value: "Accountant" },
    { key: "SALES_EXEC", value: "Sales Executive" },
    { key: "MARKETING_EXEC", value: "Marketing Executive" },
    { key: "SUPPORT", value: "Support Executive" },
    { key: "INTERN", value: "Intern" },
];
const loaderfun=(load)=>{
    return load ? <Loader /> : null;
}
function Employee({ setNxt }) {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialVals, setInitialVal] = useState(initialValues);
    const [errStatus, setErrStatus] = useState("");
    const errClose = () => setErrStatus("");
    const formikRef=useRef(null);
    const [popup,setPopup] = useState(false);
    const [selectEmp,setSelectEmp] = useState({});

    const fetchEmployees = () => {
        setLoading(true);
        dispatch(fetchEmpAct({})).then(res => {
            if (res?.payload?.data?.status) {
                setEmployees(res?.payload?.data?.employees);
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
        })
    }
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const resetForm = () => {
        setInitialVal(initialValues);
        setEditingId(null);
    };

    const handleUpdate = (values) => {
        const payload = {
            id: editingId,
            name: values?.name,
            email: values?.email,
            department: values?.department,
            role: values?.role,
            salary: values?.salary
        }
        setLoading(true);
        dispatch(updateEmpAct(payload)).then(res => {
            if (res?.payload?.data?.status) {
                fetchEmployees();
                resetForm();
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
        });
    }
    const handleSubmit = (values) => {
        const payload = {
            name: values?.name,
            email: values?.email,
            department: values?.department,
            role: values?.role,
            salary: values?.salary
        }
        setLoading(true);
        dispatch(createEmpAct(payload)).then(res => {
            if (res?.payload?.data?.status) {
                formikRef.current?.resetForm();
                setEditingId(null);
                fetchEmployees();
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
        });
    };

    const handleEdit = (emp) => {
        setEditingId(emp.id);
        setInitialVal({ name: emp.name, email: emp.email, department: emp.department, role: emp.role, salary: emp.salary });
    };

    const handleOpen = (emp) => {
        setPopup(true);
        setSelectEmp(emp);
    };

    const handleInActEmp = () => {
        setLoading(true);
        dispatch(inActiveEmpAct({ id:selectEmp?.id })).then(res => {
            if (res?.payload?.data?.status) {
                fetchEmployees();
                resetForm();
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
            setPopup(false);
        });
    };

    return (
        <div className="employee-page">
            {loaderfun(loading)}
            <div className="glass-card employee-form-card">
                <AlertMsg severity={"error"} errClose={errClose} errStatus={errStatus} />
                <h2>{editingId ? "Update Employee" : "Add New Employee"}</h2>
                <Formik
                    initialValues={initialVals}
                    validationSchema={validation}
                    onSubmit={editingId ? handleUpdate : handleSubmit}
                    enableReinitialize
                    innerRef={formikRef}
                >
                    {({ values, handleChange, handleBlur, touched, errors }) => (
                        <Form className="employee-form-grid">

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="error">
                                    {touched.name && errors.name ? errors.name : ""}
                                </span>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="error">
                                    {touched.email && errors.email ? errors.email : ""}
                                </span>
                            </div>

                            <div className="form-group">
                                <select
                                    name="department"
                                    value={values.department}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Department</option>

                                    {departments.map((dept) => (
                                        <option key={dept.key} value={dept.key}>
                                            {dept.value}
                                        </option>
                                    ))}
                                </select>

                                <span className="error">
                                    {touched.department && errors.department ? errors.department : ""}
                                </span>
                            </div>

                            <div className="form-group">
                                <select
                                    name="role"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Role</option>

                                    {roles.map((role) => (
                                        <option key={role.key} value={role.key}>
                                            {role.value}
                                        </option>
                                    ))}
                                </select>

                                <span className="error">
                                    {touched.role && errors.role ? errors.role : ""}
                                </span>
                            </div>

                            <div className="form-group">
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Salary"
                                    value={values.salary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="error">
                                    {touched.salary && errors.salary ? errors.salary : ""}
                                </span>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-primary-theme">
                                    {editingId ? "Update" : "Add"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        className="btn-outline-theme"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                        </Form>)}</Formik>
            </div>

            <div className="glass-card employee-table-card">
                <h2>Actived Employee Directory</h2>
                {loading ? (
                    <Loader />
                ) : employees.length === 0 ? (
                    <p className="empty-state">No employees yet. Add one above.</p>
                ) : (
                    <div className="table-wrapper">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.role}</td>
                                        <td>₹{Number(emp.salary).toLocaleString()}</td>
                                        <td>
                                            <button className="btn-outline-theme small" onClick={() => handleEdit(emp)}>Edit</button>
                                            <button className="btn-delete small" onClick={() => handleOpen(emp)}>InActive</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
             {popup && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p>
                            Do you want to InActivate <b>{selectEmp?.name}</b>?
                        </p>

                        <div className="modal-actions">
                            <button className="modal-btn cancel" onClick={() => setPopup(false)}>
                                Cancel
                            </button>

                            <button className="modal-btn confirm" onClick={handleInActEmp}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employee;
