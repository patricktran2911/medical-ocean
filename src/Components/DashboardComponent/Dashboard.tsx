import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { Patient, getAllPatients, getPatient } from "../../api/PatientAPI";
import { Appointment, getAllAppointments } from "../../api/AppointmentAPI";

function Dashboard() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        fetchPatient();
        fetchAppointments();
    }, []);

    useEffect(() => {
        console.log("Patients:", patients);
        console.log("Appointments:", appointments);
    }, [patients, appointments]);

    const fetchPatient = async () => {
        const patients = await getAllPatients();
        setPatients(patients);
    };

    const fetchAppointments = async () => {
        const appointments = await getAllAppointments()
        setAppointments(appointments);
    };

    return (
    <Stack direction={"row"}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{`${patient.f_name} ${patient.l_name}`}</TableCell>
                            <TableCell>{patient.dob}</TableCell>
                            <TableCell>{patient.phone_number}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Stack>
    );
}

export default Dashboard;