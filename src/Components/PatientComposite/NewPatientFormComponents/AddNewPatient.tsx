import React, { useRef, useState } from "react";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";
import { Insurance } from "../../../api/InsuranceAPI";
import { MedicalHistory } from "../../../api/MedicalHistoryAPI";
import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";
import { NewPatientInformationForm } from "./PatientInformationForm";
import { AnimatePresence, motion } from "framer-motion";
import { NewPatientECI } from "./NewPatientECI";
import { useNavigate } from "react-router-dom";

const useContainerBoxStyle: SxProps<Theme> = {
    display: "flex",
    overflow: "auto",
    width: "100%",
    minHeight: "1000px",
    height: "100%",
    padding: "25px",

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
};

const useFormContainerStyle: SxProps<Theme> = {
    width: "90%",
    height: "90%",
    padding: "50px",
    maxHeight: "900px",
    backgroundColor: "white",
    borderRadius: "32px",
};

export function AddingNewPatient() {
    const navigate = useNavigate();
    const [step, setStep] = useState<{ index: number; data: any }>({
        index: 0,
        data: null,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function StepContent({ index, data }: { index: number; data: any }) {
        switch (index) {
            case 0:
                return (
                    <NewPatientInformationForm
                        onSuccess={(patient_id) => {
                            setStep({ index: 1, data: patient_id });
                        }}
                    />
                );
            case 1:
                return (
                    <NewPatientECI
                        patient_id={data}
                        onSuccess={(patient_id) => {
                            navigate("/patients");
                        }}
                        onTapBack={() => {
                            setStep({ index: 0, data: null });
                        }}
                    />
                );
            default:
                return <></>;
        }
    }

    return (
        <Box sx={useContainerBoxStyle}>
            <AnimatePresence>
                <Box sx={useFormContainerStyle}>
                    <motion.div
                        key={step.index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0.5 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 1 }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <StepContent index={step.index} data={step.data} />
                    </motion.div>
                </Box>
            </AnimatePresence>
        </Box>
    );
}
