import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Insurance } from "../../../api/InsuranceAPI";

interface PatientInsuranceInfoProps {
    insurance: Insurance;
}

const ContainerStyle: SxProps<Theme> = {
    padding: "20px",
    backgroundColor: "lightblue",
    borderRadius: "32px",
};

export function PatientInsuranceInfo({ insurance }: PatientInsuranceInfoProps) {
    return (
        <Box sx={ContainerStyle}>
            <Typography variant="h5" fontWeight={"bold"} color={"white"}>
                Insurance:
            </Typography>
            <br />
            <Stack direction="column" spacing={"20px"}>
                <Stack direction={{ xs: "column", lg: "row" }} spacing={"80px"}>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >
                        {`♦ Group Name: ${insurance.group_name}`}
                    </Typography>
                    <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        color={"blueviolet"}
                    >
                        {`♦ Group Number: ${insurance.group_number}`}
                    </Typography>
                </Stack>
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={"blueviolet"}
                >
                    {`♦ Insurance Provider: ${insurance.insurance_provider}`}
                </Typography>
            </Stack>
        </Box>
    );
}
