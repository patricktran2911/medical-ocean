import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    SxProps,
    Theme,
    TableContainerProps,
    Autocomplete,
    TextField,
} from "@mui/material";
import { Patient } from "../../api/PatientAPI";
import { useEffect, useState } from "react";

const useTableContainerStyle: SxProps<Theme> = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflowY: "auto",
    overflowX: "auto",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
    scrollbarWidth: "none",
};

const useTableHeadStyle: SxProps<Theme> = {
    width: "100%",
    background: "linear-gradient(45deg, #2c3e50 0%, #4ca1af 100%)",
    backgroundSize: "fixed",
    position: "sticky",
    top: "0",
    zIndex: "9999",
};

const useTableBodyRowStyle: SxProps<Theme> = {
    backgroundColor: "white",

    ":hover": {
        scale: "1.015",
    },
};

const useTableHeadCellStyle: SxProps<Theme> = {
    color: "whitesmoke",
    whiteSpace: "nowrap",
    borderRight: "1px solid #ffffff",

    ":hover": {
        color: "red",
    },

    ":last-child": {
        borderRight: "0px",
    },
};

const useTableBodyCellStyle: SxProps<Theme> = {
    fontSize: "18px",
    backgroundColor: "white",
    whiteSpace: "nowrap",
    borderRight: "1px solid #ffffff",
    maxHeight: "100px",

    ":hover": {
        color: "red",
    },
};

interface PatientTableProps {
    patients: Patient[];
    onSelect: (patient: Patient) => void;
    sx?: SxProps<Theme> | undefined;
}

export function PatientTable({
    patients,
    onSelect,
    sx = undefined,
}: PatientTableProps) {
    const [result, setResult] = useState<Patient[]>(patients);
    var mergeContainerStyle: SxProps<Theme> = sx ? sx : useTableContainerStyle;
    useEffect(() => {
        setResult(patients);
    }, [patients]);
    return (
        <TableContainer sx={mergeContainerStyle}>
            <Table sx={{ borderCollapse: "unset" }}>
                <TableHead sx={useTableHeadStyle}>
                    <TableRow>
                        <TableCell sx={useTableHeadCellStyle}>
                            Patient Name
                        </TableCell>

                        <TableCell sx={useTableHeadCellStyle}>
                            Date Of Birth
                        </TableCell>

                        <TableCell sx={useTableHeadCellStyle}>
                            Phone Number
                        </TableCell>

                        <TableCell sx={useTableHeadCellStyle}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <Autocomplete
                    sx={{ width: 300 }}
                    options={patients.map(
                        (patient) => `${patient.f_name} ${patient.l_name}`
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Patient" />
                    )}
                    value={null}
                    onChange={(e, value) => {
                        setResult(
                            patients.filter((patient) => {
                                if (value === null) {
                                    return true;
                                }
                                if (
                                    `${patient.f_name} ${patient.l_name}` ===
                                    value
                                ) {
                                    return true;
                                }
                            })
                        );
                    }}
                />
                <TableBody>
                    {result.map((patient) => (
                        <TableRow
                            sx={useTableBodyRowStyle}
                            key={patient.id}
                            hover
                        >
                            <TableCell
                                sx={useTableBodyCellStyle}
                                onClick={() => onSelect(patient)}
                                style={{ cursor: "pointer" }}
                            >
                                {`${patient.f_name} ${patient.l_name}`}
                            </TableCell>
                            <TableCell sx={useTableBodyCellStyle}>
                                {patient.dob}
                            </TableCell>
                            <TableCell sx={useTableBodyCellStyle}>
                                {patient.phone_number}
                            </TableCell>
                            <TableCell sx={useTableBodyCellStyle}>
                                {patient.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
