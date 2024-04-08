import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { EmergencyContact } from "../../../api/EmergencyContactAPI";

interface PatientEmergencyInformationProps {
    emergencyContact: EmergencyContact;
}

const ContainerStyle: SxProps<Theme> = {
    padding: "20px",
    backgroundColor: "lightgreen",
    borderRadius: "32px",
};

export function PatientEmergencyInformation({
    emergencyContact,
}: PatientEmergencyInformationProps) {
    let name = `${emergencyContact.f_name} ${emergencyContact.l_name}`;
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h5" fontWeight={"bold"} color={"white"}>
                Emergency Contact
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >{`♦ Fullname: ${name}`}</Typography>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >
                        ♦ Relationship: {emergencyContact.relationship}
                    </Typography>
                </Stack>
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={"blueviolet"}
                >
                    {`♦ Phone number: ${emergencyContact.phone_number}`}
                </Typography>
            </Stack>
        </Box>
    );
}
