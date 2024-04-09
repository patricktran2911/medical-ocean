import { UUID } from "crypto";
import { supabase } from "./supabaseInterface";

export interface Staff {
    id: string;
    f_name: string;
    l_name: string;
    employee_id: string;
    phone_number: string;
    title: string | null;
    email: string;
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
        .eq("staff_id", id)
        .single();

    if (error) {
        return null;
    }

    return data;
}

export async function staffCheckIn(id: string): Promise<Staff> {
    const { data, error } = await supabase
        .from("staff_working_status")
        .insert([
            {
                staff_id: id,
                time: new Date(),
                is_working: true,
            },
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function staffCheckout(id: string): Promise<Staff> {
    const { data, error } = await supabase
        .from("staff_working_status")
        .update({
            is_working: false,
        })
        .order("time", { ascending: false })
        .eq("staff_id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}
