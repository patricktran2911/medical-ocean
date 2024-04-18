import { SxProps, Theme } from "@mui/material";

export const TableStyleSx: Record<string, SxProps<Theme>> = {
    container: (theme) => ({
        backgroundColor: "white",
        borderRadius: "16px",
        overflowY: "auto",
        overflowX: "auto",
        WebkitBoxShadow: theme.defaultBoxShadow,
        scrollbarWidth: "none",
    }),
    table: {
        borderCollapse: "unset",
    },
    head: (theme) => ({
        width: "100%",
        background: `${theme.linearGradients.blue} repeat`,
        backgroundSize: "fixed",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: "1",
    }),
    headRow: {
        height: "40px",
    },
    headCell: (theme) => ({
        fontSize: theme.typography.h5,
        color: "whitesmoke",
        whiteSpace: "nowrap",
        borderRight: "1px solid #ffffff",
        fontWeight: "bold",

        ":hover": {
            color: "red",
        },

        ":last-child": {
            borderRight: "0px",
        },
    }),
    bodyRow: {
        py: "0.5rem",
        backgroundColor: "white",

        ":hover": {
            scale: "1.015",
        },
    },
    bodyCell: (theme) => ({
        fontSize: theme.typography.h6,
        ":hover": {
            color: "red",
        },
        ":last-child": {
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
    }),
};
