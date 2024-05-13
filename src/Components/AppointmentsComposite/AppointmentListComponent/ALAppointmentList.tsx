import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Autocomplete,
    TextField,
    Button,
    SxProps,
    Theme,
    Table,
} from "@mui/material";
import { Appointment } from "../../../api/AppointmentAPI";
import { Patient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TableStyleSx } from "../../ReusableComponent/TableStyle";
import { mergeSx } from "merge-sx";

export interface IAppointmentRowProps {
    appointment: Appointment;
    patient: Patient;
}

interface IAppointmentListProps {
    IRows: IAppointmentRowProps[];
    onSelected?: (patient: Patient, appointment: Appointment) => void;
    sx?: SxProps<Theme>;
}

export default function AppointmentList({
    sx,
    IRows,
    onSelected,
}: IAppointmentListProps) {
    const [filteredRows, setFilteredRows] = useState<IAppointmentRowProps[]>(
        []
    );

    useEffect(() => {
        setFilteredRows(
            IRows.sort((a, b) =>
                a.appointment.time < b.appointment.time ? -1 : 1
            )
        );
    }, [IRows]);

    return (
        <TableContainer sx={mergeSx(TableStyleSx.container, sx)}>
            <Table sx={TableStyleSx.table}>
                <TableHead sx={TableStyleSx.head}>
                    <TableRow sx={TableStyleSx.headRow}>
                        <TableCell id="patientName" sx={TableStyleSx.headCell}>
                            <Autocomplete
                                disableListWrap
                                style={{
                                    color: "white",
                                }}
                                sx={(theme: Theme) => ({
                                    background: "none",
                                    width: "300px",
                                    borderRadius: "30px",
                                    py: "20px",

                                    "& .MuiAutocomplete-inputRoot": {
                                        color: "white",
                                    },
                                    "& .MuiAutocomplete-popupIndicator": {
                                        color: "white", // Custom color for the dropdown arrow
                                    },
                                })}
                                options={IRows.map((row) =>
                                    [
                                        row.patient.f_name,
                                        row.patient.l_name,
                                    ].join(" ")
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={(theme) => ({
                                            color: "whitesmoke",
                                            fontSize: theme.typography.h6,

                                            "& .MuiInput-underline:before": {
                                                borderBottomColor: "white", // normal state
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "blue", // focused state
                                            },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                                {
                                                    borderBottomColor: "white", // hover state
                                                },

                                            "& .MuiInputBase-input::placeholder":
                                                {
                                                    color: theme.palette
                                                        .grey[100],
                                                    fontSize:
                                                        theme.typography.h6,
                                                },
                                        })}
                                        placeholder="Patient name"
                                        variant="standard"
                                    ></TextField>
                                )}
                                onChange={(_, value) => {
                                    if (value && value.length > 2) {
                                        setFilteredRows(
                                            IRows.filter((row) =>
                                                [
                                                    row.patient.f_name,
                                                    row.patient.l_name,
                                                ]
                                                    .join(" ")
                                                    .toLowerCase()
                                                    .includes(
                                                        value.toLowerCase()
                                                    )
                                            )
                                        );
                                    } else {
                                        setFilteredRows(IRows);
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell id="title" sx={TableStyleSx.headCell}>
                            Title{" "}
                        </TableCell>
                        <TableCell id="time" sx={TableStyleSx.headCell}>
                            Time{" "}
                        </TableCell>
                        <TableCell id="date" sx={TableStyleSx.headCell}>
                            Date{" "}
                        </TableCell>
                        <TableCell id="description" sx={TableStyleSx.headCell}>
                            Description
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((row) => (
                        <TableRow
                            key={row.appointment.id}
                            sx={TableStyleSx.bodyRow}
                        >
                            <TableCell
                                id={`${row.patient.f_name} ${row.patient.l_name}`}
                                sx={TableStyleSx.bodyCell}
                            >
                                <Button
                                    sx={(theme) => ({
                                        color: "black",
                                        textTransform: "none",

                                        ":hover": {
                                            color: theme.palette.warning.dark,
                                            cursor: "pointer",
                                        },
                                    })}
                                    onClick={() => {
                                        if (onSelected) {
                                            onSelected(
                                                row.patient,
                                                row.appointment
                                            );
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={TableStyleSx.bodyCell}
                                    >{`${row.patient.f_name} ${row.patient.l_name}`}</Typography>
                                </Button>
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {row.appointment.title}
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {format(row.appointment.time, "HH:mm aa")}
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {format(row.appointment.time, "MMM do, yyyy")}
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {row.appointment.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
