import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/DashboardComposite/Dashboard";
import { Patients } from "../Components/PatientComposite/Patients";
import Login from "../Components/LoginComponent/Login";
import { AddingNewPatient } from "../Components/PatientComposite/NewPatientFormComponents/AddNewPatient";
import AllAppointments from "../Components/AppointmentsComposite/AllAppointment";
import LabReport from "../Components/LabReportComposite/LabReport";
import CreateNewAppointment from "../Components/AppointmentsComposite/CreateNewAppointmentComponents/CreateNewAppointment";
import { StaffPage } from "../Components/StaffComposite/StaffPage";
export const MainRoutes = () => (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="appointment">
            <Route path="*" element={<AppointmentRoutes />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients">
            <Route path="*" element={<PatientRoutes />} />
        </Route>
        <Route path="staffs" element={<StaffPage />} />
    </Routes>
);

const AppointmentRoutes = () => (
    <Routes>
        <Route path="all-appointments" element={<AllAppointments />} />
        <Route
            path="create-new-appointment"
            element={<CreateNewAppointment />}
        />
    </Routes>
);

const PatientRoutes = () => (
    <Routes>
        <Route path="all-patients/" element={<Patients />} />
        <Route path="all-patients/:patientId" element={<Patients />} />
        <Route path="new-patient-form" element={<AddingNewPatient />} />
        <Route path="lab-reports/:patientId" element={<LabReport />} />
    </Routes>
);
