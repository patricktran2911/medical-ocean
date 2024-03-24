import React from "react";
import { Stack, Typography } from "@mui/material";
import { PatientTable } from "./PatientTable/PatientDashboardTable";
import { AppointmentTable } from "./AppointmentTable/AppointmentDashboardTable";
import "./Dashboard.css"

function Dashboard() {
    return (
    <Stack 
    direction={"row"} 
    spacing={2} 
    paddingTop={2} 
    paddingLeft={32} 
    paddingRight={32}>
        <Stack 
        direction={"column"}
        alignItems={'center'} 
        spacing={'8px'} 
        width={'100%'}
        height={'100%'}
        >
            <Typography className="title"> Patients </Typography>
            <PatientTable/>
        </Stack>

        <Stack 
        direction={"column"}
        alignItems={'center'} 
        spacing={'8px'} 
        width={'100%'}
        height={'100%'}
        >
            <Typography className="title"> Appointments </Typography>
            <AppointmentTable/>
        </Stack>

    </Stack>
    );
}

export default Dashboard;