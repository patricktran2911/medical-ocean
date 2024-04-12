import {
    Typography,
    Grid,
    TextField,
    Stack,
    Select,
    MenuItem,
    Box,
    Button,
    SxProps,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState, useEffect } from "react";
import { NewPatient, createPatient } from "../../../api/PatientAPI";
import { Theme } from "@emotion/react";

interface ErrorStates {
    f_name: boolean;
    l_name: boolean;
    gender: boolean;
    dob: boolean;
    address: boolean;
    phone_number: boolean;
}

const TextFieldStyleProps: SxProps<Theme> = {
    "& .MuiInputBase-root": {
        height: "50px",
    },
};

export function NewPatientInformationForm({
    onSuccess,
}: {
    onSuccess: (patient_id: string) => void;
}) {
    const f_nameRef = useRef<HTMLInputElement>(null);

    const [newPatient, setNewPatient] = useState<NewPatient>({
        f_name: "",
        m_name: null,
        l_name: "",
        gender: "",
        email: null,
        dob: "",
        blood_group: null,
        marital_status: null,
        rh_factor: null,
        address: "",
        phone_number: "",
        preferred_language: null,
        occupation: null,
        ethnicity: null,
        special_allergies: null,
    });

    const [errors, setErrors] = useState<ErrorStates>({
        f_name: false,
        l_name: false,
        gender: false,
        dob: false,
        address: false,
        phone_number: false,
    });

    useEffect(() => {
        f_nameRef.current?.focus();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setErrors((prev) => ({
            ...prev,
            [e.target.id]: false,
        }));
        setNewPatient((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    async function handleSubmit() {
        if (checkError()) {
            return;
        }
        const patient = await createPatient(newPatient);
        if (patient) {
            onSuccess(patient.id);
        }
    }

    function checkError(): boolean {
        let errorF_name = newPatient.f_name.length === 0;
        let errorL_name = newPatient.l_name.length === 0;
        let errorGender = newPatient.gender.length === 0;
        let errorDob = newPatient.dob.length === 0;
        let errorAddress = newPatient.address.length === 0;
        let errorPhone_number = newPatient.phone_number.length === 0;
        setErrors({
            f_name: errorF_name,
            l_name: errorL_name,

            gender: errorGender,

            dob: errorDob,
            address: errorAddress,
            phone_number: errorPhone_number,
        });
        return (
            errorF_name ||
            errorL_name ||
            errorGender ||
            errorDob ||
            errorAddress ||
            errorPhone_number
        );
    }

    return (
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
            <Typography variant="h2" fontWeight={"bold"} alignSelf={"center"}>
                PATIENT INFORMATION
            </Typography>
            <br />
            <Grid container columnSpacing={10} rowSpacing={10}>
                <Grid item xs={4}>
                    <Typography color={errors.f_name ? "red" : "black"}>
                        First Name*
                    </Typography>

                    <TextField
                        id="f_name"
                        variant="standard"
                        inputRef={f_nameRef}
                        onChange={handleChange}
                        fullWidth
                        error={errors.f_name}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography>Middle Name</Typography>
                    <TextField
                        id="m_name"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.l_name ? "red" : "black"}>
                        Last Name*
                    </Typography>

                    <TextField
                        id="l_name"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        error={errors.l_name}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.dob ? "red" : "black"}>
                        Date of birth*
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            defaultValue={null}
                            slotProps={{
                                textField: {
                                    size: "medium",
                                },
                            }}
                            onChange={(value) => {
                                if (value) {
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        dob: value.format("YYYY-MM-DD"),
                                    }));
                                }
                            }}
                            disableFuture
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <Typography color={errors.address ? "red" : "black"}>
                        Address*
                    </Typography>
                    <TextField
                        id="address"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        error={errors.address}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography color={errors.f_name ? "red" : "black"}>
                        Phone Number*
                    </Typography>
                    <TextField
                        id="phone_number"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        error={errors.phone_number}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Typography color={errors.gender ? "red" : "black"}>
                            Gender*
                        </Typography>

                        <Select
                            labelId="gender-label"
                            id="gender"
                            value={newPatient.gender}
                            variant="filled"
                            fullWidth
                            onChange={(e) => {
                                setNewPatient((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }));
                            }}
                            error={errors.gender}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Typography>Marital Status</Typography>

                        <Select
                            labelId="marital_status_label_id"
                            id="marital_status"
                            value={newPatient.marital_status}
                            variant="filled"
                            fullWidth
                            onChange={(e) => {
                                setNewPatient((prev) => ({
                                    ...prev,
                                    marital_status: e.target.value,
                                }));
                            }}
                        >
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Maried"}>Maried</MenuItem>
                            <MenuItem value={"Divorced"}>Divorced</MenuItem>
                            <MenuItem value={"Widowed"}>Widowed</MenuItem>
                            <MenuItem value={"Separated"}>Separated</MenuItem>
                        </Select>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Blood group</Typography>

                    <TextField
                        id="blood_group"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Typography>RH Factor</Typography>

                        <Select
                            labelId="rh_factor_label"
                            id="rh_factor_id"
                            value={newPatient.rh_factor}
                            variant="filled"
                            fullWidth
                            onChange={(e) => {
                                setNewPatient((prev) => ({
                                    ...prev,
                                    rh_factor: e.target.value,
                                }));
                            }}
                        >
                            <MenuItem value={"Positive"}>Positive</MenuItem>
                            <MenuItem value={"Negative"}>Negative</MenuItem>
                        </Select>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Preferred Language</Typography>

                    <TextField
                        id="preferred_language"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Occupation</Typography>

                    <TextField
                        id="occupation"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Ethnicity</Typography>

                    <TextField
                        id="ethnicity"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Special allergies</Typography>

                    <TextField
                        id="special_allergies"
                        variant="standard"
                        onChange={handleChange}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                    paddingTop: 10,
                }}
            >
                <Button variant="contained" size="large" onClick={handleSubmit}>
                    <Typography>Next</Typography>
                </Button>
            </Box>
        </Box>
    );
}
