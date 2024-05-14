// src/components/ProfileImageUpload.tsx
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Avatar, Box } from "@mui/material";
import { supabase } from "../../api/supabaseInterface";
import { getProfileImageURL, uploadProfileImage } from "../../api/StaffAPI";

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
		const url = await getProfileImageURL(staffID);
		setImageUrl(
			url?.toString() ??
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
			const filePath = `${staffID}.${fileExt}`;

			const imageURL = await uploadProfileImage(staffID, filePath, file);

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
				accept="image/*"
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
						backgroundColor: "gray",
						opacity: "0.7",
					},
				}}>
				Upload
			</Button>
		</Box>
	);
}

export default ProfileImageUpload;
