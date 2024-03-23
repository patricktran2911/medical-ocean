import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { Patient, getAllPatients } from "../../../api/PatientAPI";
import { useState, useEffect } from "react";
import './PatientTable.css'

export function PatientTable() {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect( () => {
        fetchPatient()
    }, [])

    const fetchPatient = async () => {
        const patients = await getAllPatients();
        console.log("patients", patients)
        setPatients(patients);
    };

    return (
        <TableContainer className="pTable" component={Paper}>
            <Table>
                <TableHead className="tableHeader">
                    <TableRow>
                        <TableCell style={{color: 'whitesmoke'}}>Patient Name</TableCell>
                        <TableCell style={{color: 'whitesmoke'}}>Date Of Birth</TableCell>
                        <TableCell style={{color: 'whitesmoke'}}>Phone Number</TableCell>
                        <TableCell style={{color: 'whitesmoke'}}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{`${patient.f_name} ${patient.l_name}`}</TableCell>
                            <TableCell>{patient.dob}</TableCell>
                            <TableCell>{patient.phone_number}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}