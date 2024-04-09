import React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    SxProps,
    Theme,
} from "@mui/material";
import { AppointmentTable } from "./AppointmentDashboardTable";
import { TodayVisitorTable } from "./TodayVisitorTable";

const useTitleStyle: SxProps<Theme> = {
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #2c3e50 0%, #4ca1af 100%)",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    WebkitBoxShadow: "-1px 2px 4px 1px #000000",
    ":hover": {
        color: "red",
        background: "linear-gradient(270deg, #2c3e50 0%, #4ca1af 100%)",
    },
};

const ContainerSxProps: SxProps<Theme> = {
    width: "100%",
    height: "100%",
};

function Dashboard() {
    return (
        <Box sx={ContainerSxProps}>
            <Grid
                container
                sx={{
                    width: "100%",
                    height: "100%",
                    padding: "50px",
                    justifyContent: "space-evenly",
                }}
                direction={{ xs: "column", lg: "row" }}
            >
                <Grid item xs={3}>
                    <TodayVisitorTable />
                </Grid>
                <Grid item xs={3}>
                    <AppointmentTable />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
