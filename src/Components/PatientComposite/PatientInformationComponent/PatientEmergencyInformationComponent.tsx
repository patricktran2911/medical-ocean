import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";

interface PatientEmergencyInformationProps {
    emergencyContact: EmergencyContact;
}

const ContainerStyle: SxProps<Theme> = (theme) => ({
    backgroundColor: "lightcyan",
    borderColor: theme.palette.grey[700],
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "50px",
});

export function PatientEmergencyInformation({
    emergencyContact,
}: PatientEmergencyInformationProps) {
    let name = `${emergencyContact.f_name} ${emergencyContact.l_name}`;
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h4" fontWeight={"bold"}>
                Emergency Contact
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                    >{`♦ Fullname: ${name}`}</Typography>
                    <Typography variant="h5" fontWeight={"bold"}>
                        ♦ Phone number: {emergencyContact.phone_number}
                    </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={"bold"}>
                    {`♦ Relationship: ${emergencyContact.relationship}`}
                </Typography>
            </Stack>
        </Box>
    );
}
