import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MenuItem } from "@mui/material";

import Field from "../../libs/InputField/Field";
import Dropdown from "../../libs/Dropdown/Dropdown";

import "./todo.css";

const initialValues = {
  title: "",
  description: "",
  dueDate: "",
  status: "",
  priority: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.string().required("Due Date is required"),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required"),
});

const statusList = [
  { id: 1, name: "Pending" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

const priorityList = [
  { id: 1, name: "Low" },
  { id: 2, name: "Medium" },
  { id: 3, name: "High" },
];

function Todo() {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    /*
    axios.post("/todo", values)
      .then(...)
      .catch(...)
    */

    resetForm();
  };

  return (
    <div className="todo-page">
      <div className="todo-card">

        <div className="todo-header">
          <h2 className="todo-title">Create Todo</h2>
          <p className="todo-subtitle">
            Organize your work by creating a new task.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form className="todo-form">
              <Field
                label="Title"
                name="title"
                placeholder="Enter todo title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />

              <Field
                label="Due Date"
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dueDate && Boolean(errors.dueDate)}
                helperText={touched.dueDate && errors.dueDate}
              />

              <div className="todo-full">
                <Field
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.description &&
                    Boolean(errors.description)
                  }
                  helperText={
                    touched.description &&
                    errors.description
                  }
                />
              </div>

              <div className="todo-field">
                <label className="todo-label">
                  Status
                </label>

                <Dropdown
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.status &&
                    Boolean(errors.status)
                  }
                  helperText={
                    touched.status &&
                    errors.status
                  }
                  plh="Select Status"
                  list={statusList.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                />
              </div>

              <div className="todo-field">
                <label className="todo-label">
                  Priority
                </label>

                <Dropdown
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.priority &&
                    Boolean(errors.priority)
                  }
                  helperText={
                    touched.priority &&
                    errors.priority
                  }
                  plh="Select Priority"
                  list={priorityList.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                />
              </div>

              <div className="todo-actions">

                <button
                  type="reset"
                  className="todo-btn todo-btn-secondary"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="todo-btn todo-btn-primary"
                >
                  Create Todo
                </button>

              </div>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}

export default Todo;