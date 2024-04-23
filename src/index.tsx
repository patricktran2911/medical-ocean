import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Box, SxProps, Theme, ThemeProvider, createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { typographyDefault } from "./Utility/DefaultTypography";

export const themeOptions: ThemeOptions = {
    defaultBoxShadow: "-1px 5px 10px 1px #000000",
    linearGradients: {
        blue: "linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%)",
        purple: "linear-gradient(45deg, #4c004c 0%, #6a6a89 50%, #b3b3ff 100%)",
    },
    palette: {
        mode: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: typographyDefault,
    transitions: {
        duration: {
            shortest: 150,
        },
    },
};
const RootContainerStyle: SxProps<Theme> = (theme: Theme) => ({
    margin: "0",
    background: theme.linearGradients.blue,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
});

const theme = createTheme(themeOptions);

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
