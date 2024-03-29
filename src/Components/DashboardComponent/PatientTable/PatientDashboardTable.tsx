import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, SxProps, Theme } from "@mui/material";
import { Patient, getAllPatients } from "../../../api/PatientAPI";
import { useState, useEffect } from "react";

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

    const useTableContainerStyle: SxProps<Theme> = {
        backgroundColor: 'white',
        borderRadius: '16px',
        maxHeight: '400px'
    }

    const useTableHeadStyle: SxProps<Theme> = {
        backgroundColor: 'black'
    }

    const useTableHeadCellStyle: SxProps<Theme> = {
        color: 'whitesmoke',
        whiteSpace: 'nowrap',
        borderRight: '1px solid #ffffff',
        maxWidth: '200px',
        ':hover': {
            color: 'blue'
        }
    }

    const useTableBodyCellStyle: SxProps<Theme> = {
        color: 'black',
        backgroundColor: 'white',
        whiteSpace: 'nowrap',
        maxWidth: '200px',
        borderRight: '1px solid #ffffff',
        maxHeight: '100px'
    }

    return (
        <TableContainer 
        sx={useTableContainerStyle} 
        >
            <Table>
                <TableHead 
                sx={useTableHeadStyle}>
                    <TableRow>
                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Patient Name
                        </TableCell>

                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Date Of Birth
                        </TableCell>

                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Phone Number
                        </TableCell>

                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Email
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {`${patient.f_name} ${patient.l_name}`}
                            </TableCell>
                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {patient.dob}
                            </TableCell>
                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {patient.phone_number}
                            </TableCell>
                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {patient.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}