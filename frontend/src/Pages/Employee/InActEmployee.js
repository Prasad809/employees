import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInActvedEmpAct,updateToActiveEmpAct } from "./Store/Actions";
import "./Employee.css";
import { Form, Formik } from "formik";
import { initialValues, validation } from "./validationSchema";
import AlertMsg from "../../libs/SoftAlert/AlertBox"
import Loader from "../../libs/Loader/Loader"
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";


const loaderfun=(load)=>{
    return load ? <Loader /> : null;
}
function InActEmployee({ }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errStatus, setErrStatus] = useState("");
    const errClose = () => setErrStatus("");
    const [editingId, setEditingId] = useState(null);
    const [popup,setPopup] = useState(false);


    const fetchEmployees = () => {
        setLoading(true);
        dispatch(fetchInActvedEmpAct({})).then(res => {
            if (res?.payload?.data?.status) {
                setEmployees(res?.payload?.data?.employees);
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const resetForm = () => {
        setEditingId(null);
    };

    const handleActiveEmp = () => {
        setLoading(true);
        dispatch(updateToActiveEmpAct({ id :editingId?.id})).then(res => {
            if (res?.payload?.data?.status) {
                navigate("/Employees");
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description)
            }
            setLoading(false);
        });
    };
    
    const handleOpen = (emp) => {
        setPopup(true);
        setEditingId(emp);
    };

    return (
        <div className="employee-page">
            {loaderfun(loading)}
            <div className="glass-card employee-table-card">
                <h2>InActived Employee Directory</h2>
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
                                            <button className="btn-success small" onClick={() => handleOpen(emp)}>Active</button>
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
                            Do you want to activate <b>{editingId?.name}</b>?
                        </p>

                        <div className="modal-actions">
                            <button className="modal-btn cancel" onClick={() => setPopup(false)}>
                                Cancel
                            </button>

                            <button className="modal-btn confirm" onClick={handleActiveEmp}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InActEmployee;
