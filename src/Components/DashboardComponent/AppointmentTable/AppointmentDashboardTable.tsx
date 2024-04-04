import { Appointment, getAllAppointments } from "../../../api/AppointmentAPI";
import { SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@mui/material';
import { useState, useEffect } from "react";

const useTableContainerStyle: SxProps<Theme> = {
    backgroundColor: 'white',
    borderRadius: '16px',
    maxHeight: '400px',
    WebkitBoxShadow: '-1px 5px 10px 1px #000000'
}

const useTableHeadStyle: SxProps<Theme> = {
    background: 'linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%)'
}

const useTableHeadCellStyle: SxProps<Theme> = {
    color: 'whitesmoke',
    whiteSpace: 'nowrap',
    borderRight: '1px solid #ffffff',
    maxWidth: '200px',

    ':hover': {
        color: 'red'
    },

    ':last-child': {
        borderRight: '0px'
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

const useTableBodyCellEmptyStyle: SxProps<Theme> = {
    color: 'black',
    font: 'caption',
    fontWeight: 'bold',
    backgroundColor: 'white',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    borderRight: '1px solid #ffffff',
    maxHeight: '100px'
}

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
        <TableContainer 
        sx={useTableContainerStyle}>
            <Table>
                <TableHead 
                sx={useTableHeadStyle}>
                    <TableRow>
                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Title
                        </TableCell>

                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Time
                        </TableCell>

                        <TableCell 
                        sx={useTableHeadCellStyle}>
                            Description
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.length === 0 ? (
                        <TableRow >
                            <TableCell 
                            sx={useTableBodyCellEmptyStyle}>
                                No Appointment Today
                            </TableCell>
                        </TableRow>
                    ) 
                    : appointments.map((appointment) => {
                        const appointmentDate = new Date(appointment.time)
                        return (
                        <TableRow key={appointment.id}>
                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {appointment.title}
                            </TableCell>

                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {appointmentDate.toLocaleTimeString()}
                            </TableCell>

                            <TableCell 
                            sx={useTableBodyCellStyle}>
                                {appointment.description}
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}