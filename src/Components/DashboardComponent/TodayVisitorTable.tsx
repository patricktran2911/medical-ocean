import { useEffect, useState } from "react";
import {
    PatientVisitor,
    getPatientVisitors,
} from "../../api/PatientVisitorAPI";
import { Patient, getPatient } from "../../api/PatientAPI";
import {
    Box,
    Divider,
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
import { format } from "date-fns";

interface VisitorTableVM {
    visitor: PatientVisitor;
    patient: Patient;
}

export function TodayVisitorTable() {
    const [visitors, setVisitors] = useState<VisitorTableVM[]>([]);

    useEffect(() => {
        fetchRequireData();
    }, []);

    async function fetchRequireData() {
        var today = new Date();

        const visitors = await getPatientVisitors(today);
        const promises = visitors.map(async (visitor) => {
            const patient = await getPatient(visitor.patient_id);
            return {
                visitor: visitor,
                patient: patient,
            };
        });
        const result = await Promise.all(promises);
        setVisitors(result);
    }

    const BoxCardStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "32px",
        width: "100%",
        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
        transition: "width 0.3s ease-in-out",
        minWidth: "350px",
    };

    const useTableContainerStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "16px",
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        height: "300px",
    };

    const useTableHeadStyle: SxProps<Theme> = {
        top: "0",
        position: "sticky",
        backgroundColor: "white",
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
                        {visitors.length >= 0 ? "Visitor:" : "Visitors:"}
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        color={"white"}
                        padding={"16px"}
                    >
                        {visitors.length}
                    </Typography>
                </Stack>
                <TableContainer sx={useTableContainerStyle}>
                    <Table>
                        <TableHead sx={useTableHeadStyle}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography fontWeight={"bold"}>
                                        Patient Name
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography fontWeight={"bold"}>
                                        Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={"bold"}>
                                        Time
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visitors.map((visitor) => {
                                return (
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                borderRight:
                                                    "1px solid lightgray",
                                            }}
                                        >
                                            <Typography>
                                                {visitor.patient.f_name}{" "}
                                                {visitor.patient.l_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderRight:
                                                    "1px solid lightgray",
                                            }}
                                        >
                                            <Typography>
                                                {visitor.visitor.type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {format(
                                                    visitor.visitor.time,
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
