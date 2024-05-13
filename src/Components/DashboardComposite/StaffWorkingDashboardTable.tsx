import {
    Box,
    Button,
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
import { format } from "date-fns";
import {
    Staff,
    StaffWorkingStatus,
    getStaffIsWorkingToday,
    getStaffWithId,
} from "../../api/StaffAPI";
import {
    DatabaseRTTable,
    subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

interface vm {
    listOfStaffWorking: StaffWorkingInterface[];
}

interface StaffWorkingInterface {
    info: Staff;
    status: StaffWorkingStatus;
}

export function StaffWorkingDashboardTable() {
    const [vm, setVM] = useState<vm>({ listOfStaffWorking: [] });

    useEffect(() => {
        fetchRequireData();
    }, []);

    subscribeRTTable(
        DatabaseRTTable.staffWorkingStatus,
        undefined,
        handleOnChange,
        handleOnChange
    );

    function handleOnChange(_: StaffWorkingStatus) {
        fetchRequireData();
    }

    const fetchRequireData = async () => {
        const staffStatuses = await getStaffIsWorkingToday();
        const promises = staffStatuses.map(async (status) => {
            const staff = await getStaffWithId(status.staff_id);
            return {
                info: staff,
                status: status,
            };
        });

        const result = await Promise.all(promises).then((values) => {
            return values;
        });

        setVM({ listOfStaffWorking: result });
    };

    const BoxCardStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "32px",
        height: "100%",
        width: "100%",
        maxHeight: '850px',
        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
        whiteSpace: 'nowrap',
        transition: "width 0.3s ease-in-out",
    };

    const useTableContainerStyle: SxProps<Theme> = {
        backgroundColor: "white",
        borderRadius: "16px",
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        maxHeight: '750px',
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
                        Staff available:
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        color={"white"}
                        padding={"16px"}
                    >
                        {vm.listOfStaffWorking.length}
                    </Typography>
                </Stack>
                <TableContainer sx={useTableContainerStyle}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    key={"Staff name"}
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Staff name
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    key={"Staff title"}
                                    sx={{
                                        borderRight: "1px solid lightgray",
                                    }}
                                >
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h6"
                                    >
                                        Title
                                    </Typography>
                                </TableCell>
                                <TableCell key={"Check time"}>
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
                            {vm.listOfStaffWorking.map((staffWorking) => {
                                const staffName = `${staffWorking.info.f_name} ${staffWorking.info.l_name}`;

                                return (
                                    <TableRow key={staffWorking.info.id}>
                                        <TableCell
                                            key={staffName}
                                            sx={{
                                                borderRight:
                                                    "1px solid lightgray",
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {staffName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            key={
                                                staffName +
                                                staffWorking.info.title
                                            }
                                            sx={{
                                                borderRight:
                                                    "1px solid lightgray",
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {staffWorking.info.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            key={
                                                staffName +
                                                staffWorking.status.time
                                            }
                                        >
                                            <Typography variant="h6">
                                                {format(
                                                    staffWorking.status.time,
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
