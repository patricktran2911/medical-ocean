import { Appointment, getAllAppointments } from "../../../api/AppointmentAPI";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import {styled} from '@mui/material'
import "./AppointmentTable.css"

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
    borderRadius: '8px',
}))

const TableHeadStyle = styled(TableHead)({
    background: 'black'
})

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
        <TableContainerStyle>
            <Table>
                <TableHeadStyle>
                    <TableRow>
                        <TableCellCustom>Title</TableCellCustom>
                        <TableCellCustom>Time</TableCellCustom>
                        <TableCellCustom>Description</TableCellCustom>
                    </TableRow>
                </TableHeadStyle>
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
        </TableContainerStyle>
    )
}