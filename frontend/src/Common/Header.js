import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Tooltip } from "@mui/material";
import "./common.css";
import token from "./token";
import ThemeSwitcher from "../libs/ThemeSwitcher/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Pages/Login/Store/Action";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const auth = useSelector(state =>state?.authReducer);
    const avatar = auth?.user?.userName?.[0]?.toUpperCase();
    


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logOut = () => {
        dispatch(logoutAction()).then(res =>{
            if(res?.payload?.data?.status){
                navigate("/Login")
            }
        });
        token.setTokens(null);
        token.setExpryTm(null);
        setOpen(false);
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className="header">
                <div className="nav-left">
                    <span className="brand-title">Employee Management System</span>
                </div>

                <div className="nav-right" ref={menuRef}>
                    <ThemeSwitcher />

                    <Tooltip title="Menu">
                        <span
                            className="material-symbols-outlined menu-icon"
                            onClick={() => setOpen(!open)}
                        >
                            list
                        </span>
                    </Tooltip>

                    {open && (
                        <div className="dropdown-menu">
                            <div className="menu-item" onClick={() => { navigate("/Employees"); setOpen(false); }}>
                                🧑‍💼 Active Employees
                            </div>
                            <div className="menu-item" onClick={() => { navigate("/InActEmployee"); setOpen(false); }}>
                                🧑‍💼 InAct Employees
                            </div>
                            <div className="menu-item logout" onClick={logOut}>
                                🚪 Logout
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;
