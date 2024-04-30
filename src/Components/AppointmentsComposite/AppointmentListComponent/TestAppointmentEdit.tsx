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
import { Patient } from "../../../api/PatientAPI";
import { useState } from "react";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { addMinutes } from "date-fns";
import { updateAppointmentTime } from "../../../api/AppointmentAPI";

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
    sx?: SxProps<Theme>;
}

const ContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
};

interface ICreateNewAppointment {
    title: string;
    date: Date;
}

export function TestAppointmentEdit() {
    const currentDate = new Date();

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = async () => {
        await updateAppointmentTime(IData.date);

        setOpenModal(false);
    };

    const [IData, setIData] = useState<ICreateNewAppointment>({
        title: "",
        date: addMinutes(currentDate, 30),
    });

    function handleDateChange(value: dayjs.Dayjs) {
        console.log(value.toDate());
        setIData({
            ...IData,
            date: value.toDate(),
        });
    }

    return (
        <Box sx={ContainerStyle}>
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
                    <Grid item xs={3}>
                        <Typography variant="h5">Date</Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                defaultValue={dayjs(IData.date)}
                                disablePast
                                onAccept={(e) => {
                                    if (e) {
                                        handleDateChange(e);
                                    }
                                }}
                            />
                        </LocalizationProvider>
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
