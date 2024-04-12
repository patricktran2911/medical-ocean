import {
    Typography,
    Grid,
    Box,
    SxProps,
    TextField,
    Theme,
    Divider,
    Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    CreateEmergencyContact,
    createEmergencyContact,
} from "../../../api/EmergencyContactAPI";
import { CreateInsurance, createInsurance } from "../../../api/InsuranceAPI";

const TextFieldStyleProps: SxProps<Theme> = {
    "& .MuiInputBase-root": {
        height: "50px",
    },
};

interface ErrorStates {
    f_name: boolean;
    l_name: boolean;
    relationship: boolean;
    phone_number: boolean;
    group_name: boolean;
    insurance_provider: boolean;
    policy_number: boolean;
    group_number: boolean;
}

export function NewPatientECI({
    patient_id,
    onSuccess,
    onTapBack,
}: {
    patient_id: string;
    onSuccess: (patient_id: string) => void;
    onTapBack: () => void;
}) {
    const firstRef = useRef<HTMLInputElement>(null);
    const [emergencyContact, setEmergencyContact] =
        useState<CreateEmergencyContact>({
            f_name: "",
            l_name: "",
            relationship: "",
            phone_number: "",
        });

    const [insurance, setInsurance] = useState<CreateInsurance>({
        group_name: "",
        insurance_provider: "",
        policy_number: "",
        group_number: "",
        primary_care_physician: null,
    });

    const [errors, setErrors] = useState<ErrorStates>({
        f_name: false,
        l_name: false,
        relationship: false,
        phone_number: false,
        group_name: false,
        insurance_provider: false,
        policy_number: false,
        group_number: false,
    });

    useEffect(() => {
        firstRef.current?.focus();
    }, []);

    function handleChangeEmergency(e: React.ChangeEvent<HTMLInputElement>) {
        setEmergencyContact((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function handleChangeInsurance(e: React.ChangeEvent<HTMLInputElement>) {
        setInsurance((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    async function handleSubmit() {
        if (checkError()) {
            return;
        }

        const newEmergencyContact = await createEmergencyContact(
            emergencyContact,
            patient_id
        );

        const newInsurance = await createInsurance(insurance, patient_id);
    }

    function checkError(): boolean {
        let errorFName = emergencyContact.f_name.length === 0;
        let errorLName = emergencyContact.l_name.length === 0;
        let errorRelationship = emergencyContact.relationship.length === 0;
        let errorPhoneNumber = emergencyContact.phone_number.length === 0;
        let errorGroupName = insurance.group_name.length === 0;
        let errorInsuranceProvider = insurance.insurance_provider.length === 0;
        let errorPolicyNumber = insurance.policy_number.length === 0;
        let errorGroupNumber = insurance.group_number.length === 0;

        setErrors({
            f_name: errorFName,
            l_name: errorLName,
            relationship: errorRelationship,
            phone_number: errorPhoneNumber,
            group_name: errorGroupName,
            policy_number: errorPolicyNumber,
            insurance_provider: errorInsuranceProvider,
            group_number: errorGroupNumber,
        });
        return (
            errorFName ||
            errorLName ||
            errorRelationship ||
            errorPhoneNumber ||
            errorGroupName ||
            errorInsuranceProvider ||
            errorPolicyNumber ||
            errorGroupNumber
        );
    }

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <Typography variant="h2" fontWeight={"bold"} alignSelf={"center"}>
                EMERGENCY CONTACT
            </Typography>
            <br />
            <Grid container columnSpacing={10} rowSpacing={10}>
                <Grid item xs={4}>
                    <Typography color={errors.f_name ? "red" : "black"}>
                        First Name*
                    </Typography>

                    <TextField
                        id="f_name"
                        variant="standard"
                        inputRef={firstRef}
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.f_name}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.l_name ? "red" : "black"}>
                        Last Name*
                    </Typography>

                    <TextField
                        id="l_name"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.l_name}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.relationship ? "red" : "black"}>
                        Relationship*
                    </Typography>

                    <TextField
                        id="relationship"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.relationship}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.phone_number ? "red" : "black"}>
                        Phone Number*
                    </Typography>

                    <TextField
                        id="phone_number"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.phone_number}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider
                        sx={{
                            borderColor: "#b3b3ff",
                            borderWidth: "2.5px",
                            marginLeft: "50px",
                            marginRight: "50px",
                        }}
                        variant="middle"
                    />
                </Grid>
            </Grid>
            <br />
            <Typography variant="h2" fontWeight={"bold"} alignSelf={"center"}>
                INSURANCE
            </Typography>
            <br />
            <Grid container columnSpacing={10} rowSpacing={10}>
                <Grid item xs={4}>
                    <Typography color={errors.group_name ? "red" : "black"}>
                        Group Name*
                    </Typography>

                    <TextField
                        id="group_name"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.group_name}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography
                        color={errors.insurance_provider ? "red" : "black"}
                    >
                        Provider*
                    </Typography>

                    <TextField
                        id="insurance_provider"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.insurance_provider}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.policy_number ? "red" : "black"}>
                        Policy Number*
                    </Typography>

                    <TextField
                        id="policy_number"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.policy_number}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={errors.group_number ? "red" : "black"}>
                        Group Number*
                    </Typography>

                    <TextField
                        id="group_number"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        error={errors.group_number}
                        sx={TextFieldStyleProps}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography color={"black"}>Primary Physician</Typography>

                    <TextField
                        id="primary_physician"
                        variant="standard"
                        onChange={handleChangeEmergency}
                        fullWidth
                        sx={TextFieldStyleProps}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    paddingTop: 10,
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    color="error"
                    onClick={onTapBack}
                >
                    <Typography>Back</Typography>
                </Button>
                <Button variant="contained" size="large" onClick={handleSubmit}>
                    <Typography>Next</Typography>
                </Button>
            </Box>
        </Box>
    );
}
