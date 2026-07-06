import * as Yup from "yup";
export const initialValues = {
    name: "",
    email: "",
    department: "",
    role: "",
    salary: ""
};

export const validation = Yup.object({
    name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Full Name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    department: Yup.string()
        .required("Select any one of department"),
    role: Yup.string()
        .required("Select Your Role"),
    salary: Yup.string()
        .required("Salary is required"),
});