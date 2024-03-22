import { supabase } from "./supabaseInterface";
import { Patient, getPatient } from "./PatientAPI";

export interface Appointment {
    id: number;
    patient: Patient | null;
    title: string;
    description: string | null;
    time: Date;
}

export async function getAllAppointments(): Promise<Appointment[]> {
    const {data, error} = await supabase
    .from("appointments")
    .select(`
        id,
        patient_id,
        title,
        description,
        time
    `)
    if (error) throw new Error(error.message);
    return Promise.all(data.map( appointment => {
        return convertToObject(appointment.id, appointment.patient_id, appointment.time, appointment.title, appointment.description)
    })) 
}

export async function createAppointment(patient_id: number, time: Date, title: string, description: string | null) {
    const { data, error} = await supabase
    .from("appointments")
    .insert(
        [patient_id, title, description, time]
    )

    if (error) throw new Error(error.message)
}

async function  convertToObject(id: number, patient_id: number, time: Date, title: string, description: string): Promise<Appointment> {
    const currentPatient: Patient = await getPatient(patient_id)
    let result: Appointment = {
        id: id,
        patient: currentPatient,
        time: time,
        title: title,
        description: description
    }
    return  result
}