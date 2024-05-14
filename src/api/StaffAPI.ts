import { supabase } from "./supabaseInterface";

export interface Staff {
	id: string;
	profile_image_url?: string;
	f_name: string;
	l_name: string;
	employee_id: string;
	phone_number: string;
	title: string;
	email: string;
}

export interface StaffUpdate {
	profile_image_url?: string;
	f_name?: string;
	l_name?: string;
	employee_id?: string;
	phone_number?: string;
	title?: string;
	email?: string;
}

export async function getAllStaff(): Promise<Staff[]> {
	const { data, error } = await supabase.from("staff").select("*");

	if (error) {
		console.error(error);
	}

	return data ?? [];
}

export async function getStaffWithId(id: string): Promise<Staff> {
	const { data, error } = await supabase
		.from("staff")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.log(id);
		console.log(error);
	}

	return data;
}

export async function getProfileImageURL(
	filePath: string
): Promise<URL | undefined> {
	const { data } = await supabase.storage
		.from("profile_images")
		.getPublicUrl(filePath);

	const fileUrl = data.publicUrl;

	try {
		// Make a HEAD request to the file URL
		const response = await fetch(fileUrl, { method: "HEAD" });

		// Check if the file exists
		if (response.status !== 200) {
			return undefined;
		}
	} catch {
		return undefined;
	}

	return new URL(data.publicUrl);
}

export async function uploadProfileImage(
	staffId: string,
	filePath: string,
	file: File
): Promise<URL | undefined> {
	const { data, error } = await supabase.storage
		.from("profile_images")
		.upload(filePath, file, {
			upsert: true,
		});
	if (error) {
		console.log(error);
		return undefined;
	}

	const fileURL = await getProfileImageURL(filePath);
	await updateStaff(staffId, {
		profile_image_url: fileURL?.toString(),
	});
	return fileURL;
}

export async function updateStaff(
	staffId: string,
	staff: StaffUpdate
): Promise<Staff | undefined> {
	const { data, error } = await supabase
		.from("staff")
		.update({
			profile_image_url: staff.profile_image_url,
		})
		.eq("id", staffId)
		.single();

	return data ?? undefined;
}

export interface StaffWorkingStatus {
	staff_id: string;
	time: string;
	is_working: boolean;
}

export async function checkStaffWorkingStatus(
	id: string
): Promise<StaffWorkingStatus | null> {
	const { data, error } = await supabase
		.from("staff_working_status")
		.select(`*`)
		.order("time", { ascending: false })
		.eq("staff_id", id);

	if (error || data.length === 0) {
		return null;
	}

	return data[0];
}

export async function getStaffIsWorkingToday(): Promise<StaffWorkingStatus[]> {
	const { data, error } = await supabase
		.from("staff_working_status")
		.select(`*`)
		.order("time", { ascending: true })
		.eq("is_working", true);

	if (error) throw new Error(error.message);

	return data;
}

export async function staffCheckIn(id: string): Promise<StaffWorkingStatus> {
	await supabase
		.from("staff_working_status")
		.update({
			is_working: false,
		})
		.eq("staff_id", id)
		.eq("is_working", true);

	const { data, error } = await supabase
		.from("staff_working_status")
		.insert([
			{
				staff_id: id,
				time: new Date(),
				is_working: true,
			},
		])
		.order("time", { ascending: false })
		.select();

	if (error) throw new Error(error.message);

	return data[0];
}

export async function staffCheckout(id: string) {
	const { data, error } = await supabase
		.from("staff_working_status")
		.update({
			is_working: false,
		})
		.order("time", { ascending: false })
		.eq("staff_id", id)
		.select();

	if (error) throw new Error(error.message);
}
