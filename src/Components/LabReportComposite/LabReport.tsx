import { Box, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, getPatient } from "../../api/PatientAPI";
import LRPatientInformation, {
    ILRPatientInformation,
} from "./LRPatientInformation";
import { getInsurance } from "../../api/InsuranceAPI";

const useBoxSx: SxProps<Theme> = (theme) => ({
    width: "100%",
    height: "100%",
    minWidth: theme.breakpoints.values.xl,
    justifyContent: "center",
    alignContent: "center",
});
const useContainer: SxProps<Theme> = {
    width: "95%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: "32px",
};
export default function LabReport() {
    const { patientId } = useParams();
    const [ILRPatientInfo, setILRPatientInfo] =
        useState<ILRPatientInformation | null>(null);
    useEffect(() => {
        fetchRequireData(patientId);
    }, [patientId]);

    async function fetchRequireData(patientId?: string) {
        if (patientId) {
            const result = await getPatient(patientId);
            const insurance = await getInsurance(patientId);
            setILRPatientInfo({
                patient: result,
                insurance: insurance ?? undefined,
            });
        }
    }
    return (
        <Box sx={useBoxSx}>
            <Stack direction={"row"} sx={useContainer}>
                <Stack
                    direction={"column"}
                    bgcolor={"lightcyan"}
                    sx={{
                        py: "100px",
                        width: "30%",
                        borderTopLeftRadius: "32px",
                        borderBottomLeftRadius: "32px",
                    }}
                    alignContent={"center"}
                >
                    <Typography
                        variant="h4"
                        textAlign={"center"}
                        fontWeight={"medium"}
                    >
                        Patient Information
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    {ILRPatientInfo && (
                        <LRPatientInformation
                            patient={ILRPatientInfo.patient}
                            insurance={ILRPatientInfo.insurance}
                        />
                    )}
                </Stack>
                <Stack
                    direction={"column"}
                    sx={{
                        py: "100px",
                        width: "70%",
                        borderTopLeftRadius: "32px",
                        borderBottomLeftRadius: "32px",
                    }}
                    alignContent={"center"}
                >
                    <Typography
                        variant="h4"
                        textAlign={"center"}
                        fontWeight={"medium"}
                    >
                        Lab Reports
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    /// TODO: Add Lab Reports
                </Stack>
            </Stack>
        </Box>
    );
}
