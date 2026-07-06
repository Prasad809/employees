import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "./Store/Action";
import { signInVals, signValidation } from "./validationSchema";
import "./Login.css";
import ThemeSwitcher from "../../libs/ThemeSwitcher/ThemeSwitcher";
import AlertMsg from "../../libs/SoftAlert/AlertBox"

function Login({ setNxt }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errStatus, setErrStatus] = useState("");
  const errClose = () => setErrStatus("");

  const handleSubmit = (values) => {
    const payload = {
      password: values.password,
      email: values.email
    };
    setLoading(true);
    dispatch(authAction(payload)).then((res) => {
      if (res?.payload?.data?.status) {
        navigate("/Employees");
        setNxt("1");
      } else {
        setErrStatus(res?.payload?.data?.message?.[0]?.description);
      }
      setLoading(false);
    });
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <div style={{position:"relative",left:"280px"}}>
          <ThemeSwitcher />
        </div>
        <h2>Welcome Back</h2>
        {errStatus && <AlertMsg errClose={errClose} severity={"error"} errStatus={errStatus}/>}
        <p className="auth-subtitle">Log in to manage your employees</p>

        <Formik
          initialValues={signInVals}
          validationSchema={signValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form autoComplete="false">
              <input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
              />
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <button type="submit" className="btn-primary-theme full-width" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </Form>)}
        </Formik>

        <p className="auth-toggle">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;
