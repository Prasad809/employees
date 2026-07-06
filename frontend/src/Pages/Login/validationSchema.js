import * as Yup from "yup";
export const initialValues = {
    fullName: "",
    email: "",
    password: "",
};

export const validation = Yup.object({
    fullName: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Full Name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
});

export const signInVals = {
    email: "",
    password: "",
};

export const signValidation = Yup.object({
    email: Yup.string().email()
    .required("Email is required"),

    password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
});

