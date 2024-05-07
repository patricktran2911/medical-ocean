import { Avatar, Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Appointment } from "../../../api/AppointmentAPI";
import { Patient } from "../../../api/PatientAPI";
import { format } from "date-fns";
import { teal } from "@mui/material/colors";

const PatientNameStyle: SxProps<Theme> = {
    whiteSpace: "nowrap",
};
const PatientDateBriefStyle: SxProps<Theme> = {
    whiteSpace: "nowrap",
};

const nextAppointmentBoxStyle: SxProps<Theme> = {
    padding: "30px",
    background: "pink",
    borderRadius: "16px",
};

interface PatientTopContentProps {
    patient: Patient;
    nextAppointment?: Appointment;
    sx?: SxProps<Theme>;
}

export default function PatientInfoTopContent({
    patient,
    nextAppointment,
    sx,
}: PatientTopContentProps) {
    let patientName = `${patient.f_name} ${patient.l_name}`;
    let patientAge = `${patient.age}`;
    let joinDate = format(patient.created_date, "MMMM do, yyyy");

    let nextAppointmentString: string | null = null;

    if (nextAppointment) {
        let date = new Date(nextAppointment.time);
        nextAppointmentString = format(date, "MM / dd");
    }
    return (
        <Stack
            direction="row"
            spacing="30px"
            alignItems={"center"}
            justifyContent={nextAppointment ? "space-between" : "flex-start"}
        >
            <Avatar
                src=""
                sx={{
                    bgcolor: teal[500],
                    width: "150px",
                    height: "150px",
                    fontFamily: "monsterat",
                    fontSize: "30px",
                    fontWeight: "bold",
                }}
            >
                {`${patient.f_name[0]}${patient.l_name[0]}`}
            </Avatar>
            <Stack direction={"column"} spacing={"8px"}>
                <Typography
                    variant="h3"
                    fontWeight={"bold"}
                    sx={PatientNameStyle}
                >
                    {`${patientName}`}
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={PatientDateBriefStyle}
                >
                    {`${patientAge} yrs, ${patient.gender} ♦ ${joinDate}`}
                </Typography>
            </Stack>
            {nextAppointmentString && (
                <Box sx={nextAppointmentBoxStyle}>
                    <Stack
                        direction={"column"}
                        spacing={"16px"}
                        alignItems={"center"}
                    >
                        <Typography variant="h5" fontWeight={"bold"}>
                            {nextAppointmentString}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight="600"
                            color={"darkorchid"}
                        >
                            Next Visit
                        </Typography>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}
