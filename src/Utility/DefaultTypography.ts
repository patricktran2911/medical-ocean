import { ThemeOptions } from "@mui/material";

export const typographyDefault: ThemeOptions["typography"] = {
    h1: {
        fontSize: "5rem",
        breakpoints: {
            xs: {
                fontSize: "2rem",
            },
            sm: {
                fontSize: "3rem",
            },
            md: {
                fontSize: "4rem",
            },
        },
    },
    h2: {
        fontSize: "4.5rem",
        breakpoints: {
            xs: {
                fontSize: "1.5rem",
            },
            sm: {
                fontSize: "2.5rem",
            },
            md: {
                fontSize: "3.5rem",
            },
        },
    },
    fontFamily: "montserrat",
};
