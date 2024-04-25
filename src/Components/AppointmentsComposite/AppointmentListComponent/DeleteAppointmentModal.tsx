import { Box, Modal, Stack, Typography } from "@mui/material";
import { ReusableButton } from "../../ReusableComponent/ButtonStyle";

interface IDeleteAppoinmentModal {
    isShowing: boolean;
    onClickCancel: () => void;
    onClickConfirm: () => void;
}
export default function DeleteAppointmentModal({
    isShowing,
    onClickCancel,
    onClickConfirm,
}: IDeleteAppoinmentModal) {
    return (
        <Modal
            open={isShowing}
            sx={{
                position: "absolute",
                alignSelf: "center",
                justifySelf: "center",
                width: "400px",
                height: "200px",
            }}
        >
            <Box
                sx={(theme) => ({
                    width: "100%",
                    height: "100%",
                    bgcolor: theme.palette.grey[900],
                    py: "30px",
                    px: "20px",

                    borderRadius: "16px",
                })}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"space-between"}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={(theme) => ({
                            color: theme.palette.primary.contrastText,
                        })}
                    >
                        Do you want to delete this appointment?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <ReusableButton color="error" onClick={onClickCancel}>
                            Cancel
                        </ReusableButton>
                        <ReusableButton
                            color="primary"
                            onClick={onClickConfirm}
                        >
                            Confirm
                        </ReusableButton>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
