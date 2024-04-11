import { supabase } from "./supabaseInterface";

export interface Appointment {
    id: string;
    patient_id: string;
    title: string;
    description: string | null;
    time: string;
}

export async function getAllAppointments(): Promise<Appointment[]> {
    const { data, error } = await supabase.from("appointments").select(`
        *
    `);

    if (error) throw new Error(error.message);

    return data;
}

export async function getPatientAppointments(
    patient_id: string
): Promise<Appointment[]> {
    const { data, error } = await supabase
        .from("appointments")
        .select(
            `
        *
    `
        )
        .eq("patient_id", patient_id);

    if (error) throw new Error(error.message);

    return data;
}

export async function createAppointment(
    patient_id: number,
    time: Date,
    title: string,
    description: string | null
) {
    const { data, error } = await supabase
        .from("appointments")
        .insert([patient_id, title, description, time]);

    if (error) throw new Error(error.message);
}
