import React, { useState, useContext } from "react";
import "./Login.css";
import { AuthContext } from "../../App";
import logo from "../../Assets/Images/Icon152.webp";
import {
    Box,
    Button,
    Stack,
    SxProps,
    TextField,
    Typography,
} from "@mui/material";
import { supabase } from "../../api/supabaseInterface";
import { getStaffWithId } from "../../api/StaffAPI";
import { Theme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const ContainerStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "32px",
    paddingTop: "50px",
    paddingBottom: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
    maxWidth: "350px",
};

const TitleStyle: SxProps<Theme> = {
    font: "",
    fontSize: "h2",
    alignSelf: "center",
};

const ImageStyle: SxProps<Theme> = {
    width: "100px",
    height: "100px",
    alignSelf: "center",
};

const FormStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
};

const TextFieldStyle: SxProps<Theme> = {
    width: "350px",
    height: "90px",
};

const SubmitButtonStyle: SxProps<Theme> = {
    width: "150px",
    height: "50px",
};

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string>(""); // error msg handler for later
    const [isError, setError] = useState(false);

    const useAuth = useContext(AuthContext);

    const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authUser = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authUser.error) {
            console.log("error", authUser.error.message);
            setError(true);
            setErrorMsg("Incorrect username or password. Try again.");
        } else if (authUser.data) {
            const currentStaff = await getStaffWithId(authUser.data.user.id);
            useAuth?.setCurrentUser(currentStaff);
            navigate("/dashboard");
        }
    };

    function handleOnChange(): void {
        setError(false);
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack direction={"column"} spacing="20px" sx={ContainerStyle}>
                <Box component="img" src={logo} alt="logo" sx={ImageStyle} />
                <Typography variant="h4" sx={TitleStyle}>
                    Login
                </Typography>
                <Box component="form" onSubmit={Submit} sx={FormStyle}>
                    <TextField
                        onChangeCapture={handleOnChange}
                        sx={TextFieldStyle}
                        label="Username"
                        placeholder="Enter Username"
                        name="user"
                        onChange={usernameChange}
                        error={isError}
                    />
                    <TextField
                        onChangeCapture={handleOnChange}
                        sx={TextFieldStyle}
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        onChange={passwordChange}
                        error={isError}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={SubmitButtonStyle}
                    >
                        SIGN IN
                    </Button>
                </Box>
                {errorMsg && (
                    <Typography variant="body1" color={"red"}>
                        {errorMsg}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

export default Login;
