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
        console.log(staffs, doctors);
        setIData({
            ...IData,
            allDoctor: doctors,
        });
    }

    function handleDateChange(value: dayjs.Dayjs) {
        console.log(value.toDate());
        setIData({
            ...IData,
            date: value.toDate(),
        });
    }

    function handleSelectDoctor(doctor: Staff) {
        const doctorName = `${doctor.f_name} ${doctor.l_name}`;
        setIData({
            ...IData,
            selectingDoctor: doctor,
            filteredDoctor: [],
        });
    }

    const handleModalClose = async () => {
        await updateAppointmentTime(
            patient.id,
            IData.date,
            IData.selectingDoctor?.id
        );

        setOpenModal(false);
    };
    return (
        <Box sx={ContainerStyle}>
            <ReusableButton color="info" onClick={handleModalOpen}>
                Edit Appointment
            </ReusableButton>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid item xs={4}>
                        <Stack direction={"column"} spacing={"5px"}>
                            <Typography variant="h6" component="h2">
                                Current Appointment Data and time
                            </Typography>
                            <Typography
                                variant={"h6"}
                            >{`Time: ${format(appointment.time, "HH:mm aa")} • Date: ${format(appointment.time, "MMMM do, yyyy")}`}</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
                        <Typography variant="h5">Change Doctor</Typography>
                        <AutoComplete
                            options={IData.allDoctor.map((value) => ({
                                id: value.id,
                                text: `${value.f_name} ${value.l_name}`,
                            }))}
                            onSelected={(option) => {
                                const selectedDoctors = IData.allDoctor.filter(
                                    (doctor) => doctor.id === option.id
                                );
                                if (selectedDoctors.length > 0) {
                                    handleSelectDoctor(selectedDoctors[0]);
                                }
                            }}
                        />
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
