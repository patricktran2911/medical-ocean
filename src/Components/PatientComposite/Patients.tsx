import React, { useEffect, useState } from "react";
import { Patient, getAllPatients } from "../../api/PatientAPI";
import { Box, Stack, SxProps } from "@mui/material";
import { Theme } from "@emotion/react";
import { PatientTable } from "./PatientTable";
import { PatientInformation } from "./PatientInformationComponent/PatientInformationComponent";
import { Appointment, getPatientAppointments } from "../../api/AppointmentAPI";
import {
    EmergencyContact,
    getEmergencyContact,
} from "../../api/EmergencyContactAPI";
import { Insurance, getInsurance } from "../../api/InsuranceAPI";
import DefaultMotion from "../../Utility/DefaultMotion";
import { useParams } from "react-router-dom";
import {
    DatabaseRTTable,
    subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";

const BoxStyle: SxProps<Theme> = {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "auto",
};

const PatientTableStyle: SxProps<Theme> = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "auto",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
    scrollbarWidth: "none",
    minWidth: "800px",
    minHeight: "800px",
    height: "98%",
    whiteSpace: "nowrap",
};

interface PatientInfo {
    patient: Patient;
    nextAppointment?: Appointment;
    insurance?: Insurance;
    emergencyContact?: EmergencyContact;
}

export function Patients() {
    const { patientId } = useParams();
    const [patientInfos, setPatientInfos] = useState<PatientInfo[]>([]);
    const [selectedPatientInfo, setSelectedPatientInfo] =
        useState<PatientInfo | null>(null);

    useEffect(() => {
        fetchPatients(patientId);
    }, []);

    const handleChangeOfPatientInfos = () => {
        fetchPatients();
    };

    subscribeRTTable(
        DatabaseRTTable.patient,
        undefined,
        fetchPatients,
        fetchPatients
    );

    async function fetchPatients(patientId?: string) {
        const patients = await getAllPatients();
        const promises = patients.map(async (patient) => {
            const appointments = await getPatientAppointments(patient.id);
            const emergencyContact = await getEmergencyContact(patient.id);
            const insurance = await getInsurance(patient.id);
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
                insurance: insurance ?? undefined,
                emergencyContact:
                    emergencyContact.length > 0
                        ? emergencyContact[0]
                        : undefined,
            };
        });
        const patientInfos = await Promise.all(promises);
        setPatientInfos(patientInfos);
        if (patientId) {
            const patient = patientInfos.find(
                (p) => p.patient.id === patientId
            );
            if (patient) {
                setSelectedPatientInfo(patient);
            }
        }
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
                direction={{ xs: "column", lg: "row" }}
                justifyContent={"space-between"}
                spacing={"50px"}
                sx={{ width: "98%", height: "98%", margin: "20px" }}
            >
                <PatientTable
                    patients={patientInfos.map(
                        (patientInfo) => patientInfo.patient
                    )}
                    onSelect={handleSelectedPatient}
                    sx={PatientTableStyle}
                />

                <DefaultMotion
                    key={selectedPatientInfo?.patient.id}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        width: "98%",
                        height: "98%",
                    }}
                >
                    {selectedPatientInfo && (
                        <PatientInformation
                            patient={selectedPatientInfo.patient}
                            nextAppointment={
                                selectedPatientInfo.nextAppointment
                            }
                            insurance={selectedPatientInfo.insurance}
                            emergencyContact={
                                selectedPatientInfo.emergencyContact
                            }
                        />
                    )}
                </DefaultMotion>
            </Stack>
        </Box>
    );
}
