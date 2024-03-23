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

export async function createEmergencyContact(
    f_name: string, 
    l_name: string, 
    relationship: string, 
    phone_number: string, 
    patient_id: number) {
        const { data, error } = await supabase
        .from('emergency_contact')
        .insert([{
            f_name: f_name, 
            l_name: l_name, 
            relationship: relationship, 
            phone_number: phone_number,
            patient_id: patient_id
        }])
    }