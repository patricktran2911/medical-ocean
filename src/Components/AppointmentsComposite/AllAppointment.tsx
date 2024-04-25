import React, { useEffect, useLayoutEffect, useState } from "react";
import AppointmentList, {
    IAppointmentRowProps,
} from "./AppointmentListComponent/ALAppointmentList";
import {
    deleteAppointment,
    getAllAppointments,
} from "../../api/AppointmentAPI";
import { getPatient } from "../../api/PatientAPI";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { Staff, getStaffWithId } from "../../api/StaffAPI";
import DefaultMotion from "../../Utility/DefaultMotion";
import ALStaffInformation from "./AppointmentListComponent/ALInfomation";
import {
    DatabaseRTTable,
    subscribeRTTable,
} from "../../api/RealTimeDatabaseSubscribe/RTDatabaseTable";
import { ReusableButton } from "../ReusableComponent/ButtonStyle";
import DeleteAppointmentModal from "./AppointmentListComponent/DeleteAppointmentModal";

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
    const [isDeleting, setIsDeleting] = useState(false);
    const [staff, setStaff] = useState<Staff | undefined>(undefined);

    useEffect(() => {
        fetchRequireData();
    }, []);

    const onDeleteAppointment = async () => {
        if (selectedRow?.appointment.id) {
            await deleteAppointment(selectedRow.appointment.id);
            setSelectedRow(undefined);
            setIsDeleting(false);
        }
    };

    function onDataChange() {
        fetchRequireData();
        setSelectedRow(undefined);
        setIsDeleting(false);
    }

    subscribeRTTable(
        DatabaseRTTable.appointments,
        onDataChange,
        onDataChange,
        onDataChange
    );

    useEffect(() => {
        if (selectedRow && selectedRow.appointment.staff_id) {
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
            <DeleteAppointmentModal
                isShowing={isDeleting}
                onClickCancel={() => {
                    setIsDeleting(false);
                }}
                onClickConfirm={onDeleteAppointment}
            />
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
                        width: "50%",
                        minHeight: "800px",
                    }}
                />
                <Box
                    sx={{
                        width: "40%",
                        height: "100%",
                        minHeight: "1200px",
                    }}
                >
                    {staff && selectedRow && (
                        <DefaultMotion key={selectedRow.appointment.id}>
                            <Box
                                sx={(theme) => ({
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    minWidth: "850px",
                                    minHeight: "1100px",
                                    bgcolor: "white",
                                    borderRadius: "32px",
                                    my: "50px",

                                    WebkitBoxShadow: theme.defaultBoxShadow,
                                })}
                            >
                                <ALStaffInformation
                                    staff={staff}
                                    patient={selectedRow.patient}
                                    appointment={selectedRow.appointment}
                                    onDelete={() => {
                                        setIsDeleting(true);
                                    }}
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        pt: "30px",
                                        px: "30px",
                                    }}
                                />
                            </Box>
                        </DefaultMotion>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}
