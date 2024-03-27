import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { Patient, getAllPatients } from "../../../api/PatientAPI";
import { useState, useEffect } from "react";
import { styled } from "@mui/material"

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

    const TableCellCustom = styled(TableCell)({
        color: 'whitesmoke',
        ":hover": {
            color: 'blue'
        }
    })
    
    const TableContainerStyle = styled(TableContainer) (({theme}) => ({
        width: '100%',
        height: '100%',
        background: 'white',
        borderRadius: '8px'
    }))

    const TableHeadStyle = styled(TableHead)({
        background: 'black'
    })

    return (
        <TableContainerStyle>
            <Table>
                <TableHeadStyle >
                    <TableRow>
                        <TableCellCustom>Patient Name</TableCellCustom>
                        <TableCellCustom>Date Of Birth</TableCellCustom>
                        <TableCellCustom>Phone Number</TableCellCustom>
                        <TableCellCustom>Email</TableCellCustom>
                    </TableRow>
                </TableHeadStyle>
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
        </TableContainerStyle>
    )
}