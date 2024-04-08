import { Avatar, Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Patient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { Appointment } from "../../../api/AppointmentAPI";
import PatientInfoTopContent from "./PatientInfoTopComponent";
import { PatientEmergencyInformation } from "./PatientEmergencyInformationComponent";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";
import { PatientContactInfo } from "./PatientContactInfoComponent";
import { Insurance } from "../../../api/InsuranceAPI";
import { PatientInsuranceInfo } from "./PatientInsuranceInfoComponent";

interface PatientInformationProps {
    patient: Patient;
    nextAppointment?: Appointment;
    emergencyContact?: EmergencyContact;
    insurance?: Insurance;
    sx?: SxProps<Theme>;
}

const ContainerStyle: SxProps<Theme> = {
    width: "38%",
    height: "98%",
    backgroundColor: "lightcyan",
    borderRadius: "32px",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
};

export function PatientInformation({
    patient,
    nextAppointment,
    emergencyContact,
    insurance,
    sx,
}: PatientInformationProps) {
    return (
        <Box sx={sx ?? ContainerStyle}>
            <Stack
                direction={"column"}
                sx={{ padding: "30px" }}
                justifyContent={"space-between"}
                spacing={"60px"}
            >
                <PatientInfoTopContent
                    patient={patient}
                    nextAppointment={nextAppointment}
                />

                <PatientContactInfo patient={patient} />

                {insurance && <PatientInsuranceInfo insurance={insurance} />}

                {emergencyContact && (
                    <PatientEmergencyInformation
                        emergencyContact={emergencyContact}
                    />
                )}
            </Stack>
        </Box>
    );
}
