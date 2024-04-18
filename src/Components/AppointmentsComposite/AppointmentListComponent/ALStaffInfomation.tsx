import { Avatar, Stack, SxProps, Theme } from "@mui/material";
import { Staff } from "../../../api/StaffAPI";
import { mergeSx } from "merge-sx";

interface ALStaffInformation {
    staff: Staff;
    sx?: SxProps<Theme>;
}
export default function ALStaffInformation({ staff, sx }: ALStaffInformation) {
    return (
        <Stack direction={"row"} justifyContent={"space-between"} sx={sx}>
            <Avatar
                sx={{
                    width: "100px",
                    height: "100px",
                }}
                src={staff.profile_image_url}
                alt={`Staff ${staff.f_name} ${staff.l_name}`}
            />
        </Stack>
    );
}
