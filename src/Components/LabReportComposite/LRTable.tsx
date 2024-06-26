import {
    Box,
    Button,
    Link,
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
import LabReportObject from "../../api/LabReportAPI";
import { format } from "date-fns";
import { TableStyleSx } from "../ReusableComponent/TableStyle";
import { mergeSx } from "merge-sx";

export interface ILRTable {
    labReports: LabReportObject[];
    sx?: SxProps<Theme>;
}
export default function LRTable({ labReports, sx }: ILRTable) {
    return (
        <TableContainer sx={mergeSx(sx, TableStyleSx.container)}>
            <Table sx={TableStyleSx.table}>
                <TableHead sx={TableStyleSx.head}>
                    <TableRow sx={TableStyleSx.headRow}>
                        <TableCell sx={TableStyleSx.headCell}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                Lab Name
                            </Typography>
                        </TableCell>
                        <TableCell sx={TableStyleSx.headCell}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                Date Received
                            </Typography>
                        </TableCell>
                        <TableCell sx={TableStyleSx.headCell}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                File
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labReports.map((lab) => (
                        <TableRow key={lab.id} sx={TableStyleSx.bodyRow}>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                <Typography variant="h6">{`${lab.name_of_lab}`}</Typography>
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                <Typography variant="h6">{`${format(lab.date_received, "MMMM do, yyyy")}`}</Typography>
                            </TableCell>
                            <TableCell sx={TableStyleSx.bodyCell}>
                                <Link
                                    href={lab.file_url.toString()}
                                    target="_blank"
                                    sx={(theme) => ({
                                        fontSize: theme.typography.h6,
                                    })}
                                >
                                    View file
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {labReports.length === 0 && (
                <Typography
                    sx={{
                        position: "relative",
                        top: "10px",
                        width: "100%",
                        textAlign: "center",
                        height: "300px",
                    }}
                    variant="h4"
                    fontWeight={"bold"}
                    color={"orangered"}
                >
                    Patient has no lab report
                </Typography>
            )}
        </TableContainer>
    );
}
