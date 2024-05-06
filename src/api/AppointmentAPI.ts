import { format } from "date-fns";
import { supabase } from "./supabaseInterface";

export interface Appointment {
    id: string;
    patient_id: string;
    title: string;
    description?: string;
    time: string;
    staff_id?: string;
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

export async function deleteAppointment(id: string) {
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    console.log(error?.message);
}

export async function createAppointment(
    patient_id: string,
    time: Date,
    title: string,
    description?: string,
    staff_id?: string
) {
    const newAppointment = {
        patient_id: patient_id,
        time: time,
        title: title,
        description: description ?? null,
        staff_id: staff_id ?? null,
    };
    const { data, error } = await supabase
        .from("appointments")
        .insert([newAppointment]);

    if (error) throw new Error(error.message);
}

export async function updateAppointmentTime(
    patient_id: string,
    time: Date,
    staff_id?: string
) {
    const { data, error } = await supabase
        .from("emergency_contact")
        .update({
            time: time,
            staff_id: staff_id ?? null,
        })
        .eq("patient_id", patient_id);
}
