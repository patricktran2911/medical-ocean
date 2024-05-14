// src/components/ProfileImageUpload.tsx
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Avatar, Box } from "@mui/material";
import { supabase } from "../../api/supabaseInterface";
import {
	getProfileImageURL,
	getStaffWithId,
	uploadProfileImage,
} from "../../api/StaffAPI";
import { Circle } from "@mui/icons-material";

interface IProfileImageUpload {
	staffID: string;
}

export function ProfileImageUpload({ staffID }: IProfileImageUpload) {
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		fetchProfileImage();
	}, []);

	async function fetchProfileImage() {
		const staff = await getStaffWithId(staffID);
		setImageUrl(
			staff.profile_image_url ??
				"https://img.freepik.com/premium-vector/doctor-profile-with-medical-service-icon_617655-48.jpg"
		);
	}

	const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const filePath = `${Math.random()}_${staffID}.${fileExt}`;

			const imageURL = await uploadProfileImage(staffID, filePath, file);
			console.log(imageURL?.toString());
			setImageUrl(
				imageURL?.toString() ??
					"https://img.freepik.com/premium-vector/doctor-profile-with-medical-service-icon_617655-48.jpg"
			);
		} catch {
			setUploading(false);
		} finally {
			setUploading(false);
		}
	};

	return (
		<Box
			sx={{
				width: "150px",
				height: "150px",
				position: "relative",
				borderRadius: "50%",
				":hover": {
					border: "solid",
					borderColor: "blue",
				},
			}}>
			<label htmlFor="upload-button">
				{uploading ? (
					<CircularProgress />
				) : (
					<Avatar
						src={imageUrl?.toString()}
						alt="Profile Image"
						style={{ width: "100%", height: "100%" }}
					/>
				)}
			</label>
			<input
				id="upload-button"
				type="file"
				accept=".jpg"
				style={{ display: "none" }}
				onChange={uploadImage}
			/>
			<Button
				onClick={() =>
					document.getElementById("upload-button")?.click()
				}
				disabled={uploading}
				sx={{
					position: "absolute",
					bottom: "0px",
					left: "50%",
					transform: "translateX(-50%)",
					height: "50%",
					width: "100%",
					borderBottomLeftRadius: "100px",
					borderBottomRightRadius: "100px",
					opacity: "0",
					":hover": {
						color: "blue",
						fontWeight: "bold",
						bgcolor: "lightgray",
						opacity: "0.7",
					},
				}}>
				Upload
			</Button>
		</Box>
	);
}

export default ProfileImageUpload;
