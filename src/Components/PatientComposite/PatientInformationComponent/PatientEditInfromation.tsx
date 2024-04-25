import {
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
import {
    EmergencyContact,
    updateEmergencyContact,
} from "../../../api/EmergencyContactAPI";
import { PatientContactInfo } from "./PatientContactInfoComponent";
import { Insurance } from "../../../api/InsuranceAPI";
import { PatientInsuranceInfo } from "./PatientInsuranceInfoComponent";
import { Height, Margin } from "@mui/icons-material";
import { useState } from "react";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "38%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "40%",
    height: 750,
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
};

interface IPatientInfo {
    f_name: string;
    l_name: string;
    email?: string;
    phone_number: string;
    address?: string;
    //relationship: string;
}

interface emergencyPatientInfo {
    //f_name: string;
    //l_name: string;
    phone_number2: string;
    relationship: string;
}

export function PatientEditInfromation({
    patient,
    emergencyContact,
    sx,
}: PatientInformationProps) {
    let patientName = `${patient.f_name} ${patient.l_name}`;
    let patientAge = `${patient.age}`;
    let name = `${emergencyContact?.f_name ?? ""} ${emergencyContact?.l_name ?? ""}`;
    const [patientInfo, setPatientInfo] = useState<IPatientInfo>({
        f_name: patient.f_name,
        l_name: patient.l_name,
        email: patient.email ?? "",
        phone_number: patient.phone_number,
        address: patient.address,
        //relationship: emergencyContact?.relationship ?? "",
        //phone_number2: emergencyContact?.phone_number ?? "",
    });

    const [emergencypatientInfo, emergencysetPatientInfo] =
        useState<emergencyPatientInfo>({
            //f_name: emergencyContact?.f_name,
            //l_name: emergencyContact?.l_name,
            relationship: emergencyContact?.relationship ?? "",
            phone_number2: emergencyContact?.phone_number ?? "",
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
        emergencysetPatientInfo({
            ...emergencypatientInfo,
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
            patientInfo.address ?? ""
        );
        await updateEmergencyContact(
            emergencyContact?.id ?? "",
            emergencypatientInfo.phone_number2 ?? "",
            emergencypatientInfo.relationship ?? ""
        );

        setOpenModal(false);
    };

    return (
        <Box sx={sx ?? ContainerStyle}>
            <ReusableButton color="info" onClick={handleModalOpen}>
                Edit profile
            </ReusableButton>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid container columnSpacing={"50px"} rowSpacing={"50px"}>
                        <Grid item xs={9}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Patient Informaiton:
                                </Typography>
                            </Stack>
                        </Grid>
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
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Last Name
                                </Typography>
                                <TextField
                                    name="l_name"
                                    defaultValue={`${patient.l_name}`}
                                    onChange={onChangeTextField}
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
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Phone Number:
                                </Typography>
                                <TextField
                                    name="phone_number"
                                    defaultValue={`${patient.phone_number}`}
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Email:
                                </Typography>
                                <TextField
                                    name="email"
                                    defaultValue={`${patient.email}`}
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={9}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Emergency Contact Informaion:
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Full Name:
                                </Typography>
                                <TextField
                                    name="Full_Name"
                                    defaultValue={`${name}`}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Relationship Status:
                                </Typography>
                                <TextField
                                    name="relationship"
                                    defaultValue={`${emergencyContact?.relationship ?? ""}`}
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Phone Number:
                                </Typography>
                                <TextField
                                    name="phone_number2"
                                    defaultValue={`${emergencyContact?.phone_number ?? ""}`}
                                    onChange={onChangeTextField}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleModalClose}
                        sx={{
                            position: "absolute",
                            top: "94%",
                            left: "45%",
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
