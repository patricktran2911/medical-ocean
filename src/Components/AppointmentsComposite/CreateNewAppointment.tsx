import {
    Box,
    Grid,
    Stack,
    SxProps,
    TextField,
    Theme,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    NewPatient,
    Patient,
    createPatient,
    getAllPatients,
} from "../../api/PatientAPI";
import logo from "../../Assets/Images/Icon120.png";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "../../style.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DefaultMotion from "../../Utility/DefaultMotion";
import { Staff, getAllStaff } from "../../api/StaffAPI";
import fuzzysearch from "fuzzysearch-ts";
import AutoComplete from "../ReusableComponent/CustomAutoComplete";
import { ReusableButton } from "../ReusableComponent/ButtonStyle";
import { createAppointment } from "../../api/AppointmentAPI";
import { addMinutes } from "date-fns";
import { useNavigate } from "react-router-dom";

const TextFieldStyleProps: SxProps<Theme> = (theme) => ({
    "& .MuiInputBase-root": {
        height: "50px",
        fontSize: theme.typography.h6,
    },
});

const useContainerBoxStyle: SxProps<Theme> = {
    position: "relative",
    top: "30%",
    left: "20%",
    display: "flex",
    overflow: "auto",
    width: "40%",
    minWidth: "1100px",
    minHeight: "850px",
    height: "30%",
    padding: "25px",

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
};

const useFormContainerStyle: SxProps<Theme> = {
    width: "90%",
    height: "90%",
    padding: "50px",
    maxHeight: "950px",
    backgroundColor: "white",
    borderRadius: "32px",
};

interface ICreateNewAppointment {
    patient: NewPatient;
    title: string;
    date: Date;
    allDoctor: Staff[];
    filteredDoctor: Staff[];
    patients: Patient[];
    selectingDoctor?: Staff;
    description?: string;
    staff_id?: string;
}
export default function CreateNewAppointment() {
    const currentDate = new Date();
    const navigate = useNavigate();
    const newPatient: NewPatient = {
        f_name: "",
        l_name: "",
        phone_number: "",
    };
    const [IData, setIData] = useState<ICreateNewAppointment>({
        patient: newPatient,
        title: "",
        date: addMinutes(currentDate, 30),
        allDoctor: [],
        filteredDoctor: [],
        patients: [],
    });

    useEffect(() => {
        fetchRequireData();
    }, []);

    async function fetchRequireData() {
        const staffs = await getAllStaff();
        const patients = await getAllPatients();
        const doctors = staffs.filter((staff) => staff.title === "Doctor");

        setIData({
            ...IData,
            allDoctor: doctors,
            patients: patients,
        });
    }

    function handleDoctorAutocomplete(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("doctors", IData.allDoctor);
        e.target.value.length === 0
            ? setIData({
                  ...IData,
                  filteredDoctor: [],
              })
            : setIData({
                  ...IData,
                  filteredDoctor: IData.allDoctor.filter((doctor) => {
                      const doctorName = doctor.f_name + doctor.l_name;
                      return fuzzysearch(e.target.value, doctorName);
                  }),
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

    function handlePatientInfoTextChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setIData({
            ...IData,
            patient: {
                ...IData.patient,
                [e.target.id]: [e.target.value],
            },
        });
    }

    function handleDateChange(value: dayjs.Dayjs) {
        console.log(value.toDate());
        setIData({
            ...IData,
            date: value.toDate(),
        });
    }

    async function handleSubmit() {
        const patients = IData.patients;
        const patientInput = IData.patient;
        const selectedPatient = patients.filter((patient) => {
            const patientName = `${patient.f_name} ${patient.l_name}`;
            const inputPatientName = `${patientInput.f_name} ${patientInput.l_name}`;
            return patientName === inputPatientName;
        });
        if (selectedPatient.length === 0) {
            const newPatient = await createPatient(patientInput);
            await createAppointment(
                newPatient.id,
                IData.date,
                IData.title,
                IData.description,
                IData.selectingDoctor?.id
            );
        } else {
            await createAppointment(
                selectedPatient[0].id,
                IData.date,
                IData.title,
                IData.description,
                IData.selectingDoctor?.id
            );
        }
        navigate("/appointment/all-appointments");
    }
    return (
        <Box sx={useContainerBoxStyle}>
            <Box sx={useFormContainerStyle}>
                <DefaultMotion
                    key={null}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Box
                        component={"form"}
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            spacing={10}
                            sx={{ width: "100%" }}
                        >
                            <Box
                                component={"img"}
                                src={logo}
                                sx={{ width: 100, height: 100 }}
                            />
                            <Typography
                                variant="h3"
                                fontWeight={"bold"}
                                alignSelf={"end"}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                            >
                                CREATE NEW APPOINTMENT
                            </Typography>
                        </Stack>
                        <br />
                        <Grid container columnSpacing={10} rowSpacing={10}>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    First Name*
                                </Typography>

                                <TextField
                                    id="f_name"
                                    variant="standard"
                                    onChange={handlePatientInfoTextChange}
                                    fullWidth
                                    sx={TextFieldStyleProps}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">Last Name*</Typography>

                                <TextField
                                    id="l_name"
                                    variant="standard"
                                    onChange={handlePatientInfoTextChange}
                                    fullWidth
                                    sx={TextFieldStyleProps}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    Phone Number*
                                </Typography>

                                <TextField
                                    id="phone_number"
                                    variant="standard"
                                    onChange={handlePatientInfoTextChange}
                                    fullWidth
                                    sx={TextFieldStyleProps}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">Title*</Typography>

                                <TextField
                                    id="title"
                                    variant="standard"
                                    onChange={(e) => {
                                        setIData({
                                            ...IData,
                                            title: e.target.value,
                                        });
                                    }}
                                    fullWidth
                                    sx={TextFieldStyleProps}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="h5">Date</Typography>

                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
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
                            <Grid item xs={4}>
                                <Typography variant="h5">Doctor</Typography>

                                <AutoComplete
                                    options={IData.allDoctor.map((value) => ({
                                        id: value.id,
                                        text: `${value.f_name} ${value.l_name}`,
                                    }))}
                                    onSelected={(option) => {
                                        const selectedDoctors =
                                            IData.allDoctor.filter(
                                                (doctor) =>
                                                    doctor.id === option.id
                                            );
                                        if (selectedDoctors.length > 0) {
                                            handleSelectDoctor(
                                                selectedDoctors[0]
                                            );
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Description
                                </Typography>

                                <TextField
                                    id="description"
                                    variant="outlined"
                                    placeholder="Optional"
                                    onChange={(e) => {
                                        setIData({
                                            ...IData,
                                            description: e.target.value,
                                        });
                                    }}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={3}
                                    sx={(theme) => ({
                                        "& .MuiInputBase-root": {
                                            fontSize: theme.typography.h6,
                                        },
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <ReusableButton
                                        text={"Create Appointment"}
                                        sx={{
                                            height: "50px",
                                            alignSelf: "center",
                                        }}
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DefaultMotion>
            </Box>
        </Box>
    );
}
