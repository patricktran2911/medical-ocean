import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Stack,
    Typography,
    Button,
    SxProps,
    Link,
    Box,
    Theme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { Drawer, List, Toolbar } from "@mui/material";
import { AuthContext } from "../../App";
import { staffCheckout } from "../../api/StaffAPI";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const useAuth = useContext(AuthContext);
    const navigate = useNavigate();

    const drawerWidth = isOpen ? 350 : 0;

    async function handleLogOut() {
        if (useAuth?.currentUser?.id) {
            await staffCheckout(useAuth.currentUser.id);
            useAuth?.setCurrentUser(null);
            navigate("/login");
        } else {
            useAuth?.setCurrentUser(null);
            navigate("/login");
        }
    }

    function handleNavigation(path: string) {
        navigate(path);
    }

    const LinkStyleSxProps: SxProps<Theme> = {
        color: "white",
        textTransform: "none",
        fontSize: (theme) => theme.typography.h6,
        textAlign: "left",
        padding: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
        textDecoration: "none",
        transition: (theme) =>
            theme.transitions.create(["transform", "color"], {
                duration: theme.transitions.duration.standard,
            }),

        ":hover": {
            color: "#c2caff",
            textDecoration: "none",
            transform: "scale(1.1)",
        },
    };

    const AccordionStyleSxProps: SxProps<Theme> = {
        ...LinkStyleSxProps,
        fontSize: (theme) => theme.typography.subtitle1,
    };

    const DrawerContent: React.FC = () => (
        <List sx={{ width: "100%", height: "100%" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Stack
                    sx={{ width: "100%" }}
                    direction="column"
                    justifyContent="center"
                    spacing={3}
                >
                    <Link
                        component={"button"}
                        sx={{ textDecoration: "none" }}
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <Typography sx={LinkStyleSxProps}>Dashboard</Typography>
                    </Link>
                    <Accordion
                        sx={{
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ArrowDropDownIcon
                                    color="secondary"
                                    fontSize="large"
                                />
                            }
                            sx={{ padding: "0", margin: "0" }}
                        >
                            <Typography sx={LinkStyleSxProps}>
                                Appointment
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link
                                component={"button"}
                                sx={{ textDecoration: "none" }}
                                onClick={() =>
                                    handleNavigation(
                                        "/appointment/all-appointments"
                                    )
                                }
                            >
                                <Typography sx={AccordionStyleSxProps}>
                                    • All Appointments
                                </Typography>
                            </Link>
                            <Link
                                component={"button"}
                                sx={{ textDecoration: "none" }}
                                onClick={() =>
                                    handleNavigation(
                                        "/appointment/create-new-appointment"
                                    )
                                }
                            >
                                <Typography sx={AccordionStyleSxProps}>
                                    • Create New Appointment
                                </Typography>
                            </Link>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        sx={{
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ArrowDropDownIcon
                                    color="secondary"
                                    fontSize="large"
                                />
                            }
                            sx={{ padding: "0", margin: "0" }}
                        >
                            <Typography sx={LinkStyleSxProps}>
                                Patients
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link
                                component={"button"}
                                sx={{ textDecoration: "none" }}
                                onClick={() =>
                                    handleNavigation("/patients/all-patients")
                                }
                            >
                                <Typography sx={AccordionStyleSxProps}>
                                    • All Patients
                                </Typography>
                            </Link>
                            <Link
                                component={"button"}
                                sx={{ textDecoration: "none" }}
                                onClick={() =>
                                    navigate("/patients/new-patient-form")
                                }
                            >
                                <Typography sx={AccordionStyleSxProps}>
                                    • Create New Patient
                                </Typography>
                            </Link>
                        </AccordionDetails>
                    </Accordion>
                    <Link
                        component={"button"}
                        sx={{ textDecoration: "none" }}
                        onClick={() => handleNavigation("/staffs")}
                    >
                        <Typography sx={LinkStyleSxProps}>Staffs</Typography>
                    </Link>
                </Stack>
                <Button
                    variant="outlined"
                    color="warning"
                    sx={{
                        textDecoration: "none",
                        ":hover": {
                            color: "red",
                            transform: "scale(1.055)",
                            transition: (theme) =>
                                theme.transitions.create(
                                    ["color", "transform"],
                                    {
                                        duration:
                                            theme.transitions.duration.complex,
                                        easing: theme.transitions.easing
                                            .easeInOut,
                                    }
                                ),
                        },
                    }}
                    onClick={handleLogOut}
                >
                    <Typography>Log out</Typography>
                </Button>
            </Toolbar>
        </List>
    );

    return (
        <Stack direction={"row"}>
            <Drawer
                variant="persistent"
                open={isOpen}
                sx={(theme) => ({
                    width: drawerWidth,
                    flexShrink: 0,

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        background: theme.linearGradients.purple,
                        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
                    },
                })}
            >
                <DrawerContent />
            </Drawer>
            <Button
                value={"check"}
                sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "lightgray",
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <MenuOpenIcon />
            </Button>
        </Stack>
    );
}

export default NavBar;
