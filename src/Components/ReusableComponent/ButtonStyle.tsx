import { Button, ButtonProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IButton extends ButtonProps {
    children?: ReactNode;
    text?: string;
}
export function ReusableButton({
    children,
    text,
    color,
    size,
    variant,
    ...props
}: IButton) {
    return (
        <Button
            color={color ?? "primary"}
            size={size ?? "large"}
            variant={variant ?? "contained"}
            {...props}
        >
            {children ?? <Typography>{text ?? "Button"}</Typography>}
        </Button>
    );
}
