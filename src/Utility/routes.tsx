import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Components/DashboardComposite/Dashboard";
import Appointments from "../Components/AppointmentsComposite/AllAppointment";
import { Patients } from "../Components/PatientComposite/Patients";
import TeamMember from "../Components/Team_Member";
import Login from "../Components/LoginComponent/Login";
import { AddingNewPatient } from "../Components/PatientComposite/NewPatientFormComponents/AddNewPatient";
import Staffs from "../Components/Staffs";
import AllAppointments from "../Components/AppointmentsComposite/AllAppointment";
import LabReport from "../Components/LabReportComposite/LabReport";

export const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="appointment" element={<Appointments />}>
            <Route path="*" element={<AppointmentRoutes />} />
        </Route>
        <Route path="team-members" element={<TeamMember />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients">
            <Route path="*" element={<PatientRoutes />} />
        </Route>
        <Route path="staffs" element={<Staffs />} />
    </Routes>
);

export const AppointmentRoutes = () => (
    <Routes>
        <Route path="all-appointments" element={<AllAppointments />} />
        <Route path="create-new-appointment" element={<AllAppointments />} />
    </Routes>
);

export const PatientRoutes = () => (
    <Routes>
        <Route path="all-patients/" element={<Patients />} />
        <Route path="all-patients/:patientId" element={<Patients />} />
        <Route path="new-patient-form" element={<AddingNewPatient />} />
        <Route path="lab-reports/:patientId" element={<LabReport />} />
    </Routes>
);
