import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Insurance } from "../../../api/InsuranceAPI";

interface PatientInsuranceInfoProps {
    insurance: Insurance;
}

const ContainerStyle: SxProps<Theme> = (theme) => ({
    backgroundColor: "lightcyan",
    borderColor: theme.palette.grey[700],
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "50px",
});

export function PatientInsuranceInfo({ insurance }: PatientInsuranceInfoProps) {
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h4" fontWeight={"bold"}>
                Insurance:
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography variant="h5" fontWeight={"bold"}>
                        {`♦ Group Name: ${insurance.group_name}`}
                    </Typography>
                    <Typography variant="h5" fontWeight={"bold"}>
                        {`♦ Group Number: ${insurance.group_number}`}
                    </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={"bold"}>
                    {`♦ Insurance Provider: ${insurance.insurance_provider}`}
                </Typography>
            </Stack>
        </Box>
    );
}
