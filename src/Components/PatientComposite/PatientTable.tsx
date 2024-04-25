import {
    SxProps,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Theme,
    Button,
    Typography,
    Autocomplete,
    TextField,
} from "@mui/material";
import { Patient } from "../../api/PatientAPI";
import { TableStyleSx } from "../ReusableComponent/TableStyle";
import { mergeSx } from "merge-sx";
import { useEffect, useState } from "react";
import fuzzysearch from "fuzzysearch-ts";

interface PatientTableProps {
    patients: Patient[];
    onSelect: (patient: Patient) => void;
    sx?: SxProps<Theme>;
}

export function PatientTable({ patients, onSelect, sx }: PatientTableProps) {
    const [filteredPatients, setFilteredPatients] = useState(patients);

    useEffect(() => {
        setFilteredPatients(patients);
    }, [patients]);

    const mergeContainerStyle: SxProps<Theme> = mergeSx(
        sx,
        TableStyleSx.container
    );

    return (
        <TableContainer sx={mergeContainerStyle}>
            <Table sx={TableStyleSx.table}>
                <TableHead sx={TableStyleSx.head}>
                    <TableRow sx={TableStyleSx.headRow}>
                        <TableCell sx={TableStyleSx.headCell}>
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
                                options={patients.map((patient) =>
                                    [patient.f_name, patient.l_name].join(" ")
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
                                    if (value && value.length > 0) {
                                        setFilteredPatients(
                                            patients.filter((patient) => {
                                                const patientName = `${patient.f_name} ${patient.l_name}`;
                                                const inputName = value;
                                                return fuzzysearch(
                                                    value,
                                                    patientName
                                                );
                                            })
                                        );
                                    } else {
                                        setFilteredPatients(patients);
                                    }
                                }}
                            />
                        </TableCell>

                        <TableCell sx={TableStyleSx.headCell}>
                            Date Of Birth
                        </TableCell>

                        <TableCell sx={TableStyleSx.headCell}>
                            Phone Number
                        </TableCell>

                        <TableCell sx={TableStyleSx.headCell}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPatients.map((patient) => (
                        <TableRow sx={TableStyleSx.bodyRow} key={patient.id}>
                            <TableCell sx={TableStyleSx.bodyCell}>
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
                                        onSelect(patient);
                                    }}
                                >
                                    <Typography sx={TableStyleSx.bodyCell}>
                                        {`${patient.f_name} ${patient.l_name}`}
                                    </Typography>
                                </Button>
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {patient.dob}
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {patient.phone_number}
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                {patient.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
