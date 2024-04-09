import { useEffect, useState } from "react";
import { Staff, getStaffWithId, staffCheckIn } from "../../api/StaffAPI";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { UUID } from "crypto";
import { Theme } from "@emotion/react";

interface CheckInCardProps {
    id: string;
    onSuccess: (staff: Staff) => void;
    onCancel: () => void;
}
export function CheckInCard({ id, onSuccess, onCancel }: CheckInCardProps) {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        const daytime = new Date();
        if (daytime.getHours() >= 12) {
            setMessage("Good Afternoon");
        } else if (daytime.getHours() >= 18) {
            setMessage("Good Evening");
        } else {
            setMessage("Good Morning");
        }
        getStaffWithId(id).then((staff) => {
            setStaff(staff);
        });
    }, []);

    async function handleCheckIn() {
        const status = await staffCheckIn(id);
        const staff = await getStaffWithId(status.staff_id);

        onSuccess(staff);
    }

    function handleCancel() {
        onCancel();
    }

    const CardBoxStyle: SxProps<Theme> = {
        backgroundColor: "#333333",
        justifyContent: "center",
        borderRadius: "32px",
        paddingTop: "50px",
        paddingBottom: "50px",
        paddingLeft: "30px",
        paddingRight: "30px",
        maxWidth: "350px",
        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
    };

    return (
        <Box sx={CardBoxStyle}>
            <Typography variant="h4" fontWeight={"bold"} color={"lightgrey"}>
                {message} {staff?.title === "Doctor" ? "Dr. " : ""}{" "}
                {`${staff?.l_name}`}
            </Typography>
            <Typography variant="h5" fontWeight={"600"} color={"lightgrey"}>
                Do you want to check in now?
            </Typography>
            <br />

            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={handleCheckIn} variant="contained">
                    <Typography variant="body1" fontWeight={"600"}>
                        Check in
                    </Typography>
                </Button>
                <Button
                    onClick={handleCancel}
                    variant="contained"
                    color="warning"
                >
                    <Typography variant="body1" fontWeight={"600"}>
                        Cancel
                    </Typography>
                </Button>
            </Stack>
        </Box>
    );
}
