import { Box } from "@mui/material";
import { useState } from "react";

export default function CreateNewAppointment() {
    const [date, setDate] = useState(new Date());
    const handleDateChange = (date: Date) => {
        setDate(date);
    };
    return <Box></Box>;
}
