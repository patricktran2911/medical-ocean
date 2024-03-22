import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";

export interface MedicalHistory {
    id: number;
    medical_conditions: string |null;
    allergies: string | null;
    current_medications: string | null;
    patient: Patient
}

export async function getMedicalHistory(patient_id: number): Promise<MedicalHistory[]> {
    const {data, error} = await supabase
    .from("medical_history")
    .select(`
        *,
        patient(*)
    `)
    .eq('patient_id', patient_id)
    
    if (error) throw new Error(error.message)

    return data ?? []
}