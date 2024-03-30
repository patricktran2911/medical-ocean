import React from "react";
import { Button, Stack, SxProps, Theme, Typography } from "@mui/material";
import { PatientTable } from "./PatientTable/PatientDashboardTable";
import { AppointmentTable } from "./AppointmentTable/AppointmentDashboardTable";
import "./Dashboard.css"

const useTitleStyle: SxProps<Theme> = {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%)',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    WebkitBoxShadow: '-1px 2px 4px 1px #000000'
}

function Dashboard() {
    return (
    <Stack 
    justifyContent={"stretch"}
    direction={{ xl: 'row', lg: 'column'}} 
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
            <Button sx={useTitleStyle}> Patients </Button>
            <PatientTable/>
        </Stack>

        <Stack 
        direction={"column"}
        alignItems={'center'} 
        spacing={'8px'} 
        width={'100%'}
        height={'100%'}
        >
            <Button sx={useTitleStyle}> Appointments </Button>
            <AppointmentTable/>
        </Stack>

    </Stack>
    );
}

export default Dashboard;