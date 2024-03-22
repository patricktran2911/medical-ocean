import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";

export interface EmergencyContact {
    id: number;
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
    patient: Patient
}

export async function getEmergencyContact(patient_id: number): Promise<EmergencyContact[]> {
    const {data, error} = await supabase
    .from("emergency_contact")
    .select(`
        *,
        patient(*)
    `)
    .eq('patient_id', patient_id)

    if (error) throw new Error(error.message)
    
    return data ?? []
}