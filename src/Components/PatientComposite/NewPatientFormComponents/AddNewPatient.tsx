import React, { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { NewPatientInformationForm } from "./PatientInformationForm";
import { AnimatePresence } from "framer-motion";
import { NewPatientECI } from "./NewPatientECI";
import { useNavigate } from "react-router-dom";
import DefaultMotion from "../../../Utility/DefaultMotion";

const useContainerBoxStyle: SxProps<Theme> = {
    display: "flex",
    overflow: "auto",
    width: "100%",
    minWidth: "1500px",
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
    maxHeight: "950px",
    backgroundColor: "white",
    borderRadius: "32px",
};

export function AddingNewPatient() {
    const navigate = useNavigate();
    const [step, setStep] = useState<{ index: number; data: any }>({
        index: 0,
        data: null,
    });

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
                            navigate("/patients/all-patients");
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
            <Box sx={useFormContainerStyle}>
                <DefaultMotion
                    key={step.index}
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
                </DefaultMotion>
            </Box>
        </Box>
    );
}
