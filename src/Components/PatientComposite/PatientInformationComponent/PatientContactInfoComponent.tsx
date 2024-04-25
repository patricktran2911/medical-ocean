import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Patient } from "../../../api/PatientAPI";

interface PatientContactInfoProps {
    patient: Patient;
}

const ContainerStyle: SxProps<Theme> = (theme) => ({
    backgroundColor: "lightcyan",
    borderColor: theme.palette.grey[700],
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "50px",
});

export function PatientContactInfo({ patient }: PatientContactInfoProps) {
    let name = `${patient.f_name} ${patient.l_name}`;
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h4" fontWeight={"bold"}>
                Contact Information:
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography variant="h5" fontWeight={"bold"}>
                        {`♦ Phone: ${patient.phone_number}`}
                    </Typography>
                    <Typography variant="h5" fontWeight={"bold"}>
                        {`♦ Email: ${patient.email ?? "none"}`}
                    </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={"bold"}>
                    {`♦ Address: ${patient.address}`}
                </Typography>
            </Stack>
        </Box>
    );
}
