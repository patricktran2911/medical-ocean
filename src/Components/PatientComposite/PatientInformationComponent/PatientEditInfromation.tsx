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
    CreateEmergencyContact,
    EmergencyContact,
    createEmergencyContact,
    updateEmergencyContact,
} from "../../../api/EmergencyContactAPI";
import { PatientContactInfo } from "./PatientContactInfoComponent";
import { Insurance } from "../../../api/InsuranceAPI";
import { PatientInsuranceInfo } from "./PatientInsuranceInfoComponent";
import { Height, Margin } from "@mui/icons-material";
import { useState } from "react";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";

const modalStyle: SxProps<Theme> = {
    position: "relative",
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
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
}

export function PatientEditInfromation({
    patient,
    emergencyContact,
    sx,
}: PatientInformationProps) {
    let patientName = `${patient.f_name} ${patient.l_name}`;
    let patientAge = `${patient.age}`;
    const [patientInfo, setPatientInfo] = useState<IPatientInfo>({
        f_name: patient.f_name,
        l_name: patient.l_name,
        email: patient.email ?? "",
        phone_number: patient.phone_number,
        address: patient.address,
    });

    const [emergencypatientInfo, emergencysetPatientInfo] =
        useState<emergencyPatientInfo>({
            f_name: emergencyContact?.f_name ?? "",
            l_name: emergencyContact?.l_name ?? "",
            relationship: emergencyContact?.relationship ?? "",
            phone_number: emergencyContact?.phone_number ?? "",
        });
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    function onChangeEmergencyContactTextField(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        emergencysetPatientInfo({
            ...emergencypatientInfo,
            [e.target.name]: e.target.value,
        });
    }

    function onChangeTextField(e: React.ChangeEvent<HTMLInputElement>) {
        setPatientInfo({
            ...patientInfo,
            [e.target.name]: e.target.value,
        });
    }

    async function didTapSave() {
        await updatePatient(
            patient.id,
            patientInfo.f_name,
            patientInfo.l_name,
            patientInfo.email ?? "",
            patientInfo.phone_number,
            patientInfo.address ?? ""
        );
        if (emergencyContact) {
            await updateEmergencyContact(
                emergencyContact?.id ?? "",
                emergencypatientInfo.f_name,
                emergencypatientInfo.l_name,
                emergencypatientInfo.relationship ?? "",
                emergencypatientInfo.phone_number ?? ""
            );
        } else {
            const emergencyContact: CreateEmergencyContact = {
                f_name: emergencypatientInfo.f_name,
                l_name: emergencypatientInfo.l_name,
                relationship: emergencypatientInfo.relationship,
                phone_number: emergencypatientInfo.phone_number,
            };
            await createEmergencyContact(emergencyContact, patient.id);
        }

        setOpenModal(false);
    }

    function didTapClose() {
        setOpenModal(false);
    }

    return (
        <Box sx={sx ?? ContainerStyle}>
            <ReusableButton color="info" onClick={handleModalOpen}>
                Edit profile
            </ReusableButton>
            <Modal
                open={openModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid container columnSpacing={"50px"} rowSpacing={"50px"}>
                        <Grid item xs={9}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Patient Information:
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
                                    placeholder={patient.phone_number}
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

                        <Grid item xs={12}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Emergency Contact Informaion:
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={3}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    First Name:
                                </Typography>
                                <TextField
                                    name="f_name"
                                    defaultValue={`${emergencyContact?.f_name ?? ""}`}
                                    onChange={onChangeEmergencyContactTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Last Name:
                                </Typography>
                                <TextField
                                    name="l_name"
                                    defaultValue={`${emergencyContact?.l_name ?? ""}`}
                                    onChange={onChangeEmergencyContactTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Phone Number:
                                </Typography>
                                <TextField
                                    name="phone_number"
                                    defaultValue={`${emergencyContact?.phone_number ?? ""}`}
                                    onChange={onChangeEmergencyContactTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} spacing={"5px"}>
                                <Typography variant="h6" component="h2">
                                    Relationship Status:
                                </Typography>
                                <TextField
                                    name="relationship"
                                    defaultValue={`${emergencyContact?.relationship ?? ""}`}
                                    onChange={onChangeEmergencyContactTextField}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                sx={{ width: "100%" }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={didTapClose}
                                >
                                    Close
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        await didTapSave();
                                    }}
                                >
                                    Save
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}
