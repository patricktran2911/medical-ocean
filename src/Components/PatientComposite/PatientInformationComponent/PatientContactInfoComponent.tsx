import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Patient } from "../../../api/PatientAPI";

interface PatientContactInfoProps {
    patient: Patient;
}

const ContainerStyle: SxProps<Theme> = {
    padding: "20px",
    backgroundColor: "lightblue",
    borderRadius: "32px",
};

export function PatientContactInfo({ patient }: PatientContactInfoProps) {
    let name = `${patient.f_name} ${patient.l_name}`;
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h5" fontWeight={"bold"} color={"white"}>
                Contact Information:
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >
                        {`♦ Phone: ${patient.phone_number}`}
                    </Typography>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >
                        {`♦ Email: ${patient.email ?? "none"}`}
                    </Typography>
                </Stack>
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={"blueviolet"}
                >
                    {`♦ Address: ${patient.address}`}
                </Typography>
            </Stack>
        </Box>
    );
}
