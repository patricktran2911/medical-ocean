import React, { useEffect, useLayoutEffect, useState } from "react";
import AppointmentList, {
    IAppointmentRowProps,
} from "./AppointmentListComponent/ALAppointmentList";
import { getAllAppointments } from "../../api/AppointmentAPI";
import { getPatient } from "../../api/PatientAPI";
import { Box, Paper, Stack } from "@mui/material";
import { Staff, getStaffWithId } from "../../api/StaffAPI";
import DefaultMotion from "../../Utility/DefaultMotion";
import ALStaffInformation from "./AppointmentListComponent/ALStaffInfomation";

interface IViewModel {
    rows: IAppointmentRowProps[];
    staff?: Staff;
}

export default function AllAppointments() {
    const [IViewModel, setIVM] = useState<IViewModel>({
        rows: [],
        staff: undefined,
    });
    const [selectedRow, setSelectedRow] = useState<
        IAppointmentRowProps | undefined
    >(undefined);
    const [staff, setStaff] = useState<Staff | undefined>(undefined);

    useLayoutEffect(() => {
        fetchRequireData();
    }, []);

    useEffect(() => {
        if (selectedRow) {
            fetchStaffData(selectedRow.appointment.staff_id);
        }
    }, [selectedRow]);

    async function fetchStaffData(staff_id: string) {
        const staff = await getStaffWithId(staff_id);
        setStaff(staff);
    }

    async function fetchRequireData() {
        const appointments = await getAllAppointments();
        const promises = appointments.map(async (appointment) => {
            const patient = await getPatient(appointment.patient_id);
            return {
                appointment: appointment,
                patient: patient,
            };
        });
        const result = await Promise.all(promises);
        setIVM({
            rows: result,
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
            }}
        >
            <Stack
                direction={"row"}
                sx={{
                    width: "100%",
                    minWidth: "1800px",
                    mx: "100px",
                    my: "100px",
                    justifyContent: "space-between",
                }}
            >
                <AppointmentList
                    IRows={IViewModel.rows}
                    onSelected={(patient, appointment) => {
                        setSelectedRow({
                            patient: patient,
                            appointment: appointment,
                        });
                    }}
                    sx={{
                        height: "100%",
                        width: "60%",
                    }}
                />
                <Box
                    sx={{
                        width: "30%",
                        height: "100%",
                    }}
                >
                    <DefaultMotion key={selectedRow?.appointment.id}>
                        <Box
                            sx={(theme) => ({
                                display: "flex",
                                width: "100%",
                                height: "100%",
                                bgcolor: "white",
                                borderRadius: "32px",
                                WebkitBoxShadow: theme.defaultBoxShadow,
                            })}
                        >
                            {staff && (
                                <ALStaffInformation
                                    staff={staff}
                                    sx={{
                                        pt: "30px",
                                        pl: "30px",
                                    }}
                                />
                            )}
                        </Box>
                    </DefaultMotion>
                </Box>
            </Stack>
        </Box>
    );
}
