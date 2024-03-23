import { supabase } from "./supabaseInterface";
import { Patient, getPatient } from "./PatientAPI";

export interface Appointment {
    id: number;
    patient: Patient;
    title: string;
    description: string | null;
    time: Date;
}

export async function getAllAppointments(): Promise<Appointment[]> {
    const {data, error} = await supabase
    .from("appointments")
    .select(`
        *,
        patient(*)
    `)

    if (error) throw new Error(error.message);

    return data.map(appointment => {
        return {
            id: appointment.id,
            patient: appointment.patient,
            title: appointment.title,
            description: appointment.description,
            time: appointment.time
        }
    })
}

export async function createAppointment(patient_id: number, time: Date, title: string, description: string | null) {
    const { data, error} = await supabase
    .from("appointments")
    .insert(
        [patient_id, title, description, time]
    )

    if (error) throw new Error(error.message)
}