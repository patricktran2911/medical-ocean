import { Stack, Box, SxProps, Theme } from "@mui/material";
import DefaultMotion from "../../Utility/DefaultMotion";
import { PatientInformation } from "../PatientComposite/PatientInformationComponent/PatientInformationComponent";
import { PatientTable } from "../PatientComposite/PatientTable";
import { StaffTableList } from "./StaffTableList";
import { useState } from "react";
import { Staff } from "../../api/StaffAPI";
import { StaffInformation } from "./StaffInformation";

const BoxStyle: SxProps<Theme> = {
	display: "flex",
	width: "100%",
	height: "100%",
	overflow: "auto",
};

const StaffTableStyle: SxProps<Theme> = {
	backgroundColor: "white",
	borderRadius: "16px",
	overflow: "auto",
	WebkitBoxShadow: "-1px 5px 10px 1px #000000",
	scrollbarWidth: "none",
	minWidth: "800px",
	minHeight: "800px",
	height: "98%",
	whiteSpace: "nowrap",
};

export function StaffPage() {
	const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
		undefined
	);

	return (
		<Box sx={BoxStyle}>
			<Stack
				direction={{ xs: "column", lg: "row" }}
				justifyContent={"space-between"}
				spacing={"50px"}
				sx={{ width: "98%", height: "98%", margin: "20px" }}>
				<StaffTableList
					onSelect={(staff) => {
						setSelectedStaff(staff);
					}}
					sx={StaffTableStyle}
				/>

				<DefaultMotion
					key={selectedStaff?.id ?? undefined}
					style={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
						width: "98%",
						height: "98%",
						minWidth: "1250px",
					}}>
					{selectedStaff && (
						<StaffInformation staff={selectedStaff} />
					)}
				</DefaultMotion>
			</Stack>
		</Box>
	);
}
