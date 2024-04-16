import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { SearchingComponent } from "../ReusableComponent/SearchingComponent";
import { Patient, getAllPatients } from "../../api/PatientAPI";

interface PatientInfo {
    patient: Patient;
}

export function Searchforpatients() {
    const [patientInfos, setPatientInfos] = useState<PatientInfo[]>([]);
    const [selectedPatientInfo, setSelectedPatientInfo] =
        useState<PatientInfo | null>(null);

    useEffect(() => {
        fetchPatients();
    }, []);
    async function fetchPatients() {
        const patients = await getAllPatients();
        const promises = patients.map(async (patient) => {
            return {
                patient: patient,
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
        <Typography
            variant="h4"
            fontWeight={500}
            sx={{
                position: "absolute",
                left: "25%",
                top: "5%",
                backgroundColor: "#f5f5f5",
                padding: "25px",
            }}
        >
            Search for patient
            <SearchingComponent
                patients={patientInfos.map(
                    (patientInfo) => patientInfo.patient
                )}
                onSelect={handleSelectedPatient}
            />
        </Typography>
    );
}
