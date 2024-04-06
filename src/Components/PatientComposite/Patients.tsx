import React, { useEffect, useState } from "react";
import { Patient, getAllPatients } from "../../api/PatientAPI";
import { Box, Stack, SxProps } from "@mui/material";
import { Theme } from "@emotion/react";
import { PatientTable } from "../ReusableComponent/PatientTable";
import { PatientInformation } from "./PatientInformationComponent/PatientInformationComponent";
import { Appointment, getPatientAppointments } from "../../api/AppointmentAPI";

const BoxStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
};

const PatientTableStyle: SxProps<Theme> = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflowY: "auto",
    overflowX: "auto",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
    scrollbarWidth: "none",
    width: "48%",
    height: "98%",
};

interface PatientInfo {
    patient: Patient;
    nextAppointment?: Appointment;
}

export function Patients() {
    const [patientInfos, setPatientInfos] = useState<PatientInfo[]>([]);
    const [selectedPatientInfo, setSelectedPatientInfo] =
        useState<PatientInfo | null>(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    async function fetchPatients() {
        const patients = await getAllPatients();
        const promises = patients.map(async (patient) => {
            const appointments = await getPatientAppointments(patient.id);
            const upcomingAppointments = appointments.filter((appointment) => {
                let today = Date.now();
                let appointmentDate = new Date(appointment.time).getTime();
                return appointmentDate >= today;
            });
            return {
                patient: patient,
                nextAppointment:
                    upcomingAppointments.length > 0
                        ? upcomingAppointments[0]
                        : undefined,
            };
        });
        const patientInfos = await Promise.all(promises);
        setPatientInfos(patientInfos);
    }

    function handleSelectedPatient(patient: Patient) {
        let filteredPatientInfos = patientInfos.filter((patientInfo) => {
            return patientInfo.patient.id === patient.id;
        });

        if (filteredPatientInfos.length !== 0) {
            setSelectedPatientInfo(filteredPatientInfos[0]);
        }
    }

    return (
        <Box sx={BoxStyle}>
            <Stack
                direction="row"
                justifyContent={"space-between"}
                sx={{ width: "98%", height: "98%", margin: "20px" }}
            >
                <PatientTable
                    patients={patientInfos.map(
                        (patientInfo) => patientInfo.patient
                    )}
                    onSelect={handleSelectedPatient}
                    sx={PatientTableStyle}
                />

                {selectedPatientInfo && (
                    <PatientInformation
                        patient={selectedPatientInfo.patient}
                        nextAppointment={selectedPatientInfo.nextAppointment}
                    />
                )}
            </Stack>
        </Box>
    );
}
