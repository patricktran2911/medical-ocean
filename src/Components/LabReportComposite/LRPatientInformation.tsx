import { Avatar, Stack, Typography } from "@mui/material";
import { Patient } from "../../api/PatientAPI";
import { typographyDefault } from "../../Utility/DefaultTypography";
import { ReusableButton } from "../ReusableComponent/ButtonStyle";
import { Insurance } from "../../api/InsuranceAPI";

export interface ILRPatientInformation {
    patient: Patient;
    insurance?: Insurance;
}
export default function LRPatientInformation({
    patient,
    insurance,
}: ILRPatientInformation) {
    return (
        <Stack direction={"column"} spacing={"50px"} sx={{ px: "50px" }}>
            <Avatar
                sx={{ width: 200, height: 200, alignSelf: "center" }}
            >{`${patient.f_name[0]}${patient.l_name[0]}`}</Avatar>
            <Stack
                direction={"row"}
                spacing={"20px"}
                width={"100%"}
                alignContent={"flex-start"}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    Name:
                </Typography>
                <Typography variant="h5">
                    {`${patient.f_name} ${patient.l_name}`}
                </Typography>
            </Stack>

            <Stack direction={"row"} width={"100%"} spacing={"20px"}>
                <Typography variant="h5" fontWeight={"bold"}>
                    Email:
                </Typography>
                <Typography
                    variant="h5"
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                >{`${patient.email}`}</Typography>
            </Stack>

            <Stack direction={"row"} width={"100%"} spacing={"20px"}>
                <Typography variant="h5" fontWeight={"bold"}>
                    Phone:
                </Typography>
                <Typography
                    variant="h5"
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                >{`${patient.phone_number}`}</Typography>
            </Stack>
            <ReusableButton color="info">Edit profile</ReusableButton>
        </Stack>
    );
}
