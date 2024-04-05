import React from "react";
import { Button, Stack, SxProps, Theme } from "@mui/material";
import { PatientTable } from "./PatientTable/PatientDashboardTable";
import { AppointmentTable } from "./AppointmentTable/AppointmentDashboardTable";

const useTitleStyle: SxProps<Theme> = {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #2c3e50 0%, #4ca1af 100%)',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    WebkitBoxShadow: '-1px 2px 4px 1px #000000',
    ':hover': {
        color: 'red',
        background: 'linear-gradient(270deg, #2c3e50 0%, #4ca1af 100%)'
    }
}

function Dashboard() {
    return (
    <Stack 
    justifyContent={"stretch"}
    direction={{ xl: 'row', lg: 'column'}} 
    spacing={2} 
    paddingTop={2} 
    paddingLeft={8} 
    paddingRight={8}>
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