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
import {
    DatabaseRTTable,
    subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

interface VisitorTableVM {
    visitor: PatientVisitor;
    patient: Patient;
}

interface ITodayVisitorTable {
    onTapCreateIcon?: () => void;
    triggerUpdate?: boolean
}

export function TodayVisitorTable({ onTapCreateIcon, triggerUpdate }: ITodayVisitorTable) {
    const [visitors, setVisitors] = useState<VisitorTableVM[]>([]);

    useEffect(() => {
        fetchRequireData()
    }, [triggerUpdate]);

    subscribeRTTable(
        DatabaseRTTable.patientVisitor,
        undefined,
        onUpdatingFromServer,
        onUpdatingFromServer
    );

    function onUpdatingFromServer() {
        fetchRequireData();
    }

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
        height: "100%",
        width: "100%",
        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
        transition: "width 0.3s ease-in-out",
    };

    const useTableContainerStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "16px",
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        maxHeight: '750px'
    };

    const useTableHeadStyle: SxProps<Theme> = {
        top: "0",
        position: "sticky",
        backgroundColor: "white",
    };

    const addButtonStyle: SxProps<Theme> = {
        color: "white",
        width: "30px",
        height: "30px",
        ":hover": {
            color: "cyan",
        },
        alignSelf: "center",
        justifySelf: "center",
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

                    <Stack direction={"row"} spacing={"4px"}>
                        <AddCircleOutline
                            onClick={onTapCreateIcon}
                            sx={addButtonStyle}
                        />

                        <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            color={"white"}
                            padding={"16px"}
                        >
                            {visitors.length}
                        </Typography>
                    </Stack>
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
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Patient Name
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Type
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
                            {visitors.map((visitor) => {
                                return (
                                    <TableRow key={visitor.visitor.id}>
                                        <TableCell
                                            sx={{
                                                borderRight:
                                                    "1px solid lightgray",
                                            }}
                                        >
                                            <Typography variant="h6">
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
                                            <Typography variant="h6">
                                                {visitor.visitor.type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
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
