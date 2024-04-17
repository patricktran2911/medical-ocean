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
        fontSize: "1.2rem",
        textAlign: "left",
        padding: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
        transition: (theme) =>
            theme.transitions.create(["transform", "color"], {
                duration: theme.transitions.duration.standard,
            }),

        ":hover": {
            color: "#c2caff",
            textDecoration: "none",
            transform: "scale(1.055)",
        },
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
                        sx={LinkStyleSxProps}
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <Typography variant="h6" fontWeight={500}>
                            Dashboard
                        </Typography>
                    </Link>
                    <Link
                        component={"button"}
                        sx={LinkStyleSxProps}
                        onClick={() => handleNavigation("/appointments")}
                    >
                        <Typography variant="h6" fontWeight={500}>
                            Appointments
                        </Typography>
                    </Link>

                    <Accordion
                        sx={{
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                        }}
                        disableGutters
                    >
                        <AccordionSummary
                            expandIcon={
                                <ArrowDropDownIcon
                                    color="secondary"
                                    fontSize="large"
                                />
                            }
                            sx={{ padding: "0", margin: "0", height: "50px" }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                sx={LinkStyleSxProps}
                            >
                                Patients
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link
                                component={"button"}
                                sx={LinkStyleSxProps}
                                onClick={() =>
                                    handleNavigation("/patients/all-patients")
                                }
                            >
                                <Typography variant="h6" fontWeight={500}>
                                    All Patients
                                </Typography>
                            </Link>
                            <Link
                                component={"button"}
                                sx={LinkStyleSxProps}
                                onClick={() =>
                                    navigate("/patients/new-patient-form")
                                }
                            >
                                <Typography variant="h6" fontWeight={500}>
                                    Create New Patient
                                </Typography>
                            </Link>
                        </AccordionDetails>
                    </Accordion>
                    <Link
                        component={"button"}
                        sx={LinkStyleSxProps}
                        onClick={() => handleNavigation("/medical-staffs")}
                    >
                        <Typography variant="h6" fontWeight={500}>
                            Medical Staff
                        </Typography>
                    </Link>
                </Stack>
                <Button
                    variant="outlined"
                    color="warning"
                    sx={{
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
                    <Typography variant="h6" fontWeight={500}>
                        Log out
                    </Typography>
                </Button>
            </Toolbar>
        </List>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="persistent"
                open={isOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        background:
                            "linear-gradient(45deg, #4c004c 0%, #6a6a89 50%, #b3b3ff 100%)",
                        WebkitBoxShadow: "-1px 5px 10px 1px #000000",
                    },
                }}
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
        </Box>
    );
}

export default NavBar;
