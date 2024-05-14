import { Box, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../../api/PatientAPI";
import LRPatientInformation, {
	ILRPatientInformation,
} from "./LRPatientInformation";
import { getInsurance } from "../../api/InsuranceAPI";
import LRTable, { ILRTable } from "./LRTable";
import { getAllLabReports } from "../../api/LabReportAPI";
import { getEmergencyContact } from "../../api/EmergencyContactAPI";
import {
	DatabaseRTTable,
	subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";

const useBoxSx: SxProps<Theme> = (theme) => ({
	width: "100%",
	height: "100%",
	minHeight: "930px",
	minWidth: theme.breakpoints.values.xl,
	justifyContent: "center",
	alignContent: "center",
});
const useContainer: SxProps<Theme> = {
	width: "95%",
	height: "95%",
	backgroundColor: "white",
	borderRadius: "32px",
};
export default function LabReport() {
	const { patientId } = useParams();
	const [patientInfo, setPatientInfo] =
		useState<ILRPatientInformation | null>(null);
	const [ILRTable, setILRTable] = useState<ILRTable>({
		labReports: [],
	});

	useEffect(() => {
		fetchRequireData();
	}, [patientId]);

	subscribeRTTable(
		DatabaseRTTable.patient,
		fetchRequireData,
		fetchRequireData,
		fetchRequireData
	);

	async function fetchRequireData() {
		if (patientId) {
			const result = await getPatient(patientId);
			const insurance = await getInsurance(patientId);
			const emergencyContact = await getEmergencyContact(patientId);
			const labReports = await getAllLabReports(patientId);
			setPatientInfo({
				patient: result,
				emergencyContact:
					emergencyContact.length > 0
						? emergencyContact[0]
						: undefined,
				insurance: insurance ?? undefined,
			});
			setILRTable({
				...ILRTable,
				labReports: labReports,
			});
		}
	}

	return (
		<Box sx={useBoxSx}>
			<Stack direction={"row"} sx={useContainer}>
				<Stack
					direction={"column"}
					bgcolor={"lightcyan"}
					sx={{
						py: "100px",
						width: "30%",
						borderTopLeftRadius: "32px",
						borderBottomLeftRadius: "32px",
					}}
					alignContent={"center"}>
					<Typography
						variant="h4"
						textAlign={"center"}
						fontWeight={"medium"}>
						Patient Information
					</Typography>
					<br />
					<Divider />
					<br />
					{patientInfo && (
						<LRPatientInformation
							patient={patientInfo.patient}
							emergencyContact={patientInfo.emergencyContact}
							insurance={patientInfo.insurance}
						/>
					)}
				</Stack>
				<Stack
					direction={"column"}
					sx={{
						py: "100px",
						width: "70%",
						borderTopLeftRadius: "32px",
						borderBottomLeftRadius: "32px",
					}}
					alignContent={"center"}>
					<Typography
						variant="h4"
						textAlign={"center"}
						fontWeight={"medium"}>
						Lab Reports
					</Typography>
					<br />
					<Divider />
					<br />

					<Box
						sx={{
							p: "50px",
							pb: "30px",
							height: "100%",
							minHeight: "600px",
						}}>
						<LRTable
							labReports={ILRTable.labReports}
							sx={{
								height: "100%",
								width: "100%",
							}}
						/>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
}
