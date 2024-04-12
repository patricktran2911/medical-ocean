import React, { useEffect, useRef, useState } from "react";
import { Patient } from "../../api/PatientAPI";
import { EmergencyContact } from "../../api/EmergencyContactAPI";
import { Insurance } from "../../api/InsuranceAPI";
import { MedicalHistory } from "../../api/MedicalHistoryAPI";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Stack,
    SxProps,
    TextField,
    Theme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { parseISO } from "date-fns";

const useContainerBoxStyle: SxProps<Theme> = {
    display: "flex",
    overflow: "auto",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
};

const useBoxFormContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    padding: "50px",
    backgroundColor: "white",
};

type NewPatient = {
    f_name: string;
    m_name?: string;
    l_name: string;
    gender: string;
    email?: string;
    dob: string;
    age: string;
    blood_group?: string;
    marital_status?: string;
    rh_factor?: string;
    address: string;
    phone_number: string;
    preferred_language?: string;
    occupation?: string;
    ethnicity?: string;
    special_allergies?: string;
};
export function AddingNewPatientForm() {
    const f_nameRef = useRef<HTMLInputElement>(null);

    const [newPatient, setNewPatient] = useState<NewPatient>({
        f_name: "",
        l_name: "",
        gender: "",
        dob: "",
        age: "",
        address: "",
        phone_number: "",
    });
    const [emergencyContact, setEmergencyContact] =
        useState<EmergencyContact | null>(null);
    const [insurance, setInsurance] = useState<Insurance | null>(null);
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
        null
    );

    useEffect(() => {
        f_nameRef.current?.focus();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPatient((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <Box sx={useContainerBoxStyle}>
            <FormControl sx={useBoxFormContainerStyle}>
                <Box sx={useBoxFormContainerStyle}>
                    <Stack direction={"column"} spacing={5}>
                        <TextField
                            id="f_name"
                            variant="standard"
                            inputRef={f_nameRef}
                            label={"First Name"}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            id="m_name"
                            variant="standard"
                            label={"Middle Name"}
                            onChange={handleChange}
                        />
                        <TextField
                            id="l_name"
                            variant="standard"
                            label={"Last Name"}
                            onChange={handleChange}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={"Date Of Birth"}
                                defaultValue={null}
                                onChange={(value) => {
                                    if (value) {
                                        setNewPatient((prev) => ({
                                            ...prev,
                                            dob: value.format("YYYY-MM-DD"),
                                        }));
                                    }
                                }}
                            />
                        </LocalizationProvider>

                        <TextField
                            id="address"
                            variant="standard"
                            label={"Address"}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            id="phone_number"
                            variant="standard"
                            label={"Phone Number"}
                            onChange={handleChange}
                            required
                        />
                        <Select
                            labelId="gender-label"
                            id="gender"
                            value={newPatient.gender}
                            label="Gender"
                            required
                            onChange={(e) => {
                                setNewPatient((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }));
                            }}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </Stack>
                </Box>
            </FormControl>
        </Box>
    );
}
