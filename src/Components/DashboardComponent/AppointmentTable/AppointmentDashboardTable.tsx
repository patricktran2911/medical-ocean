import { Appointment, getAllAppointments } from "../../../api/AppointmentAPI";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import "./AppointmentTable.css"

export function AppointmentTable() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        fetchAppointments()
    }, []);

    const fetchAppointments = async () => {
        var appointments = await getAllAppointments()
        appointments = appointments.filter(appointment => {
            const appointmentDate: Date = new Date(appointment.time)
            const today = new Date()

            return appointmentDate.getDate() === today.getDate()
        })
        console.log("appointments", appointments)
        setAppointments(appointments);
    };

    return (
        <TableContainer className="aTable" component={Paper}>
            <Table>
                <TableHead className="aTableHeader">
                    <TableRow>
                        <TableCell className="smallTableHeaderCell">Title</TableCell>
                        <TableCell className="smallTableHeaderCell">Time</TableCell>
                        <TableCell className="smallTableHeaderCell">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => {
                        const appointmentDate = new Date(appointment.time)

                        return (<TableRow key={appointment.id}>
                            <TableCell>{appointment.title}</TableCell>
                            <TableCell>{appointmentDate.toLocaleTimeString()}</TableCell>
                            <TableCell>{appointment.description}</TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

{/* <Grid className="aTable" container spacing={8}>
            {appointments.map(appointment => {
                const appointmentDate = new Date(appointment.time)
            return (
            <Grid key={appointment.id}>
                <Paper elevation={1}>
                    <Typography variant="h6" align="center">
                        {appointment.title}
                    </Typography>
                    <Typography variant="body1" align="center">
                        Date: {appointmentDate.toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" align="center">
                        Time {appointmentDate.toLocaleTimeString()}
                    </Typography>
                </Paper>
            </Grid>
            )
        })}
        </Grid> */}