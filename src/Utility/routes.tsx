import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Components/DashboardComponent/Dashboard";
import Appointments from "../Components/Appointments";
import { Patients } from "../Components/PatientComposite/Patients";
import MedicalStaff from "../Components/MedicalStaff";
import TeamMember from "../Components/Team_Member";
import Login from "../Components/LoginComponent/Login";

export const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/team-members" element={<TeamMember />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />}>
            <Route path="*" element={<PatientRoutes />} />
        </Route>
        <Route path="/medical-staffs" element={<MedicalStaff />} />
    </Routes>
);

export const PatientRoutes = () => (
    <Routes>
        <Route path="/patient/new_patient_form" element={<MedicalStaff />} />
    </Routes>
);
