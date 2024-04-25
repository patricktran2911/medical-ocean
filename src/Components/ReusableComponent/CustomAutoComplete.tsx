import { Stack, TextField, List, ListItem, Divider } from "@mui/material";
import { ReusableButton } from "./ButtonStyle";
import { useEffect, useState } from "react";
import fuzzysearch from "fuzzysearch-ts";

interface IOption {
    id: string;
    text: string;
}

interface IAutocomplete {
    filtered?: IOption[];
    selected?: IOption;
    options: IOption[];
    onSelected?: (option: IOption) => void;
}
export default function AutoComplete({ options, onSelected }: IAutocomplete) {
    const [IData, setIData] = useState<IAutocomplete>({
        filtered: [],
        options: options,
    });

    useEffect(() => {
        setIData({
            ...IData,
            options: options,
        });
    }, [options]);

    const [textValue, setTextValue] = useState("");
    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value.length === 0) {
            setTextValue(e.target.value);
            setIData({
                ...IData,
                filtered: [],
            });
        } else {
            setTextValue(e.target.value);
            setIData({
                ...IData,
                filtered: options.filter((option) =>
                    fuzzysearch(e.target.value, option.text)
                ),
            });
        }
    }

    function handleSelectedOption(option: IOption) {
        setTextValue(option.text);
        setIData({
            ...IData,
            filtered: [],
            selected: option,
        });
        onSelected?.(option);
    }

    return (
        <Stack
            direction={"column"}
            spacing={0}
            sx={(theme) => ({
                width: "100%",
                border: "solid",
                borderColor: theme.palette.divider,
                borderWidth: "3px",
                borderRadius: "8px",
            })}
        >
            <TextField
                variant="outlined"
                onChange={handleTextChange}
                sx={{ width: "100%" }}
                value={textValue}
            />
            {IData.filtered && IData.filtered.length !== 0 && (
                <List
                    sx={(theme) => ({
                        width: "100%",
                        zIndex: "9",
                    })}
                >
                    {IData.filtered.map((value) => (
                        <ListItem
                            id={value.id}
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Stack
                                direction={"column"}
                                spacing={"2px"}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <ReusableButton
                                    variant="text"
                                    color="inherit"
                                    onClick={() => {
                                        handleSelectedOption(value);
                                    }}
                                    sx={{
                                        width: "100%",
                                        textTransform: "none",
                                        justifyContent: "flex-start",
                                    }}
                                    text={value.text}
                                />
                                <Divider />
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            )}
        </Stack>
    );
}
