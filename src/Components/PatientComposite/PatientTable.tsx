import {
    SxProps,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Theme,
} from "@mui/material";
import { Patient } from "../../api/PatientAPI";
import { TableStyleSx } from "../ReusableComponent/PatientTableStyle";
import { mergeSx } from "merge-sx";

interface PatientTableProps {
    patients: Patient[];
    onSelect: (patient: Patient) => void;
    sx?: SxProps<Theme>;
}

export function PatientTable({ patients, onSelect, sx }: PatientTableProps) {
    const mergeContainerStyle: SxProps<Theme> = mergeSx(
        sx,
        TableStyleSx.container
    );

    return (
        <TableContainer sx={mergeContainerStyle}>
            <Table sx={{ borderCollapse: "unset" }}>
                <TableHead sx={TableStyleSx.head}>
                    <TableRow sx={TableStyleSx.headRow}>
                        <TableCell sx={TableStyleSx.headCell}>
                            Patient Name
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
                    {patients.map((patient) => (
                        <TableRow sx={TableStyleSx.bodyRow} key={patient.id}>
                            <TableCell
                                sx={TableStyleSx.bodyCell}
                                onClick={() => onSelect(patient)}
                                style={{ cursor: "pointer" }}
                            >
                                {`${patient.f_name} ${patient.l_name}`}
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
