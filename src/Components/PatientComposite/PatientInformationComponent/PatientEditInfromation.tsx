import {
    Avatar,
    Box,
    Button,
    Grid,
    Modal,
    Stack,
    SxProps,
    TextField,
    Theme,
    Typography,
} from "@mui/material";
import { Patient, updatePatient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { Appointment } from "../../../api/AppointmentAPI";
import PatientInfoTopContent from "./PatientInfoTopComponent";
import { PatientEmergencyInformation } from "./PatientEmergencyInformationComponent";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";
import { PatientContactInfo } from "./PatientContactInfoComponent";
import { Insurance } from "../../../api/InsuranceAPI";
import { PatientInsuranceInfo } from "./PatientInsuranceInfoComponent";
import { Height, Margin } from "@mui/icons-material";
import { useState } from "react";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "38%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "40%", // Set the width of the modal to 80% of its parent container
    height: 600,
};

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

interface IPatientInfo {
    f_name: string;
    l_name: string;
    email: string;
    phone_number: string;
    address: string;
}

export function PatientEditInfromation({
    patient,
    nextAppointment,
    emergencyContact,
    insurance,
    sx,
}: PatientInformationProps) {
    let patientName = `${patient.f_name} ${patient.l_name}`;
    let patientAge = `${patient.age}`;
    let name = `${emergencyContact?.f_name} ${emergencyContact?.l_name}`;
    const [patientInfo, setPatientInfo] = useState<IPatientInfo>({
        f_name: patient.f_name,
        l_name: patient.l_name,
        email: patient.email ?? "",
        phone_number: patient.phone_number,
        address: patient.address,
    });

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    function onChangeTextField(e: React.ChangeEvent<HTMLInputElement>) {
        setPatientInfo({
            ...patientInfo,
            [e.target.name]: e.target.value,
        });
    }

    const handleModalClose = async () => {
        await updatePatient(
            patient.id,
            patientInfo.f_name,
            patientInfo.l_name,
            patientInfo.email ?? "",
            patientInfo.phone_number,
            patientInfo.address
        );
        setOpenModal(false);
    };

    return (
        <Box sx={sx ?? ContainerStyle}>
            <Button variant="contained" onClick={handleModalOpen}>
                Edit Patient information
            </Button>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid
                        container
                        columnSpacing={"50px"}
                        rowSpacing={"50px"}
                        bgcolor={"green"}
                    >
                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    First Name
                                </Typography>
                                <TextField
                                    name="f_name"
                                    defaultValue={`${patient.f_name}`}
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack
                                direction={"column"}
                                spacing={"5px"}
                                sx={{ width: "100%", height: "100%" }}
                            >
                                <Typography variant="h6" component="h2">
                                    Last Name
                                </Typography>
                                <TextField
                                    name="l_name"
                                    defaultValue={`${patient.l_name}`}
                                    style={{ width: "100%" }}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack
                                direction={"column"}
                                spacing={"5px"}
                                sx={{ width: "100%", height: "100%" }}
                            >
                                <Typography variant="h6" component="h2">
                                    Address
                                </Typography>
                                <TextField
                                    name="address"
                                    defaultValue={`${patient.address}`}
                                    style={{ width: "100%" }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleModalClose}
                        sx={{
                            position: "absolute",
                            top: "90%",
                            left: "50%",
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
