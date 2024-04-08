import { supabase } from "./supabaseInterface";

export interface EmergencyContact {
    id: string;
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
    patient_id: string
}

export async function getEmergencyContact(patient_id: string): Promise<EmergencyContact[]> {
    const {data, error} = await supabase
    .from("emergency_contact")
    .select(`
        *
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