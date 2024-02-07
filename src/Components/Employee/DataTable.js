import React from 'react';
import { Table, Button } from 'reactstrap';
import { ModalForm } from "./ModalForm";

export function DataTable(props) {

    const deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?');
        if (confirmDelete) {
            props.deleteItemFromState(id);
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
    
    const items = props.items.map(item => {
        return (
            <tr key={String(item.id)}>
                <td>{item.emptagno}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.department}</td>
                <td>{calculateAge(item.birthdate)}</td>
                <td>{item.designation}</td>
                <td>
                    <div>
                        <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
                        <Button color="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Employee Tag Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Age</th>
                    <th>Designation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table>
    );
}
