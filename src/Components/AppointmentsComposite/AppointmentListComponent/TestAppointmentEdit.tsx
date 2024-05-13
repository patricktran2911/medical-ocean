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
import { getAllPatients, Patient } from "../../../api/PatientAPI";
import { useEffect, useState } from "react";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { addMinutes } from "date-fns";
import { updateAppointmentTime } from "../../../api/AppointmentAPI";
import { Appointment } from "../../../api/AppointmentAPI";
import { getAllStaff, Staff } from "../../../api/StaffAPI";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React from "react";
import AutoComplete from "../../ReusableComponent/CustomAutoComplete";

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
    height: 150,
};

const ContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
};

interface ICreateNewAppointment {
    title: string;
    date: Date;
    allDoctor: Staff[];
    filteredDoctor: [];
    selectingDoctor?: Staff;
}

interface IALInformation {
    appointment: Appointment;
    staff: Staff;
    sx?: SxProps<Theme>;
    patient: Patient;
}

export function TestAppointmentEdit({
    patient,
    appointment,
    staff,
    sx,
}: IALInformation) {
    const currentDate = new Date();

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const [IData, setIData] = useState<ICreateNewAppointment>({
        title: "",
        date: addMinutes(currentDate, 30),
        allDoctor: [],
        filteredDoctor: [],
    });
    useEffect(() => {
        fetchRequireData();
    }, []);

    async function fetchRequireData() {
        const staffs = await getAllStaff();
        const doctors = staffs.filter((staff) => staff.title === "Doctor");
        setIData({
            ...IData,
            allDoctor: doctors,
        });
    }

    function handleDateChange(value: dayjs.Dayjs) {
        setIData({
            ...IData,
            date: value.toDate(),
        });
    }

    function handleSelectDoctor(doctor: Staff) {
        setIData({
            ...IData,
            selectingDoctor: doctor,
            filteredDoctor: [],
        });
    }

    async function didTapSave() {
        await updateAppointmentTime(
            patient.id,
            IData.date,
            IData.selectingDoctor?.id
        );

        setOpenModal(false);
    }

    function didTapClose() {
        setOpenModal(false);
    }

    return (
        <Box sx={ContainerStyle}>
            <ReusableButton color="info" onClick={handleModalOpen}>
                Edit Appointment
            </ReusableButton>
            <Modal
                open={openModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid
                        container
                        rowSpacing={"20px"}
                        sx={{ width: "100%", height: "100%" }}
                    >
                        <Grid item xs={5}>
                            <Typography variant="h5">
                                Change Appointment Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    name="date"
                                    defaultValue={dayjs(appointment.time)}
                                    onAccept={(e) => {
                                        if (e) {
                                            handleDateChange(e);
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">Change Doctor</Typography>
                            <AutoComplete
                                selected={{
                                    id: staff.id,
                                    text: `${staff.f_name} ${staff.l_name}`,
                                }}
                                options={IData.allDoctor.map((value) => ({
                                    id: value.id,
                                    text: `${value.f_name} ${value.l_name}`,
                                }))}
                                onSelected={(option) => {
                                    const selectedDoctors =
                                        IData.allDoctor.filter(
                                            (doctor) => doctor.id === option.id
                                        );
                                    if (selectedDoctors.length > 0) {
                                        handleSelectDoctor(selectedDoctors[0]);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                            >
                                <Button
                                    variant="contained"
                                    onClick={didTapClose}
                                    color="error"
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={didTapSave}
                                    color="primary"
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
