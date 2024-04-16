import { SxProps, Theme, Autocomplete, TextField } from "@mui/material";
import { Patient } from "../../api/PatientAPI";

interface PatientTableProps {
    patients: Patient[];
    onSelect: (patient: Patient) => void;
    sx?: SxProps<Theme> | undefined;
}

export function SearchingComponent({
    patients,
    onSelect,
    sx = undefined,
}: PatientTableProps) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            options={patients.map(
                (patient) => `${patient.f_name} ${patient.l_name}`
            )}
            renderInput={(params) => <TextField {...params} label="Patient" />}
        />
    );
}
