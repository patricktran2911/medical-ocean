import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Components/DashboardComposite/Dashboard";
import Appointments from "../Components/Appointments";
import { Patients } from "../Components/PatientComposite/Patients";
import MedicalStaff from "../Components/MedicalStaff";
import TeamMember from "../Components/Team_Member";
import Login from "../Components/LoginComponent/Login";
import { AddingNewPatient } from "../Components/PatientComposite/NewPatientFormComponents/AddNewPatient";

export const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="team-members" element={<TeamMember />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new-patient-form" element={<AddingNewPatient />} />
        <Route path="patients">
            <Route path="*" element={<PatientRoutes />} />
        </Route>
        <Route path="medical-staffs" element={<MedicalStaff />} />
    </Routes>
);

export const PatientRoutes = () => (
    <Routes>
        <Route path="all-patients" element={<Patients />} />
        <Route path="new-patient-form" element={<AddingNewPatient />} />
    </Routes>
);
