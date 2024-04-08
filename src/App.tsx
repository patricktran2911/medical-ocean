import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import NavBar from "./Components/NavBarComponent/NavBar";
import { MainRoutes, PatientRoutes } from "./Utility/routes";
import { Staff } from "./api/StaffAPI";

interface AuthContextType {
    currentUser: Staff | null;
    isAuthenticated: boolean;
    setCurrentUser: (user: Staff | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

function App() {
    const [currentUser, setCurrentUser] = useState<Staff | null>(null);
    const isAuthenticated: boolean = !!currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        console.log(currentUser);
        console.log(isAuthenticated);
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{ currentUser, isAuthenticated, setCurrentUser }}
        >
            <Stack direction={"row"} sx={{ width: "100vw", height: "100vh" }}>
                {isAuthenticated && currentUser && <NavBar />}
                <Routes>
                    <Route path="*" element={<MainRoutes />} />
                </Routes>
            </Stack>
        </AuthContext.Provider>
    );
}

export default App;
