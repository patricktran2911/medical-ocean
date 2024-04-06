import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { Drawer, List, Toolbar } from "@mui/material";
import "./NavBar.css";
import { color } from "@mui/system";
import { grey } from "@mui/material/colors";
import logo from "../../Assets/Images/Icon120.webp";

function NavBar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 200,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 200,

                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: "black",
                },
            }}
        >
            <List>
                <Toolbar>
                    <Stack
                        sx={{ width: "100%" }}
                        direction="column"
                        justifyContent="center"
                    >
                        <Box component="img" src={logo} />
                        <Link className="homeButton" to="/Dashboard">
                            Dashboard
                        </Link>
                        <Link className="homeButton" to="/Appointments">
                            Appointments
                        </Link>
                        <Link className="homeButton" to="/Patients">
                            Patients
                        </Link>
                        <Link className="homeButton" to="/MedicalStaff">
                            Medical Staff
                        </Link>
                    </Stack>
                </Toolbar>
            </List>
        </Drawer>
    );
}

export default NavBar;
