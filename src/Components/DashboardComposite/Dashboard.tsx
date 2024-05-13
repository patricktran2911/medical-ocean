import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Modal,
    Stack,
    SxProps,
    TextField,
    Theme,
    Typography,
} from "@mui/material";
import { AppointmentTable } from "./AppointmentDashboardTable";
import { TodayVisitorTable } from "./TodayVisitorTable";
import { StaffWorkingDashboardTable } from "./StaffWorkingDashboardTable";
import { getAllLabReports, updateLabReport } from "../../api/LabReportAPI";
import { getAllPatientVisitor } from "../../api/PatientVisitorAPI";
import { getAllPatients } from "../../api/PatientAPI";
import AutoComplete from "../ReusableComponent/CustomAutoComplete";
import { CreateNewVisitorModal } from "./CreateNewVisitorModal";

const ContainerSxProps: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    minWidth: "1700px",
    height: "100%",
    whiteSpace: "nowrap",
};

function Dashboard() {
    const [showCreateVisitor, setShowCreateVisitor] = useState(false);
    return (
        <Box sx={ContainerSxProps}>
            <Modal open={showCreateVisitor}>
                <CreateNewVisitorModal
                    onFinished={() => {
                        setShowCreateVisitor(false);
                    }}
                />
            </Modal>
            <Grid
                container
                sx={{
                    width: "100%",
                    height: "100%",
                    px: "50px",
                    py: "200px",
                    justifySelf: "center",
                    justifyContent: "space-evenly",
                    alignSelf: "center",
                }}
                spacing={"100px"}
            >
                <Grid item xs={4}>
                    <TodayVisitorTable
                        onTapCreateIcon={() => {
                            setShowCreateVisitor(true);
                        }}
                        triggerUpdate = {showCreateVisitor}
                    />
                </Grid>
                <Grid item xs={4}>
                    <AppointmentTable />
                </Grid>
                <Grid item xs={4}>
                    <StaffWorkingDashboardTable />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
