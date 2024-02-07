import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ModalForm } from "./ModalForm";
import { DataTable } from "./DataTable";
import { CustomDataTable } from "./CustomDataTable";
import { Table, Button } from 'reactstrap';
import { createEmployee, getAllEmployee, deleteCurrentEmployee, updateCurrentEmployee } from "../Services/EmployeeService";
export function Employee(props) {
    const [employeeitems, setEmployeeItems] = useState([
        {
            Id: 0,
            emptagno: "",
            firstname: "",
            lastname: "",
            email: "",
            department: "",
            birthdate: "",
            designation: ""
        }
    ]);

    const getItems = () => {
        console.log("Called")
        getAllEmployee().then(response => {
            setEmployeeItems(response)
        }).catch(err => {
            console.log(err)
        })

    };

    const addItemToState = (items) => {

        const formData = new FormData();
        formData.append("emptagno", items.emptagno);
        formData.append("firstname", items.firstname);
        formData.append("lastname", items.lastname);
        formData.append("email", items.email);
        formData.append("department", items.department);
        formData.append("birthdate", items.birthdate);
        formData.append("designation", items.designation);
        createEmployee(formData).then(response => {
            setEmployeeItems([...employeeitems, response]);
        })
    };

    const updateState = (items) => {
        const formData = new FormData();
        formData.append("Id", items.id);
        formData.append("emptagno", items.emptagno);
        formData.append("firstname", items.firstname);
        formData.append("lastname", items.lastname);
        formData.append("email", items.email);
        formData.append("department", items.department);
        formData.append("birthdate", items.birthdate);
        formData.append("designation", items.designation);
        updateCurrentEmployee(items.id, formData).then(response => {
            getItems();
        })
    };

  

    const deleteItemFromState = id => {
        let confirmDelete = window.confirm('Delete item forever?');
        if (confirmDelete) {
            deleteCurrentEmployee(id).then(response => {
                getItems();
            })
        }
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    };

    useEffect(() => {
        getItems();
    }, []);

    const columns = [
        {
            Header: 'Employee Tag Number',
            accessor: 'emptagno',
        },
        {
            Header: 'First Name',
            accessor: 'firstname',
        },
        {
            Header: 'Last Name',
            accessor: 'lastname',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Department',
            accessor: 'department',
        },
        {
            Header: 'Age',
            accessor: 'birthdate',
            Cell: ({ value }) => calculateAge(value),
        },
        {
            Header: 'Designation',
            accessor: 'designation',
        },
        {
            Header: 'Actions',
            Cell: ({ row }) => (
                <div>
                    <ModalForm buttonLabel="Edit" item={row.original} updateState={updateState} />
                    <Button color="danger" onClick={() => deleteItemFromState(row.original.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <Container>
            <Row>
                <Col>
                    <h1 style={{ margin: "20px 0" }}>Employee</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    <ModalForm buttonLabel="Add" addItemToState={addItemToState} />
                </Col>
            </Row>
            {
                employeeitems.length > 0 &&
                <Row>
                    <Col>
                        {/* <DataTable
                            items={employeeitems}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        /> */}
                    </Col>
                    <CustomDataTable
                        columns={columns}
                        items={employeeitems}
                        
                    />
                </Row>

            }


        </Container>
    );
}

