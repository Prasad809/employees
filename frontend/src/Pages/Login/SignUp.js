import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction, RegisterAction } from "./Store/Action";
import { initialValues, validation } from "./validationSchema";
import "./Login.css";
import ThemeSwitcher from "../../libs/ThemeSwitcher/ThemeSwitcher";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errStatus, setErrStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const errClose = () => setErrStatus("");

  const handleSubmit = (values) => {
    const payload = {
      name: values?.fullName,
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    dispatch(RegisterAction(payload)).then((res) => {
      if (res?.payload?.data?.status) {
        navigate("/Login");
      } else {
        setErrStatus(res?.payload?.data?.message?.[0]?.description);
      }
      setLoading(false);
    });
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <div style={{ position: "relative", left: "280px" }}>
          <ThemeSwitcher />
        </div>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up to get started</p>

        {errStatus && <p className="error-banner">{errStatus}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form >
              <input
                name="fullName"
                placeholder="Full Name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
              {touched.fullName && errors.fullName && (
                <div className="error">{errors.fullName}</div>
              )}
              <input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                helperText={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <button type="submit" className="btn-primary-theme full-width" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </button>

            </Form>)}
        </Formik>

        <p className="auth-toggle">
          Already have an account? <Link to="/Login">Log In</Link>
        </p>

      </div>
    </div>
  );
}

export default SignUp;
