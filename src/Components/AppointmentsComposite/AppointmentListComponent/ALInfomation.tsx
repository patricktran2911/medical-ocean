import {
    Avatar,
    Divider,
    Stack,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { Staff } from "../../../api/StaffAPI";
import { mergeSx } from "merge-sx";
import { Patient } from "../../../api/PatientAPI";
import { Appointment } from "../../../api/AppointmentAPI";
import { format } from "date-fns";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";
import { TestAppointmentEdit } from "./TestAppointmentEdit";

interface IALInformation {
    appointment: Appointment;
    staff: Staff;
    patient: Patient;
    onDelete?: () => void;
    sx?: SxProps<Theme>;
}
export default function ALInformation({
    appointment,
    staff,
    patient,
    sx,
    onDelete,
}: IALInformation) {
    const currentSx = mergeSx(sx);

    return (
        <Stack direction={"column"} sx={currentSx} spacing={"50px"}>
            <Typography align="center" variant="h3" fontWeight={"bold"}>
                Appointment Details
                <Typography
                    variant={"h6"}
                >{`Time: ${format(appointment.time, "HH:mm aa")} • Date: ${format(appointment.time, "MMMM do, yyyy")}`}</Typography>
            </Typography>
            <Divider
                orientation="horizontal"
                variant="middle"
                sx={(theme) => ({
                    borderColor: theme.palette.grey[700],
                })}
            />
            <Typography align="center" variant="h5" fontWeight={"bold"}>
                Staff Information
            </Typography>

            <Stack direction={"row"} spacing={"50px"} alignItems={"center"}>
                <Avatar
                    sx={{
                        width: "150px",
                        height: "150px",
                    }}
                    src={staff.profile_image_url}
                    alt={`Staff ${staff.f_name} ${staff.l_name}`}
                />

                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={"30px"}
                    sx={(theme) => ({
                        backgroundColor: "lightcyan",
                        borderColor: theme.palette.grey[700],
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "50px",
                        width: "100%",
                    })}
                >
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        whiteSpace={"nowrap"}
                    >
                        {`Staff: ${staff.f_name} ${staff.l_name}`}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        whiteSpace={"nowrap"}
                    >
                        {`Title: ${staff.title}`}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        whiteSpace={"nowrap"}
                    >
                        {`Email: ${staff.email}`}
                    </Typography>
                </Stack>
            </Stack>
            <Divider
                orientation="horizontal"
                variant="middle"
                sx={(theme) => ({
                    borderColor: theme.palette.grey[700],
                })}
            />
            <Typography align="center" variant="h5" fontWeight={"bold"}>
                Patient Information
            </Typography>
            <Stack
                direction={"row"}
                spacing={"50px"}
                alignItems={"center"}
                sx={{
                    width: "100%",
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    sx={(theme) => ({
                        width: "100%",
                        backgroundColor: "lightcyan",
                        borderColor: theme.palette.grey[700],
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "50px",
                    })}
                    spacing={"30px"}
                >
                    <Stack direction={"row"} spacing={"50px"}>
                        <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            whiteSpace={"nowrap"}
                        >
                            {`Name: `}
                        </Typography>
                        <Typography variant="h5" whiteSpace={"nowrap"}>
                            {`${patient.f_name} ${patient.l_name}`}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={"50px"}>
                        <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            whiteSpace={"nowrap"}
                        >
                            {`Email: `}
                        </Typography>
                        <Typography variant="h5" whiteSpace={"nowrap"}>
                            {`${patient.email}`}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={"50px"}>
                        <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            whiteSpace={"nowrap"}
                        >
                            {`Phone: `}
                        </Typography>
                        <Typography variant="h5" whiteSpace={"nowrap"}>
                            {`${patient.phone_number}`}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                    position: "absolute",
                    width: "95%",
                    bottom: "50px",
                }}
            >
                <TestAppointmentEdit />
                <ReusableButton color="error" onClick={onDelete}>
                    Cancel Appointment
                </ReusableButton>
            </Stack>
        </Stack>
    );
}
