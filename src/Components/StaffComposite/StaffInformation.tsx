import { Box, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Staff } from "../../api/StaffAPI";
import ProfileImageUpload from "./ProfileImageUpload";

interface IStaffInformation {
	staff: Staff;
}

const ContainerStyle: SxProps<Theme> = {
	width: "100%",
	height: "450px",
	backgroundColor: "whitesmoke",
	borderRadius: "32px",
	whiteSpace: "nowrap",
	WebkitBoxShadow: "-1px 5px 10px 1px #000000",
};
export function StaffInformation({ staff }: IStaffInformation) {
	return (
		<Box sx={ContainerStyle}>
			<Stack direction={"column"}>
				<Stack
					direction={"row"}
					spacing={"20px"}
					alignContent={"center"}
					p={5}>
					<ProfileImageUpload staffID={staff.id} />
					<Typography
						alignSelf={"center"}
						variant="h3"
						fontWeight={
							"bold"
						}>{`${staff.f_name} ${staff.l_name}`}</Typography>
				</Stack>
				<Box
					sx={{
						backgroundColor: "lightcyan",
						border: "solid",
						borderWidth: "2px",
						borderColor: "black",
						mx: "50px",
					}}>
					<Grid container px={"16px"} py={"8px"} rowSpacing={10}>
						<Grid item xs={3}>
							<Stack direction={"row"} spacing={2}>
								<Typography variant="h5" fontWeight={"bold"}>
									Title:
								</Typography>

								<Typography variant="h5" fontWeight={"medium"}>
									{staff.title.toUpperCase()}
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={9}>
							<Stack direction={"row"} spacing={2}>
								<Typography variant="h5" fontWeight={"bold"}>
									Email:
								</Typography>

								<Typography variant="h5" fontWeight={"medium"}>
									{staff.email.toUpperCase()}
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={3}>
							<Stack direction={"row"} spacing={2}>
								<Typography variant="h5" fontWeight={"bold"}>
									Phone:
								</Typography>

								<Typography variant="h5" fontWeight={"medium"}>
									{staff.phone_number.toUpperCase()}
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={9}>
							<Stack direction={"row"} spacing={2}>
								<Typography variant="h5" fontWeight={"bold"}>
									Staff ID:
								</Typography>

								<Typography variant="h5" fontWeight={"medium"}>
									{staff.employee_id.toUpperCase()}
								</Typography>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</Stack>
		</Box>
	);
}
