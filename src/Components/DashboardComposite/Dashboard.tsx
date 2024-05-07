import React from "react";
import { Box, Grid, SxProps, Theme } from "@mui/material";
import { AppointmentTable } from "./AppointmentDashboardTable";
import { TodayVisitorTable } from "./TodayVisitorTable";
import { StaffWorkingDashboardTable } from "./StaffWorkingDashboardTable";
import MonthlyNewPatientsChart from "./MonthlyNewPatientChart";

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
    console.log(new Date());
    return (
        <Box sx={ContainerSxProps}>
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
                <Grid item xs={3}>
                    <TodayVisitorTable />
                </Grid>
                <Grid item xs={3}>
                    <AppointmentTable />
                </Grid>
                <Grid item xs={3}>
                    <StaffWorkingDashboardTable />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
