import { useEffect, useState } from "react";
import { Staff, getAllStaff } from "../../api/StaffAPI";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Autocomplete,
	TextField,
	TableBody,
	Button,
	Typography,
	SxProps,
	Theme,
} from "@mui/material";
import fuzzysearch from "fuzzysearch-ts";
import { TableStyleSx } from "../ReusableComponent/TableStyle";
import { mergeSx } from "merge-sx";
import {
	DatabaseRTTable,
	subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";

interface IStaffTableList {
	onSelect?: (staff: Staff) => void;
	sx?: SxProps<Theme>;
}
export function StaffTableList({ onSelect, sx }: IStaffTableList) {
	const mergeTableContainerSx: SxProps<Theme> = mergeSx(
		TableStyleSx.container,
		sx
	);

	const [staffs, setStaff] = useState<Staff[]>([]);
	const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

	useEffect(() => {
		fetchRequireData();
	}, []);

	subscribeRTTable(
		DatabaseRTTable.staff,
		fetchRequireData,
		fetchRequireData,
		fetchRequireData
	);

	async function fetchRequireData() {
		const staffs = await getAllStaff();
		const sortedStaff = staffs.sort((a, b) =>
			a.f_name > b.f_name ? 1 : -1
		);
		setStaff(sortedStaff);
		setFilteredStaffs(sortedStaff);
	}

	return (
		<TableContainer sx={mergeTableContainerSx}>
			<Table sx={TableStyleSx.table}>
				<TableHead sx={TableStyleSx.head}>
					<TableRow sx={TableStyleSx.headRow}>
						<TableCell sx={TableStyleSx.headCell}>
							<Autocomplete
								disableListWrap
								style={{
									color: "white",
								}}
								sx={(theme: Theme) => ({
									background: "none",
									width: "300px",
									borderRadius: "30px",
									py: "20px",

									"& .MuiAutocomplete-inputRoot": {
										color: "white",
									},
									"& .MuiAutocomplete-popupIndicator": {
										color: "white", // Custom color for the dropdown arrow
									},
								})}
								options={staffs.map((staff) =>
									[staff.f_name, staff.l_name].join(" ")
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										sx={(theme) => ({
											color: "whitesmoke",
											fontSize: theme.typography.h6,

											"& .MuiInput-underline:before": {
												borderBottomColor: "white", // normal state
											},
											"& .MuiInput-underline:after": {
												borderBottomColor: "blue", // focused state
											},
											"& .MuiInput-underline:hover:not(.Mui-disabled):before":
												{
													borderBottomColor: "white", // hover state
												},

											"& .MuiInputBase-input::placeholder":
												{
													color: theme.palette
														.grey[100],
													fontSize:
														theme.typography.h6,
												},
										})}
										placeholder="Staff Name"
										variant="standard"></TextField>
								)}
								onChange={(_, value) => {
									if (value && value.length > 0) {
										setFilteredStaffs(
											staffs.filter((staff) => {
												const staffName = `${staff.f_name} ${staff.l_name}`;
												const inputName = value;
												return fuzzysearch(
													value,
													staffName
												);
											})
										);
									} else {
										setFilteredStaffs(staffs);
									}
								}}
							/>
						</TableCell>

						<TableCell sx={TableStyleSx.headCell}>Title</TableCell>

						<TableCell sx={TableStyleSx.headCell}>
							Phone Number
						</TableCell>

						<TableCell sx={TableStyleSx.headCell}>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredStaffs.map((staff) => (
						<TableRow sx={TableStyleSx.bodyRow} key={staff.id}>
							<TableCell sx={TableStyleSx.bodyCell}>
								<Button
									sx={(theme) => ({
										color: "black",
										textTransform: "none",

										":hover": {
											color: theme.palette.warning.dark,
											cursor: "pointer",
										},
									})}
									onClick={() => {
										onSelect && onSelect(staff);
									}}>
									<Typography sx={TableStyleSx.bodyCell}>
										{`${staff.f_name} ${staff.l_name}`}
									</Typography>
								</Button>
							</TableCell>
							<TableCell sx={TableStyleSx.bodyCell}>
								{staff.title}
							</TableCell>
							<TableCell sx={TableStyleSx.bodyCell}>
								{staff.phone_number}
							</TableCell>
							<TableCell sx={TableStyleSx.bodyCell}>
								{staff.email ?? ""}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
