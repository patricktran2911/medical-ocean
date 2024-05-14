import { Stack, TextField, List, ListItem, Divider, Box } from "@mui/material";
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
export default function AutoComplete({
	options,
	selected,
	onSelected,
}: IAutocomplete) {
	const [IData, setIData] = useState<IAutocomplete>({
		filtered: [],
		options: options,
	});
	const [textValue, setTextValue] = useState("");

	useEffect(() => {
		setTextValue(selected?.text ?? "");
	}, []);

	useEffect(() => {
		setIData({
			...IData,
			options: options,
			selected: selected,
		});
	}, [options]);

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
		<Box
			sx={(theme) => ({
				width: "100%",
				border: "solid",
				borderColor: theme.palette.divider,
				borderWidth: "3px",
				borderRadius: "8px",
				position: "relative",
			})}>
			<TextField
				onChange={handleTextChange}
				sx={{ width: "100%" }}
				defaultValue={selected?.text}
				value={textValue}
			/>
			{IData.filtered && IData.filtered.length !== 0 && (
				<List
					sx={(theme) => ({
						position: "absolute", // Position the list absolutely
						top: "100%", // Start the list right below the TextField
						left: 0,
						width: "100%",
						background: theme.palette.background.default,
						zIndex: "99999",
						maxHeight: "300px", // Set a max-height and make it scrollable
						border: "solid",

						overflow: "auto",
						borderWidth: "3px",
						borderTopWidth: "0px",
						borderColor: theme.palette.divider,
					})}>
					{IData.filtered.map((value) => (
						<ListItem
							key={value.id}
							id={value.id}
							sx={{
								width: "100%",
							}}>
							<Stack
								direction={"column"}
								spacing={"2px"}
								sx={{
									width: "100%",
								}}>
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
		</Box>
	);
}
