import { useEffect, useState } from "react";
import { Patient, getAllPatients } from "../../api/PatientAPI";
import { VisitorType, createPatientVisitor } from "../../api/PatientVisitorAPI";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import AutoComplete from "../ReusableComponent/CustomAutoComplete";
import { ReusableButton } from "../ReusableComponent/ButtonStyle";

interface ICreateNewVisitorModal {
    patients: Patient[];
    patientSelected?: Patient;
    type: VisitorType;
}

interface ICreateNewVisitorDelegate {
    onFinished?: () => void;
}

const modalStyle: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "30%",
    // transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "40%",
    height: 250,
};
export function CreateNewVisitorModal({
    onFinished,
}: ICreateNewVisitorDelegate) {
    const [iVM, setIVM] = useState<ICreateNewVisitorModal>({
        patients: [],
        type: VisitorType.walk_in
    });

    useEffect(() => {
        fetchRequireData();
    }, []);

    async function fetchRequireData() {
        const allPatients = await getAllPatients();
        setIVM({
            ...iVM,
            patients: allPatients,
        });
    }

    async function didTapCreate() {
        if (iVM.patientSelected && iVM.type) {
            await createPatientVisitor(iVM.patientSelected.id, iVM.type);
        }

        onFinished && onFinished();
    }

    function didTapClose() {
        onFinished && onFinished();
    }

    return (
        <Grid container sx={modalStyle} columnGap={10}>
            <Grid item xs={3}>
                <Stack direction={"column"} spacing={"5px"}>
                    <Typography variant="h6" component="h2">
                        Patient name:
                    </Typography>
                    <AutoComplete
                        options={iVM.patients.map((patient) => ({
                            id: patient.id,
                            text: `${patient.f_name} ${patient.l_name}`,
                        }))}
                        onSelected={(option) => {
                            setIVM({
                                ...iVM,
                                patientSelected: iVM.patients.find(
                                    (patient) => patient.id === option.id
                                ),
                            });
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={7}>
                <Stack direction={"column"} spacing={"5px"}>
                    <FormControl>
                        <FormLabel id="visitor-type-radio-buttons-group-label">
                            <Typography variant="h6" component="h2">
                                Visit type:
                            </Typography>{" "}
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="visitor-type-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={VisitorType.walk_in}
                            onChange={(type) => {
                                setIVM({
                                    ...iVM,
                                    type: type.target.value as VisitorType,
                                });
                            }}
                        >
                            <FormControlLabel
                                value={VisitorType.walk_in}
                                control={<Radio />}
                                label="Walk in"
                            />
                            <FormControlLabel
                                value={VisitorType.appointment}
                                control={<Radio />}
                                label="Appointment"
                            />
                            <FormControlLabel
                                value={VisitorType.emergency}
                                control={<Radio />}
                                label="Emergency"
                            />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <ReusableButton color="error" onClick={didTapClose}>
                        Cancel
                    </ReusableButton>
                    <ReusableButton color="primary" onClick={didTapCreate}>
                        Create
                    </ReusableButton>
                </Stack>
            </Grid>
        </Grid>
    );
}
