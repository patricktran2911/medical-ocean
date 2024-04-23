import {
    Avatar,
    Box,
    Button,
    Modal,
    Stack,
    SxProps,
    TextField,
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
    emergencyContact: EmergencyContact;
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

export function PatientEditInfromation({
    patient,
    nextAppointment,
    emergencyContact,
    insurance,
    sx,
}: PatientInformationProps) {
    let patientName = `${patient.f_name} ${patient.l_name}`;
    let patientAge = `${patient.age}`;
    let name = `${emergencyContact.f_name} ${emergencyContact.l_name}`;

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
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
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={"240px"}
                    >
                        {" "}
                        <Typography variant="h6" component="h2">
                            Frist Name
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                marginBottom: "16px", // Add spacing below the Typography component
                            }}
                        >
                            Last Name
                        </Typography>{" "}
                    </Stack>
                    <TextField
                        label={`${patient.f_name}`}
                        placeholder="Change Patient Name"
                        style={{ width: "250px" }}
                    />
                    <TextField
                        label={`${patient.l_name}`}
                        placeholder="Change Patient Name"
                        style={{ width: "250px" }}
                        sx={{
                            marginLeft: "100px",
                        }}
                    />
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            marginTop: "16px",
                        }}
                    >
                        Address:
                    </Typography>
                    <TextField
                        label={`${patient.address}`}
                        placeholder="Change Patient Address"
                        style={{ width: "350px" }}
                        sx={{
                            marginBottom: "16px",
                        }}
                    />
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={"200px"}
                    >
                        <Typography variant="h6" component="h2">
                            Phone Number:
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Email:
                        </Typography>
                    </Stack>
                    <TextField
                        label={`${patient.phone_number}`}
                        placeholder="Change phone number"
                        style={{ width: "250px", marginRight: "110px" }}
                    />
                    <TextField
                        label={`${patient.email}`}
                        placeholder="Change Email"
                        style={{ width: "250px" }}
                    />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ marginTop: "16px" }}
                    >
                        Emergency Contact information:
                    </Typography>
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={"260px"}
                        sx={{ marginTop: "16px" }}
                    >
                        <Typography variant="h6" component="h2">
                            Fullname:
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Relationship Status:
                        </Typography>
                    </Stack>
                    <TextField
                        label={`${name}`}
                        placeholder="Change Name"
                        style={{ width: "250px", marginRight: "110px" }}
                    />
                    <TextField
                        label={`${emergencyContact.relationship}`}
                        placeholder="Change Relationship Status"
                        style={{ width: "250px" }}
                    />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ marginTop: "16px" }}
                    >
                        Phone number
                    </Typography>
                    <TextField
                        label={`${emergencyContact.phone_number}`}
                        placeholder="Change Phone number
                        "
                        style={{ width: "250px" }}
                    />{" "}
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
