import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function AddEditEmployee(props) {

    const [employee, setEmployee] = useState({
        id: 0,
        emptagno: '',
        firstname: '',
        lastname: '',
        email: '',
        department: '',
        birthdate: '',
        designation: ''
    });
    const departmentOptions = [
        { value: "IT", label: "IT" },
        { value: "HR", label: "HR" },
        { value: "Finance", label: "Finance" },
        { value: "Marketing", label: "Marketing" },
        { value: "Operations", label: "Operations" }
    ];

    const designationOptions = [
        { value: "Manager", label: "Manager" },
        { value: "Team Lead", label: "Team Lead" },
        { value:"Developer", label: "Developer" },
        { value:  "Analyst" , label: "Analyst" },
        { value: "Coordinator", label: "Coordinator" }
    ];
    const validationSchema = Yup.object().shape({
        emptagno: Yup.string().required("Employee Tag Number is required").max(20, "Employee Tag Number must be at most 20 characters"),
        firstname: Yup.string().required("First Name is required").max(50, "First Name must be at most 50 characters"),
        lastname: Yup.string().required("Last Name is required").max(50, "Last Name must be at most 50 characters"),
        email: Yup.string().required("Email is required").email("Invalid email format").max(100, "Email must be at most 100 characters"),
        department: Yup.string().required("Department is required"),
        birthdate: Yup.date().required("Birthdate is required"),
        designation: Yup.string().required("Designation is required")
    });

    const submitFormAdd = (data) => {
        props.addItemToState(data);
        props.toggle();
    };

    const submitFormEdit = (data) => {
        console.log(data)
        props.updateState(data);
        props.toggle();
    };

    const onSubmit = (fields, { setStatus }) => {
        setStatus();
        if (props.item) {
            submitFormEdit(fields);
        } else {
            submitFormAdd(fields);
        }
    };
    useEffect(() => {
        if (props.item) {
            const { id, emptagno, firstname, lastname, email, department, birthdate, designation } = props.item;
            setEmployee({ id, emptagno, firstname, lastname, email, department, birthdate, designation });

            const localDate = new Date(birthdate);
            const offset = localDate.getTimezoneOffset() * 60000; 
            const adjustedDate = new Date(localDate.getTime() - offset);
    
            // Format the adjusted date
            const formattedDate = adjustedDate.toISOString().split('T')[0];
            setEmployee(prevState => ({ ...prevState, birthdate: formattedDate }));
        }
    }, [props.item]);

    return (
        <Formik initialValues={employee} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true} >
            {({ values, errors, touched, handleChange, handleBlur  }) => (
                <Form>
                    <FormGroup>
                        <Label for="emptagno">Employee Tag Number</Label>
                        <Field
                            type="text"
                            name="emptagno"
                            id="emptagno"
                            autoComplete="off"
                            className={'form-control' + (errors.emptagno && touched.emptagno ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="emptagno" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstname">First Name</Label>
                        <Field
                            type="text"
                            name="firstname"
                            id="firstname"
                            autoComplete="off"
                            className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Last Name</Label>
                        <Field
                            type="text"
                            name="lastname"
                            id="lastname"
                            autoComplete="off"
                            className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="department">Department</Label>
                        <Input
                            type="select"
                            name="department"
                            id="department"
                            value={values.department || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={'form-control' + (errors.department && touched.department ? ' is-invalid' : '')}
                        >
                            <option value="">Select</option>
                            {departmentOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Input>
                        <ErrorMessage name="department" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthdate">Birthdate</Label>
                        <Field
                            type="date"
                            name="birthdate"
                            id="birthdate"
                            className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="designation">Designation</Label>
                        <Input
                            type="select"
                            name="designation"
                            id="designation"
                            value={values.designation || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={'form-control' + (errors.designation && touched.designation ? ' is-invalid' : '')}
                        >
                            <option value="">Select</option>
                            {designationOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Input>
                        <ErrorMessage name="designation" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
}
