import { Avatar, Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Patient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { Appointment } from "../../../api/AppointmentAPI";
import PatientInfoTopContent from "./PatientInfoTopComponent";

interface PatientInformationProps {
    patient: Patient;
    nextAppointment?: Appointment;
    sx?: SxProps<Theme>;
}

const ContainerStyle: SxProps<Theme> = {
    width: "48%",
    height: "98%",
    backgroundColor: "white",
    borderRadius: "32px",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
};

export function PatientInformation({
    patient,
    nextAppointment,
    sx,
}: PatientInformationProps) {
    return (
        <Box sx={sx ?? ContainerStyle}>
            <Stack direction={"column"} sx={{ padding: "30px" }}>
                <PatientInfoTopContent
                    patient={patient}
                    nextAppointment={nextAppointment}
                />
            </Stack>
        </Box>
    );
}
