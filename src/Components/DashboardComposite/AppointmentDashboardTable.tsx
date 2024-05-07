import { Appointment, getAllAppointments } from "../../api/AppointmentAPI";
import {
    Box,
    Stack,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Patient, getPatient } from "../../api/PatientAPI";
import { format } from "date-fns";
import {
    DatabaseRTTable,
    subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";

interface AppointmentUI {
    appointment: Appointment;
    patient: Patient;
}

export function AppointmentTable() {
    const [appointments, setAppointments] = useState<AppointmentUI[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    subscribeRTTable(
        DatabaseRTTable.appointments,
        handleRTDelete,
        handleRTInsert,
        handleRTUpdate
    );

    function handleRTUpdate(_: Appointment) {
        fetchAppointments();
    }

    function handleRTDelete(_: string) {
        fetchAppointments();
    }

    async function handleRTInsert(_: Appointment) {
        fetchAppointments();
    }

    const fetchAppointments = async () => {
        var appointments = await getAllAppointments();
        appointments = appointments.filter((appointment) => {
            const appointmentDate: Date = new Date(appointment.time);
            const today = new Date();

            return appointmentDate.getDate() === today.getDate();
        });

        const promises = appointments.map(async (appointment) => {
            const patient = await getPatient(appointment.patient_id);

            return {
                appointment: appointment,
                patient: patient,
            };
        });

        const result = await Promise.all(promises).then((values) => {
            return values;
        });

        setAppointments(result);
    };

    const BoxCardStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "32px",
        height: "100%",
        width: "100%",
        minWidth: "350px",
        whiteSpace: "nowrap",
        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
    };

    const useTableContainerStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "16px",
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        height: "300px",
    };

    return (
        <Box sx={BoxCardStyle}>
            <Stack direction={"column"} justifyContent={"right"}>
                <Stack
                    sx={{
                        padding: "15px",
                        background:
                            "linear-gradient(45deg, #2c3e50 0%, #4ca1af 100%)",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                    }}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignContent={"center"}
                >
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        color={"white"}
                        padding={"16px"}
                    >
                        Appointments:
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        color={"white"}
                        padding={"16px"}
                    >
                        {appointments.length}
                    </Typography>
                </Stack>
                <TableContainer sx={useTableContainerStyle}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Patient Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Time
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {appointments.map((data) => {
                                return (
                                    <TableRow>
                                        <TableCell
                                            sx={(theme) => ({
                                                borderRight:
                                                    "1px solid lightgray",
                                                [theme.breakpoints.down("md")]:
                                                    {},
                                            })}
                                        >
                                            <Typography variant="h6">
                                                {data.patient.f_name}{" "}
                                                {data.patient.l_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {format(
                                                    data.appointment.time,
                                                    "hh:mma"
                                                )}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    );
}
