import {
    Avatar,
    Box,
    Button,
    Stack,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { Patient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { Appointment } from "../../../api/AppointmentAPI";
import PatientInfoTopContent from "./PatientInfoTopComponent";
import { PatientEmergencyInformation } from "./PatientEmergencyInformationComponent";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";
import { PatientContactInfo } from "./PatientContactInfoComponent";
import { Insurance } from "../../../api/InsuranceAPI";
import { PatientInsuranceInfo } from "./PatientInsuranceInfoComponent";
import { Height } from "@mui/icons-material";
import { PatientEditInfromation } from "./PatientEditInfromation";
import { useNavigate } from "react-router-dom";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";

interface PatientInformationProps {
    patient: Patient;
    nextAppointment?: Appointment;
    emergencyContact?: EmergencyContact;
    insurance?: Insurance;
    sx?: SxProps<Theme>;
}

const ContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    backgroundColor: "lightcyan",
    borderRadius: "32px",
    whiteSpace: "nowrap",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
};

export function PatientInformation({
    patient,
    nextAppointment,
    emergencyContact,
    insurance,
    sx,
}: PatientInformationProps) {
    const navigate = useNavigate();
    return (
        <Box sx={sx ?? ContainerStyle}>
            <Stack
                direction={"column"}
                sx={{ p: "30px", height: "95%" }}
                justifyContent={"space-between"}
            >
                <Stack direction={"column"} spacing={"60px"}>
                    <PatientInfoTopContent
                        patient={patient}
                        nextAppointment={nextAppointment}
                    />

                    <PatientContactInfo patient={patient} />

                    {insurance && (
                        <PatientInsuranceInfo insurance={insurance} />
                    )}

                    {emergencyContact && (
                        <PatientEmergencyInformation
                            emergencyContact={emergencyContact}
                        />
                    )}
                </Stack>

                <Stack direction={"row"} justifyContent={"space-between"}>
                    <ReusableButton color="info">Edit profile</ReusableButton>
                    <ReusableButton
                        color="secondary"
                        onClick={() => {
                            navigate(`/patients/lab-reports/${patient.id}`);
                        }}
                    >
                        Lab reports
                    </ReusableButton>
                </Stack>
            </Stack>
        </Box>
    );
}
