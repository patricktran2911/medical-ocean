import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Box, SxProps, Theme, ThemeProvider, createTheme } from "@mui/material";

const RootContainerStyle: SxProps<Theme> = {
    margin: "0",
    background:
        "linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%) repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
};

const theme = createTheme({
    typography: {
        fontFamily: "montserrat",
    },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Box sx={RootContainerStyle}>
                <Router>
                    <App />
                </Router>
            </Box>
        </ThemeProvider>
    </React.StrictMode>
);
