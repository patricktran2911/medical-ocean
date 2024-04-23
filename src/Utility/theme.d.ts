import { ThemeOptions as MUIThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        defaultBoxShadow: string;
        linearGradients: {
            blue: string;
            purple: string;
        };
    }
    interface ThemeOptions extends MUIThemeOptions {
        linearGradients: {
            blue: string; // "linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%)"
            purple: string; // "linear-gradient(45deg, #4c004c 0%, #6a6a89 50%, #b3b3ff 100%)"
        };
        defaultBoxShadow: string;
        palette: {
            tertiary: {
                main: React.CSSProperties["color"];
                light: React.CSSProperties["color"];
                dark: React.CSSProperties["color"];
                contrastText: React.CSSProperties["color"];
            };
        };
    }
}
